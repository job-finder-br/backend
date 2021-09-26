import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';
import { JobWork } from '@modules/jobWorks/domain';

@injectable()
class ListUserJobs {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<JobWork[]> {
    const jobs = await this.usersRepository.listJobsByUserId(user_id);

    return jobs;
  }
}

export { ListUserJobs };
