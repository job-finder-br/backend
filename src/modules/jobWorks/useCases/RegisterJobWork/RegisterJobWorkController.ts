import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { created, clientError } from '@core/infra/HttpResponse';

import { RegisterJobWork } from './RegisterJobWork';

class RegisterJobWorkController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const registerJobWork = container.resolve(RegisterJobWork);

    try {
      await registerJobWork.execute({
        ...request.body,
        user_id: request.user.id,
      });

      return created();
    } catch (error) {
      return clientError(error);
    }
  }
}

export { RegisterJobWorkController };
