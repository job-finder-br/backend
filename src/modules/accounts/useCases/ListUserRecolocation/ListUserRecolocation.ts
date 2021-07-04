import { inject, injectable } from 'tsyringe';

import { IUserResponseMapper } from '@modules/accounts/dtos';
import { UserMapper } from '@modules/accounts/mappers/UserMapper';
import { IUsersRepository } from '@modules/accounts/repositories';

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
