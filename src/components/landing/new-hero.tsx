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
    <section id="home" className="steno-hero-bg py-12 md:py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-teal-700 opacity-0 animate-fade-in-up">
              Steno Career
            </h1>
            <p className="text-2xl font-semibold text-gray-800 opacity-0 animate-fade-in-up animation-delay-200">
              Shorthand Dictation & Typing
            </p>
            <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0 opacity-0 animate-fade-in-up animation-delay-400">
              A Shorthand Learning and dictation platform
            </p>
          </div>
          
          <div className="relative opacity-0 animate-fade-in-up animation-delay-500">
            {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-2xl"
                  priority
                  data-ai-hint={heroImage.imageHint}
                />
            )}
             <Button asChild className="absolute top-4 right-4 bg-pink-500 hover:bg-pink-600 text-white shadow-lg transition-transform hover:scale-105">
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
