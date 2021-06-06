import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';
import { deleteFile } from '@shared/helpers/deleFile';

type IUpdateUserAvatarRequest = {
  user_id: string;
  avatar_file: string;
};

@injectable()
class UpdateUserAvatar {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    avatar_file,
    user_id,
  }: IUpdateUserAvatarRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      await deleteFile(`./uploads/avatar/${avatar_file}`);

      throw new Error('User not found!');
    }

    if (user.avatar) {
      await deleteFile(`./uploads/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersRepository.save(user);
  }
}

export { UpdateUserAvatar };
