import React from 'react';
import { format } from 'date-fns';
import { Request } from '../../types/request';
import RequestHistory from './RequestHistory';
import RequestComments from './RequestComments';
import RequestAttachments from './RequestAttachments';
import RequestCustomFields from './RequestCustomFields';
import SLAIndicator from './SLAIndicator';

interface RequestDetailsProps {
  request: Request;
  onUpdate: (data: Partial<Request>) => Promise<void>;
  onComment: (content: string) => Promise<void>;
  onAttachment: (file: File) => Promise<void>;
}

export default function RequestDetails({
  request,
  onUpdate,
  onComment,
  onAttachment
}: RequestDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{request.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Created by {request.createdBy.name} on {format(new Date(request.createdAt), 'PPP')}
            </p>
          </div>
          <SLAIndicator slaStatus={request.slaStatus} />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={request.status}
              onChange={(e) => onUpdate({ status: e.target.value as Request['status'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              value={request.priority}
              onChange={(e) => onUpdate({ priority: e.target.value as Request['priority'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={request.category}
              onChange={(e) => onUpdate({ category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="network">Network</option>
              <option value="access">Access</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <div className="mt-1 prose max-w-none">
            {request.description}
          </div>
        </div>
      </div>

      {/* Custom Fields */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h2>
        <RequestCustomFields
          fields={request.customFields}
          onUpdate={(fields) => onUpdate({ customFields: fields })}
        />
      </div>

      {/* Attachments */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Attachments</h2>
        <RequestAttachments
          attachments={request.attachments}
          onUpload={onAttachment}
        />
      </div>

      {/* Comments */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Comments</h2>
        <RequestComments
          comments={request.comments}
          onAddComment={onComment}
        />
      </div>

      {/* History */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">History</h2>
        <RequestHistory history={request.history} />
      </div>
    </div>
  );
}