import { ChangeUserPasswordController } from '@modules/accounts/useCases/ChangeUserPassword';
import { ListUserController } from '@modules/accounts/useCases/ListUser';
import { RegisterUserController } from '@modules/accounts/useCases/RegisterUser';
import { ShowUserController } from '@modules/accounts/useCases/ShowUser/ShowUserController';
import { UpdateUserController } from '@modules/accounts/useCases/UpdateUser';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/UpdateUserAvatar/';

const registerUserController = new RegisterUserController();
const listUserController = new ListUserController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();
const changeUserPasswordController = new ChangeUserPasswordController();
const updateUserAvatarController = new UpdateUserAvatarController();

export {
  registerUserController,
  listUserController,
  showUserController,
  updateUserController,
  changeUserPasswordController,
  updateUserAvatarController,
};
