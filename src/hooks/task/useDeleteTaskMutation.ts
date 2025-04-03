import { Task } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve(id);
    },
    onSuccess: id => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks = []) => {
        const updatedTasks = oldTasks.filter(task => task.id !== id);
        // Persist to localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      toast.success(`Task deleted id: ${id}`, {
        position: 'bottom-right',
      });
    },
  });
}
