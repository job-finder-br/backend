import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@modules/accounts/providers/HashProvider/IHashProvider';
import { IUsersRepository } from '@modules/accounts/repositories';

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
      throw new Error('User does not exists!');
    }

    const passwordMatch = await this.hashProvider.compareHash(
      data.old_password,
      user.password,
    );

    if (!passwordMatch) {
      throw new Error('User password incorrect!');
    }

    const verifyNewPassword = await this.hashProvider.compareHash(
      data.new_password,
      user.password,
    );

    if (verifyNewPassword) {
      throw new Error('User password must be different from the current!');
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
