import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';
import { DeleteJobWork } from '@modules/jobWorks/useCases/DeleteJobWork';
import { RemoveFavoriteJob } from '@modules/jobWorks/useCases/RemoveFavoriteJob';

@injectable()
class DeleteAccount {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    private deleteJobWork: DeleteJobWork,
    private removeFavoriteJob: RemoveFavoriteJob,
  ) {}

  async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    // user.favorites_jobs.forEach(async element => {
    //   await this.removeFavoriteJob.execute({ job_id: element.id, user_id });
    // });

    // user.jobs.forEach(async element => {
    //   await this.deleteJobWork.execute({ job_id: element.id, user_id });
    // });

    // user.jobs = [];
    // user.favorites_jobs = [];

    user.category = undefined;
    user.city = undefined;

    await this.usersRepository.save(user);

    await this.usersRepository.delete(user_id);
  }
}

export { DeleteAccount };
