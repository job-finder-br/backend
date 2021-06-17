import 'dotenv/config';
import firebaseAdmin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

import { Bucket } from '@google-cloud/storage';

import { IStorageProvider } from '../IStorageProvider';

type DestinationFile = 'avatars' | 'curriculum';

class FireBaseStorageProvider implements IStorageProvider {
  private bucket: Bucket;

  constructor() {
    if (!firebaseAdmin.apps.length) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(
          process.env.FIREBASE_PATH_SECRETS,
        ),
        storageBucket: process.env.FIREBASE_URI_BUCKET,
      });
    }

    this.bucket = firebaseAdmin.storage().bucket();
  }

  private resolveTokenName() {
    const fileToken = uuid();

    const newFileName = `${fileToken}.jpg`;

    return {
      newFileName,
      fileToken,
    };
  }

  private resolveFilePath(fileName: string) {
    return path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      `uploads/${fileName}`,
    );
  }

  async saveFile(destination: DestinationFile, file: string): Promise<string> {
    const { fileToken, newFileName } = this.resolveTokenName();
    const fileOriginPath = this.resolveFilePath(file);

    console.log({
      fileToken,
      newFileName,
      fileOriginPath,
    });

    await this.bucket.upload(fileOriginPath, {
      destination: `${destination}/${newFileName}`,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: fileToken,
        },
      },
    });

    await fs.promises.unlink(fileOriginPath);

    return `${newFileName}?alt=media&token=${fileToken}`;
  }

  async deleteFile(destination: DestinationFile, file: string): Promise<void> {
    await this.bucket
      .file(`${destination}/${file}`)
      .delete({ ignoreNotFound: true });
  }
}

export { FireBaseStorageProvider };
