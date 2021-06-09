import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { BaseEntity } from '@core/.';
import { User } from '@modules/accounts/domain';
import { City } from '@modules/addresses/domain';

import { Category } from './Category';

@Entity('t_job_works')
class JobWork extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  remuneration_value: number;

  @Column()
  phone_number: string;

  @Column({ unique: true })
  email: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  represents: string;

  @Column()
  fk_user_id: string;

  @ManyToOne(() => User, user => user.jobs, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @ManyToOne(() => Category, category => category.jobs, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_category_id' })
  category: Category;

  @ManyToOne(() => City, city => city.jobs, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_city_id' })
  city: City;

  @ManyToMany(() => User, user => user.favorites_jobs)
  users_favorites: User[];
}

export { JobWork };
