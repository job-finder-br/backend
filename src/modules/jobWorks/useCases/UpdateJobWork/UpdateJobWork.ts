import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';
import { ICreateJobsWorks } from '@modules/jobWorks/domain';
import { IJobsWorkRepository } from '@modules/jobWorks/repositories';

type IUpdateRequest = {
  job_id: string;
  data: ICreateJobsWorks;
};

@injectable()
class UpdateJobWork {
  constructor(
    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ job_id, data }: IUpdateRequest): Promise<void> {
    console.log({ job_id, data });
    const job = await this.jobsWorkRepository.findById(job_id);

    if (!job) {
      throw new Error('Job listing not found!');
    }

    if (job.fk_user_id !== data.user_id) {
      throw new Error('This job listing cannot be updated by this user!');
    }

    const user = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new Error('Error to find user');
    }

    const titleExists = await this.jobsWorkRepository.findByTitle(data.title);

    if (titleExists) {
      throw new Error('Job Work Title Already Exists!');
    }

    const phoneExists = await this.jobsWorkRepository.findByPhone(
      data.phone_number,
    );

    if (phoneExists) {
      throw new Error('Job Work Phone Already Exists!');
    }

    const emailExists = await this.jobsWorkRepository.findByEmail(data.email);

    if (emailExists) {
      throw new Error('Job Work Email Already Exists!');
    }

    Object.assign(job, data);

    await this.jobsWorkRepository.save(job);
  }
}

export { UpdateJobWork };
