import { User } from '../User';
import { UserRepository } from '../UserRepository';
import { createUser, updateUser } from './';

let userRepository = {} as UserRepository;
describe('User use cases', () => {
  it('creates user', async () => {
    //Given
    userRepository.persist = jest.fn(async (user: User) => 1);
    const user = new User({
      avatarUrl: 'http://avatar.com.br',
      name: 'Jonathan Nagayoshi',
    });

    //When
    const userId = await createUser(user, { repository: userRepository });
    //Then
    expect(userId).toBe(1);
    expect(userRepository.persist).toBeCalledWith(user);
  });

  it('updates user', async () => {
    //Given
    const user = new User({
      avatarUrl: 'http://avatar.com.br',
      name: 'Jonathan Nagayoshi',
    });
    const usersMemory: User[] = [];
    userRepository.persist = jest.fn(async (user: User) => {
      user.id = 1;
      usersMemory.push(user);
      return user.id;
    });

    userRepository.update = jest.fn(async (user: User) => {
      const existingUser = usersMemory.find((u) => u.id === user.id);
      existingUser!.name = user.name;
      existingUser!.avatarUrl = user.avatarUrl;
      return existingUser!;
    });
    //When
    const userId = await createUser(user, { repository: userRepository });
    user.name = 'Joselito';
    user.avatarUrl = 'http://anotheravatar.com';
    await updateUser(user, { repository: userRepository });
    //Then
    expect(userRepository.update).toBeCalledWith(user);
    expect(usersMemory[0]).toEqual({
      _id: 1,
      _name: 'Joselito',
      _avatarUrl: 'http://anotheravatar.com',
    });
  });
});
