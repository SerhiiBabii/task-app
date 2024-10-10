import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Task, TaskList } from '../models/task';
import { TaskFilter } from '../models/filter';
import {
  getFilter,
  getTasks,
  saveFilter,
  saveTask,
  deleteTask,
  editTask,
  toggleComplete,
} from '../services';
import { FILTER_VALUES } from '../constants/filter';

interface TaskContextProps {
  tasks: TaskList;
  filter: string;
  createTask: (task: Task) => void;
  handleEditTask: (task: Task) => void;
  handleDeleteTask: (id: string) => void;
  handleChangeFilter: (filter: TaskFilter) => void;
  handleToggleComplete: (id: string) => void;
}

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext<TaskContextProps>({
  tasks: [] as TaskList,
  filter: 'all',
  createTask: (_task: Task) => {},
  handleEditTask: (_task: Task) => {},
  handleDeleteTask: (_id: string) => {},
  handleChangeFilter: (_filter: TaskFilter) => {},
  handleToggleComplete: (_id: string) => {},
});

function filterTasks(tasks: TaskList, filter: TaskFilter | null) {
  switch (filter) {
    case FILTER_VALUES.ALL:
      return tasks;
    case FILTER_VALUES.ACTIVE:
      return tasks.filter((task: Task) => !task.isCompleted);
    case FILTER_VALUES.COMPLETED:
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

  function handleEditTask(task: Task) {
    setTasks((prevState) => {
      const newState = [...prevState];
      const taskIndex = newState.findIndex((item) => item.id === task.id);

      newState[taskIndex] = task;

      return newState;
    });
    editTask(task);
  }

  function handleDeleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
    deleteTask(id);
  }

  function handleToggleComplete(id: string) {
    toggleComplete(id);
    setTasks(getFilteredTasks());
  }

  function handleChangeFilter(filter: TaskFilter) {
    setFilter(filter);
    setTasks(filterTasks(getTasks(), filter));
    saveFilter(filter);
  }

  const value = {
    tasks,
    filter,
    createTask,
    handleEditTask,
    handleDeleteTask,
    handleChangeFilter,
    handleToggleComplete,
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
