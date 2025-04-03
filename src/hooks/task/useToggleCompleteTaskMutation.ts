import { Task } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useToggleCompleteTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: Task) => {
      const updatedTask = { ...task, completed: !task.completed };
      return Promise.resolve(updatedTask);
    },
    onSuccess: updatedTask => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks = []) => {
        const updatedTasks = oldTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      toast.info(
        updatedTask.completed
          ? `Task marked as completed: "${updatedTask.title.substring(0, 20)}${
              updatedTask.title.length > 20 ? '...' : ''
            }"`
          : `Task marked as active: "${updatedTask.title.substring(0, 20)}${
              updatedTask.title.length > 20 ? '...' : ''
            }"`,
        {
          position: 'bottom-right',
        }
      );
    },
  });
}
