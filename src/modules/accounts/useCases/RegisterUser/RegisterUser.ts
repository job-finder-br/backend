import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/domain';
import { IHashProvider } from '@modules/accounts/providers/HashProvider/IHashProvider';
import { IUsersRepository } from '@modules/accounts/repositories';

@injectable()
class RegisterUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    email,
    description,
    name,
    password,
    phone_number,
    username,
  }: ICreateUserDTO): Promise<void> {
    const userExistsPromises = await Promise.all([
      this.usersRepository.findByEmail(email),
      this.usersRepository.findByUserName(username),
      this.usersRepository.findByPhone(phone_number),
    ]);

    const userExists = userExistsPromises.some(element => element);

    if (userExists) {
      throw new Error('User Already Exists!');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    await this.usersRepository.create({
      description,
      email,
      name,
      password: passwordHashed,
      phone_number,
      username,
    });
  }
}

export { RegisterUser };
