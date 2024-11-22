import { create } from 'zustand';
import * as api from '../api/client';

interface SLAMetrics {
  responseTime: number;
  resolutionTime: number;
  firstContactResolution: number;
  customerSatisfaction: number;
}

interface SLAState {
  metrics: SLAMetrics | null;
  isLoading: boolean;
  error: string | null;
  fetchMetrics: () => Promise<void>;
  acknowledgeBreaches: (breachIds: number[]) => Promise<void>;
  clearError: () => void;
}

export const useSLAStore = create<SLAState>((set) => ({
  metrics: null,
  isLoading: false,
  error: null,

  fetchMetrics: async () => {
    try {
      set({ isLoading: true, error: null });
      const metrics = await api.getSLAMetrics();
      set({ metrics, isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch SLA metrics';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  acknowledgeBreaches: async (breachIds: number[]) => {
    try {
      set({ isLoading: true, error: null });
      await Promise.all(
        breachIds.map((id) => api.acknowledgeSLABreach(id))
      );
      set({ isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to acknowledge SLA breaches';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  clearError: () => set({ error: null })
}));