import { User } from './user';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  assignedToId?: number;
  createdById: number;
  ticketId?: number;
  completionPercentage: number;
  estimatedHours: number;
  actualHours: number;
  taskType: TaskType;
  parentTaskId?: number;
  subtasks: Task[];
  watchers: User[];
  labels: string[];
  attachments: Attachment[];
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskType = 'feature' | 'bug' | 'maintenance' | 'documentation' | 'other';

export interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedToId?: number;
  createdById?: number;
  ticketId?: number;
  taskType?: TaskType;
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  overdue?: boolean;
  hasBlockers?: boolean;
}

export interface Attachment {
  id: number;
  filename: string;
  fileType: string;
  fileSize: number;
  uploadedAt: Date;
  uploadedBy: number;
  url: string;
}

export interface TaskHistory {
  id: number;
  taskId: number;
  userId: number;
  fieldName: string;
  oldValue?: string;
  newValue: string;
  changeType: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
  };
}