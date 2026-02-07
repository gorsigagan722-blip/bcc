import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const YouTubeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
        <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path>
    </svg>
);


export function NewHero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');
  
  return (
    <section id="home" className="bg-background py-20 md:py-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight opacity-0 animate-fade-in-up">
              Bharat Communication Center
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-primary opacity-0 animate-fade-in-up animation-delay-200">
              Typing Practice & Stenography Learning
            </p>
            <p className="text-base text-muted-foreground max-w-xl mx-auto md:mx-0 opacity-0 animate-fade-in-up animation-delay-400">
              Learn typing, improve speed, take tests, and prepare for exams with structured lessons and dictation practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4 opacity-0 animate-fade-in-up animation-delay-500">
                <Button asChild size="lg">
                    <Link href="/#courses">Enroll Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/dashboard/tests">Free Demo Test</Link>
                </Button>
            </div>
          </div>
          
          <div className="relative opacity-0 animate-fade-in-up animation-delay-500">
            {heroImage && (
                <div className="p-2 border-2 border-border rounded-lg shadow-lg bg-card">
                    <Image
                      src={heroImage.imageUrl}
                      alt={heroImage.description}
                      width={600}
                      height={400}
                      className="rounded-md object-cover"
                      priority
                      data-ai-hint={heroImage.imageHint}
                    />
                </div>
            )}
             <Button asChild className="absolute top-6 right-6 bg-primary hover:bg-accent text-primary-foreground shadow-lg transition-transform hover:scale-105">
              <Link href="#">
                <YouTubeIcon />
                Visit YouTube Channel
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
