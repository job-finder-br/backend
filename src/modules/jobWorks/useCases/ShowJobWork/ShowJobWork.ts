import { inject, injectable } from 'tsyringe';

import { JobWork } from '@modules/jobWorks/domain';
import { IJobsWorkRepository } from '@modules/jobWorks/repositories';

@injectable()
class ShowJobWork {
  constructor(
    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,
  ) {}

  async execute(id: string): Promise<JobWork> {
    const job = await this.jobsWorkRepository.findById(id);

    if (!job) {
      throw new Error('Job does not exists!');
    }

    return job;
  }
}

export { ShowJobWork };
