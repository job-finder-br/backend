import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/domain';
import { IUsersRepository } from '@modules/accounts/repositories';
import { UserMapper } from '@modules/accounts/mappers/UserMapper';
import { IUserResponseMapper } from '@modules/accounts/dtos';

@injectable()
class ListUserRecolocation {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<IUserResponseMapper[]> {
    const users = await this.usersRepository.listRecolocation();

    return UserMapper.renderMany(users);
  }
}

export { ListUserRecolocation };
