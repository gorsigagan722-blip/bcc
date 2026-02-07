import { Footer } from '@/components/layout/footer';
import { NewHero } from '@/components/landing/new-hero';
import { Courses } from '@/components/landing/courses';
import { WhyChooseUs } from '@/components/landing/why-choose-us';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <NewHero />
        <Courses />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
}
