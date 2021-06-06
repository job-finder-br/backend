import '@modules/accounts/providers';

import { container } from 'tsyringe';

import {
  IUsersRepository,
  UsersRepository,
} from '@modules/accounts/repositories';
import {
  ICityRepository,
  IStateRepository,
} from '@modules/addresses/repositories';
import { CityRepository } from '@modules/addresses/repositories/typeorm/CityRepository';
import { StateRepository } from '@modules/addresses/repositories/typeorm/StateRepository';
import {
  IJobsWorkRepository,
  JobsWorksRepository,
} from '@modules/jobWorks/repositories';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IJobsWorkRepository>(
  'JobsWorkRepository',
  JobsWorksRepository,
);

container.registerSingleton<ICityRepository>('CityRepository', CityRepository);

container.registerSingleton<IStateRepository>(
  'StateRepository',
  StateRepository,
);
