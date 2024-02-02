import { Injectable } from '@nestjs/common';
import { unlink, writeFile } from 'fs/promises';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File, path: string) {
    await writeFile(path, file.buffer);

    return { sucess: true };
  }

  async deleteFile(path: string) {
    try {
      await unlink(path);
    } catch (error) {
      throw new Error(error);
    }
  }
}
