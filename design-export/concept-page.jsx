// concept-page.jsx — Screengram marketing site.
// Classic app landing page: hero, the loop, features, layouts, CTA, footer.

const { useState, useEffect, useMemo, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cream",
  "accentIntensity": "warm",
  "heroLayout": "pip",
  "heroCorner": "bl"
}/*EDITMODE-END*/;

const PALETTES = {
  cream:     { bg:'#f0e7d3', paper:'#f5ecd9', card:'#fbf6e8', ink:'#1a140e', faded:'#6e5f48', rule:'#1a140e', accent:'#a3431a' },
  sepia:     { bg:'#d8c8a4', paper:'#dec9a0', card:'#e6d4a8', ink:'#2a1a0c', faded:'#6e4d2a', rule:'#2a1a0c', accent:'#7a2c0e' },
  newsprint: { bg:'#f3efe6', paper:'#fbf8f1', card:'#fff',    ink:'#0e0e0d', faded:'#5a584f', rule:'#0e0e0d', accent:'#0e0e0d' },
  ink:       { bg:'#181612', paper:'#1f1d18', card:'#241f18', ink:'#e8dcc2', faded:'#9a8e74', rule:'#e8dcc2', accent:'#d96930' },
};

// Tonal background gradients for the photo half of composites
const TONES = {
  warm: 'linear-gradient(135deg,#e8b07c 0%,#a45a26 55%,#3d1a08 100%)',
  cool: 'linear-gradient(135deg,#6a7c98 0%,#2a3a58 55%,#0e1828 100%)',
  dim:  'linear-gradient(135deg,#3a2e22 0%,#1a120a 55%,#0a0604 100%)',
  rust: 'linear-gradient(135deg,#d8794a 0%,#7a2c0e 60%,#2a0e04 100%)',
  noon: 'linear-gradient(135deg,#f6e6c4 0%,#d8a070 55%,#7a4a26 100%)',
};

// ─── Root ─────────────────────────────────────────────────────────
function ConceptPage() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const p = PALETTES[t.palette] || PALETTES.cream;

  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--bg', p.bg);
    r.setProperty('--paper', p.paper);
    r.setProperty('--card', p.card);
    r.setProperty('--ink', p.ink);
    r.setProperty('--faded', p.faded);
    r.setProperty('--rule', p.rule);
    r.setProperty('--accent', p.accent);
    document.body.dataset.palette = t.palette;
  }, [p, t.palette]);

  return (
    <div className="mk">
      <Nav />
      <Hero t={t} />
      <Pitch />
      <Loop />
      <Features />
      <Layouts />
      <Quotes />
      <FinalCTA />
      <Footer />

      <TweaksPanel title="Screengram">
        <TweakSection label="Palette">
          <TweakColor label="Theme" value={t.palette}
            options={[
              { value:'cream', label:'Cream' },
              { value:'sepia', label:'Sepia' },
              { value:'newsprint', label:'Newsprint' },
              { value:'ink', label:'Ink' },
            ]}
            onChange={(v) => setTweak('palette', v)} />
        </TweakSection>
        <TweakSection label="Hero">
          <TweakRadio label="Layout" value={t.heroLayout}
            options={[
              { value:'pip', label:'PiP' },
              { value:'sbs', label:'Side' },
              { value:'stack', label:'Stack' },
            ]}
            onChange={(v) => setTweak('heroLayout', v)} />
          <TweakRadio label="Corner" value={t.heroCorner}
            options={[
              { value:'tl', label:'TL' },
              { value:'tr', label:'TR' },
              { value:'bl', label:'BL' },
              { value:'br', label:'BR' },
            ]}
            onChange={(v) => setTweak('heroCorner', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────
function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-mark" href="#top">
          <span className="nav-mark-s">:S</span>
          <span className="nav-mark-name">screengram</span>
        </a>
        <nav className="nav-links">
          <a href="#how">how it works</a>
          <a href="#features">features</a>
          <a href="#layouts">layouts</a>
          <a href="Screengram App.html">try the demo</a>
        </nav>
        <a className="nav-cta" href="#cta">
          <span className="nav-cta-dot" />
          join the TestFlight
        </a>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero({ t }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="hero-dot" />
            <span className="mono">new for iOS · TestFlight open</span>
          </div>
          <h1 className="hero-h">
            your screenshots,<br/>
            <em>plus</em> where you were<br/>
            when you took them.
          </h1>
          <p className="hero-sub">
            Screengram pairs every screenshot with a photo of the room.
            One image, two realities — filed into a tiny private library
            that only you can see.
          </p>
          <div className="hero-cta-row">
            <a className="btn btn-primary" href="#cta">
              <span>join the TestFlight</span>
              <span className="arr">→</span>
            </a>
            <a className="btn btn-ghost" href="Screengram App.html">
              <span>open the live demo</span>
              <span className="arr">↗</span>
            </a>
          </div>
          <div className="hero-meta mono">
            <span>iOS 17+</span>
            <span className="dotsep" />
            <span>free, no account</span>
            <span className="dotsep" />
            <span>private by default</span>
          </div>
        </div>

        <div className="hero-stage">
          <PhoneMock big photoSrc="images/vol-1-photo.jpg" inset={<window.MockSafari />}
                     layout={t.heroLayout} corner={t.heroCorner}
                     caption="will rogers beach — sun 6:31 pm" />
          <div className="hero-confetti">
            <span className="conf c1" />
            <span className="conf c2" />
            <span className="conf c3" />
            <span className="conf c4" />
          </div>
        </div>
      </div>

      <div className="hero-strip">
        <span className="mono">a screengram is —</span>
        <span className="strip-chip"><em>📱</em> a screenshot</span>
        <span className="strip-plus">＋</span>
        <span className="strip-chip"><em>📷</em> a photo</span>
        <span className="strip-eq">=</span>
        <span className="strip-chip strip-chip-accent">one image you'll actually remember</span>
      </div>
    </section>
  );
}

// ─── Pitch — three quick beats ────────────────────────────────────
function Pitch() {
  const items = [
    { n:'01', h:'screenshot anything.',
      b:'A recipe. A map. The receipt for the thing you keep meaning to return. iOS does what it always does.' },
    { n:'02', h:'open screengram.',
      b:'It already has the screenshot waiting. Tap GO — the back camera opens with the screenshot floating in the viewfinder.' },
    { n:'03', h:'frame the room. file it.',
      b:'Drag the screenshot anywhere. Hit the shutter. Pick a layout. Now you have proof you were actually somewhere.' },
  ];
  return (
    <section className="pitch" id="how">
      <div className="section-h">
        <div className="mono small">— how it works —</div>
        <h2>three taps, one weirdly honest photo.</h2>
      </div>
      <div className="pitch-grid">
        {items.map((it) => (
          <div key={it.n} className="pitch-card">
            <div className="pitch-n mono">{it.n}</div>
            <h3>{it.h}</h3>
            <p>{it.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── The Loop — annotated phone screens ───────────────────────────
function Loop() {
  const steps = [
    {
      label:'home', kind:'home',
      headline:'use the latest, or just go.',
      body:'Take a screenshot anywhere on iOS, then open Screengram. The Home screen detects it and offers a one-tap "use latest" hero. Or tap GO and pick from your photos.'
    },
    {
      label:'camera', kind:'cam',
      headline:'the screenshot is in the viewfinder.',
      body:'Translucent overlay shows you exactly where the screenshot will land. Drag it, pinch to resize, anchor it to a corner. Frame the room. Tap the shutter.'
    },
    {
      label:'review', kind:'review',
      headline:'pip, side, or stack.',
      body:"Three composite layouts. Add a single italic caption that floats on the photo. Don't like it? Retake. Like it? File it to your library."
    },
    {
      label:'library', kind:'library',
      headline:'a tiny private archive.',
      body:'Search by caption or place. Filter by month or album. Tap any tile to open the detail view — share, export a reveal reel, or add it to an album.'
    },
  ];
  return (
    <section className="loop">
      <div className="section-h">
        <div className="mono small">— the loop —</div>
        <h2>screenshot → room → library.</h2>
        <p className="section-sub">It takes about eight seconds. We timed it.</p>
      </div>
      <div className="loop-stack">
        {steps.map((s, i) => (
          <div key={s.kind} className={'loop-row ' + (i % 2 ? 'reverse' : '')}>
            <div className="loop-phone">
              <LoopScreen kind={s.kind} />
              <div className="loop-tag mono">{s.label}</div>
            </div>
            <div className="loop-copy">
              <div className="loop-step mono small">step 0{i + 1}</div>
              <h3>{s.headline}</h3>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LoopScreen({ kind }) {
  if (kind === 'home') return <PhoneFrame><HomeScreen /></PhoneFrame>;
  if (kind === 'cam') return <PhoneFrame><CamScreen /></PhoneFrame>;
  if (kind === 'review') return <PhoneFrame><ReviewScreen /></PhoneFrame>;
  if (kind === 'library') return <PhoneFrame><LibraryScreen /></PhoneFrame>;
  return <PhoneFrame />;
}

// ─── Features grid ────────────────────────────────────────────────
function Features() {
  const f = [
    { ico:'☼', h:'daily prompt',
      b:'A Wordle-shaped nudge. One screengram a day, on a shared question.' },
    { ico:'⊞', h:'three layouts',
      b:'PiP, side-by-side, stacked. Same content, different rhythm.' },
    { ico:'▶', h:'reveal reels',
      b:'Export a tiny video where the room dissolves to reveal the screenshot. 1080×1920, h.264.' },
    { ico:'▤', h:'albums',
      b:"Group screengrams without moving them. A screengram can live in many. Or none." },
    { ico:'◉', h:'home screen widget',
      b:'Your latest screengram on your lock screen and home. Three sizes.' },
    { ico:'⤴', h:'share extension',
      b:"From the Photos share sheet, send a screenshot straight to Screengram. The room camera opens immediately." },
    { ico:'⌕', h:'search & filter',
      b:'Search captions and places. Filter by month or album. Find that screengram from Tuesday.' },
    { ico:'⊘', h:'private by default',
      b:'No feed. No followers. No cloud. Your library lives on your phone until you say otherwise.' },
  ];
  return (
    <section className="features" id="features">
      <div className="section-h">
        <div className="mono small">— what's inside —</div>
        <h2>small app. big rectangle energy.</h2>
      </div>
      <div className="feat-grid">
        {f.map((it) => (
          <div key={it.h} className="feat-card">
            <div className="feat-ico">{it.ico}</div>
            <h3>{it.h}</h3>
            <p>{it.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Layouts showcase ────────────────────────────────────────────
function Layouts() {
  const [layout, setLayout] = useState('pip');
  const [corner, setCorner] = useState('bl');
  return (
    <section className="layouts" id="layouts">
      <div className="layouts-text">
        <div className="mono small">— three layouts —</div>
        <h2>same pair. different vibe.</h2>
        <p>
          Same screenshot, same photo. Switch how they sit together.
          Pick whichever one says the truer thing today.
        </p>
        <div className="lay-controls">
          <div className="seg">
            {[
              ['pip','PiP'], ['sbs','side-by-side'], ['stack','stack'],
            ].map(([v, l]) => (
              <button key={v} data-on={layout === v ? '1' : '0'} onClick={() => setLayout(v)}>{l}</button>
            ))}
          </div>
          {layout === 'pip' && (
            <div className="seg seg-mini">
              {['tl','tr','bl','br'].map((c) => (
                <button key={c} data-on={corner === c ? '1' : '0'} onClick={() => setCorner(c)}>{c.toUpperCase()}</button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="layouts-stage">
        <PhoneMock big photoSrc="images/p-kitchen-warm.png" inset={<window.MockNotes />}
                   layout={layout} corner={corner}
                   caption="desk, before light — tue 6:51 am" />
      </div>
    </section>
  );
}

// ─── Pull quotes / proof ─────────────────────────────────────────
function Quotes() {
  const qs = [
    { q:'I have 4,000 screenshots in my camera roll. I remember three of them. This fixes that.',
      who:'beta tester · brooklyn' },
    { q:"It's like a diary that mostly draws itself.",
      who:'beta tester · oakland' },
    { q:'Finally a use for the back camera that isn\'t pretending to be a photographer.',
      who:'beta tester · austin' },
  ];
  return (
    <section className="quotes">
      <div className="qrow">
        {qs.map((it, i) => (
          <figure key={i} className="qcard">
            <blockquote>"{it.q}"</blockquote>
            <figcaption className="mono small">— {it.who}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

// ─── Final CTA strip ─────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="cta" id="cta">
      <div className="cta-card">
        <div className="cta-text">
          <div className="mono small cta-eye">— ready? —</div>
          <h2><em>screengram</em> something.</h2>
          <p>The TestFlight is open. iOS 17+. Free. No account.</p>
        </div>
        <div className="cta-actions">
          <a className="btn btn-on-accent" href="#">
            <span>join the TestFlight</span>
            <span className="arr">→</span>
          </a>
          <a className="btn-link" href="Screengram App.html">or try the live demo first ↗</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="foot-row">
        <div className="foot-col">
          <div className="mono small">PUBLISHER</div>
          <div>screengram press</div>
        </div>
        <div className="foot-col">
          <div className="mono small">SET IN</div>
          <div>newsreader &amp; jetbrains mono</div>
        </div>
        <div className="foot-col">
          <div className="mono small">EST.</div>
          <div>2026, late</div>
        </div>
        <div className="foot-col">
          <div className="mono small">CONTACT</div>
          <div>hi@screengram.app</div>
        </div>
      </div>
      <div className="foot-tag">
        <em>what you were looking at, and where you were while you looked at it.</em>
      </div>
      <div className="foot-meta mono small">
        © 2026 — printed on a rectangle.
      </div>
    </footer>
  );
}

// ─── Building blocks ──────────────────────────────────────────────

// PhoneMock: a phone-shaped bezel containing a composite (photo + inset
// screenshot). `inset` is the screen component for the inset. The
// outer "photo" is rendered from `photoSrc` if provided, otherwise as
// a tonal gradient via TONES[tone].
function PhoneMock({ big, tone='warm', photoSrc, inset, layout='pip', corner='bl', caption }) {
  const bgStyle = photoSrc
    ? { backgroundImage: `url('${photoSrc}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: TONES[tone] || TONES.warm };
  return (
    <div className={'pm ' + (big ? 'pm-big' : '')}>
      <div className="pm-bezel">
        <div className="pm-island" />
        <div className={'pm-inner pm-' + layout}>
          {layout === 'sbs' ? (
            <>
              <div className="pm-photo" style={bgStyle} />
              <div className="pm-screen-side">{inset}</div>
            </>
          ) : layout === 'stack' ? (
            <>
              <div className="pm-photo" style={bgStyle} />
              <div className="pm-screen-stack">{inset}</div>
            </>
          ) : (
            <>
              <div className="pm-photo" style={bgStyle} />
              <div className={'pm-screen-pip pm-corner-' + corner}>{inset}</div>
            </>
          )}
          {caption && (
            <div className="pm-caption mono">{caption}</div>
          )}
        </div>
      </div>
      <div className="pm-shadow" />
    </div>
  );
}

// PhoneFrame: a smaller phone-shaped frame for the loop section. Renders
// any child as the full screen.
function PhoneFrame({ children }) {
  return (
    <div className="pf">
      <div className="pf-bezel">
        <div className="pf-island" />
        <div className="pf-inner">{children}</div>
      </div>
    </div>
  );
}

// ─── In-app screen approximations (loop section) ─────────────────
function HomeScreen() {
  return (
    <div className="screen scr-home">
      <div className="scr-status">9:41</div>
      <div className="scr-home-mast">
        <em className="scr-home-em">screengram</em>.
      </div>
      <div className="scr-home-strip">
        <span /><span /><span /><span /><span />
      </div>
      <div className="scr-home-prompt">
        <div className="mono small scr-home-prompt-h">
          <span className="scr-home-dot" /> today's prompt · day 47
        </div>
        <div className="scr-home-prompt-t">
          what you were reading at lunch.
        </div>
        <div className="scr-home-prompt-actions">
          <span className="scr-pill-dark">● TAKE IT</span>
          <span className="scr-pill-skip">skip</span>
        </div>
      </div>
      <div className="scr-home-go">
        <div className="scr-go-ring" />
        <div className="scr-go-core">GO</div>
      </div>
      <div className="scr-home-latest">
        <div className="scr-latest-thumb" />
        <div className="scr-latest-txt">
          <div className="mono small">USE LATEST</div>
          <div className="scr-latest-sub">taken just now</div>
        </div>
        <div className="scr-latest-arr">→</div>
      </div>
      <div className="scr-tabs">
        <span data-on="1" /><span /><span /><span /><span />
      </div>
    </div>
  );
}

function CamScreen() {
  return (
    <div className="screen scr-cam">
      <div className="scr-cam-vf">
        <div className="scr-cam-corners">
          <span /><span /><span /><span />
        </div>
        <div className="scr-cam-overlay">
          <window.MockSafari />
        </div>
        <div className="scr-cam-tip mono small">drag · pinch</div>
        <div className="scr-cam-pill mono small">
          <span className="scr-home-dot" /> frame the room
        </div>
      </div>
      <div className="scr-cam-controls">
        <span className="scr-cam-side mono small">retake</span>
        <div className="scr-cam-shutter">
          <div className="scr-cam-shutter-core" />
        </div>
        <span className="scr-cam-side mono small">zoom</span>
      </div>
    </div>
  );
}

function ReviewScreen() {
  return (
    <div className="screen scr-review">
      <div className="scr-review-h">
        <div className="mono small">— review —</div>
        <div className="scr-review-h-t"><em>file it.</em></div>
      </div>
      <div className="scr-review-stage">
        <div className="scr-review-bg" />
        <div className="scr-review-pip">
          <window.MockMaps />
        </div>
        <div className="scr-review-cap">heaven is a place on earth</div>
      </div>
      <div className="scr-review-seg">
        <span data-on="1">PIP</span><span>SBS</span><span>STACK</span>
      </div>
      <div className="scr-review-actions">
        <span className="scr-pill-ghost">retake</span>
        <span className="scr-pill-dark scr-pill-grow">file to library</span>
      </div>
    </div>
  );
}

function LibraryScreen() {
  const tiles = [0, 1, 2, 3, 4, 5];
  const mocks = ['MockMaps','MockMessages','MockMusic','MockNotes','MockSafari','MockCalendar'];
  return (
    <div className="screen scr-lib">
      <div className="scr-lib-title">library</div>
      <div className="scr-lib-search mono small">⌕ search captions, places</div>
      <div className="scr-lib-chips">
        <span className="scr-chip mono small">by album</span>
        <span className="scr-chip mono small">by month</span>
      </div>
      <div className="scr-lib-grid">
        {tiles.map((i) => {
          const M = window[mocks[i]];
          return (
            <div key={i} className="scr-lib-cell">
              <div className="scr-lib-bg" />
              <div className="scr-lib-pip"><M /></div>
            </div>
          );
        })}
      </div>
      <div className="scr-tabs">
        <span /><span data-on="1" /><span /><span /><span />
      </div>
    </div>
  );
}

// ─── Mount ──────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ConceptPage />);
