import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { promises as fs } from "fs";
import { basename, extname, join } from "path";

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);
  private readonly uploadsDir = join(process.cwd(), "uploads");
  private readonly region = process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? "";
  private readonly bucket = process.env.AWS_S3_BUCKET?.trim() ?? "";
  private readonly uploadPrefix = (process.env.AWS_S3_UPLOAD_PREFIX ?? "uploads").replace(
    /^\/+|\/+$/g,
    ""
  );
  private readonly publicBaseUrl = (process.env.AWS_S3_PUBLIC_BASE_URL ?? "").trim().replace(
    /\/+$/g,
    ""
  );
  private readonly s3Client = this.bucket && this.region ? new S3Client({ region: this.region }) : null;

  async register(file: Express.Multer.File) {
    if (this.s3Client) {
      return this.uploadToS3(file);
    }

    this.logger.warn("S3 upload env vars are missing. Saving upload to local container disk.");
    return this.saveLocally(file);
  }

  async remove(filenameOrUrl: string) {
    const key = this.extractS3Key(filenameOrUrl);

    if (this.s3Client && key) {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key
        })
      );

      return { success: true };
    }

    const filePath = join(this.uploadsDir, basename(filenameOrUrl));
    await fs.rm(filePath, { force: true });
    return { success: true };
  }

  private async saveLocally(file: Express.Multer.File) {
    const filename = this.buildFilename(file.originalname);

    await fs.mkdir(this.uploadsDir, { recursive: true });
    await fs.writeFile(join(this.uploadsDir, filename), file.buffer);

    return {
      url: `/uploads/${filename}`,
      filename
    };
  }

  private async uploadToS3(file: Express.Multer.File) {
    const filename = this.buildFilename(file.originalname);
    const key = this.buildObjectKey(filename);

    try {
      await this.s3Client!.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          CacheControl: "public, max-age=31536000, immutable"
        })
      );
    } catch (error) {
      this.logger.error(
        `S3 image upload failed for bucket ${this.bucket}: ${error instanceof Error ? error.message : String(error)}`
      );

      throw new InternalServerErrorException(
        `Image upload failed. S3 is configured, but the backend could not write to the bucket. In ECS, attach a taskRoleArn to the backend task with s3:PutObject and s3:DeleteObject for ${this.bucket}/${this.uploadPrefix ? `${this.uploadPrefix}/*` : "*"}. If you want local uploads instead, remove AWS_S3_BUCKET or AWS_REGION from the backend environment.`
      );
    }

    return {
      url: this.buildPublicUrl(key),
      filename: key
    };
  }

  private buildFilename(originalname: string) {
    const extension = extname(originalname).toLowerCase() || ".bin";
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    return `${uniqueSuffix}${extension}`;
  }

  private buildObjectKey(filename: string) {
    return this.uploadPrefix ? `${this.uploadPrefix}/${filename}` : filename;
  }

  private buildPublicUrl(key: string) {
    if (this.publicBaseUrl) {
      return `${this.publicBaseUrl}/${key}`;
    }

    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  private extractS3Key(filenameOrUrl: string) {
    const value = filenameOrUrl.trim();

    if (!value || value.startsWith("/uploads/")) {
      return null;
    }

    if (!/^https?:\/\//i.test(value)) {
      return value.replace(/^\/+/, "");
    }

    try {
      const url = new URL(value);
      return url.pathname.replace(/^\/+/, "");
    } catch {
      return null;
    }
  }
}
