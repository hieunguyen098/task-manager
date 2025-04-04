import { Task } from '@/types/task';
import React from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface TaskItemProps {
  task: Task;
  toggleComplete: (task: Task) => void;
  deleteTask: (id: number) => void;
}

export function TaskItem({ task, toggleComplete, deleteTask }: TaskItemProps) {
  return (
    <motion.div
      className="p-4 flex items-center justify-between hover:bg-blue-50 group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <div className="flex items-center">
        <motion.div className="relative" whileTap={{ scale: 0.9 }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task)}
            className="h-5 w-5 text-blue-600 rounded-full border-gray-300 focus:ring-blue-500 transition-all"
          />
          <AnimatePresence>
            {task.completed && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500 transform translate-x-1/2 -translate-y-1/2"
              ></motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.span
          className={`ml-3 transition-all ${
            task.completed ? 'line-through text-gray-400 font-normal' : 'text-gray-700 font-medium'
          }`}
          animate={{
            opacity: task.completed ? 0.6 : 1,
            textDecoration: task.completed ? 'line-through' : 'none',
          }}
          transition={{ duration: 0.3 }}
        >
          {task.title}
        </motion.span>
      </div>
      <motion.button
        onClick={() => deleteTask(task.id)}
        className="text-gray-400 opacity-60 group-hover:opacity-100 hover:text-red-500 focus:outline-none transition-all"
        aria-label="Delete task"
        whileHover={{ scale: 1.1, color: '#EF4444' }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}
