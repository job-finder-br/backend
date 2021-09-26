import { container } from 'tsyringe';

import { HttpResponse, BaseController, HttpRequest } from '@core/.';
import { clientError, noContent } from '@core/infra/HttpResponse';

import { DeleteAccount } from './DeleteAccount';

class DeleteAccountController implements BaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const deleteAccount = container.resolve(DeleteAccount);
    try {
      await deleteAccount.execute(request.user.id);

      return noContent();
    } catch (error) {
      return clientError(error);
    }
  }
}

export { DeleteAccountController };
