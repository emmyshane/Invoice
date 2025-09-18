import React, { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, ChevronDown, ChevronUp, Move, Minimize2, Maximize2 } from 'lucide-react';

interface TimeData {
  time: string;
  date: string;
  timezone: string;
  location: string;
}

interface Position {
  x: number;
  y: number;
}

const TimeWidget: React.FC = () => {
  const [times, setTimes] = useState<TimeData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 24, y: 128 }); // Initial position (right-6, top-32)
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  
  const widgetRef = useRef<HTMLDivElement>(null);

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

  // Mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (widgetRef.current) {
      setIsDragging(true);
      const rect = widgetRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep widget within viewport bounds
      const maxX = window.innerWidth - 280; // Widget width
      const maxY = window.innerHeight - 200; // Approximate widget height
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Touch events for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (widgetRef.current) {
      setIsDragging(true);
      const rect = widgetRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      e.preventDefault();
      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.x;
      const newY = touch.clientY - dragOffset.y;
      
      // Keep widget within viewport bounds
      const maxX = window.innerWidth - 280;
      const maxY = window.innerHeight - 200;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <>
      {/* Desktop View - Draggable and Minimizable */}
      <div 
        ref={widgetRef}
        className="hidden xl:block fixed z-40 select-none"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'default'
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 min-w-[260px] max-w-[260px] overflow-hidden">
          {/* Header with drag handle and minimize button */}
          <div 
            className="flex items-center justify-between p-3 pb-2 border-b border-gray-200 cursor-grab active:cursor-grabbing bg-gradient-to-r from-blue-50 to-indigo-50"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="flex items-center gap-2">
              <Move className="w-3 h-3 text-gray-400" />
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-800">Live Time Zones</span>
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/60 rounded-md transition-colors duration-200"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {isMinimized ? (
                <Maximize2 className="w-3 h-3 text-gray-600" />
              ) : (
                <Minimize2 className="w-3 h-3 text-gray-600" />
              )}
            </button>
          </div>
          
          {/* Content - collapsible */}
          {!isMinimized && (
            <div className="p-4 pt-3">
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

      {/* Mobile and Tablet View - Dropdown (unchanged) */}
      <div className="xl:hidden fixed right-4 top-20 z-40">
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