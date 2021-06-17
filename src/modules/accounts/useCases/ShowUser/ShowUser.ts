import { inject, injectable } from 'tsyringe';

import { IUserResponseMapper } from '@modules/accounts/dtos';
import { UserMapper } from '@modules/accounts/mappers/UserMapper';
import { IUsersRepository } from '@modules/accounts/repositories';

@injectable()
class ShowUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUserResponseMapper> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    return UserMapper.render(user);
  }
}

export { ShowUser };
