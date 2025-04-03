'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface AddTaskFormProps {
  addTask: (title: string) => void;
}
export function AddTaskForm({ addTask }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle('');
    }
  };

  return (
    <div>
      <motion.h2
        className="text-lg font-medium text-gray-800 mb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Create a New Task
      </motion.h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <motion.div
          className="relative flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
            placeholder="What needs to be done?"
            className={`w-full px-4 py-2 pr-10 border ${
              isInputActive ? 'border-blue-400' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
          />
          <AnimatePresence>
            {title && (
              <motion.button
                type="button"
                onClick={() => setTitle('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear input"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.button
          type="submit"
          disabled={!title.trim()}
          className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            title.trim()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={title.trim() ? { scale: 1.05 } : {}}
          whileTap={title.trim() ? { scale: 0.95 } : {}}
        >
          Add Task
        </motion.button>
      </form>
    </div>
  );
}
