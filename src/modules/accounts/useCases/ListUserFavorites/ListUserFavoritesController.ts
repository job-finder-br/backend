import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { ListUserFavorites } from './ListUserFavorites';

class ListUserFavoritesController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const listUserFavorites = container.resolve(ListUserFavorites);

    try {
      const favorites = await listUserFavorites.execute(request.user.id);

      return ok(favorites);
    } catch (error) {
      return clientError(error);
    }
  }
}

export { ListUserFavoritesController };
