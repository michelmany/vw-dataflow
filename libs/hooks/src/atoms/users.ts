import {atom} from 'jotai';
import {User} from '@libs/types';

export const usersAtom = atom<User[]>([]);
