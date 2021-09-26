import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { created, clientError } from '@core/infra/HttpResponse';

import { UpdateJobWork } from './UpdateJobWork';

class UpdateJobWorkController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const updateJobWork = container.resolve(UpdateJobWork);

    try {
      await updateJobWork.execute({
        data: request.body,
        user_id: request.user.id,
        job_id: request.params.id,
      });

      return created();
    } catch (error) {
      return clientError(error);
    }
  }
}

export { UpdateJobWorkController };
