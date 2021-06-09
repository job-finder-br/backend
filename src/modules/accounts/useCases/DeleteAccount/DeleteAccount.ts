import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';

@injectable()
class DeleteAccount {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    await this.usersRepository.delete(user_id);
  }
}

export { DeleteAccount };
