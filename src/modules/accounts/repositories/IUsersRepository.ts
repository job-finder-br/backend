import { ICreateUserDTO, User } from '@modules/accounts/domain';

export interface IUsersRepository {
  exists(email: string): Promise<boolean>;
  findById(id: string): Promise<User> | undefined;
  findByEmail(email: string): Promise<User | undefined>;
  findByPhone(phone: string): Promise<User | undefined>;
  save(data: User): Promise<void>;
  create(data: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
}
