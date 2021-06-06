import { inject, injectable } from 'tsyringe';

import { ICreateJobsWorks } from '@modules/jobWorks/domain';
import { IJobsWorkRepository } from '@modules/jobWorks/repositories';

type IUpdateRequest = {
  job_id: string;
  data: ICreateJobsWorks;
};

@injectable()
class DeleteJobWork {
  constructor(
    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,
  ) {}

  async execute({ job_id, data }: IUpdateRequest): Promise<void> {
    const job = await this.jobsWorkRepository.findById(job_id);

    if (!job) {
      throw new Error('Job listing not found!');
    }

    if (job.fk_user_id !== data.user_id) {
      throw new Error('This job listing cannot be updated by this user!');
    }

    job.user = null;
    job.users_favorites = null;

    await this.jobsWorkRepository.remove(job);
  }
}

export { DeleteJobWork };
