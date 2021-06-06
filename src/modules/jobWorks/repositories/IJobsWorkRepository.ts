import { ICreateJobsWorks, JobWork } from '../domain';

interface IJobsWorkRepository {
  create(data: ICreateJobsWorks): Promise<void>;
  findByTitle(title: string): Promise<JobWork | undefined>;
  findByPhone(phone_number: string): Promise<JobWork | undefined>;
  findByEmail(email: string): Promise<JobWork | undefined>;
  findById(id: string): Promise<JobWork | undefined>;
  list(): Promise<JobWork[]>;
  save(data: JobWork): Promise<void>;
  remove(job: JobWork): Promise<void>;
}

export { IJobsWorkRepository };
