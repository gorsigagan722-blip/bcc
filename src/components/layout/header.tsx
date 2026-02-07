'use client';

import Link from 'next/link';
import { Phone, Clock, Mail, User, UserPlus, ChevronDown, Menu } from 'lucide-react';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';

const NavItems = ({ onLinkClick }: { onLinkClick?: () => void }) => {
    return (
        <>
            <Link href="/" className="font-semibold text-gray-700 hover:text-blue-600 transition-colors" onClick={onLinkClick}>HOME</Link>
            <Link href="/about-us" className="font-semibold text-gray-700 hover:text-blue-600 transition-colors" onClick={onLinkClick}>ABOUT US</Link>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 font-semibold text-gray-700 hover:text-blue-600 focus:outline-none">
                    COURSE <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <Link href="/enroll/typing">Typing Course</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/enroll/stenography">Stenography Course</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/#contact" className="font-semibold text-gray-700 hover:text-blue-600 transition-colors" onClick={onLinkClick}>CONTACT US</Link>
        </>
    );
}

const AuthNavItems = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
        <Link href="/login" className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors" onClick={onLinkClick}>
            <User className="h-4 w-4 text-blue-600" />
            LOG IN
        </Link>
        <Link href="/signup" className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors" onClick={onLinkClick}>
            <UserPlus className="h-4 w-4 text-blue-600" />
            NEW USER? SIGN UP
        </Link>
    </>
)


export function Header() {
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);
    
    return (
        <div className="bg-white shadow-sm sticky top-0 z-50">
            {/* Top Bar */}
            <div className="py-2 border-b">
                <div className="container mx-auto flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 text-sm text-blue-700">
                    <a href="tel:+919671126006" className="flex items-center gap-2 hover:text-blue-900 transition-colors">
                        <Phone className="h-4 w-4" />
                        <span>+91-9671126006</span>
                    </a>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>8am to 9pm</span>
                    </div>
                    <a href="mailto:gagangorsi251@gmail.com" className="flex items-center gap-2 hover:text-blue-900 transition-colors">
                        <Mail className="h-4 w-4" />
                        <span>gagangorsi251@gmail.com</span>
                    </a>
                </div>
            </div>

            {/* Main Navigation */}
            <header className="container mx-auto flex justify-between items-center h-16">
                <nav className="hidden md:flex items-center gap-4 text-sm">
                    <NavItems />
                </nav>

                <nav className="hidden md:flex items-center gap-4 text-sm">
                    <AuthNavItems />
                </nav>

                <div className="md:hidden flex w-full justify-between">
                     <Link href="/" className="text-lg font-bold text-gray-800">
                        BCC
                    </Link>
                     <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                             <nav className="flex flex-col gap-6 pt-8 text-base">
                                <NavItems onLinkClick={() => setIsSheetOpen(false)} />
                                <div className="border-t pt-6 flex flex-col gap-6">
                                     <AuthNavItems onLinkClick={() => setIsSheetOpen(false)} />
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
        </div>
    );
}