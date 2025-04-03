import { Task } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useAddTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => {
      const newTask: Task = {
        id: Date.now(),
        title,
        completed: false,
        userId: 1,
      };

      return Promise.resolve(newTask);
    },
    onSuccess: newTask => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks = []) => {
        const updatedTasks = [...oldTasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      toast.success('Task added successfully!', {
        position: 'bottom-right',
      });
    },
  });
}
