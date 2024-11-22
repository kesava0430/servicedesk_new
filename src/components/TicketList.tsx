import React from 'react';
import { format } from 'date-fns';
import { Ticket } from '../types/ticket';

interface TicketListProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

export default function TicketList({ tickets, onTicketClick }: TicketListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <tr 
              key={ticket.id}
              onClick={() => onTicketClick(ticket)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : ''}
                  ${ticket.status === 'resolved' ? 'bg-green-100 text-green-800' : ''}
                  ${ticket.status === 'closed' ? 'bg-gray-100 text-gray-800' : ''}
                `}>
                  {ticket.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${ticket.priority === 'high' ? 'bg-red-100 text-red-800' : ''}
                  ${ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${ticket.priority === 'low' ? 'bg-green-100 text-green-800' : ''}
                `}>
                  {ticket.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(ticket.createdAt, 'MMM d, yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}