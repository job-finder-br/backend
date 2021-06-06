import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { UpdateUserAvatar } from './UpdateUserAvatar';

class UpdateUserAvatarController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const updateUserAvatar = container.resolve(UpdateUserAvatar);

    try {
      await updateUserAvatar.execute({
        user_id: request.params.id,
        avatar_file: request.file.filename,
      });

      return ok();
    } catch (error) {
      return clientError(error);
    }
  }
}

export { UpdateUserAvatarController };
