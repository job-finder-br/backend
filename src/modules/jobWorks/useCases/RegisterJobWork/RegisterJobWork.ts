import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories';
import { ICreateJobsWorks } from '@modules/jobWorks/domain';
import { IJobsWorkRepository } from '@modules/jobWorks/repositories';

@injectable()
class RegisterJobWork {
  constructor(
    @inject('JobsWorkRepository')
    private jobsWorkRepository: IJobsWorkRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    description,
    email,
    phone_number,
    remuneration_value,
    title,
    type,
    represents,
    user_id,
  }: ICreateJobsWorks): Promise<void> {
    const titleExists = await this.jobsWorkRepository.findByTitle(title);

    if (titleExists) {
      throw new Error('Job Work Title Already Exists!');
    }

    const phoneExists = await this.jobsWorkRepository.findByPhone(phone_number);

    if (phoneExists) {
      throw new Error('Job Work Phone Already Exists!');
    }

    const emailExists = await this.jobsWorkRepository.findByEmail(email);

    if (emailExists) {
      throw new Error('Job Work Email Already Exists!');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    await this.jobsWorkRepository.create({
      description,
      email,
      phone_number,
      represents,
      remuneration_value,
      title,
      type,
      user,
    });
  }
}

export { RegisterJobWork };
