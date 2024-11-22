import React from 'react';
import { format } from 'date-fns';

interface Activity {
  id: number;
  type: 'ticket' | 'task' | 'comment';
  action: string;
  user: string;
  timestamp: Date;
  details: string;
}

export default function RecentActivities() {
  const activities: Activity[] = [
    {
      id: 1,
      type: 'ticket',
      action: 'created',
      user: 'John Doe',
      timestamp: new Date(),
      details: 'New hardware request'
    },
    // Add more activities as needed
  ];

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                    activity.type === 'ticket' ? 'bg-blue-500' :
                    activity.type === 'task' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`}>
                    {/* Add icons based on activity type */}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {activity.user}
                      </span>{' '}
                      {activity.action}{' '}
                      <span className="font-medium text-gray-900">
                        {activity.details}
                      </span>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {format(activity.timestamp, 'MMM d, yyyy HH:mm')}
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