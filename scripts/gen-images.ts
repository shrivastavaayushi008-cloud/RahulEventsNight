// Image generation script for RahulEventsNight
// Theme: Black / Gold / White luxury event management
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT = '/home/z/my-project/public/images';

type Job = { name: string; dir: string; size: string; prompt: string };

const jobs: Job[] = [
  // Hero (use 1344x768 - both div by 32, within 512-2880)
  {
    name: 'hero-main',
    dir: 'hero',
    size: '1344x768',
    prompt:
      'Luxurious grand ballroom event venue at night, opulent gold chandeliers, black marble floor, white elegant table settings, golden ambient lighting, cinematic wide shot, premium wedding reception hall, professional event photography, high quality, dramatic lighting, black gold white color theme',
  },
  // Services (8)
  {
    name: 'wedding',
    dir: 'services',
    size: '1024x1024',
    prompt:
      'Elegant luxury Indian wedding ceremony setup, gold and white mandap with floral decorations, romantic candle lighting, black and gold theme, professional wedding photography, high quality, opulent',
  },
  {
    name: 'birthday',
    dir: 'services',
    size: '1024x1024',
    prompt:
      'Luxurious birthday party celebration setup, golden balloons, elegant black and gold cake, white floral arrangements, festive premium decor, professional event photography, high quality',
  },
  {
    name: 'corporate',
    dir: 'services',
    size: '1024x1024',
    prompt:
      'Upscale corporate gala event, modern conference hall with gold accent lighting, black stage with white podium, professional audience, premium business event, high quality, sophisticated',
  },
  {
    name: 'dj-night',
    dir: 'services',
    size: '1024x1024',
    prompt:
      'Vibrant DJ night party scene, golden laser lights, black DJ booth, white smoke effects, energetic crowd with hands up, club atmosphere, black and gold luxury theme, professional photography',
  },
  {
    name: 'photography',
    dir: 'services',
    size: '1024x1024',
    prompt:
      'Professional event photographer with camera at luxury wedding, golden hour lighting, black camera, elegant event background, premium photography service, high quality, cinematic',
  },
  {
    name: 'videography',
    dir: 'services',
    size: '1024x1024',
    prompt:
      'Professional videographer filming luxury event with cinema camera on gimbal, golden lights, elegant ballroom, premium videography service, cinematic shot, high quality',
  },
  {
    name: 'decoration',
    dir: 'services',
    size: '1024x1024',
    prompt:
      'Luxurious event decoration detail, golden floral centerpieces, white roses, black tablecloth, elegant candle holders, opulent table setting, black gold white theme, professional photography',
  },
  {
    name: 'sound',
    dir: 'services',
    size: '1024x1024',
    prompt:
      'Professional sound system setup on stage, large black speakers, gold accent lighting, mixing console, premium audio equipment for events, high quality, dramatic stage lighting',
  },
  // Gallery (8 photos)
  {
    name: 'gallery-1',
    dir: 'gallery',
    size: '1344x768',
    prompt:
      'Stunning luxury wedding reception hall with golden chandeliers, white floral ceiling installation, black elegant chairs, romantic atmosphere, professional event photography, high quality',
  },
  {
    name: 'gallery-2',
    dir: 'gallery',
    size: '1344x768',
    prompt:
      'Elegant birthday celebration with golden balloon arch, luxury cake table, white roses, black and gold decor, festive premium atmosphere, professional photography, high quality',
  },
  {
    name: 'gallery-3',
    dir: 'gallery',
    size: '1344x768',
    prompt:
      'Corporate award gala night, golden stage lighting, black elegant stage, white podium, professional audience in formal attire, premium business event, high quality',
  },
  {
    name: 'gallery-4',
    dir: 'gallery',
    size: '1344x768',
    prompt:
      'DJ night club party with golden laser beams, black DJ booth, white fog, energetic crowd dancing, luxury nightclub atmosphere, professional photography, high quality',
  },
  {
    name: 'gallery-5',
    dir: 'gallery',
    size: '1344x768',
    prompt:
      'Beautiful Indian wedding mandap with gold and white floral decorations, romantic candle lighting, luxury ceremony setup, professional photography, high quality, opulent',
  },
  {
    name: 'gallery-6',
    dir: 'gallery',
    size: '1344x768',
    prompt:
      'Luxury event table setting detail, gold cutlery, white plates, black napkins, elegant floral centerpiece, candle light, premium dining setup, professional photography',
  },
  {
    name: 'gallery-7',
    dir: 'gallery',
    size: '1344x768',
    prompt:
      'Grand outdoor wedding reception at night, string lights, golden lanterns, white elegant tables, black lounge furniture, romantic luxury atmosphere, professional photography, high quality',
  },
  {
    name: 'gallery-8',
    dir: 'gallery',
    size: '1344x768',
    prompt:
      'Stage performance at luxury corporate event, golden spotlights, black backdrop, white LED screen, professional speaker, premium conference production, high quality',
  },
  // Team (4)
  {
    name: 'team-1',
    dir: 'team',
    size: '1024x1024',
    prompt:
      'Professional headshot of confident Indian male event manager in elegant black suit, white shirt, neutral dark background, premium corporate photography, high quality',
  },
  {
    name: 'team-2',
    dir: 'team',
    size: '1024x1024',
    prompt:
      'Professional headshot of confident Indian female event planner in elegant black dress, gold jewelry, neutral dark background, premium corporate photography, high quality',
  },
  {
    name: 'team-3',
    dir: 'team',
    size: '1024x1024',
    prompt:
      'Professional headshot of confident male DJ in stylish black outfit with gold accessories, neutral dark background, premium portrait photography, high quality',
  },
  {
    name: 'team-4',
    dir: 'team',
    size: '1024x1024',
    prompt:
      'Professional headshot of confident female event decorator in elegant black outfit, gold earrings, neutral dark background, premium portrait photography, high quality',
  },
];

async function gen(zai: any, job: Job) {
  const outDir = path.join(OUT, job.dir);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${job.name}.png`);
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 10000) {
    console.log(`SKIP ${job.name} (exists)`);
    return { ...job, ok: true, cached: true };
  }
  // Retry with backoff
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size as any,
      });
      const b64 = res.data[0].base64;
      fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
      console.log(`OK   ${job.name} (${fs.statSync(outPath).size} bytes)`);
      return { ...job, ok: true, cached: false };
    } catch (e: any) {
      const isRate = e.message.includes('429');
      console.error(`FAIL ${job.name} (attempt ${attempt}): ${e.message}`);
      if (attempt < 4) {
        const wait = isRate ? attempt * 10000 : attempt * 4000;
        await new Promise(r => setTimeout(r, wait));
      } else {
        return { ...job, ok: false, error: e.message };
      }
    }
  }
  return { ...job, ok: false, error: 'max retries' };
}

async function main() {
  const zai = await ZAI.create();
  const concurrency = 1; // sequential to avoid 429
  const results: any[] = [];
  for (let i = 0; i < jobs.length; i += concurrency) {
    const batch = jobs.slice(i, i + concurrency);
    console.log(`\n=== Item ${i + 1}/${jobs.length}: ${batch.map(b => b.name).join(', ')} ===`);
    const res = await Promise.all(batch.map(j => gen(zai, j)));
    results.push(...res);
    // 2s pause between requests
    if (i + concurrency < jobs.length) await new Promise(r => setTimeout(r, 2000));
  }
  const ok = results.filter(r => r.ok).length;
  console.log(`\n=== Done: ${ok}/${results.length} images generated ===`);
  const failed = results.filter(r => !r.ok);
  if (failed.length) {
    console.log('Failed:', failed.map(f => f.name));
  }
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
