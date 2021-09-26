import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@modules/accounts/providers/HashProvider/IHashProvider';
import { IUsersRepository } from '@modules/accounts/repositories';
import { AppException } from '@shared/errors/AppException';

type IChangeUserPasswordRequest = {
  user_id: string;
  data: {
    old_password: string;
    new_password: string;
  };
};

@injectable()
class ChangeUserPassword {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ data, user_id }: IChangeUserPasswordRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppException({
        message: 'User does not exists!',
        statusCode: 404,
      });
    }

    const passwordMatch = await this.hashProvider.compareHash(
      data.old_password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppException({
        message: 'User password incorrect!',
        statusCode: 403,
      });
    }

    const verifyNewPassword = await this.hashProvider.compareHash(
      data.new_password,
      user.password,
    );

    if (verifyNewPassword) {
      throw new AppException({
        message: 'User password must be different from the current!',
        statusCode: 403,
      });
    }

    const newHashedPassword = await this.hashProvider.generateHash(
      data.new_password,
    );

    Object.assign(user, {
      password: newHashedPassword,
    });

    await this.usersRepository.save(user);
  }
}

export { ChangeUserPassword };
