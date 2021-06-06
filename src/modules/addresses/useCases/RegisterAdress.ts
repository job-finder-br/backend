import { inject, injectable } from 'tsyringe';

import { City, ICreateAddressDTO, State } from '@modules/addresses/domain';
import {
  ICityRepository,
  IStateRepository,
} from '@modules/addresses/repositories';

type IRegisterAddressRequest = {
  state: ICreateAddressDTO;
  city: ICreateAddressDTO;
};

@injectable()
class RegisterAdress {
  constructor(
    @inject('StateRepository')
    private statesRepository: IStateRepository,

    @inject('CityRepository')
    private citiesRepository: ICityRepository,
  ) {}

  async execute({ city, state }: IRegisterAddressRequest): Promise<void> {
    const stateExists = await this.statesRepository.findByName(state.name);

    let objectState: State = null;

    if (!stateExists) {
      objectState = await this.statesRepository.create({
        abbrev_name: state.abbrev_name.toLowerCase(),
        name: state.name.toLowerCase(),
      });
    }

    const cityExists = await this.citiesRepository.findByName(city.name);

    let objectCity: City = null;

    if (!cityExists) {
      objectCity = await this.citiesRepository.create({
        abbrev_name: city.abbrev_name.toLowerCase(),
        name: city.name.toLowerCase(),
        state: objectState,
      });
    }

    objectCity.state = objectState;

    await this.citiesRepository.save(objectCity);
  }
}

export { RegisterAdress };
