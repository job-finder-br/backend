import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';
import { JobWork } from '@modules/jobWorks/domain';

@injectable()
class ListUserFavorites {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<JobWork[]> {
    const favorites = await this.usersRepository.listFavoritesByUserId(user_id);

    return favorites;
  }
}

export { ListUserFavorites };
