'use client';

import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MainContent } from '@/components/dashboard/main-content';
import { Stats } from '@/components/dashboard/stats';

export default function StudentDashboardPage() {
  const { user } = useUser();

  const getAvatarFallback = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="overflow-hidden rounded-xl border bg-card/80 shadow-sm backdrop-blur-sm">
        <div className="p-6 md:p-8">
            <div className="flex flex-col-reverse items-start justify-between gap-4 md:flex-row">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    Welcome back, {user?.displayName ?? 'Student'}!
                    </h1>
                    <p className="text-muted-foreground">
                    Let’s continue your learning journey today ✨
                    </p>
                </div>
                <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:gap-4">
                    <div className="rounded-full border bg-background/50 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                        Student ID: #{user?.uid.slice(0, 6).toUpperCase() ?? 'N/A'}
                    </div>
                    <Avatar className="h-10 w-10 border-2 border-primary/50">
                    <AvatarImage src={user?.photoURL ?? undefined} />
                    <AvatarFallback>{getAvatarFallback(user?.email)}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
      </header>
      
      <Stats />

      <MainContent />

    </div>
  );
}
