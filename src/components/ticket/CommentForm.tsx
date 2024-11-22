import React from 'react';
import { useForm } from 'react-hook-form';

interface CommentFormProps {
  onSubmit: (data: { content: string }) => Promise<void>;
  isSubmitting?: boolean;
}

interface CommentFormData {
  content: string;
}

export default function CommentForm({ onSubmit, isSubmitting }: CommentFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormData>();

  const handleFormSubmit = async (data: CommentFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Add a comment
        </label>
        <textarea
          id="content"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Type your comment here..."
          {...register('content', { required: 'Comment is required' })}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  );
}