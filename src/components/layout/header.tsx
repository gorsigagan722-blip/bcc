'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useUser } from '@/firebase';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const StenoCareerHubLogo = () => (
  <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
    <div className="relative h-9 w-9">
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-0.5 p-1 bg-red-500 rounded-sm">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white/70 rounded-sm"></div>
        ))}
        <div className="bg-white/70 rounded-sm col-span-2"></div>
         <div className="bg-white/70 rounded-sm"></div>
      </div>
       <svg className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-9 h-9 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
    <div className="flex flex-col leading-tight">
      <span className="font-bold text-lg text-teal-600">STENO</span>
      <span className="font-semibold text-xs text-red-500 tracking-wider">CAREER HUB</span>
    </div>
  </div>
);


export function Header() {
  const { user, isUserLoading } = useUser();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = user 
    ? [
        { href: '/hindi-steno-test', label: 'Hindi Steno Test' },
        { href: '/english-steno-test', label: 'English Steno Test' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/about-us', label: 'About us' },
      ]
    : [
        { href: '/hindi-steno-test', label: 'Hindi Steno Test' },
        { href: '/english-steno-test', label: 'English Steno Test' },
        { href: '/signup', label: 'Register' },
        { href: '/login', label: 'Login' },
        { href: '/about-us', label: 'About us' },
      ];


  const NavLinks = ({ inSheet }: { inSheet?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            inSheet ? "block py-2" : "px-3 py-2 rounded-md"
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        `sticky top-0 z-50 w-full transition-shadow duration-200`,
        isScrolled ? "bg-white shadow-md" : "bg-white"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <StenoCareerHubLogo />
        
        <nav className="hidden items-center gap-1 md:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-white">
              <div className="flex h-full flex-col p-6">
                <div className="mb-8">
                  <StenoCareerHubLogo />
                </div>
                <nav className="flex flex-col gap-4">
                  <NavLinks inSheet />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
