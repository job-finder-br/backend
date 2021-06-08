import { container } from 'tsyringe';

import { HttpResponse, BaseController } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { ListUserRecolocation } from './ListUserRecolocation';

class ListUserRecolocationController implements BaseController {
  async handle(): Promise<HttpResponse> {
    const listUserRecolocation = container.resolve(ListUserRecolocation);

    try {
      const users = await listUserRecolocation.execute();

      return ok(users);
    } catch (error) {
      return clientError(error);
    }
  }
}

export { ListUserRecolocationController };
