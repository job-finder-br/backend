type DestinationFile = 'avatars' | 'curriculums';

interface IStorageProvider {
  saveFile(destination: DestinationFile, file: string): Promise<string>;
  deleteFile(destination: DestinationFile, file: string): Promise<void>;
}

export { IStorageProvider, DestinationFile };
