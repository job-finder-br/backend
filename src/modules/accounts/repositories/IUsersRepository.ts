import { ICreateUserDTO, User } from '@modules/accounts/domain';

export interface IUsersRepository {
  exists(email: string): Promise<boolean>;
  findById(id: string): Promise<User>;
  findByUserName(username: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByPhone(phone: string): Promise<User>;
  save(data: User): Promise<void>;
  create(data: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
}
