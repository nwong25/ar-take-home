import { ReadonlyRepository } from '@/app/services/repositoryService';
import { format } from 'date-fns'

const convertRepositoryDataForRows = (repositories: ReadonlyRepository[]) => {
  return repositories.map((repository) => {
    const { id, full_name, created_at, updated_at, pushed_at } = repository;
    return {
      id,
      full_name,
      created: created_at && format(created_at, 'MM/dd/yyyy'),
      updated: updated_at && format(updated_at, 'MM/dd/yyyy'),
      pushed: pushed_at && format(pushed_at, 'MM/dd/yyyy')
    };
  });
};

export default convertRepositoryDataForRows;