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
    const fileName = `${randomUUID()}.webp`;
    let buffer: Buffer;

    if (optimize) {
      buffer = await sharp(file.buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
    } else {
      buffer = file.buffer;
    }

    const fileUrl = await this.imagesService.uploadFile(buffer, fileName);
    return { url: fileUrl };
  }
}
