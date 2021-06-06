import { ICreateJobsWorks, JobWork } from '../domain';

interface IJobsWorkRepository {
  create(data: ICreateJobsWorks): Promise<void>;
  findByTitle(title: string): Promise<JobWork>;
  findByPhone(phone_number: string): Promise<JobWork>;
  findByEmail(email: string): Promise<JobWork>;
  findById(id: string): Promise<JobWork>;
  list(): Promise<JobWork[]>;
  save(data: JobWork): Promise<void>;
  remove(job: JobWork): Promise<void>;
}

export { IJobsWorkRepository };
