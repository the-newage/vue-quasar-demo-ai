import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { getProfile, updateProfile } from '@/api/profile';
import type { User } from '@/types/models';

export const useProfileQuery = () => {
  const queryClient = useQueryClient();

  const query = useQuery<User>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data);
    },
  });

  return {
    query,
    mutation,
  };
};
