import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/domain';
import { IUsersRepository } from '@modules/accounts/repositories';
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
  ) {}

  async execute({ data, user_id }: IUpdateUserRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    let category = null;
    if (data.category_id) {
      category = await this.categoriesRepository.findById(data.category_id);

      if (!category) {
        throw new Error('Category does not exists!');
      }
    }

    const emailExists = await this.usersRepository.findByEmail(data.email);

    if (emailExists) {
      throw new Error('User email already registed!');
    }

    const phoneExists = await this.usersRepository.findByPhone(
      data.phone_number,
    );

    if (phoneExists) {
      throw new Error('User phone number already registed!');
    }

    Object.assign(user, data);

    user.category = category;

    await this.usersRepository.save(user);
  }
}

export { UpdateUser };
