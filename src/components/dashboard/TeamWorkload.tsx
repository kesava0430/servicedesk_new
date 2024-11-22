import React from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  activeTickets: number;
  activeTasks: number;
  utilization: number;
}

export default function TeamWorkload() {
  const team: TeamMember[] = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Support Agent',
      activeTickets: 5,
      activeTasks: 3,
      utilization: 85
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Technical Lead',
      activeTickets: 3,
      activeTasks: 7,
      utilization: 92
    },
    // Add more team members as needed
  ];

  return (
    <div className="space-y-4">
      {team.map((member) => (
        <div key={member.id} className="border-b pb-4 last:border-b-0">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-medium">{member.name}</h4>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
            <div className="text-right text-sm">
              <p>Tickets: {member.activeTickets}</p>
              <p>Tasks: {member.activeTasks}</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                member.utilization > 90
                  ? 'bg-red-600'
                  : member.utilization > 75
                  ? 'bg-yellow-600'
                  : 'bg-green-600'
              }`}
              style={{ width: `${member.utilization}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Utilization: {member.utilization}%
          </p>
        </div>
      ))}
    </div>
  );
}