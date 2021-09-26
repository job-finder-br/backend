import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { UpdateUserCurriculum } from './UpdateUserCurriculum';

class UpdateUserCurriculumController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const updateUserCurriculum = container.resolve(UpdateUserCurriculum);
    try {
      await updateUserCurriculum.execute({
        user_id: request.user.id,
        curriculum_file: request.file.filename,
      });

      return ok();
    } catch (error) {
      return clientError(error);
    }
  }
}

export { UpdateUserCurriculumController };
