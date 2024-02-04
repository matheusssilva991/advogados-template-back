import { Injectable } from '@nestjs/common';
import { unlink, writeFile } from 'fs/promises';

@Injectable()
export class FileService {
  async upload(
    file: Express.Multer.File,
    path: string,
  ): Promise<{ sucess: boolean }> {
    await writeFile(path, file.buffer);

    return { sucess: true };
  }

  async deleteFile(path: string): Promise<void> {
    try {
      await unlink(path);
    } catch (error) {
      throw new Error(error);
    }
  }
}
