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

  async create({ abbrev_name, name, state }: ICrateCityDTO): Promise<City> {
    const city = this.repository.create({
      abbrev_name,
      name,
      state,
    });

    await this.repository.save(city);

    return city;
  }

  async findByName(name: string): Promise<City> {
    const city = await this.repository.findOne({ name });

    return city;
  }

  async findByAbbrev(abbrev: string): Promise<City> {
    const city = await this.repository.findOne({ abbrev_name: abbrev });

    return city;
  }

  async findById(id: string): Promise<City> {
    const city = await this.repository.findOne(id);

    return city;
  }

  async list(): Promise<City[]> {
    const cities = await this.repository.find();

    return cities;
  }
}

export { CityRepository };
