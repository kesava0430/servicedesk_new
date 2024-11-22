import React from 'react';
import { format } from 'date-fns';
import { TicketHistory } from '../../types/ticket';

interface TicketHistoryProps {
  history: TicketHistory[];
}

export default function TicketHistoryComponent({ history }: TicketHistoryProps) {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {history.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== history.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                    <span className="text-white text-sm">
                      {event.user.name.charAt(0).toUpperCase()}
                    </span>
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {event.user.name}
                      </span>{' '}
                      changed {event.fieldName} from{' '}
                      <span className="font-medium">{event.oldValue || 'none'}</span> to{' '}
                      <span className="font-medium">{event.newValue}</span>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {format(new Date(event.createdAt), 'MMM d, yyyy HH:mm')}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}