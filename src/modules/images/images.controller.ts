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
import { writeFile, mkdir } from 'fs/promises';
import { join, resolve } from 'path';
import { randomUUID } from 'crypto';

@Controller('upload-image')
export class ImagesController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const uploadsDir = resolve(process.cwd(), 'uploads');

    await mkdir(uploadsDir, { recursive: true });

    const fileName = `${randomUUID()}.webp`;
    const filePath = join(uploadsDir, fileName);

    const webpBuffer = await sharp(file.buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    await writeFile(filePath, webpBuffer);

    const host = req.protocol + '://' + req.get('host');
    const fileUrl = `${host}/uploads/${fileName}`;

    return { url: fileUrl };
  }
}
