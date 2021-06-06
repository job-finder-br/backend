import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { created, conflict } from '@core/infra/HttpResponse';

import { DeleteJobWork } from './DeleteJobWork';

class DeleteJobWorkController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const deleteJobWork = container.resolve(DeleteJobWork);

    try {
      await deleteJobWork.execute({
        job_id: request.params.id,
        user_id: request.user.id,
      });

      return created();
    } catch (error) {
      return conflict(error);
    }
  }
}

export { DeleteJobWorkController };
