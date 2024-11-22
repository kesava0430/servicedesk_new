import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import TaskMetrics from './TaskMetrics';
import TicketMetrics from './TicketMetrics';
import SLAStatus from './SLAStatus';
import RecentActivities from './RecentActivities';
import TeamWorkload from './TeamWorkload';

export default function GlobalDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Open Tickets</h3>
          <TicketMetrics />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
          <TaskMetrics />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">SLA Status</h3>
          <SLAStatus />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Team Workload</h3>
          <TeamWorkload />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
          <RecentActivities />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/tickets/new')}
          className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Create New Ticket
        </button>
        <button
          onClick={() => navigate('/tasks/new')}
          className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Create New Task
        </button>
        <button
          onClick={() => navigate('/reports')}
          className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          View Reports
        </button>
      </div>
    </div>
  );
}