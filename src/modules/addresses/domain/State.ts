import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@core/.';

import { City } from './City';

@Entity('t_states')
class State extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  abbrev_name: string;

  @OneToMany(() => City, city => city.state)
  cities: City[];
}

export { State };
