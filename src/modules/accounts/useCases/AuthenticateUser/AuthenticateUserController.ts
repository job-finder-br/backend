import { container } from 'tsyringe';

import { BaseController, HttpRequest, HttpResponse } from '@core/.';
import { ok, clientError } from '@core/infra/HttpResponse';

import { AuthenticateUser } from './AuthenticateUser';

class AuthenticateUserController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const authenticateUser = container.resolve(AuthenticateUser);

    try {
      const user = await authenticateUser.execute(request.body);

      return ok(user);
    } catch (error) {
      return clientError(error);
    }
  }
}

export { AuthenticateUserController };
