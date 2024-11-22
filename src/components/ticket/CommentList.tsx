import React from 'react';
import { format } from 'date-fns';
import { Comment } from '../../types/comment';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-900">{comment.user.name}</p>
              <p className="text-sm text-gray-500">{format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}</p>
            </div>
          </div>
          <p className="mt-2 text-gray-700">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}