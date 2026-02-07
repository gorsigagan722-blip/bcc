import React from 'react';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

export const SiteLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <div className={cn("relative flex items-center justify-center w-10 h-10", props.className)}>
        <BookOpen className="w-7 h-7 text-red-500" />
    </div>
);
