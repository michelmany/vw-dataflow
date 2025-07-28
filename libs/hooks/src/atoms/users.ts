import { getUsers as getUsersService } from '@libs/services';
import { User } from '@libs/types';
import { atom } from 'jotai';

export const usersAtom = atom<User[]>([]);

// Async atom that fetches users and stores them
export const fetchUsersAtom = atom(
  null, // No initial value for write-only atom
  async (_get, set) => {
    try {
      const data = await getUsersService();
      set(usersAtom, data);
      set(usersLoadedAtom, true);
      return data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }
);

// Atom to track if users have been loaded
export const usersLoadedAtom = atom<boolean>(false);
