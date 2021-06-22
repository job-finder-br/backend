import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO, IUserResponseMapper } from '@modules/accounts/dtos';
import { IHashProvider } from '@modules/accounts/providers/HashProvider/IHashProvider';
import { IUsersRepository } from '@modules/accounts/repositories';
import { RegisterAddress } from '@modules/addresses/useCases/RegisterAddress';
import { ICategoryRepository } from '@modules/jobWorks/repositories';
import { User } from '@modules/accounts/domain';
import { UserMapper } from '@modules/accounts/mappers/UserMapper';

@injectable()
class RegisterUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository,

    private registerAdress: RegisterAddress,
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
  }: ICreateUserDTO): Promise<IUserResponseMapper> {
    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userEmailExists) {
      throw new Error('User email already exists!');
    }

    const userphoneExists = await this.usersRepository.findByPhone(
      phone_number,
    );

    if (userphoneExists) {
      throw new Error('User phone number already exists!');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new Error('Category does not exists!');
    }

    const city = await this.registerAdress.execute({
      city_name,
      state_name,
    });

    const user = await this.usersRepository.create({
      description,
      email,
      name,
      password: passwordHashed,
      phone_number,
      category,
      city,
    });

    return UserMapper.render(user);
  }
}

export { RegisterUser };
