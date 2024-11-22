import React from 'react';
import { SLAStatus } from '../../types/request';

interface SLAIndicatorProps {
  slaStatus: SLAStatus;
}

export default function SLAIndicator({ slaStatus }: SLAIndicatorProps) {
  const getStatusColor = (breached: boolean) => {
    return breached ? 'red' : 'green';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Response Time:</span>
        <span className={`text-${getStatusColor(slaStatus.responseTime.breached)}-600`}>
          {slaStatus.responseTime.actual ? (
            formatTime(slaStatus.responseTime.actual)
          ) : (
            formatTime(slaStatus.responseTime.target)
          )}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Resolution Time:</span>
        <span className={`text-${getStatusColor(slaStatus.resolutionTime.breached)}-600`}>
          {slaStatus.resolutionTime.actual ? (
            formatTime(slaStatus.resolutionTime.actual)
          ) : (
            formatTime(slaStatus.resolutionTime.target)
          )}
        </span>
      </div>
    </div>
  );
}