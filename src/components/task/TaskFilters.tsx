import React from 'react';
import { TaskFilter, TaskStatus, TaskPriority, TaskType } from '../../types/task';

interface TaskFiltersProps {
  onFilterChange: (filters: TaskFilter) => void;
}

export default function TaskFilters({ onFilterChange }: TaskFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            onChange={(e) => onFilterChange({ status: e.target.value as TaskStatus })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            onChange={(e) => onFilterChange({ priority: e.target.value as TaskPriority })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            onChange={(e) => onFilterChange({ taskType: e.target.value as TaskType })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="feature">Feature</option>
            <option value="bug">Bug</option>
            <option value="maintenance">Maintenance</option>
            <option value="documentation">Documentation</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              onChange={(e) => onFilterChange({
                dateRange: {
                  start: new Date(e.target.value),
                  end: new Date()
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              type="date"
              onChange={(e) => onFilterChange({
                dateRange: {
                  start: new Date(),
                  end: new Date(e.target.value)
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={(e) => onFilterChange({ overdue: e.target.checked })}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Overdue</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={(e) => onFilterChange({ hasBlockers: e.target.checked })}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Has Blockers</span>
          </label>
        </div>
      </div>
    </div>
  );
}