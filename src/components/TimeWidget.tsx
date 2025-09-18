import React, { useState, useEffect } from 'react';
import { Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface TimeData {
  time: string;
  date: string;
  timezone: string;
  location: string;
}

const TimeWidget: React.FC = () => {
  const [times, setTimes] = useState<TimeData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const updateTimes = () => {
    const now = new Date();
    
    // Wyoming Sheridan (Mountain Time - UTC-7 in summer, UTC-6 in winter)
    const sheridanTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Denver',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(now);
    
    const sheridanDate = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Denver',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(now);

    // Irving Texas (Central Time - UTC-6 in summer, UTC-5 in winter)
    const irvingTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(now);
    
    const irvingDate = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(now);

    setTimes([
      {
        time: sheridanTime,
        date: sheridanDate,
        timezone: 'MT',
        location: 'Sheridan, WY'
      },
      {
        time: irvingTime,
        date: irvingDate,
        timezone: 'CT',
        location: 'Irving, TX'
      }
    ]);
  };

  useEffect(() => {
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 min-w-[280px]">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-800">Live Time Zones</span>
          </div>
          
          <div className="space-y-4">
            {times.map((timeData, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-gray-500" />
                  <span className="text-xs font-medium text-gray-600">{timeData.location}</span>
                  <span className="text-xs text-gray-400">{timeData.timezone}</span>
                </div>
                <div className="text-lg font-bold text-gray-900 font-mono">
                  {timeData.time}
                </div>
                <div className="text-xs text-gray-600">
                  {timeData.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View - Dropdown */}
      <div className="lg:hidden fixed right-4 top-20 z-40">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-3 flex items-center gap-2 transition-all duration-200"
          >
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-800">Time</span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 p-4 min-w-[260px]">
              <div className="space-y-4">
                {times.map((timeData, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span className="text-xs font-medium text-gray-600">{timeData.location}</span>
                      <span className="text-xs text-gray-400">{timeData.timezone}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 font-mono">
                      {timeData.time}
                    </div>
                    <div className="text-xs text-gray-600">
                      {timeData.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TimeWidget;