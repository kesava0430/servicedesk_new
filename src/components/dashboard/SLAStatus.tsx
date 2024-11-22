import React from 'react';

interface SLAMetric {
  label: string;
  value: number;
  total: number;
  color: string;
}

export default function SLAStatus() {
  const metrics: SLAMetric[] = [
    { label: 'Response Time', value: 95, total: 100, color: 'green' },
    { label: 'Resolution Time', value: 88, total: 100, color: 'yellow' },
    { label: 'First Contact', value: 92, total: 100, color: 'green' },
    { label: 'Customer Satisfaction', value: 4.5, total: 5, color: 'green' },
  ];

  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{metric.label}</span>
            <span className={`font-medium text-${metric.color}-600`}>
              {metric.value}/{metric.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-${metric.color}-600 h-2 rounded-full`}
              style={{ width: `${(metric.value / metric.total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}