import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, created } from '@core/infra/HttpResponse';

import { FavoriteJob } from './FavoriteJob';

class FavoriteJobController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const favoriteJob = container.resolve(FavoriteJob);
    try {
      await favoriteJob.execute({
        job_id: request.params.id,
        user_id: request.user.id,
      });

      return created();
    } catch (error) {
      return clientError(error);
    }
  }
}

export { FavoriteJobController };
