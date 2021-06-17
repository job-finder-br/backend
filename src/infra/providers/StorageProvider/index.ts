import { container } from 'tsyringe';

import { FireBaseStorageProvider } from './implementations/FireBaseStorageProvider';
import { IStorageProvider } from './IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  FireBaseStorageProvider,
);
