import { inject, injectable } from 'tsyringe';

import { ICreateJobsWorks } from '@modules/jobWorks/domain';
import {
  ICategoryRepository,
  IJobsWorkRepository,
} from '@modules/jobWorks/repositories';

type IUpdateRequest = {
  job_id: string;
  user_id: string;
  data: ICreateJobsWorks;
};

@injectable()
class UpdateJobWork {
  constructor(
    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,

    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}

  async execute({ job_id, user_id, data }: IUpdateRequest): Promise<void> {
    const job = await this.jobsWorkRepository.findById(job_id);

    if (!job) {
      throw new Error('Job listing not found!');
    }

    if (job.fk_user_id !== user_id) {
      throw new Error('This job listing cannot be updated by this user!');
    }

    const category = await this.categoriesRepository.findById(data.category_id);

    if (!category) {
      throw new Error('Category does not exists!');
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

    job.category = category;

    await this.jobsWorkRepository.save(job);
  }
}

export { UpdateJobWork };
