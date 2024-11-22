import React from 'react';
import { format } from 'date-fns';
import { Task } from '../../types/task';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function TaskList({ tasks, onTaskClick }: TaskListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr 
              key={task.id}
              onClick={() => onTaskClick(task)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {task.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {task.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${task.status === 'todo' ? 'bg-gray-100 text-gray-800' : ''}
                  ${task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : ''}
                  ${task.status === 'review' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${task.status === 'done' ? 'bg-green-100 text-green-800' : ''}
                  ${task.status === 'blocked' ? 'bg-red-100 text-red-800' : ''}
                `}>
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${task.priority === 'urgent' ? 'bg-red-100 text-red-800' : ''}
                  ${task.priority === 'high' ? 'bg-orange-100 text-orange-800' : ''}
                  ${task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${task.priority === 'low' ? 'bg-green-100 text-green-800' : ''}
                `}>
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${task.completionPercentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{task.completionPercentage}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}