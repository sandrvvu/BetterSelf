import { registerAs } from "@nestjs/config";

export interface AwsConfigType {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucketName: string;
}

export default registerAs(
  "aws",
  (): AwsConfigType => ({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
  }),
);
