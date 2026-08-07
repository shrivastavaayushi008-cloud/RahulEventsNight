'use client';

import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { useHashRoute } from '@/hooks/use-hash-route';
import { useSiteData } from '@/hooks/use-site-data';
import { HomePage } from '@/components/site/pages/home';
import { AboutPage } from '@/components/site/pages/about';
import { EventsPage } from '@/components/site/pages/events';
import { GalleryPage } from '@/components/site/pages/gallery';
import { ArtistsPage } from '@/components/site/pages/artists';
import { VideosPage } from '@/components/site/pages/videos';
import { TestimonialsPage } from '@/components/site/pages/testimonials';
import { ContactPage } from '@/components/site/pages/contact';
import { AdminPage } from '@/components/site/pages/admin';
import { FloatingContact } from '@/components/site/floating-contact';

export default function Page() {
  const { route, navigate } = useHashRoute();
  const { data, loading } = useSiteData();

  if (route === 'admin') {
    return <AdminPage navigate={navigate} />;
  }

  return (
    <div className="min-h-screen-flex bg-background bg-pattern-temple">
      <Navbar
        route={route}
        navigate={navigate}
        phoneDisplay={data.settings.phoneDisplay}
        phone={data.settings.phone}
        whatsapp={data.settings.whatsapp}
        brandHindi={data.settings.companyNameHindi}
      />
      <main className="flex-1">
        {route === 'home' && <HomePage data={data} loading={loading} navigate={navigate} />}
        {route === 'about' && <AboutPage data={data} loading={loading} navigate={navigate} />}
        {route === 'events' && <EventsPage data={data} loading={loading} navigate={navigate} />}
        {route === 'gallery' && <GalleryPage data={data} loading={loading} navigate={navigate} />}
        {route === 'artists' && <ArtistsPage data={data} loading={loading} navigate={navigate} />}
        {route === 'videos' && <VideosPage data={data} loading={loading} navigate={navigate} />}
        {route === 'testimonials' && <TestimonialsPage data={data} loading={loading} navigate={navigate} />}
        {route === 'contact' && <ContactPage data={data} loading={loading} navigate={navigate} />}
      </main>
      <Footer navigate={navigate} settings={data.settings} />
      <FloatingContact settings={data.settings} />
    </div>
  );
}
