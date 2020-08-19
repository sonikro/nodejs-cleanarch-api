import { User } from '../User';
import { UserRepository } from '../UserRepository';

export const createUser = (
  user: User,
  { repository }: { repository: UserRepository },
) => {
  return repository.persist(user);
};

export const deleteUser = (
  user: User,
  { repository }: { repository: UserRepository },
) => {
  if (!user.id) {
    throw new Error(`Can not delete User with no ID`);
  }
  return repository.delete(user.id!);
};

export const listUsers = ({ repository }: { repository: UserRepository }) => {
  return repository.list();
};

export const updateUser = (
  user: User,
  { repository }: { repository: UserRepository },
) => {
  return repository.update(user);
};

export const getUserById = (
  id: number,
  { repository }: { repository: UserRepository },
) => {
  return repository.getById(id);
};
