export default () => ({
  app: {
    port: Number(process.env.PORT ?? 3001),
    apiPrefix: process.env.API_PREFIX ?? "api",
    frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3000",
    environment: process.env.NODE_ENV ?? "development"
  },
  database: {
    host: process.env.DATABASE_HOST ?? "localhost",
    port: Number(process.env.DATABASE_PORT ?? 5432),
    username: process.env.DATABASE_USER ?? "altmed",
    password: process.env.DATABASE_PASSWORD ?? "altmed_dev_password",
    name: process.env.DATABASE_NAME ?? "altmed"
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? "dev_jwt_secret_change_in_prod",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "15m",
    refreshSecret:
      process.env.JWT_REFRESH_SECRET ?? "dev_jwt_refresh_secret_change_in_prod",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "30d"
  },
  email: {
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT ?? 587),
    user: process.env.EMAIL_USER ?? "info@altmedfirst.com",
    pass: process.env.EMAIL_PASS ?? "",
    recipient: process.env.CONTACT_FORM_RECIPIENT ?? "info@altmedfirst.com"
  },
  recaptcha: {
    secret: process.env.RECAPTCHA_SECRET_KEY ?? ""
  },
  storage: {
    region: process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? "",
    bucket: process.env.AWS_S3_BUCKET ?? "",
    uploadPrefix: process.env.AWS_S3_UPLOAD_PREFIX ?? "uploads",
    publicBaseUrl: process.env.AWS_S3_PUBLIC_BASE_URL ?? ""
  }
});
