import { DeleteJobWorkController } from '@modules/jobWorks/useCases/DeleteJobWork';
import { FavoriteJobController } from '@modules/jobWorks/useCases/FavoriteJob';
import { ListJobsWorkController } from '@modules/jobWorks/useCases/ListJob';
import { RegisterJobWorkController } from '@modules/jobWorks/useCases/RegisterJobWork';
import { RemoveFavoriteJobController } from '@modules/jobWorks/useCases/RemoveFavoriteJob';
import { ShowJobWorkController } from '@modules/jobWorks/useCases/ShowJobWork';
import { UpdateJobWorkController } from '@modules/jobWorks/useCases/UpdateJobWork';

const registerJobWorkController = new RegisterJobWorkController();
const listJobsWorkController = new ListJobsWorkController();
const favoriteJobController = new FavoriteJobController();
const removeFavoriteJobController = new RemoveFavoriteJobController();
const showJobWorkController = new ShowJobWorkController();
const updateJobWorkController = new UpdateJobWorkController();
const deleteJobWorkController = new DeleteJobWorkController();

export {
  registerJobWorkController,
  listJobsWorkController,
  favoriteJobController,
  removeFavoriteJobController,
  showJobWorkController,
  updateJobWorkController,
  deleteJobWorkController,
};
