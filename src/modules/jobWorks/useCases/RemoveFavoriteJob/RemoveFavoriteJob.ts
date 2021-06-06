import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';
import { IJobsWorkRepository } from '@modules/jobWorks/repositories';

type IUnsubscriptionRequest = {
  user_id: string;
  job_id: string;
};

@injectable()
class RemoveFavoriteJob {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,
  ) {}

  async execute({ job_id, user_id }: IUnsubscriptionRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    const job = await this.jobsWorkRepository.findById(job_id);

    if (!job) {
      throw new Error('Job Work does not exists!');
    }

    user.favorites_jobs = user.favorites_jobs.filter(
      element => element.id !== job.id,
    );

    await this.usersRepository.save(user);
  }
}

export { RemoveFavoriteJob };
