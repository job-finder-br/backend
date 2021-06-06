/* eslint-disable camelcase */
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { BaseEntity } from '@core/.';
import { City } from '@modules/addresses/domain';
import { Category, JobWork } from '@modules/jobWorks/domain';

@Entity('t_users')
class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  description: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  curriculum: string;

  @Column({ unique: true })
  phone_number: string;

  @Column({ default: false })
  is_recolocation: boolean;

  @Column({ default: false })
  is_admin: boolean;

  // Relatioships

  @OneToMany(() => JobWork, jobwork => jobwork.user)
  jobs: JobWork[];

  @ManyToOne(() => City, city => city.users, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_city_id' })
  city: City;

  @ManyToMany(() => JobWork, jobwork => jobwork.users_favorites, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 't_users_favorites_jobs',
    joinColumns: [{ name: 'fk_user_id' }],
    inverseJoinColumns: [{ name: 'fk_jobwork_id' }],
  })
  favorites_jobs: JobWork[];

  @ManyToOne(() => Category, category => category.users, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_category_id' })
  category: Category;
}

export { User };
