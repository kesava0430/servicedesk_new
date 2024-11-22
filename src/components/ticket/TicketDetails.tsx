import React from 'react';
import { format } from 'date-fns';
import { Ticket } from '../../types/ticket';
import { User } from '../../types/user';

interface TicketDetailsProps {
  ticket: Ticket;
  onStatusChange: (status: Ticket['status']) => void;
  onAssigneeChange: (userId: string) => void;
  availableAgents: User[];
}

export default function TicketDetails({
  ticket,
  onStatusChange,
  onAssigneeChange,
  availableAgents,
}: TicketDetailsProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{ticket.title}</h2>
        <div className="mt-2 flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Created on {format(ticket.createdAt, 'MMM d, yyyy')}
          </span>
          <span className="text-sm text-gray-500">
            by {ticket.createdBy}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Description</h3>
          <p className="mt-2 text-gray-600">{ticket.description}</p>
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={ticket.status}
              onChange={(e) => onStatusChange(e.target.value as Ticket['status'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned To</label>
            <select
              value={ticket.assignedTo || ''}
              onChange={(e) => onAssigneeChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Unassigned</option>
              {availableAgents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}