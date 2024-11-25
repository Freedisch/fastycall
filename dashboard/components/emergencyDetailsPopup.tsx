// components/EmergencyDetails.tsx
import React, { useState, useEffect } from 'react';
import { X, Car, Flame, Ambulance } from 'tabler-icons-react';
import { Call } from '@/components/sidebar';
import { format } from 'date-fns';
import { getLocationName, getStaticMapImage } from '@/app/lib/locationutils';
import { getThreatBadgeColor, getThreatLevel } from '@/app/lib/maputils';


interface EmergencyDetailsProps {
  call: Call;
  onClose: () => void;
}

const EmergencyDetails: React.FC<EmergencyDetailsProps> = ({ call, onClose }) => {
  const [locationName, setLocationName] = useState<string>('Loading...');

  useEffect(() => {
    const fetchLocationName = async () => {
      const name = await getLocationName(call.location.lat, call.location.lng);
      setLocationName(name);
    };
    fetchLocationName();
  }, [call.location.lat, call.location.lng]);

  const mapImageUrl = getStaticMapImage(call.location.lat, call.location.lng);
  const threatLevel = getThreatLevel(call.fearLevel, call.stressLevel);

  return (
    <div className="w-96 bg-black text-white shadow-lg z-[1000] flex flex-col" style={{ height: '50vh' }}>
      <header className="p-3 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-bold">Details</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </header>
      
      <div className="p-3 overflow-y-auto flex-grow">
        <h1 className="text-xl font-bold mb-2">{call.shortSummary}</h1>
        <span className={`${getThreatBadgeColor(threatLevel)} px-2 py-1 rounded bg-red-600 text-white text-xs font-bold`}>
        {threatLevel}
        </span>
        
        <div className="mt-3">
          <img src={mapImageUrl} alt="Emergency Location" className="w-full h-32 object-cover rounded mb-3" />
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <h3 className="text-gray-400 text-xs">Time of Call</h3>
              <p className="font-semibold text-sm">{format(call.createdDate, 'h:mm:ss a')}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-xs">Location</h3>
              <p className="font-semibold text-sm">{locationName}</p>
            </div>
          </div>
          
          <div className="mb-3">
            <h3 className="text-gray-400 text-xs mb-1">Summary</h3>
            <p className="text-sm">{call.detailedSummary}</p>
          </div>
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-700">
        <h3 className="text-gray-400 text-xs mb-2">Dispatch first responders:</h3>
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded flex items-center justify-center text-sm">
            <Car size={16} className="mr-1" />
            Police
          </button>
          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded flex items-center justify-center text-sm">
            <Flame size={16} className="mr-1" />
            Fire
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded flex items-center justify-center text-sm">
            <Ambulance size={16} className="mr-1" />
            Medic
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDetails;