import { create } from 'zustand';
import { Request, RequestFilter } from '../types/request';
import * as api from '../api/client';
import { toast } from 'react-toastify';

interface RequestState {
  requests: Request[];
  selectedRequest: Request | null;
  isLoading: boolean;
  error: string | null;
  filters: RequestFilter;
  fetchRequests: (filters?: RequestFilter) => Promise<void>;
  fetchRequestById: (id: number) => Promise<void>;
  createRequest: (data: Partial<Request>) => Promise<void>;
  updateRequest: (id: number, data: Partial<Request>) => Promise<void>;
  addComment: (id: number, content: string) => Promise<void>;
  uploadAttachment: (id: number, file: File) => Promise<void>;
  setFilters: (filters: RequestFilter) => void;
  clearError: () => void;
}

export const useRequestStore = create<RequestState>((set, get) => ({
  requests: [],
  selectedRequest: null,
  isLoading: false,
  error: null,
  filters: {},

  fetchRequests: async (filters?: RequestFilter) => {
    try {
      set({ isLoading: true, error: null });
      const requests = await api.getRequests(filters || get().filters);
      set({ requests, isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch requests';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  fetchRequestById: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      const request = await api.getRequest(id);
      set({ selectedRequest: request, isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch request';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  createRequest: async (data: Partial<Request>) => {
    try {
      set({ isLoading: true, error: null });
      const newRequest = await api.createRequest(data);
      set((state) => ({
        requests: [...state.requests, newRequest],
        isLoading: false
      }));
      toast.success('Request created successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create request';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  updateRequest: async (id: number, data: Partial<Request>) => {
    try {
      set({ isLoading: true, error: null });
      const updatedRequest = await api.updateRequest(id, data);
      set((state) => ({
        requests: state.requests.map((req) => 
          req.id === id ? updatedRequest : req
        ),
        selectedRequest: updatedRequest,
        isLoading: false
      }));
      toast.success('Request updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update request';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  addComment: async (id: number, content: string) => {
    try {
      set({ isLoading: true, error: null });
      const updatedRequest = await api.addComment(id, content);
      set((state) => ({
        requests: state.requests.map((req) => 
          req.id === id ? updatedRequest : req
        ),
        selectedRequest: updatedRequest,
        isLoading: false
      }));
      toast.success('Comment added successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add comment';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  uploadAttachment: async (id: number, file: File) => {
    try {
      set({ isLoading: true, error: null });
      const updatedRequest = await api.uploadAttachment(id, file);
      set((state) => ({
        requests: state.requests.map((req) => 
          req.id === id ? updatedRequest : req
        ),
        selectedRequest: updatedRequest,
        isLoading: false
      }));
      toast.success('Attachment uploaded successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload attachment';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  setFilters: (filters: RequestFilter) => {
    set({ filters });
    get().fetchRequests(filters);
  },

  clearError: () => set({ error: null })
}));