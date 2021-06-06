/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO, User } from '../../domain';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async exists(email: string): Promise<boolean> {
    const user = await this.repository.findOne({ email });

    return !!user;
  }

  async findByUserName(username: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ username });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findByPhone(phone_number: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ phone_number });

    return user;
  }

  async save(data: User): Promise<void> {
    await this.repository.save(data);
  }

  async create({
    description,
    email,
    name,
    password,
    phone_number,
    username,
    category,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      description,
      email,
      name,
      password,
      phone_number,
      username,
      category,
    });

    await this.repository.save(user);
  }
}
export { UsersRepository };
