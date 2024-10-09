// components/EmergencyDetailsSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'tabler-icons-react';
import { format } from 'date-fns';
import { Call } from '@/components/sidebar';  // Assuming this is where your Call type is defined

interface EmergencyDetailsSidebarProps {
  call: Call;
  onClose: () => void;
}

const EmergencyDetailsSidebarPopup: React.FC<EmergencyDetailsSidebarProps> = ({ call, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after a short delay to trigger the transition
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Delay the onClose callback to allow the closing animation to play
    setTimeout(onClose, 300);
  };

  const getThreatLevel = (fearLevel: number, stressLevel: number) => {
    const avgLevel = (fearLevel + stressLevel) / 2;
    if (avgLevel >= 80) return "high";
    if (avgLevel >= 50) return "medium";
    return "low";
  };

  const getThreatBadgeColor = (threatLevel: string) => {
    switch (threatLevel) {
      case "high": return "bg-red-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const threatLevel = getThreatLevel(call.fearLevel, call.stressLevel);
  const badgeColor = getThreatBadgeColor(threatLevel);

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-gray-900 text-white shadow-lg z-[1000] 
                     transform transition-transform duration-300 ease-in-out
                     ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
      <header className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold">Details</h2>
        <button onClick={handleClose} className="text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      </header>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-2">{call.shortSummary}</h1>
        <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${badgeColor}`}>
          {threatLevel}
        </span>
        
        <div className="mt-4">
          {/* Placeholder for image/map */}
          <div className="bg-gray-700 h-48 w-full mb-4 rounded"></div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-gray-400 text-sm">Time of Call</h3>
              <p className="font-semibold">{format(call.createdDate, 'h:mm:ss a')}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Location</h3>
              <p className="font-semibold">{`${call.location.lat.toFixed(4)}, ${call.location.lng.toFixed(4)}`}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-gray-400 text-sm mb-1">Summary</h3>
            <p>{call.detailedSummary}</p>
          </div>
          
          <div>
            <h3 className="text-gray-400 text-sm mb-2">Dispatch first responders:</h3>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Police
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Firefighters
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Paramedics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDetailsSidebarPopup;