import { STORAGE_KEY } from '../constants/local-storage';
import { Task } from '../models/task';

export function getTasks() {
  const storageData = localStorage.getItem(STORAGE_KEY);
  const { tasks } = storageData ? JSON.parse(storageData) : { tasks: [] };

  return tasks ?? [];
}

export function saveTask(taskData: Task) {
  const storageData = localStorage.getItem(STORAGE_KEY);
  const prevState = storageData ? JSON.parse(storageData) : {};

  const nextState = {
    ...prevState,
    tasks: [taskData, ...(prevState.tasks ?? [])],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

export function editTask(taskData: Task) {
  const storageData = localStorage.getItem(STORAGE_KEY);
  const prevState = storageData ? JSON.parse(storageData) : {};

  const newState = [...(prevState.tasks ?? [])];
  const taskIndex = newState.findIndex((item) => item.id === taskData.id);

  newState[taskIndex] = taskData;

  const nextState = {
    ...prevState,
    tasks: newState,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

export function changeTaskCompletion(id: string) {
  const prevState = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '');
  const tasks =
    prevState?.tasks?.map((task: Task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ) ?? [];
  const nextState = {
    ...prevState,
    tasks,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

export function deleteTask(id: string) {
  const prevState = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '');

  const nextState = {
    ...prevState,
    tasks: prevState.tasks.filter((task: Task) => task.id !== id),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}
