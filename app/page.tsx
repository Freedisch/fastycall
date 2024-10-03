"use client"
import Sidebar from "@/components/sidebar";
import Map from "@/components/map"
import { useState } from "react";
import EmergencyDetailsSidebar from "@/components/emergencyPopUp";
import { Call } from '@/components/sidebar'; 


export default function Home() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  return (
    <main className="flex h-screen">
      <Sidebar onCallSelect={setSelectedCall} />
      <div className="flex-1 relative">
        <Map selectedCall={selectedCall} />
      </div>
      {selectedCall && (
        <EmergencyDetailsSidebar
          call={selectedCall}
          onClose={() => setSelectedCall(null)}
        />
      )}
    </main>
  );
}