import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, created } from '@core/infra/HttpResponse';

import { FavoriteJob } from './FavoriteJob';

class FavoriteJobController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const favoriteJob = container.resolve(FavoriteJob);
    try {
      await favoriteJob.execute(request.body);

      return created();
    } catch (error) {
      return clientError(error);
    }
  }
}

export { FavoriteJobController };
