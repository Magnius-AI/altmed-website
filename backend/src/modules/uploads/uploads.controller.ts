import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { UploadsService } from "./uploads.service";

@Controller("uploads")
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post("image")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_request, file, callback) => {
        if (
          !/\.(jpg|jpeg|png|webp|gif)$/i.test(file.originalname) ||
          !/^image\/(jpeg|png|webp|gif)$/i.test(file.mimetype)
        ) {
          return callback(new BadRequestException("Images only"), false);
        }
        callback(null, true);
      }
    })
  )
  upload(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }
    return this.uploadsService.register(file);
  }

  @Delete(":filename")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  remove(@Param("filename") filename: string) {
    return this.uploadsService.remove(filename);
  }
}
