import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { ListUserJobs } from './ListUserJobs';

class ListUserJobsController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const listUserJobs = container.resolve(ListUserJobs);

    try {
      const jobs = await listUserJobs.execute(request.user.id);

      return ok(jobs);
    } catch (error) {
      return clientError(error);
    }
  }
}

export { ListUserJobsController };
