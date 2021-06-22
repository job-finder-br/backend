import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { created, clientError } from '@core/infra/HttpResponse';

import { RegisterUser } from './RegisterUser';

class RegisterUserController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const registerUser = container.resolve(RegisterUser);
    try {
      const user = await registerUser.execute(request.body);

      return created(user);
    } catch (error) {
      return clientError(error);
    }
  }
}

export { RegisterUserController };
