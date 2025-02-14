import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger();
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");

  const config = new DocumentBuilder()
    .setTitle("BetterSelf API")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth(
      {
        bearerFormat: "JWT",
        scheme: "bearer",
        type: "http",
      },
      "access-token",
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, documentFactory);

  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
