import React from 'react';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export const SiteLogo = ({ className }: { className?: string }) => (
    <Link href="/dashboard" className={cn("flex items-center gap-2", className)}>
        <div className="bg-[#e43330] p-1.5 rounded-md">
            <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div className='hidden sm:block'>
            <span className="font-bold text-primary text-lg leading-tight">BHARAT COMMUNICATION</span>
            <br />
            <span className="font-bold text-primary text-lg leading-tight">CENTER</span>
        </div>
        <span className="font-bold text-primary sm:hidden">BCC</span>
    </Link>
);
