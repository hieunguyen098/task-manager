'use client';
import { useGetTasksQuery } from '@/hooks/task/useGetTasksQuery';
import { Task } from '@/types/task';
import { TaskList } from './TaskList';
import { useAddTaskMutation } from '@/hooks/task/useAddTaskMutation';
import { AddTaskForm } from './AddTaskForm';
import { motion } from 'motion/react';
import { useToggleCompleteTaskMutation } from '@/hooks/task/useToggleCompleteTaskMutation';
import { useDeleteTaskMutation } from '@/hooks/task/useDeleteTaskMutation';

export function TaskManangementSystem() {
  const { data: tasks = [], isLoading, error } = useGetTasksQuery();

  const { mutate: addTaskMutate } = useAddTaskMutation();

  const { mutate: toggleCompleteMutation } = useToggleCompleteTaskMutation();

  const { mutate: deleteTaskMutation } = useDeleteTaskMutation();

  const addTask = (title: string) => {
    addTaskMutate(title);
  };

  const toggleComplete = (task: Task) => {
    toggleCompleteMutation(task);
  };

  const deleteTask = (id: number) => {
    deleteTaskMutation(id);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-lg mx-auto text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl font-bold text-gray-800 mb-3"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4, type: 'spring' }}
          >
            Task Manager
          </motion.h1>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Organize your day and boost your productivity
          </motion.p>
        </motion.div>
        <motion.div
          className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-5 bg-white border-b border-gray-100">
            <AddTaskForm addTask={addTask} />
          </div>
          <TaskList
            tasks={tasks}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            isLoading={isLoading}
            error={error as Error | null}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
