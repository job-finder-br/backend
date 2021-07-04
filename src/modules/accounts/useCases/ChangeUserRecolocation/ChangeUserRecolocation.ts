import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';
import { AppException } from '@shared/errors/AppException';
import { UserMapperSimple } from '@modules/accounts/mappers/UserMapperSimple';
import { IUserResponseMapper } from '@modules/accounts/dtos';

type RecolocationStatus = {
  message: string;
  is_recolocation: boolean;
  user: IUserResponseMapper;
};

@injectable()
class ChangeUserRecolocation {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<RecolocationStatus> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppException({
        message: 'User does not exists!',
        statusCode: 404,
      });
    }

    user.is_recolocation = !user.is_recolocation;

    await this.usersRepository.save(user);

    return {
      is_recolocation: user.is_recolocation,
      message: `The new recolocation status is: ${user.is_recolocation}`,
      user: UserMapperSimple.render(user),
    };
  }
}

export { ChangeUserRecolocation };
