import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Task, TaskList } from '../models/task';
import { TaskFilter } from '../models/filter';
import {
  getFilter,
  getTasks,
  saveFilter,
  saveTask,
  deleteTask as deleteTaskItem,
  editTask as editTaskItem,
  changeTaskCompletion,
} from '../services';
import { FILTER_VALUES } from '../constants/filter';

interface TaskContextProps {
  tasks: TaskList;
  filter: string;
  createTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  changeFilter: (filter: TaskFilter) => void;
  toggleComplete: (id: string) => void;
}

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext<TaskContextProps>({
  tasks: [] as TaskList,
  filter: 'all',
  createTask: (_task: Task) => {},
  editTask: (_task: Task) => {},
  deleteTask: (_id: string) => {},
  changeFilter: (_filter: TaskFilter) => {},
  toggleComplete: (_id: string) => {},
});

function filterTasks(tasks: TaskList, filter: TaskFilter | null) {
  switch (filter) {
    case FILTER_VALUES.all:
      return tasks;
    case FILTER_VALUES.active:
      return tasks.filter((task: Task) => !task.isCompleted);
    case FILTER_VALUES.completed:
      return tasks.filter((task: Task) => task.isCompleted);
    default:
      return tasks;
  }
}

function getFilteredTasks() {
  return filterTasks(getTasks(), getFilter());
}

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskList>(getFilteredTasks);
  const [filter, setFilter] = useState<TaskFilter>(getFilter);

  function createTask(task: Task) {
    const allTasks = [task, ...tasks];

    setTasks(filterTasks(allTasks, filter));
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
    setTasks(getFilteredTasks());
  }

  function changeFilter(filter: TaskFilter) {
    setFilter(filter);
    setTasks(filterTasks(getTasks(), filter));
    saveFilter(filter);
  }

  const value = {
    tasks,
    filter,
    createTask,
    editTask,
    deleteTask,
    changeFilter,
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
