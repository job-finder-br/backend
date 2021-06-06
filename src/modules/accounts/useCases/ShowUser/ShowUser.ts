import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/domain';
import { IUsersRepository } from '@modules/accounts/repositories';

@injectable()
class ShowUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    return user;
  }
}

export { ShowUser };
