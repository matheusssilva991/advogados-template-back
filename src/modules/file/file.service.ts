import { Injectable } from '@nestjs/common';
import { unlink, writeFile, mkdir } from 'fs/promises';

@Injectable()
export class FileService {
  async upload(
    file: Express.Multer.File,
    path: string,
  ): Promise<{ sucess: boolean }> {
    const folderPath = path.split('/').slice(0, -1).join('/');
    try {
      await mkdir(folderPath, { recursive: true });
    } catch (error) {
      throw new Error(error);
    }

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
