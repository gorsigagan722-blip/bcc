'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

export const SiteLogo = ({ className }: { className?: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a non-responsive fallback to prevent mismatch.
    // This will render the same on server and initial client load.
    // Using the mobile version "BCC" as the fallback.
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="bg-[#e43330] p-1.5 rounded-md">
                <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-primary">BCC</span>
        </div>
    );
  }

  // After mounting, render the full responsive version.
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <div className="bg-[#e43330] p-1.5 rounded-md">
            <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div className='hidden sm:block'>
            <span className="font-bold text-primary text-lg leading-tight">BHARAT COMMUNICATION</span>
            <br />
            <span className="font-bold text-primary text-lg leading-tight">CENTER</span>
        </div>
        <span className="font-bold text-primary sm:hidden">BCC</span>
    </div>
  );
};
