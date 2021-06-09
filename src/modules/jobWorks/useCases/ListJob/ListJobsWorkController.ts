import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { ListJobsWork } from './ListJobsWork';

class ListJobsWorkController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const listJobsWork = container.resolve(ListJobsWork);
    try {
      const jobs = await listJobsWork.execute(request.query);

      return ok(jobs);
    } catch (error) {
      return clientError(error);
    }
  }
}

export { ListJobsWorkController };
