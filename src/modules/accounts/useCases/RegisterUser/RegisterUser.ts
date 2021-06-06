import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/domain';
import { IHashProvider } from '@modules/accounts/providers/HashProvider/IHashProvider';
import { IUsersRepository } from '@modules/accounts/repositories';
import { RegisterAddress } from '@modules/addresses/useCases/RegisterAddress';
import { ICategoryRepository } from '@modules/jobWorks/repositories';

@injectable()
class RegisterUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository,

    private RegisterAdress: RegisterAddress,
  ) {}

  async execute({
    email,
    description,
    name,
    password,
    phone_number,
    category_id,
    city_name,
    state_name,
  }: ICreateUserDTO): Promise<void> {
    const userExistsPromises = await Promise.all([
      this.usersRepository.findByEmail(email),
      this.usersRepository.findByPhone(phone_number),
    ]);

    const userExists = userExistsPromises.some(element => element);

    if (userExists) {
      throw new Error('User already exists!');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    let category = null;

    if (category_id) {
      category = await this.categoriesRepository.findById(category_id);

      if (!category) {
        throw new Error('Category doe not exists!');
      }
    }

    const city = await this.RegisterAdress.execute({
      city_name,
      state_name,
    });

    await this.usersRepository.create({
      description,
      email,
      name,
      password: passwordHashed,
      phone_number,
      category,
      city,
    });
  }
}

export { RegisterUser };
