/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos';
import { JobWork } from '@modules/jobWorks/domain';

import { User } from '../../domain';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async listJobsByUserId(user_id: string): Promise<JobWork[]> {
    const user = await this.repository.findOne(user_id);

    return user.jobs;
  }

  async listFavoritesByUserId(user_id: string): Promise<JobWork[]> {
    const user = await this.repository.findOne(user_id);

    return user.favorites_jobs;
  }

  async listRecolocation(): Promise<User[]> {
    const users = await this.repository.find({
      where: { is_recolocation: true },
    });

    return users;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async exists(email: string): Promise<boolean> {
    const user = await this.repository.findOne({ email });

    return !!user;
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
    category,
    city,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      description,
      email,
      name,
      password,
      phone_number,
      category,
      city,
    });

    await this.repository.save(user);

    return user;
  }
}
export { UsersRepository };
