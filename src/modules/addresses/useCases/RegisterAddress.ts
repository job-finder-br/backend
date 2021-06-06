import { inject, injectable } from 'tsyringe';

import { City } from '@modules/addresses/domain';
import {
  ICityRepository,
  IStateRepository,
} from '@modules/addresses/repositories';

type IRegisterAddressRequest = {
  city_name: string;
  state_name: string;
};

@injectable()
class RegisterAddress {
  constructor(
    @inject('StateRepository')
    private statesRepository: IStateRepository,

    @inject('CityRepository')
    private citiesRepository: ICityRepository,
  ) {}

  async execute({
    city_name,
    state_name,
  }: IRegisterAddressRequest): Promise<City> {
    let objectState = await this.statesRepository.findByName(
      state_name.toLowerCase(),
    );

    if (!objectState) {
      objectState = await this.statesRepository.create(
        state_name.toLowerCase(),
      );
    }

    let objectCity = await this.citiesRepository.findByName(
      city_name.toLowerCase(),
    );

    if (!objectCity) {
      objectCity = await this.citiesRepository.create({
        name: city_name.toLowerCase(),
        state: objectState,
      });
    }

    objectCity.state = objectState;

    await this.citiesRepository.save(objectCity);

    return objectCity;
  }
}

export { RegisterAddress };
