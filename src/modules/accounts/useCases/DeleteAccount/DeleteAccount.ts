import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';
import { AppException } from '@shared/errors/AppException';

@injectable()
class DeleteAccount {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppException({
        message: 'User does not exists!',
        statusCode: 404,
      });
    }

    await this.usersRepository.delete(user_id);
  }
}

export { DeleteAccount };
