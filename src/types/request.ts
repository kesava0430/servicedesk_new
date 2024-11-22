import { User } from './user';

export interface Request {
  id: number;
  title: string;
  description: string;
  status: RequestStatus;
  priority: RequestPriority;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  createdBy: User;
  assignedTo?: User;
  customFields: CustomField[];
  attachments: Attachment[];
  history: RequestHistory[];
  comments: Comment[];
  slaStatus: SLAStatus;
  tags: string[];
}

export type RequestStatus = 'new' | 'in_progress' | 'pending' | 'resolved' | 'closed';
export type RequestPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface CustomField {
  id: number;
  name: string;
  value: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect';
  options?: string[];
}

export interface RequestHistory {
  id: number;
  requestId: number;
  userId: number;
  user: User;
  fieldName: string;
  oldValue?: string;
  newValue: string;
  changeType: 'update' | 'comment' | 'attachment' | 'assignment';
  timestamp: Date;
}

export interface SLAStatus {
  responseTime: {
    target: number;
    actual?: number;
    breached: boolean;
  };
  resolutionTime: {
    target: number;
    actual?: number;
    breached: boolean;
  };
}

export interface RequestFilter {
  status?: RequestStatus;
  priority?: RequestPriority;
  category?: string;
  assignedTo?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
  tags?: string[];
  slaBreached?: boolean;
}