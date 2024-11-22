import { create } from 'zustand';
import { Task, TaskFilter } from '../types/task';
import * as api from '../api/client';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  filters: TaskFilter;
  fetchTasks: (filters?: TaskFilter) => Promise<void>;
  createTask: (taskData: Partial<Task>) => Promise<void>;
  updateTask: (id: number, taskData: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setFilters: (filters: TaskFilter) => void;
  clearError: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  filters: {},

  fetchTasks: async (filters?: TaskFilter) => {
    try {
      set({ isLoading: true, error: null });
      const tasks = await api.getTasks(filters || get().filters);
      set({ tasks, isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  createTask: async (taskData: Partial<Task>) => {
    try {
      set({ isLoading: true, error: null });
      const newTask = await api.createTask(taskData);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  updateTask: async (id: number, taskData: Partial<Task>) => {
    try {
      set({ isLoading: true, error: null });
      const updatedTask = await api.updateTask(id, taskData);
      set((state) => ({
        tasks: state.tasks.map((task) => 
          task.id === id ? updatedTask : task
        ),
        isLoading: false
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  deleteTask: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      await api.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  setFilters: (filters: TaskFilter) => {
    set({ filters });
  },

  clearError: () => set({ error: null })
}));