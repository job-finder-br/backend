/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

enum ACCEPTED_TYPE_UPLOADS_FILES {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  PDF = 'application/pdf',
}

const MAX_FILE_SIZE = 3 * 1024 * 1024;

const fileFilter = (
  request: any,
  file: { mimetype: ACCEPTED_TYPE_UPLOADS_FILES },
  callback: any,
) => {
  if (
    [
      ACCEPTED_TYPE_UPLOADS_FILES.JPEG,
      ACCEPTED_TYPE_UPLOADS_FILES.JPG,
      ACCEPTED_TYPE_UPLOADS_FILES.PDF,
      ACCEPTED_TYPE_UPLOADS_FILES.PNG,
    ].includes(file.mimetype)
  ) {
    callback(null, true);
  } else {
    callback(null, false);

    return callback(new Error('Only images and pdf files!'));
  }
};

const storage = multer.diskStorage({
  destination: resolve(__dirname, '..', '..', 'uploads'),

  filename: (request, file, callback) => {
    const fileHash = crypto.randomBytes(8).toString('hex');
    const fileName = `${file.originalname + fileHash}.png`;

    return callback(null, fileName);
  },
});

export default {
  upload: {
    storage,
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE },
  },
};
