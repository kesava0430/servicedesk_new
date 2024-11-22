export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  createdById: number;
  assignedToId?: number;
  history?: TicketHistory[];
}

export interface TicketHistory {
  id: number;
  ticketId: number;
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

export interface TicketFilter {
  status?: string;
  priority?: string;
  search?: string;
  assignedToId?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
}