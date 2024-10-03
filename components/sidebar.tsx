// components/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import * as allIcons from "tabler-icons-react";
import { formatDistanceToNow } from 'date-fns';
import EmergencyDetailsSidebar from '@/components/emergencyPopUp';

// Mock data for calls (keep the existing mock data)

// Updated mock data with Kigali location information
const mockCalls = [
    {
      id: 1,
      shortSummary: "Car accident on KN 5 Rd",
      icon: "Car",
      callStatus: "active",
      createdDate: new Date(),
      fearLevel: 65,
      stressLevel: 80,
      location: { lat: -1.9441, lng: 30.0619 }, // Kigali city center
      transcript: [
        { role: 'caller' as const, message: "There's been a car accident on KN 5 Rd!" },
        { role: 'responder' as const, message: "I understand. Are there any injuries?" },
        { role: 'caller' as const, message: "Yes, I think someone is hurt. Please hurry!" },
      ]
    },
    {
      id: 2,
      shortSummary: "Fire reported in Nyabugogo",
      icon: "Flame",
      callStatus: "active",
      createdDate: new Date(Date.now() - 3600000),
      fearLevel: 85,
      stressLevel: 90,
      location: { lat: -1.9394, lng: 30.0559 }, // Nyabugogo area
      transcript: [
        { role: 'caller' as const, message: "There's a fire in the Nyabugogo area!" },
        { role: 'responder' as const, message: "Can you give me the exact location?" },
        { role: 'caller' as const, message: "It's near the main bus terminal." },
      ]
    },
    {
      id: 3,
      shortSummary: "Medical emergency in Kacyiru",
      icon: "Ambulance",
      callStatus: "active",
      createdDate: new Date(Date.now() - 7200000),
      fearLevel: 70,
      stressLevel: 75,
      location: { lat: -1.9468, lng: 30.0917 }, // Kacyiru area
      transcript: [
        { role: 'caller' as const, message: "My neighbor has collapsed! We need an ambulance in Kacyiru!" },
        { role: 'responder' as const, message: "I'm dispatching an ambulance. Can you provide the exact address?" },
        { role: 'caller' as const, message: "We're on KG 7 Ave, near the Ministry of Education." },
      ]
    },
  ];
  
  
  // Type for a single call
  export type Call = typeof mockCalls[0];

  interface SidebarProps {
    onCallSelect: (call: Call) => void;
  }
  
  const Sidebar: React.FC<SidebarProps> = ({ onCallSelect }) => {
  const [selectedCall, setSelectedCall] = useState<Call  | null>(null);

  const sortedCalls = [...mockCalls].sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());

  return (
    <>
      <div className="w-96 bg-black border-r border-[#1C1C1E] flex flex-col p-4 select-none h-screen overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-white text-lg font-semibold">Call +1 (571) 651 8232</h2>
          <p className="text-[#A1A1AA] text-sm">To experience the future of 911 calls.</p>
        </div>
        
        <h3 className="text-white font-bold mb-2">Recent Emergency Calls</h3>
        
        <div className="flex-1">
          {sortedCalls.map((call) => {
            const IconToBeUsed = allIcons[call.icon as keyof typeof allIcons] || allIcons.Activity;

            return (
              <div 
                key={call.id}
                className="mb-2 p-2 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors cursor-pointer"
                onClick={() => onCallSelect(call)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconToBeUsed size={26} color="#ffffff" />
                    <div>
                      <p className="text-white">{call.shortSummary}</p>
                      <p className="text-xs text-gray-400">{formatDistanceToNow(call.createdDate, { addSuffix: true })}</p>
                    </div>
                  </div>
                  {call.callStatus === "active" && (
                    <div className="bg-green-500 bg-opacity-10 text-green-500 text-xs px-2 py-1 rounded-full flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                      Live
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>
            Built by{' '}
            <a href="https://twitter.com/cjarrayadev" className="underline">Christopher Arraya</a>
            {' '}
            <a href="https://x.com/tahaha_a" className="underline">Taha Ansari</a>
          </p>
          <p>
            <a href="https://x.com/JackBlair87" className="underline">Jack Blair</a>
            {' '}
            <a href="https://twitter.com/rzhang139" className="underline">Richard Zhang</a>
          </p>
        </div>
      </div>

      {selectedCall && (
        <EmergencyDetailsSidebar
          call={selectedCall}
          onClose={() => setSelectedCall(null)}
        />
      )}
    </>
  );
};

export default Sidebar;