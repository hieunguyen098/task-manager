import { Task } from '@/types/task';

export const getTasks = async (): Promise<Task[]> => {
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    return JSON.parse(storedTasks);
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  const tasks = await response.json();

  localStorage.setItem('tasks', JSON.stringify(tasks));

  return tasks;
};
