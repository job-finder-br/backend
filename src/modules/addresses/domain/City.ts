import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '@core/.';
import { User } from '@modules/accounts/domain';
import { JobWork } from '@modules/jobWorks/domain';

import { State } from './State';

@Entity('t_cities')
class City extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => State, state => state.cities, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_state_id' })
  state: State;

  @OneToMany(() => User, user => user.city)
  users: User[];

  @OneToMany(() => JobWork, jobwork => jobwork.city)
  jobs: JobWork[];
}

export { City };
