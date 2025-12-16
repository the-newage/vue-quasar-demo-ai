import { http } from './http';
import type { User } from '@/types/models';

export const getProfile = async (): Promise<User> => {
  const { data } = await http.get('/user');
  return data;
};

export const updateProfile = async (profile: User): Promise<User> => {
  const { data } = await http.put('/user', profile);
  return data;
};
