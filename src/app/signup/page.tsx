'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, User, Mail, Phone, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useFirestore, useAuth } from '@/firebase';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const signupBgImage = PlaceHolderImages.find((img) => img.id === 'signup-bg');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Split name into first and last for Firestore
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts.shift() || '';
    const lastName = nameParts.join(' ');
    const displayName = name;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName });
      await sendEmailVerification(user);

      const userDocRef = doc(firestore, 'users', user.uid);
      const userData = {
        id: user.uid,
        firstName,
        lastName,
        displayName,
        email: user.email,
        role: 'student',
      };
      
      setDocumentNonBlocking(userDocRef, userData, { merge: true });

      // User is now logged in but not verified.
      // Redirect to dashboard, which will then redirect to verify-notice page.
      router.push('/dashboard');

    } catch (error: any) {
      let description = 'An unexpected error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        description =
          'This email is already in use. Please use a different email or log in.';
      } else if (error.code === 'auth/weak-password') {
        description = 'The password is too weak. Please use a stronger password.';
      }
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        {signupBgImage && (
          <Image
            src={signupBgImage.imageUrl}
            alt={signupBgImage.description}
            data-ai-hint={signupBgImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-8">
          <h1 className="text-3xl font-bold text-center">REGISTER</h1>
          <form onSubmit={handleSubmit} className="grid gap-6">
             <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                required
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                className="pl-10"
                disabled={isLoading}
              />
            </div>
             <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone"
                required
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" disabled={isLoading} className="bg-[#1b806a] text-primary-foreground hover:bg-[#2FAE5A]">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                CREATE AN ACCOUNT
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
