import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Task, TaskList } from '../models/task';
import {
  getTasks,
  saveTask,
  deleteTask as deleteTaskItem,
  editTask as editTaskItem,
  changeTaskCompletion,
} from '../services';

interface TaskContextProps {
  tasks: TaskList;
  createTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext<TaskContextProps>({
  tasks: [] as TaskList,
  createTask: (_task: Task) => {},
  editTask: (_task: Task) => {},
  deleteTask: (_id: string) => {},
  toggleComplete: (_id: string) => {},
});

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskList>(getTasks());

  function createTask(task: Task) {
    setTasks([task, ...tasks]);
    saveTask(task);
  }

  function editTask(task: Task) {
    setTasks((prevState) => {
      const newState = [...prevState];
      const taskIndex = newState.findIndex((item) => item.id === task.id);

      newState[taskIndex] = task;

      return newState;
    });
    editTaskItem(task);
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
    deleteTaskItem(id);
  }

  function toggleComplete(id: string) {
    changeTaskCompletion(id);
    setTasks(getTasks());
  }

  const value = {
    tasks,
    createTask,
    editTask,
    deleteTask,
    toggleComplete,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }

  return context;
};
