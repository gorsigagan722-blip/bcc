'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Lock } from 'lucide-react';

const mockTests = [
    { id: 1, date: '2024-07-18', language: 'English', name: 'Grade - D', speed: '80 WPM', words: 797, duration: '50 Minutes' },
    { id: 2, date: '2024-07-18', language: 'English', name: 'Grade - C', speed: '100 WPM', words: 794, duration: '45 Minutes' },
    { id: 3, date: '2024-06-29', language: 'English', name: 'Grade - C', speed: '105 WPM', words: 800, duration: '50 Minutes' },
    { id: 4, date: '2024-06-29', language: 'English', name: 'Grade - D', speed: '85 WPM', words: 828, duration: '65 Minutes' },
    { id: 5, date: '2024-06-25', language: 'Hindi', name: 'Grade - C', speed: '90 WPM', words: 900, duration: '50 Minutes' },
];

export default function StudentDashboardPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTests = mockTests.filter(test => 
        test.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.speed.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Input 
                placeholder="Search..." 
                className="max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button>Search</Button>
        </div>

        <div className="overflow-hidden rounded-lg border bg-card">
             <Table>
                <TableHeader className="bg-secondary">
                    <TableRow>
                        <TableHead className="w-[50px] font-bold text-foreground">S.NO.</TableHead>
                        <TableHead className="font-bold text-foreground">DATE</TableHead>
                        <TableHead className="font-bold text-foreground">LANGUAGE</TableHead>
                        <TableHead className="font-bold text-foreground">TEST NAME</TableHead>
                        <TableHead className="font-bold text-foreground">DICTATION SPEED</TableHead>
                        <TableHead className="font-bold text-foreground">TOTAL WORDS</TableHead>
                        <TableHead className="font-bold text-foreground">DURATION</TableHead>
                        <TableHead className="text-center font-bold text-foreground">ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredTests.map((test, index) => (
                        <TableRow key={test.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{test.date}</TableCell>
                            <TableCell>{test.language}</TableCell>
                            <TableCell>{test.name}</TableCell>
                            <TableCell>{test.speed}</TableCell>
                            <TableCell>{test.words}</TableCell>
                            <TableCell>{test.duration}</TableCell>
                            <TableCell className="text-center">
                                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                                    <Lock className="mr-2 h-4 w-4" />
                                    Paid Test
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
  );
}
