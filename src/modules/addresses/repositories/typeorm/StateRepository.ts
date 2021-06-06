import { getRepository, Repository } from 'typeorm';

import { State, ICreateAddressDTO } from '@modules/addresses/domain';

import { IStateRepository } from '../IStateRepository';

class StateRepository implements IStateRepository {
  private repository: Repository<State>;

  constructor() {
    this.repository = getRepository(State);
  }

  async create({ abbrev_name, name }: ICreateAddressDTO): Promise<State> {
    const state = this.repository.create({ abbrev_name, name });

    await this.repository.save(state);

    return state;
  }

  async findByName(name: string): Promise<State> {
    const state = await this.repository.findOne({ name });

    return state;
  }

  async findByAbbrev(abbrev: string): Promise<State> {
    const state = await this.repository.findOne({ abbrev_name: abbrev });

    return state;
  }

  async findById(id: string): Promise<State> {
    const state = await this.repository.findOne(id);

    return state;
  }

  async list(): Promise<State[]> {
    const states = await this.repository.find();

    return states;
  }
}

export { StateRepository };
