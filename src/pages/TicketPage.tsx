import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TicketDetails from '../components/ticket/TicketDetails';
import CommentList from '../components/ticket/CommentList';
import CommentForm from '../components/ticket/CommentForm';
import { useAuthStore } from '../store/authStore';
import * as api from '../api/client';
import { Ticket } from '../types/ticket';
import { User } from '../types/user';
import { Comment } from '../types/comment';

export default function TicketPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [agents, setAgents] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const [fetchedTicket, fetchedComments, fetchedAgents] = await Promise.all([
          api.getTicket(id),
          api.getTicketComments(id),
          api.getAgents()
        ]);
        setTicket(fetchedTicket);
        setComments(fetchedComments);
        setAgents(fetchedAgents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch ticket data');
        toast.error('Failed to load ticket data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleStatusChange = async (status: Ticket['status']) => {
    if (!ticket || !id) return;

    try {
      setError(null);
      const updatedTicket = await api.updateTicket(id, { ...ticket, status });
      setTicket(updatedTicket);
      toast.success('Ticket status updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update ticket status';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleAssigneeChange = async (userId: string) => {
    if (!ticket || !id) return;

    try {
      setError(null);
      const updatedTicket = await api.updateTicket(id, { 
        ...ticket, 
        assigned_to_id: parseInt(userId) 
      });
      setTicket(updatedTicket);
      toast.success('Ticket assignee updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update ticket assignee';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleCommentSubmit = async (data: { content: string }) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      setError(null);
      const newComment = await api.createComment(id, data.content);
      setComments(prev => [...prev, newComment]);
      toast.success('Comment added successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add comment';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        Loading ticket details...
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600">{error || 'Ticket not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Ticket Details</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          <TicketDetails
            ticket={ticket}
            onStatusChange={handleStatusChange}
            onAssigneeChange={handleAssigneeChange}
            availableAgents={agents}
          />

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Comments</h2>
            <div className="space-y-6">
              <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} />
              <CommentList comments={comments} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}