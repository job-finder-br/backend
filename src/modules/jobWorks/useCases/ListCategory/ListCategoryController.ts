import { container } from 'tsyringe';

import { HttpResponse, BaseController } from '@core/.';
import { clientError, ok } from '@core/infra/HttpResponse';

import { ListCategory } from './ListCategory';

class ListCategoryController implements BaseController {
  async handle(): Promise<HttpResponse> {
    const listCategory = container.resolve(ListCategory);
    try {
      const jobs = await listCategory.execute();

      return ok(jobs);
    } catch (error) {
      return clientError(error);
    }
  }
}

export { ListCategoryController };
