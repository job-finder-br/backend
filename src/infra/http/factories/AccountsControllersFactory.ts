import { ChangeUserPasswordController } from '@modules/accounts/useCases/ChangeUserPassword';
import { ListUserController } from '@modules/accounts/useCases/ListUser';
import { RegisterUserController } from '@modules/accounts/useCases/RegisterUser';
import { ShowUserController } from '@modules/accounts/useCases/ShowUser/ShowUserController';
import { UpdateUserController } from '@modules/accounts/useCases/UpdateUser';

const registerUserController = new RegisterUserController();
const listUserController = new ListUserController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();
const changeUserPasswordController = new ChangeUserPasswordController();

export {
  registerUserController,
  listUserController,
  showUserController,
  updateUserController,
  changeUserPasswordController,
};
