export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  ticketId: number;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}