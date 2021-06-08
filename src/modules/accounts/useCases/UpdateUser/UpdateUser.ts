import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos';
import { IUsersRepository } from '@modules/accounts/repositories';
import { RegisterAddress } from '@modules/addresses/useCases/RegisterAddress';
import { ICategoryRepository } from '@modules/jobWorks/repositories';

type IUpdateUserRequest = {
  user_id: string;
  data: Omit<ICreateUserDTO, 'password'>;
};

@injectable()
class UpdateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository,

    private RegisterAdress: RegisterAddress,
  ) {}

  async execute({ data, user_id }: IUpdateUserRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    const category = await this.categoriesRepository.findById(data.category_id);

    if (!category) {
      throw new Error('Category does not exists!');
    }

    const emailExists = await this.usersRepository.findByEmail(data?.email);

    if (emailExists && emailExists.id !== user_id) {
      throw new Error('User email already registed!');
    }

    const phoneExists = await this.usersRepository.findByPhone(
      data.phone_number,
    );

    if (phoneExists && phoneExists.id !== user_id) {
      throw new Error('User phone number already registed!');
    }

    const city = await this.RegisterAdress.execute({
      city_name: data.city_name,
      state_name: data.state_name,
    });

    Object.assign(user, data);

    user.category = category;
    user.city = city;

    await this.usersRepository.save(user);
  }
}

export { UpdateUser };
