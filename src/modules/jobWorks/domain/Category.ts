import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@core/.';
import { User } from '@modules/accounts/domain';

import { JobWork } from './JobWork';

@Entity('t_categories')
class Category extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  // Relationships

  @OneToMany(() => JobWork, job => job.category)
  jobs: JobWork[];

  @OneToMany(() => User, user => user.category)
  users: User[];
}

export { Category };
