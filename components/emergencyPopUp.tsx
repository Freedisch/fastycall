// components/EmergencyDetailsSidebar.tsx
'use client';

import React from 'react';
import { X } from 'tabler-icons-react';

interface EmergencyDetailsSidebarProps {
  call: {
    id: number;
    shortSummary: string;
    icon: string;
    callStatus: string;
    createdDate: Date;
    fearLevel: number;
    stressLevel: number;
    transcript: { role: 'caller' | 'responder'; message: string }[];
  };
  onClose: () => void;
}

const EmergencyDetailsSidebar: React.FC<EmergencyDetailsSidebarProps> = ({ call, onClose }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white text-black shadow-lg z-[1000] flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-white">
        <h2 className="text-xl font-bold">{call.shortSummary}</h2>
        <button onClick={onClose} className="text-black-400 hover:text-white">
          <X size={24} />
        </button>
      </div>
      
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Caller Emotions</h3>
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span>Fear</span>
            <span>{call.fearLevel}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${call.fearLevel}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Stress</span>
            <span>{call.stressLevel}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${call.stressLevel}%` }}></div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-gray-200 overflow-y-auto p-4">
        <h3 className="text-lg font-semibold mb-2">Live Transcript</h3>
        {call.transcript.map((entry, index) => (
          <div key={index} className={`mb-2 ${entry.role === 'caller' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${entry.role === 'caller' ? 'text-white bg-blue-400' : 'bg-white'}`}>
              {entry.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyDetailsSidebar;