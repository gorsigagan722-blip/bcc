
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2,
  Phone,
  Lock,
  Send,
  Youtube,
  MessageCircle,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const loginBgImage = PlaceHolderImages.find((img) => img.id === 'login-bg');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        toast({
          title: `Welcome back, ${user.displayName || 'Student'}!`,
          description: 'You are now logged in.',
        });
      }
      router.push('/dashboard');
    } catch (error: any) {
      let description = 'An error occurred during login. Please try again.';
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-credential'
      ) {
        description = 'Invalid email or password.';
      }
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    { icon: Phone, href: '#' },
    { icon: Send, href: '#' },
    { icon: Youtube, href: '#' },
    { icon: MessageCircle, href: '#' },
  ];

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        {loginBgImage && (
          <Image
            src={loginBgImage.imageUrl}
            alt={loginBgImage.description}
            data-ai-hint={loginBgImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <h1 className="text-3xl font-bold">LOGIN</h1>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
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

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
              >
                Forgot Your Password?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              LOGIN
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground mb-4">Stay Connected With Us</p>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  href={social.href}
                  key={index}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white transition-transform hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
