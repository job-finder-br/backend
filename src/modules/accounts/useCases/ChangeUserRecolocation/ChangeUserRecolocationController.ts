import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { ChangeUserRecolocation } from './ChangeUserRecolocation';

class ChangeUserRecolocationController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const changeUserRecolocation = container.resolve(ChangeUserRecolocation);
    try {
      const response = await changeUserRecolocation.execute(request.user.id);

      return ok(response);
    } catch (error) {
      return clientError(error);
    }
  }
}

export { ChangeUserRecolocationController };
