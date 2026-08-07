#!/bin/bash
# Generate all remaining images using z-ai CLI
set -u

OUT=/home/z/my-project/public/images

gen() {
  local name="$1" dir="$2" size="$3" prompt="$4"
  local outdir="$OUT/$dir"
  local outpath="$outdir/$name.png"
  mkdir -p "$outdir"
  if [ -f "$outpath" ] && [ $(stat -c%s "$outpath" 2>/dev/null || echo 0) -gt 10000 ]; then
    echo "SKIP $name (exists)"
    return 0
  fi
  echo "GEN  $name ..."
  if z-ai image -p "$prompt" -o "$outpath" -s "$size" > /tmp/z-ai-stderr.log 2>&1; then
    local sz=$(stat -c%s "$outpath" 2>/dev/null || echo 0)
    echo "OK   $name ($sz bytes)"
  else
    echo "FAIL $name — retry in 5s"
    cat /tmp/z-ai-stderr.log | tail -3
    sleep 5
    if z-ai image -p "$prompt" -o "$outpath" -s "$size" > /tmp/z-ai-stderr.log 2>&1; then
      echo "OK   $name (on retry)"
    else
      echo "FAIL $name (final)"
      cat /tmp/z-ai-stderr.log | tail -3
    fi
  fi
  sleep 2
}

# Services (8)
gen "corporate" "services" "1024x1024" "Upscale corporate gala event, modern conference hall with gold accent lighting, black stage with white podium, professional audience, premium business event, high quality, sophisticated"
gen "dj-night" "services" "1024x1024" "Vibrant DJ night party scene, golden laser lights, black DJ booth, white smoke effects, energetic crowd with hands up, club atmosphere, black and gold luxury theme, professional photography"
gen "photography" "services" "1024x1024" "Professional event photographer with camera at luxury wedding, golden hour lighting, black camera, elegant event background, premium photography service, high quality, cinematic"
gen "videography" "services" "1024x1024" "Professional videographer filming luxury event with cinema camera on gimbal, golden lights, elegant ballroom, premium videography service, cinematic shot, high quality"
gen "decoration" "services" "1024x1024" "Luxurious event decoration detail, golden floral centerpieces, white roses, black tablecloth, elegant candle holders, opulent table setting, black gold white theme, professional photography"
gen "sound" "services" "1024x1024" "Professional sound system setup on stage, large black speakers, gold accent lighting, mixing console, premium audio equipment for events, high quality, dramatic stage lighting"

# Gallery (8)
gen "gallery-1" "gallery" "1344x768" "Stunning luxury wedding reception hall with golden chandeliers, white floral ceiling installation, black elegant chairs, romantic atmosphere, professional event photography, high quality"
gen "gallery-2" "gallery" "1344x768" "Elegant birthday celebration with golden balloon arch, luxury cake table, white roses, black and gold decor, festive premium atmosphere, professional photography, high quality"
gen "gallery-3" "gallery" "1344x768" "Corporate award gala night, golden stage lighting, black elegant stage, white podium, professional audience in formal attire, premium business event, high quality"
gen "gallery-4" "gallery" "1344x768" "DJ night club party with golden laser beams, black DJ booth, white fog, energetic crowd dancing, luxury nightclub atmosphere, professional photography, high quality"
gen "gallery-5" "gallery" "1344x768" "Beautiful Indian wedding mandap with gold and white floral decorations, romantic candle lighting, luxury ceremony setup, professional photography, high quality, opulent"
gen "gallery-6" "gallery" "1344x768" "Luxury event table setting detail, gold cutlery, white plates, black napkins, elegant floral centerpiece, candle light, premium dining setup, professional photography"
gen "gallery-7" "gallery" "1344x768" "Grand outdoor wedding reception at night, string lights, golden lanterns, white elegant tables, black lounge furniture, romantic luxury atmosphere, professional photography, high quality"
gen "gallery-8" "gallery" "1344x768" "Stage performance at luxury corporate event, golden spotlights, black backdrop, white LED screen, professional speaker, premium conference production, high quality"

# Team (4)
gen "team-1" "team" "1024x1024" "Professional headshot of confident Indian male event manager in elegant black suit, white shirt, neutral dark background, premium corporate photography, high quality"
gen "team-2" "team" "1024x1024" "Professional headshot of confident Indian female event planner in elegant black dress, gold jewelry, neutral dark background, premium corporate photography, high quality"
gen "team-3" "team" "1024x1024" "Professional headshot of confident male DJ in stylish black outfit with gold accessories, neutral dark background, premium portrait photography, high quality"
gen "team-4" "team" "1024x1024" "Professional headshot of confident female event decorator in elegant black outfit, gold earrings, neutral dark background, premium portrait photography, high quality"

echo ""
echo "=== ALL DONE ==="
ls -la $OUT/*/*.png 2>/dev/null | wc -l
