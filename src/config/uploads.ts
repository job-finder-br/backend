/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

export default {
  upload: (folder: string) => ({
    storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', folder),

      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const fileName = `${file.originalname + fileHash}.png`;

        return callback(null, fileName);
      },
    }),
  }),
};
