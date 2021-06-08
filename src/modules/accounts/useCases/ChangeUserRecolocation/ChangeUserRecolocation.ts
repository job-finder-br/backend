import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';

type RecolocationStatus = {
  message: string;
  is_recolocation: boolean;
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
      throw new Error('User does not exists!');
    }

    user.is_recolocation = !user.is_recolocation;

    await this.usersRepository.save(user);

    return {
      is_recolocation: user.is_recolocation,
      message: `The new recolocation status is: ${user.is_recolocation}`,
    };
  }
}

export { ChangeUserRecolocation };
