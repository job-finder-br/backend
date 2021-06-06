import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { UpdateUser } from './UpdateUser';

class UpdateUserController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const updateUser = container.resolve(UpdateUser);
    try {
      await updateUser.execute({
        data: request.body,
        user_id: request.user.id,
      });

      return ok();
    } catch (error) {
      return clientError(error);
    }
  }
}

export { UpdateUserController };
