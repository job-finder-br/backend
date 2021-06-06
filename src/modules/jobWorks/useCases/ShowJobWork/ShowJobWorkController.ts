import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { ShowJobWork } from './ShowJobWork';

class ShowJobWorkController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const showJobWork = container.resolve(ShowJobWork);
    try {
      const job = await showJobWork.execute(request.params.id);

      return ok(job);
    } catch (error) {
      return clientError(error);
    }
  }
}

export { ShowJobWorkController };
