import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';
import bcrypt from 'bcryptjs';

// GET /api/seed — seeds the MongoDB database (call once after deployment)
export async function GET(_req: NextRequest) {
  try {
    // Check if already seeded
    const count = await db.adminUser.count().catch(() => 0);
    if (count > 0) {
      return ok({ message: 'Database already seeded', skipped: true });
    }

    // Admin user
    const passwordHash = await bcrypt.hash('admin123', 10);
    await db.adminUser.create({
      data: {
        email: 'admin@rahuleventsnight.com',
        name: 'Rahul',
        password: passwordHash,
        role: 'admin',
      },
    }).catch(() => {});

    // Events
    const events = [
      { title: 'Jagran', slug: 'jagran', category: 'Spiritual', subCategory: 'Jagran', description: 'All-night devotional singing with bhajans, kirtans, and aarti.', coverImage: '/images/events/jagran.png', featured: true },
      { title: 'Mata Ki Chowki', slug: 'mata-ki-chowki', category: 'Spiritual', subCategory: 'Mata Ki Chowki', description: 'Devotional evening dedicated to Mata Rani with bhajans and chowki.', coverImage: '/images/events/mata-ki-chowki.png' },
      { title: 'Hanuman Aradhna', slug: 'hanuman-aradhna', category: 'Spiritual', subCategory: 'Hanuman Aradhna', description: 'Sacred worship of Lord Hanuman with Sundarkand and Hanuman Chalisa.', coverImage: '/images/events/hanuman-aradhna.png', featured: true },
      { title: 'Sundarkand Path', slug: 'sundarkand-path', category: 'Spiritual', subCategory: 'Sundarkand Path', description: 'Recitation of Sundarkand from Ramcharitmanas with bhajans.', coverImage: '/images/events/sundarkand.png' },
      { title: 'Ram Katha', slug: 'ram-katha', category: 'Spiritual', subCategory: 'Ram Katha', description: 'Spiritual discourse on the life and teachings of Lord Ram.', coverImage: '/images/events/ram-katha.png' },
      { title: 'Bhajan Sandhya', slug: 'bhajan-sandhya', category: 'Spiritual', subCategory: 'Bhajan Sandhya', description: 'Evening of devotional bhajans and spiritual music.', coverImage: '/images/events/bhajan-sandhya.png' },
      { title: 'Shiv Katha', slug: 'shiv-katha', category: 'Spiritual', subCategory: 'Shiv Katha', description: 'Discourse on Lord Shiva with bhajans and aarti.', coverImage: '/images/events/shiv-katha.png' },
      { title: 'Devi Jagran', slug: 'devi-jagran', category: 'Spiritual', subCategory: 'Devi Jagran', description: 'Overnight Jagran dedicated to Maa Durga with devotional songs.', coverImage: '/images/events/devi-jagran.png' },
      { title: 'Track Singing', slug: 'track-singing', category: 'Singing', subCategory: 'Track Singing', description: 'Live track singing performance with professional backing music.', coverImage: '/images/events/track-singing.png', featured: true },
      { title: 'Live Singing', slug: 'live-singing', category: 'Singing', subCategory: 'Live Singing', description: 'Live singing with full band and musicians.', coverImage: '/images/events/live-singing.png' },
      { title: 'Bollywood Night', slug: 'bollywood-night', category: 'Singing', subCategory: 'Bollywood Night', description: 'Energetic Bollywood hits night with live singer.', coverImage: '/images/events/bollywood-night.png' },
      { title: 'Sufi Night', slug: 'sufi-night', category: 'Singing', subCategory: 'Sufi Night', description: 'Soulful Sufi music evening with qawwali and Sufi songs.', coverImage: '/images/events/sufi-night.png' },
      { title: 'Ghazal Night', slug: 'ghazal-night', category: 'Singing', subCategory: 'Ghazal Night', description: 'Intimate evening of Urdu ghazals and shayari.', coverImage: '/images/events/ghazal-night.png' },
      { title: 'Karaoke Night', slug: 'karaoke-night', category: 'Singing', subCategory: 'Karaoke Night', description: 'Interactive karaoke night for guests to sing their favourites.', coverImage: '/images/events/karaoke-night.png' },
      { title: 'Wedding Singing', slug: 'wedding-singing', category: 'Wedding', subCategory: 'Wedding Singing', description: 'Live wedding song performances for all ceremonies.', coverImage: '/images/events/wedding-singing.png', featured: true },
      { title: 'Sangeet Night', slug: 'sangeet-night', category: 'Wedding', subCategory: 'Sangeet Night', description: 'Musical sangeet night with live singing and dancing.', coverImage: '/images/events/sangeet-night.png', featured: true },
      { title: 'Birthday Party', slug: 'birthday-party', category: 'Family', subCategory: 'Birthday Party', description: 'Live music and singing for birthday celebrations.', coverImage: '/images/events/birthday-party.png' },
      { title: 'Anniversary Celebration', slug: 'anniversary-celebration', category: 'Family', subCategory: 'Anniversary', description: 'Romantic live music for anniversary parties.', coverImage: '/images/events/anniversary.png' },
      { title: 'Baby Shower', slug: 'baby-shower', category: 'Family', subCategory: 'Baby Shower', description: 'Musical entertainment for godh bharai / baby shower.', coverImage: '/images/events/baby-shower.png' },
      { title: 'Housewarming (Griha Pravesh)', slug: 'griha-pravesh', category: 'Family', subCategory: 'Griha Pravesh', description: 'Devotional music and bhajans for griha pravesh ceremony.', coverImage: '/images/events/griha-pravesh.png' },
      { title: 'Company Functions', slug: 'company-functions', category: 'Corporate', subCategory: 'Company Functions', description: 'Live entertainment for corporate events and annual functions.', coverImage: '/images/events/corporate-function.png' },
      { title: 'Cultural Programs', slug: 'cultural-programs', category: 'Corporate', subCategory: 'Cultural Programs', description: 'Cultural music and dance programs for organisations.', coverImage: '/images/events/cultural-program.png' },
      { title: 'Live Band', slug: 'live-band', category: 'Stage Shows', subCategory: 'Live Band', description: 'Full live band performance for concerts and stage shows.', coverImage: '/images/events/live-band.png' },
    ];

    for (const e of events) {
      await db.event.create({
        data: { ...e, gallery: JSON.stringify([e.coverImage]), published: true },
      }).catch(() => {});
    }

    // Artists
    const artists = [
      { name: 'Rahul', role: 'Lead Singer', specialty: 'Bhajan, Bollywood, Sufi', bio: 'Founder of RahulEventsNight. 15+ years of experience singing at Jagrans, weddings, and live concerts across India.', avatar: '/images/artists/artist-1.png', phone: '9709954777', featured: true, order: 1 },
      { name: 'Gayatri', role: 'Female Vocalist', specialty: 'Bhajan, Sufi, Ghazal', bio: 'Classically trained singer specialising in devotional bhajans and Sufi music.', avatar: '/images/artists/artist-2.png', phone: '7979962408', featured: true, order: 2 },
      { name: 'Vikas Sharma', role: 'Anchor / Emcee', specialty: 'Wedding, Corporate', bio: 'Professional emcee who keeps the energy high at weddings and corporate events.', avatar: '/images/artists/artist-3.png', order: 3 },
      { name: 'Suresh Kumar', role: 'Musician', specialty: 'Harmonium, Keyboard', bio: 'Master harmonium and keyboard player accompanying singers at Jagrans and weddings.', avatar: '/images/artists/artist-4.png', order: 4 },
      { name: 'Amit Singh', role: 'Musician', specialty: 'Tabla, Dholak', bio: 'Expert tabla and dholak player bringing rhythm to spiritual events.', avatar: '/images/artists/artist-5.png', order: 5 },
      { name: 'The Rahul Band', role: 'Band Member', specialty: 'Live Band', bio: 'A 6-piece live band for concerts and stage shows.', avatar: '/images/artists/artist-6.png', order: 6 },
    ];

    for (const a of artists) {
      await db.artist.create({
        data: { ...a, social: JSON.stringify({ youtube: '#', instagram: '#', facebook: '#' }), published: true },
      }).catch(() => {});
    }

    // Videos
    const videos = [
      { title: 'Jagran Live Performance', category: 'Spiritual', youtubeId: 'dQw4w9WgXcQ', description: 'Highlights from a live Jagran performance.' },
      { title: 'Hanuman Aradhna Bhajan', category: 'Spiritual', youtubeId: 'dQw4w9WgXcQ', description: 'Soulful Hanuman bhajan from a recent Aradhna.' },
      { title: 'Track Singing at Wedding', category: 'Wedding', youtubeId: 'dQw4w9WgXcQ', description: 'Live track singing at a wedding reception.' },
      { title: 'Sangeet Night Highlights', category: 'Wedding', youtubeId: 'dQw4w9WgXcQ', description: 'Energetic sangeet night with live singing.' },
      { title: 'Sufi Night Performance', category: 'Singing', youtubeId: 'dQw4w9WgXcQ', description: 'Sufi qawwali night performance.' },
      { title: 'Bollywood Night Live', category: 'Singing', youtubeId: 'dQw4w9WgXcQ', description: 'Bollywood hits night with live band.' },
    ];

    for (const v of videos) {
      await db.video.create({
        data: { ...v, thumbnail: `https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`, published: true },
      }).catch(() => {});
    }

    // Upcoming Events
    const upcoming = [
      { title: 'Maha Jagran Night', category: 'Spiritual', eventDate: '2026-08-15', eventTime: '08:00 PM', venue: 'Shri Ram Mandir Ground', city: 'Delhi', description: 'All-night Maha Jagran with renowned bhajan singers.' },
      { title: 'Hanuman Aradhna', category: 'Spiritual', eventDate: '2026-08-22', eventTime: '06:00 PM', venue: 'Hanuman Temple Hall', city: 'Noida', description: 'Special Hanuman Aradhna with Sundarkand Path.' },
      { title: 'Sangeet Night - Rohit & Priya', category: 'Wedding', eventDate: '2026-09-05', eventTime: '07:00 PM', venue: 'Grand Palace Resort', city: 'Gurgaon', description: 'Live sangeet night with singing and dance.' },
      { title: 'Bollywood Night Live', category: 'Singing', eventDate: '2026-09-12', eventTime: '09:00 PM', venue: 'City Club', city: 'Delhi', description: 'Bollywood hits night with live band.' },
      { title: 'Bhajan Sandhya', category: 'Spiritual', eventDate: '2026-09-20', eventTime: '05:00 PM', venue: 'Community Hall', city: 'Faridabad', description: 'Evening of devotional bhajans.' },
    ];

    for (const u of upcoming) {
      await db.upcomingEvent.create({
        data: { ...u, coverImage: '/images/events/jagran.png', published: true },
      }).catch(() => {});
    }

    // Gallery items
    const galleryItems = [
      { title: 'Jagran Night', category: 'Spiritual', type: 'photo', url: '/images/events/jagran.png', description: 'All-night devotional Jagran with bhajans.' },
      { title: 'Hanuman Aradhna', category: 'Spiritual', type: 'photo', url: '/images/events/hanuman-aradhna.png', description: 'Sacred Hanuman worship ceremony.' },
      { title: 'Mata Ki Chowki', category: 'Spiritual', type: 'photo', url: '/images/events/mata-ki-chowki.png', description: 'Devotional Mata Ki Chowki evening.' },
      { title: 'Track Singing Live', category: 'Singing', type: 'photo', url: '/images/events/track-singing.png', description: 'Live track singing performance.' },
      { title: 'Sufi Night', category: 'Singing', type: 'photo', url: '/images/events/sufi-night.png', description: 'Soulful Sufi music evening.' },
      { title: 'Wedding Singing', category: 'Wedding', type: 'photo', url: '/images/events/wedding-singing.png', description: 'Live singing at a wedding.' },
      { title: 'Sangeet Night', category: 'Wedding', type: 'photo', url: '/images/events/sangeet-night.png', description: 'Musical sangeet celebration.' },
      { title: 'Live Band Concert', category: 'Stage Shows', type: 'photo', url: '/images/events/live-band.png', description: 'Live band on stage.' },
      { title: 'Jagran Highlights', category: 'Spiritual', type: 'video', url: '/images/events/jagran.png', youtubeId: 'dQw4w9WgXcQ', description: 'Watch highlights from our Jagran performance.' },
      { title: 'Wedding Song Medley', category: 'Wedding', type: 'video', url: '/images/events/wedding-singing.png', youtubeId: 'dQw4w9WgXcQ', description: 'Medley of wedding songs performed live.' },
    ];

    for (const g of galleryItems) {
      await db.galleryItem.create({
        data: { ...g, thumbnail: g.url, published: true },
      }).catch(() => {});
    }

    // Testimonials
    const testimonials = [
      { name: 'Suresh Agarwal', role: 'Family Head', rating: 5, message: 'Rahul ji ki team ne hamare Jagran ko yaadgaar bana diya. Bhajan aur kirtan ki selection bahut achhi thi.', event: 'Jagran' },
      { name: 'Priya & Rohit', role: 'Newlyweds', rating: 5, message: 'Hamari sangeet night mein live singing bahut hi shaandaar thi. Sab guests ne bahut enjoy kiya.', event: 'Sangeet Night' },
      { name: 'Anil Pandey', role: 'Temple Committee', rating: 5, message: 'Hanuman Aradhna ke liye RahulEventsNight best hai. Sundarkand Path aur bhajans bahut devotional the.', event: 'Hanuman Aradhna' },
      { name: 'Meena Gupta', role: 'Mother of the Bride', rating: 5, message: 'Wedding singing ceremony ke liye unhe book kiya. Gaane ki choice aur performance dono perfect thi.', event: 'Wedding Singing' },
      { name: 'Rajesh Khurana', role: 'Corporate HR', rating: 5, message: 'Company annual function ke liye live band arrange kiya. Performance ne sabko mesmerise kar diya.', event: 'Corporate Function' },
      { name: 'Sunita Devi', role: 'Devotee', rating: 5, message: 'Mata Ki Chowki mein Gayatri ji ki awaaz ne sabka dil chhoo liya. Bahut hi sundar bhajans the.', event: 'Mata Ki Chowki' },
    ];

    for (const t of testimonials) {
      await db.testimonial.create({ data: { ...t, published: true } }).catch(() => {});
    }

    // Site settings
    const settings = [
      { key: 'companyName', value: 'RahulEventsNight' },
      { key: 'companyNameHindi', value: 'राहुल इवेंट्स नाईट' },
      { key: 'tagline', value: 'Every Event, Every Emotion, One Stage' },
      { key: 'taglineHindi', value: 'हर पल यादगार, हर इवेंट शानदार' },
      { key: 'tagline2', value: 'आपका विश्वास, हमारी पहचान' },
      { key: 'phone', value: '9709954777' },
      { key: 'phoneDisplay', value: '+91 97099 54777' },
      { key: 'whatsapp', value: '7979962408' },
      { key: 'email', value: 'officialrohit0201@gmail.com' },
      { key: 'website', value: 'rahuleventsnight.online' },
      { key: 'address', value: 'Attardah Pokhariyapith near Ujjwal Vidyapith School 842002' },
      { key: 'instagram', value: '#' },
      { key: 'facebook', value: '#' },
      { key: 'youtube', value: '#' },
      { key: 'stats_events', value: '500+' },
      { key: 'stats_clients', value: '1000+' },
      { key: 'stats_years', value: '15' },
      { key: 'stats_artists', value: '25+' },
    ];

    for (const s of settings) {
      await db.siteSetting.create({ data: s }).catch(() => {});
    }

    return ok({
      message: 'Database seeded successfully!',
      counts: {
        events: events.length,
        artists: artists.length,
        videos: videos.length,
        upcoming: upcoming.length,
        gallery: galleryItems.length,
        testimonials: testimonials.length,
        settings: settings.length,
      },
      admin: 'admin@rahuleventsnight.com / admin123',
    });
  } catch (e: any) {
    return serverError(e.message);
  }
}
