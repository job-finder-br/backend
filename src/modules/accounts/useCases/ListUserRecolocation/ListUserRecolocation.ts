import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/domain';
import { IUsersRepository } from '@modules/accounts/repositories';

@injectable()
class ListUserRecolocation {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.listRecolocation();

    return users;
  }
}

export { ListUserRecolocation };
