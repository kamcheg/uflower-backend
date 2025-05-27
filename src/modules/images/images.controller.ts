import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import * as sharp from 'sharp';
import { randomUUID } from 'crypto';
import { ImagesService } from './images.service';
import { extname } from 'path';

@Controller('upload-image')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const optimize = req.query.optimize !== 'false';
    let fileName = '';
    let buffer: Buffer;

    if (optimize) {
      fileName = `${randomUUID()}.webp`;
      buffer = await sharp(file.buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      const fileUrl = await this.imagesService.uploadWebp(buffer, fileName);
      return { url: fileUrl };
    }

    const originalExtension = extname(file.originalname);
    fileName = randomUUID() + originalExtension;
    const fileUrl = await this.imagesService.upload(file, fileName);
    return { url: fileUrl };
  }
}
