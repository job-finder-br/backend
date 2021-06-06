import { getRepository, Repository } from 'typeorm';

import { City } from '@modules/addresses/domain';

import { ICityRepository, ICrateCityDTO } from '../ICityRepository';

class CityRepository implements ICityRepository {
  private repository: Repository<City>;

  constructor() {
    this.repository = getRepository(City);
  }

  async save(data: City): Promise<void> {
    await this.repository.save(data);
  }

  async create({ name, state }: ICrateCityDTO): Promise<City> {
    const city = this.repository.create({
      name,
      state,
    });

    await this.repository.save(city);

    return city;
  }

  async findByName(name: string): Promise<City> {
    return this.repository.findOne({ name });
  }

  async list(): Promise<City[]> {
    return this.repository.find();
  }
}

export { CityRepository };
