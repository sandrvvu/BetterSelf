import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class StorageService {
  private bucketName: string;
  private readonly logger = new Logger("StorageService");
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.configService.get<string>("aws.accessKeyId"),
        secretAccessKey: this.configService.get<string>("aws.secretAccessKey"),
      },
      region: this.configService.get<string>("aws.region"),
    });
    this.bucketName = this.configService.get<string>("aws.bucketName");
  }

  async deleteFile(imageUrl: string): Promise<void> {
    const [imageKey] = imageUrl.split("/").slice(-1);
    const fileKey = `files/${imageKey}`;

    try {
      await this.s3.send(
        new DeleteObjectCommand({ Bucket: this.bucketName, Key: fileKey }),
      );
    } catch (e) {
      this.logger.warn(`Error with storage during deleting files: ${e}`);
      throw new InternalServerErrorException(
        "Error with storage during deleting files",
      );
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const key = `files/${fileName}`;
    const params = {
      Body: file.buffer,
      Bucket: this.bucketName,
      ContentType: file.mimetype,
      Key: key,
    };
    try {
      await this.s3.send(new PutObjectCommand(params));
      return `https://${this.bucketName}.s3.${this.configService.get<string>("aws.region")}.amazonaws.com/${fileName}`;
    } catch (e) {
      this.logger.warn(`Error with storage during uploading files: ${e}`);
      throw new InternalServerErrorException(
        "Error with storage during uploading files",
      );
    }
  }
}
