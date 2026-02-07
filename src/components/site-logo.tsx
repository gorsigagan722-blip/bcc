import React from 'react';
import { cn } from '@/lib/utils';
import { BookOpen, Keyboard } from 'lucide-react';

export const SiteLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <div className={cn("relative flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg", props.className)}>
        <BookOpen className="w-5 h-5 text-primary" />
    </div>
);
