import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { ChangeUserPassword } from './ChangeUserPassword';

class ChangeUserPasswordController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const changeUserPassword = container.resolve(ChangeUserPassword);
    try {
      await changeUserPassword.execute({
        data: request.body,
        user_id: request.params.id,
      });

      return ok();
    } catch (error) {
      return clientError(error);
    }
  }
}

export { ChangeUserPasswordController };
