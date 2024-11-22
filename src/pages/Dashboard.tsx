import React, { useState, useEffect } from 'react';
import TicketList from '../components/TicketList';
import CreateTicketForm from '../components/CreateTicketForm';
import TicketFilters from '../components/ticket/TicketFilters';
import { Ticket } from '../types/ticket';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import * as api from '../api/client';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const fetchTickets = async (filters?: {
    status?: string;
    priority?: string;
    search?: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTickets = await api.getTickets(filters);
      setTickets(fetchedTickets);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tickets';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (ticketData: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
  }) => {
    try {
      setError(null);
      const newTicket = await api.createTicket(ticketData);
      setTickets(prev => [...prev, newTicket]);
      toast.success('Ticket created successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create ticket';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleTicketClick = (ticket: Ticket) => {
    navigate(`/ticket/${ticket.id}`);
  };

  const handleFilterChange = (filters: {
    status?: string;
    priority?: string;
    search?: string;
  }) => {
    fetchTickets(filters);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Service Desk</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{user?.email}</span>
            <button
              onClick={() => {
                logout();
                toast.info('Logged out successfully');
              }}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <TicketFilters onFilterChange={handleFilterChange} />
          
          {error && (
            <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Ticket</h2>
                  <CreateTicketForm onSubmit={handleCreateTicket} />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Tickets</h2>
                  {isLoading ? (
                    <div className="text-center py-4">Loading tickets...</div>
                  ) : (
                    <TicketList tickets={tickets} onTicketClick={handleTicketClick} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}