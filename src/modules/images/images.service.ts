import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

@Injectable()
export class ImagesService {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION,
      endpoint: 'https://s3.timeweb.cloud',
      s3ForcePathStyle: true,
    });
  }

  async uploadWebp(buffer: Buffer, fileName: string): Promise<string> {
    const params: S3.Types.PutObjectRequest = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/webp', // если оптимизирую в webp
    };

    const res = await this.s3.upload(params).promise();

    return res.Location;
  }

  async upload(file: Express.Multer.File, fileName: string) {
    const params: S3.Types.PutObjectRequest = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype, // если оптимизирую в webp
    };

    const res = await this.s3.upload(params).promise();

    return res.Location;
  }
}
