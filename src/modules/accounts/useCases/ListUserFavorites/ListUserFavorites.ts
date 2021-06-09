import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/domain';
import { IUsersRepository } from '@modules/accounts/repositories';

@injectable()
class ListUserFavorites {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<User[]> {
    const favorites = await this.usersRepository.listFavoritesByUserId(user_id);

    return favorites;
  }
}

export { ListUserFavorites };
