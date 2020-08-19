import { User } from './User';

export interface UserRepository {
  persist(user: User): Promise<number>;
  getById(id: number): Promise<User>;
  list(): Promise<User[]>;
  delete(id: number): Promise<User>;
  update(user: User): Promise<User>;
}
