import { getTasks } from '@/services/task';
import { useQuery } from '@tanstack/react-query';

export function useGetTasksQuery() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
}
