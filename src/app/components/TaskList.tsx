import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';
import { AnimatePresence, motion } from 'motion/react';

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (task: Task) => void;
  deleteTask: (id: number) => void;
  isLoading: boolean;
  error: Error | null;
}

export function TaskList({ tasks, toggleComplete, deleteTask, isLoading, error }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <motion.div
          className="rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        ></motion.div>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading your tasks...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-red-500 font-medium mb-1">Error Loading Tasks</p>
        <p className="text-gray-500 text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between p-4 bg-gray-50 border-b border-gray-100">
        <h2 className="font-medium text-gray-700">My Tasks</h2>
        <motion.span
          className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          key={tasks.length}
        >
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </motion.span>
      </div>

      <div className="divide-y divide-gray-100">
        <AnimatePresence>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
              />
            ))
          ) : (
            <motion.div
              className="p-8 text-center"
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </motion.div>
              <motion.p
                className="text-gray-600 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                No tasks available
              </motion.p>
              <motion.p
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Add a new task to get started
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
