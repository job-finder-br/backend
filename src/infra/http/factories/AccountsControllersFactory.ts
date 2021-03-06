import { ChangeUserPasswordController } from '@modules/accounts/useCases/ChangeUserPassword';
import { ChangeUserRecolocationController } from '@modules/accounts/useCases/ChangeUserRecolocation';
import { DeleteAccountController } from '@modules/accounts/useCases/DeleteAccount';
import { ListUserController } from '@modules/accounts/useCases/ListUser';
import { ListUserFavoritesController } from '@modules/accounts/useCases/ListUserFavorites';
import { ListUserJobsController } from '@modules/accounts/useCases/ListUserJobs';
import { ListUserRecolocationController } from '@modules/accounts/useCases/ListUserRecolocation';
import { RegisterUserController } from '@modules/accounts/useCases/RegisterUser';
import { ShowUserController } from '@modules/accounts/useCases/ShowUser/ShowUserController';
import { UpdateUserController } from '@modules/accounts/useCases/UpdateUser';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/UpdateUserAvatar/';
import { UpdateUserCurriculumController } from '@modules/accounts/useCases/UpdateUserCurriculum';

const registerUserController = new RegisterUserController();
const listUserController = new ListUserController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();
const changeUserPasswordController = new ChangeUserPasswordController();
const updateUserAvatarController = new UpdateUserAvatarController();
const deleteAccountController = new DeleteAccountController();
const changeUserRecolocationController = new ChangeUserRecolocationController();
const listUserRecolocationController = new ListUserRecolocationController();
const listUserFavoritesController = new ListUserFavoritesController();
const listUserJobsController = new ListUserJobsController();
const updateUserCurriculumController = new UpdateUserCurriculumController();

export {
  registerUserController,
  listUserController,
  showUserController,
  updateUserController,
  changeUserPasswordController,
  updateUserAvatarController,
  deleteAccountController,
  changeUserRecolocationController,
  listUserRecolocationController,
  listUserFavoritesController,
  listUserJobsController,
  updateUserCurriculumController,
};
