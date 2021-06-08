import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { ShowUser } from './ShowUser';

class ShowUserController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const showUser = container.resolve(ShowUser);
    try {
      const user = await showUser.execute(request.params.id || request.user.id);

      return ok(user);
    } catch (error) {
      return clientError(error);
    }
  }
}

export { ShowUserController };
