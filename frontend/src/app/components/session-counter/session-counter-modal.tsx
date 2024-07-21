import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError, SessionCounter, SessionCountersService } from '@api';
import { useModalContext } from '@app/context/modal/modal-context';
import useToast from '@context/toasts/toast-context';
import React, { useState } from 'react';

const SessionCounterModal: React.FC = () => {
  const { hideModal } = useModalContext();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const [target, setTarget] = useState(5);

  const { data: sessionCounters = [] } = useQuery<SessionCounter[]>({
    queryKey: ['sessionCounters'],
    queryFn: () => SessionCountersService.readSessionCountersSessionCountersGet(),
  });

  const createSessionCounterMutation = useMutation({
    mutationFn: (newCounter: { target: number }) =>
      SessionCountersService.createSessionCounterSessionCountersPost(newCounter),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionCounters'] });
      addToast({ type: 'success', content: 'Session counter created successfully' });
      hideModal();
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof ApiError
          ? error.body?.detail || 'Failed to create session counter'
          : 'Failed to create session counter';
      addToast({ type: 'error', content: errorMessage });
    },
  });

  const handleCreate = () => {
    createSessionCounterMutation.mutate({ target });
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < target; i++) {
      dots.push(<div key={i} className="w-3 h-3 rounded-full bg-indigo-500"></div>);
    }
    return dots;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center space-x-4">
        <button onClick={() => setTarget(Math.max(1, target - 1))} className="text-2xl font-bold text-indigo-500">
          -
        </button>
        <div className="flex space-x-1">{renderDots()}</div>
        <button onClick={() => setTarget(target + 1)} className="text-2xl font-bold text-indigo-500">
          +
        </button>
      </div>
      <p className="text-center text-gray-600">Target: {target} sessions</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={hideModal}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default SessionCounterModal;