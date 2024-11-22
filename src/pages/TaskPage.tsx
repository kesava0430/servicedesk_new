import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTaskStore } from '../store/taskStore';
import TaskDetails from '../components/task/TaskDetails';
import TaskHistory from '../components/task/TaskHistory';
import SubtaskList from '../components/task/SubtaskList';
import AttachmentList from '../components/task/AttachmentList';
import { Task } from '../types/task';
import * as api from '../api/client';

export default function TaskPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const updateTask = useTaskStore((state) => state.updateTask);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.getTask(parseInt(id));
        setTask(response);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch task';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleTaskUpdate = async (updatedData: Partial<Task>) => {
    if (!task || !id) return;

    try {
      setError(null);
      const updatedTask = await updateTask(parseInt(id), updatedData);
      setTask(updatedTask);
      toast.success('Task updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        Loading task details...
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600">{error || 'Task not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/tasks')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Tasks
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Task Details</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          <TaskDetails
            task={task}
            onUpdate={handleTaskUpdate}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Subtasks</h2>
              <SubtaskList
                subtasks={task.subtasks}
                onUpdate={handleTaskUpdate}
              />
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Attachments</h2>
              <AttachmentList
                taskId={task.id}
                attachments={task.attachments}
              />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Task History</h2>
            <TaskHistory taskId={task.id} />
          </div>
        </div>
      </main>
    </div>
  );
}