import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/domain';
import { ICreateUserDTO } from '@modules/accounts/dtos';
import { IUsersRepository } from '@modules/accounts/repositories';
import { RegisterAddress } from '@modules/addresses/useCases/RegisterAddress';
import { ICategoryRepository } from '@modules/jobWorks/repositories';
import { AppException } from '@shared/errors/AppException';

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

  async execute({ data, user_id }: IUpdateUserRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppException({
        message: 'User does not exists!',
        statusCode: 404,
      });
    }

    const category = await this.categoriesRepository.findById(data.category_id);

    if (!category) {
      throw new AppException({
        message: 'Category does not exists!',
        statusCode: 404,
      });
    }

    const phoneExists = await this.usersRepository.findByPhone(
      data.phone_number,
    );

    if (phoneExists && phoneExists.id !== user_id) {
      throw new AppException({
        message: 'User phone number already registed!',
        statusCode: 409,
      });
    }

    const city = await this.RegisterAdress.execute({
      city_name: data.city_name,
      state_name: data.state_name,
    });

    Object.assign(user, data);

    user.category = category;
    user.city = city;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUser };
