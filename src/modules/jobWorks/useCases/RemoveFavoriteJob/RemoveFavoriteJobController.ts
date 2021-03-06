import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, noContent } from '@core/infra/HttpResponse';

import { RemoveFavoriteJob } from './RemoveFavoriteJob';

class RemoveFavoriteJobController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const removeFavoriteJob = container.resolve(RemoveFavoriteJob);
    try {
      await removeFavoriteJob.execute({
        job_id: request.params.id,
        user_id: request.user.id,
      });

      return noContent();
    } catch (error) {
      return clientError(error);
    }
  }
}

export { RemoveFavoriteJobController };
