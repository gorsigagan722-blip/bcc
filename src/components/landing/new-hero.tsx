import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
          </div>
        </div>
      </div>
    </section>
  );
}
