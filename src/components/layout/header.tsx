'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { SiteLogo } from '../site-logo';

const BrandLogo = () => (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
      <SiteLogo className="h-8 w-8" />
      <span className="font-bold text-lg text-foreground hidden sm:inline-block">
        BHARAT COMMUNICATION CENTER
      </span>
    </div>
  );


export function Header() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user && firestore) {
        const checkAdmin = async () => {
            const userDoc = await getDoc(doc(firestore, 'users', user.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
                setIsAdmin(true);
            }
        };
        checkAdmin();
    } else {
        setIsAdmin(false);
    }
  }, [user, firestore]);

  const dashboardHref = isAdmin ? '/admin/dashboard' : '/dashboard';

  const navLinks = [
    { href: '/dashboard/tests', label: 'Hindi Steno Test' },
    { href: '/dashboard/tests', label: 'English Steno Test' },
    ...(!user && !isUserLoading ? [
        { href: '/signup', label: 'Register' },
        { href: '/login', label: 'Login' }
    ] : []),
    ...(user && !isUserLoading ? [
        { href: dashboardHref, label: 'Dashboard' }
    ] : []),
    { href: '#', label: 'About us' },
];

  const NavLinks = ({ inSheet }: { inSheet?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.label + link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors text-foreground/80 hover:text-primary",
            inSheet ? "block py-2 text-lg" : "px-3 py-2"
          )}
        >
          <span>{link.label}</span>
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        `sticky top-0 z-50 w-full bg-white transition-shadow duration-200`,
        isScrolled ? "shadow-md" : ""
      )}
    >
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo />
        
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
                  <BrandLogo />
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
