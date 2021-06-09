import { ICreateUserDTO } from '@modules/accounts/dtos';
import { JobWork } from '@modules/jobWorks/domain';

import { User } from '../domain';

interface IUsersRepository {
  exists(email: string): Promise<boolean>;
  findById(id: string): Promise<User> | undefined;
  findByEmail(email: string): Promise<User | undefined>;
  findByPhone(phone: string): Promise<User | undefined>;
  save(data: User): Promise<void>;
  create(data: ICreateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<User[]>;
  listFavoritesByUserId(user_id: string): Promise<JobWork[]>;
  listRecolocation(): Promise<User[]>;
}

export { IUsersRepository };
