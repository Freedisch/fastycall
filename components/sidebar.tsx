/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Sidebar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import * as allIcons from "tabler-icons-react";
import { formatDistanceToNow } from 'date-fns';
import EmergencyDetailsSidebar from '@/components/emergencyPopUp';
import { Input } from '@/components/ui/input';
import { getThreatBadgeColor, getThreatLevel } from '@/app/lib/maputils';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';



  
  
  export interface Call {
    id: string;
    shortSummary: string;
    detailedSummary: string;
    icon: string;
    callStatus: string;
    createdDate: Date;
    fearLevel: number;
    stressLevel: number;
    location: {
      lat: number;
      lng: number;
    };
    transcript: Array<{
      Role: string;
      Message: string;
    }>;
  }

  interface SidebarProps {
    onCallSelect: (call: Call) => void;
  }

  const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
  
  const Sidebar: React.FC<SidebarProps> = ({ onCallSelect }) => {
    const [selectedCall, setSelectedCall] = useState<Call | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [calls, setCalls] = useState<Call[]>([]);
    const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      console.log('Starting Firestore connection...');
      
      // First, let's try to get documents directly
      const fetchCalls = async () => {
        try {
          const callsRef = collection(db, 'calls');
          console.log('Collection reference created');
          
          const querySnapshot = await getDocs(callsRef);
          console.log('Raw Firestore data:', querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          
          const callsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            console.log('Processing document:', doc.id, data);
            const mappedTranscript = data.Transcript?.map((entry: { Role: any; Message: any; }) => ({
              Role: entry.Role,
              Message: entry.Message
            })) || [];
            console.log("transcript", mappedTranscript)
            return {
              id: doc.id,
              shortSummary: data.ShortSummary || 'No Summary',
              detailedSummary: data.DetailedSummary || '',
              icon: data.icon || 'Activity',
              callStatus: data.CallStatus || 'active',
              createdDate: new Date(),
              fearLevel: data.FearLevel || 0,
              stressLevel: data.StressLevel || 0,
              location: { lat: data.lat || null, lng: data.lng || null},
              transcript: mappedTranscript
            } as Call;
          });
          
          console.log('Processed calls data:', callsData);
          setCalls(callsData);
          setFilteredCalls(callsData);
        } catch (err) {
          console.error('Error fetching calls:', err);
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      };
  
      fetchCalls();
  
      // Then set up real-time listener
      // const q = query(collection(db, 'calls'), orderBy('createdDate', 'desc'));
      
      // const unsubscribe = onSnapshot(q, 
      //   (snapshot) => {
      //     console.log('Snapshot received, docs count:', snapshot.docs.length);
          
      //     const updatedCalls = snapshot.docs.map(doc => {
      //       const data = doc.data();
      //       console.log('Processing doc in snapshot:', doc.id, data);
            
      //       return {
      //         id: doc.id,
      //         shortSummary: data.ShortSummary || 'No Summary',
      //         detailedSummary: data.DetailedSummary || '',
      //         icon: data.icon || 'Activity',
      //         callStatus: data.CallStatus || 'active',
      //         createdDate: data.CreatedDate ? new Date(data.createdDate * 1000) : new Date(),
      //         fearLevel: data.FearLevel || 0,
      //         stressLevel: data.StressLevel || 0,
      //         location: data.Location || { lat: 0, lng: 0 },
      //         transcript: data.Transcript || []
      //       } as Call;
      //     });
  
      //     console.log('Setting calls:', updatedCalls);
      //     setCalls(updatedCalls);
      //     setFilteredCallsx(updatedCalls);
      //   },
      //   (error) => {
      //     console.error('Snapshot error:', error);
      //     console.error("errror", error.message)
      //     setError(error.message);
      //   }
      // );
  
      
    }, []);
  
    // Add error display
  
    useEffect(() => {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = calls.filter(call => 
        call.shortSummary.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredCalls(filtered);
    }, [searchTerm, calls]);
  
    const sortedCalls = [...filteredCalls].sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
    
  
    const totalIncidents = calls.length;
    const resolvedIncidents = calls.filter(call => call.callStatus !== "active").length;
    const criticalIncidents = calls.filter(call => getThreatLevel(call.fearLevel, call.stressLevel) === "high").length;
  
    
  
    return (
      <>
        <div className="w-96 bg-black border-r border-[#1C1C1E] flex flex-col p-4 select-none h-screen overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-white text-lg font-semibold">Call FastyCall</h2>
            <p className="text-[#A1A1AA] text-sm">To experience the future of 911 calls.</p>
          </div>
  
          <div className="mb-6 flex justify-between text-center">
          <div>
            <p className="text-3xl font-bold text-white">{totalIncidents}</p>
            <p className="text-sm text-gray-400">Total</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{criticalIncidents}</p>
            <p className="text-sm text-gray-400">Critical</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{resolvedIncidents}</p>
            <p className="text-sm text-gray-400">Resolved</p>
          </div>
        </div>
          
          <Input
            type="text"
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 bg-white bg-opacity-10 border-none text-white placeholder-gray-400"
          />
  
          <h3 className="text-white font-bold mb-2">Recent Emergency Calls</h3>
          
          <div className="flex-1">
            {sortedCalls.map((call) => {
              const IconToBeUsed = allIcons[call.icon as keyof typeof allIcons] || allIcons.Activity;
              const threatLevel = getThreatLevel(call.fearLevel, call.stressLevel);
  
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
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getThreatBadgeColor(threatLevel)} text-xs`}>
                        {threatLevel}
                      </Badge>
                      {call.callStatus === "active" && (
                        <div className="bg-green-500 bg-opacity-10 text-green-500 text-xs px-2 py-1 rounded-full flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                          Live
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              Built by{' '}
              <a href="https://twitter.com/freedisch" className="underline">Freedisch</a>
              {' '}
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