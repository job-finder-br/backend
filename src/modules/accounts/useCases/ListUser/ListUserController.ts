import { container } from 'tsyringe';

import { HttpResponse, BaseController } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { ListUser } from './ListUser';

class ListUserController implements BaseController {
  async handle(): Promise<HttpResponse> {
    const listUser = container.resolve(ListUser);
    try {
      const users = await listUser.execute();

      return ok(users);
    } catch (error) {
      return clientError(error);
    }
  }
}

export { ListUserController };
