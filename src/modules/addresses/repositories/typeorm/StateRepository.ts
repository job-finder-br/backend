import { getRepository, Repository } from 'typeorm';

import { State } from '@modules/addresses/domain';

import { IStateRepository } from '../IStateRepository';

class StateRepository implements IStateRepository {
  private repository: Repository<State>;

  constructor() {
    this.repository = getRepository(State);
  }

  async save(data: State): Promise<void> {
    await this.repository.save(data);
  }

  async create(name: string): Promise<State> {
    const state = this.repository.create({ name });

    await this.repository.save(state);

    return state;
  }

  async findByName(name: string): Promise<State> {
    return this.repository.findOne({ name });
  }

  async findById(id: string): Promise<State> {
    return this.repository.findOne(id);
  }

  async list(): Promise<State[]> {
    return this.repository.find();
  }
}

export { StateRepository };
