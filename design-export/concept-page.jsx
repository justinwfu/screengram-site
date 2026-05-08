// concept-page.jsx — Screengram concept/manifesto page.
// Static-feeling layout, but built in React so we can drive the gallery
// composition (PiP corner, layout variant, palette) from a Tweaks panel.

const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cream",
  "layout": "pip",
  "pipCorner": "bl",
  "wordmark": "italic",
  "vintage": true,
  "issueNumber": "01",
  "showCaptions": true,
  "compact": false
}/*EDITMODE-END*/;

// ─── Palettes ────────────────────────────────────────────────────────
const PALETTES = {
  cream:     { bg:'#f0e7d3', paper:'#f5ecd9', ink:'#1a140e', faded:'#6e5f48', rule:'#1a140e', accent:'#a3431a' },
  sepia:     { bg:'#d8c8a4', paper:'#dec9a0', ink:'#2a1a0c', faded:'#6e4d2a', rule:'#2a1a0c', accent:'#7a2c0e' },
  newsprint: { bg:'#f3efe6', paper:'#fbf8f1', ink:'#0e0e0d', faded:'#5a584f', rule:'#0e0e0d', accent:'#0e0e0d' },
  cool:      { bg:'#e2e6ec', paper:'#eef0f4', ink:'#0e1622', faded:'#536074', rule:'#0e1622', accent:'#2f4d7a' },
  ink:       { bg:'#181612', paper:'#1f1d18', ink:'#e8dcc2', faded:'#9a8e74', rule:'#e8dcc2', accent:'#d96930' },
};

const WORDMARKS = {
  italic:  { ff:'Newsreader, serif', fs:'italic', fw: 400, ls: '-0.04em', case: 'none' },
  display: { ff:'Newsreader, serif', fs:'normal', fw: 700, ls: '-0.045em', case: 'none' },
  mono:    { ff:'"JetBrains Mono", ui-monospace, monospace', fs:'normal', fw: 600, ls: '-0.04em', case: 'lowercase' },
  smallcaps: { ff:'Newsreader, serif', fs:'normal', fw: 600, ls: '0.18em', case: 'uppercase' },
};

// ─── Card content (volume archive) ─────────────────────────────────
const VOLUMES = [
  // vol-01 has a real photo (the user's upload). The rest are image-slots
  // so they read as the user's archive — drop your screengram here.
  { num:'02', title:'morning, no destination', mock:'MockMaps',
    when:'sun · 9:14 am', where:'kitchen, oakland', tone:'warm' },
  { num:'03', title:'asynchronous', mock:'MockMessages',
    when:'thu · 10:48 pm', where:'bed, brooklyn', tone:'cool' },
  { num:'04', title:'side a', mock:'MockMusic',
    when:'sat · 2:03 am', where:'kitchen floor', tone:'dim' },
  { num:'05', title:'three sentences', mock:'MockNotes',
    when:'tue · 6:51 am', where:'desk, before light', tone:'warm' },
  { num:'06', title:'reading', mock:'MockSafari',
    when:'wed · 7:22 pm', where:'cafe table', tone:'warm' },
  { num:'07', title:'next week', mock:'MockCalendar',
    when:'fri · 11:09 am', where:'meeting room 4', tone:'cool' },
  { num:'08', title:'a year, in tiles', mock:'MockPhotos',
    when:'sun · 11:48 pm', where:'living room', tone:'dim' },
  { num:'09', title:'spending', mock:'MockWallet',
    when:'mon · 12:33 pm', where:'bus, line 18', tone:'dim' },
  { num:'10', title:'late commit', mock:'MockCode',
    when:'thu · 1:14 am', where:'kitchen, again', tone:'dim' },
];

// ─── Top-level concept page ────────────────────────────────────────
function ConceptPage() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const p = PALETTES[t.palette] || PALETTES.cream;
  const wm = WORDMARKS[t.wordmark] || WORDMARKS.italic;

  // Push palette to CSS variables on root so static markup can read them.
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--bg', p.bg);
    r.setProperty('--paper', p.paper);
    r.setProperty('--ink', p.ink);
    r.setProperty('--faded', p.faded);
    r.setProperty('--rule', p.rule);
    r.setProperty('--accent', p.accent);
    document.body.dataset.palette = t.palette;
  }, [p, t.palette]);

  return (
    <div className="page" data-compact={t.compact ? '1' : '0'}>
      <Topbar t={t} wm={wm} />
      <Masthead t={t} wm={wm} />
      <Hero t={t} />
      <Manifesto />
      <GalleryHeader t={t} />
      <Gallery t={t} />
      <CTA t={t} />
      <Colophon t={t} />

      <TweaksPanel title="Screengram">
        <TweakSection label="Palette">
          <TweakColor label="Theme" value={t.palette}
            options={[
              { value:'cream', label:'Cream' },
              { value:'sepia', label:'Sepia' },
              { value:'newsprint', label:'Newsprint' },
              { value:'cool', label:'Cool' },
              { value:'ink', label:'Ink' },
            ]}
            onChange={(v) => setTweak('palette', v)} />
        </TweakSection>
        <TweakSection label="Wordmark">
          <TweakRadio label="Style" value={t.wordmark}
            options={[
              { value:'italic', label:'Italic' },
              { value:'display', label:'Bold' },
              { value:'mono', label:'Mono' },
            ]}
            onChange={(v) => setTweak('wordmark', v)} />
        </TweakSection>
        <TweakSection label="Composite">
          <TweakRadio label="Layout" value={t.layout}
            options={[
              { value:'pip', label:'PiP' },
              { value:'sbs', label:'Side' },
              { value:'stack', label:'Stack' },
              { value:'polaroid', label:'Polaroid' },
            ]}
            onChange={(v) => setTweak('layout', v)} />
          <TweakRadio label="PiP corner" value={t.pipCorner}
            options={[
              { value:'tl', label:'TL' },
              { value:'tr', label:'TR' },
              { value:'bl', label:'BL' },
              { value:'br', label:'BR' },
            ]}
            onChange={(v) => setTweak('pipCorner', v)} />
        </TweakSection>
        <TweakSection label="Print">
          <TweakText label="Issue №" value={t.issueNumber}
            onChange={(v) => setTweak('issueNumber', v)} />
          <TweakToggle label="Vintage tone" value={t.vintage}
            onChange={(v) => setTweak('vintage', v)} />
          <TweakToggle label="Captions" value={t.showCaptions}
            onChange={(v) => setTweak('showCaptions', v)} />
          <TweakToggle label="Compact" value={t.compact}
            onChange={(v) => setTweak('compact', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

// ─── Topbar ─────────────────────────────────────────────────────────
function Topbar({ t, wm }) {
  return (
    <div className="topbar">
      <div className="mark" style={wmStyle(wm, 18)}>screengram</div>
      <div className="topbar-mid">
        <span className="mono small">an irregular publication on the third image</span>
      </div>
      <a className="topbar-cta mono" href="Screengram App.html">
        open the app <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ─── Masthead ───────────────────────────────────────────────────────
function Masthead({ t, wm }) {
  return (
    <header className="masthead">
      <div className="mast-row mono small">
        <span>VOL. {t.issueNumber}</span>
        <span>/</span>
        <span>MAY 2026</span>
        <span className="dot" />
        <span>OAKLAND, CA</span>
        <span className="spacer" />
        <span>$0.00</span>
      </div>

      <h1 className="word" style={wmStyle(wm, null)}>screengram</h1>

      <div className="mast-row mono small mast-row-bot">
        <span>gram the screen.</span>
        <span className="spacer" />
        <span>est. 2026 — late.</span>
      </div>
    </header>
  );
}

function wmStyle(wm, size) {
  return {
    fontFamily: wm.ff, fontStyle: wm.fs, fontWeight: wm.fw,
    letterSpacing: wm.ls, textTransform: wm.case,
    fontSize: size ? size : undefined,
  };
}

// ─── Hero composite ─────────────────────────────────────────────────
function Hero({ t }) {
  return (
    <section className="hero">
      <Composite
        photoSrc="images/vol-1-photo.jpg"
        screen={<HeroScreenshot />}
        layout={t.layout}
        corner={t.pipCorner}
        vintage={t.vintage}
        issue={t.issueNumber}
        big
      />
      <figcaption className="cap mono small">
        VOL. {t.issueNumber} — WILL ROGERS BEACH, 6:31 PM, HEAVEN IS A PLACE ON EARTH.
      </figcaption>
    </section>
  );
}

// ─── HeroScreenshot — real iPhone screen image used in the hero PiP ──
function HeroScreenshot() {
  return (
    <div className="phone-frame">
      <div className="phone-frame-inner">
        <img src="images/vol-1-screen.png" alt="" className="hero-screen-img" />
        <div className="phone-island" />
      </div>
    </div>
  );
}

// ─── Composite ──────────────────────────────────────────────────────
// The core layout primitive. Photo as background, screenshot inset PiP
// (default), with side-by-side / stacked / polaroid alternates.
function Composite({ photoSrc, photoSlot, screen, layout, corner, vintage, issue, big, tone }) {
  const photo = photoSlot || (
    <img src={photoSrc} alt="" className="bg-img" />
  );

  if (layout === 'sbs') {
    return (
      <div className={'composite sbs' + (big ? ' big' : '')}>
        <div className="bg" data-vintage={vintage ? '1' : '0'} data-tone={tone}>
          {photo}
        </div>
        <div className="screen-side">{screen}</div>
      </div>
    );
  }
  if (layout === 'stack') {
    return (
      <div className={'composite stack' + (big ? ' big' : '')}>
        <div className="bg" data-vintage={vintage ? '1' : '0'} data-tone={tone}>
          {photo}
        </div>
        <div className="screen-stack">{screen}</div>
      </div>
    );
  }
  if (layout === 'polaroid') {
    return (
      <div className={'composite polaroid' + (big ? ' big' : '')}>
        <div className="bg" data-vintage={vintage ? '1' : '0'} data-tone={tone}>
          {photo}
        </div>
        <div className="screen-pola">
          <div className="screen-pola-inner">{screen}</div>
          <div className="pola-caption mono">vol. {issue}</div>
        </div>
      </div>
    );
  }
  // default: PiP (picture-in-picture)
  return (
    <div className={'composite pip ' + (corner || 'bl') + (big ? ' big' : '')}>
      <div className="bg" data-vintage={vintage ? '1' : '0'} data-tone={tone}>
        {photo}
      </div>
      <div className="screen-pip">{screen}</div>
    </div>
  );
}

// ─── A miniature Claude chat screenshot, used in the hero ───────────
function ClaudeScreenshot() {
  return (
    <div className="claude-screen">
      <div className="cs-status">
        <span>4:45</span>
        <span className="cs-icons">●●● ▼ ◼</span>
      </div>
      <div className="cs-nav">
        <span className="cs-burger">≡</span>
        <span className="cs-title">Sonnet 4.6 ▾</span>
        <span className="cs-new">+</span>
      </div>
      <div className="cs-pill">↺ Screenback</div>
      <div className="cs-bubble">
        I'm a data scientist trying to build an app that lets you take a back-camera
        photo when you screenshot content on your phone. The point is to capture where
        you were and the context of the real world when you screenshot something.
        Something to enrich the context.
      </div>
      <div className="cs-h">Feasibility &amp; Design Considerations</div>
      <div className="cs-p">This is a genuinely interesting idea — enriching digital captures with physical context. Let me break down the landscape before you write a line of code.</div>
      <div className="cs-h cs-h-sm">Core Concept</div>
      <div className="cs-p">When a user takes a screenshot → automatically trigger the back camera. Store the photo alongside the screenshot metadata (timestamp, location, app, …)</div>
      <div className="cs-input">Reply to Claude</div>
    </div>
  );
}

// ─── Manifesto ──────────────────────────────────────────────────────
function Manifesto() {
  return (
    <article className="essay">
      <div className="rule" />

      <Section roman="I" year="2015">
        <p>
          Frontback died in 2015. The idea it was reaching for didn't.
        </p>
        <p>
          The app was simple. Take a photo with your front camera. Take one with
          your back camera. Combine them. <em>What you were looking at, and what
          you looked like while looking at it</em> — one image, two realities.
          It felt honest in a way neither photo alone could be.
        </p>
      </Section>

      <Section roman="II" year="now">
        <p>
          The front camera became a studio. Instagram happened. The back camera
          got better at making the world look perfect. Both directions optimized
          toward performance.
        </p>
        <p>
          Something else happened too. <em>The screen became the dominant surface.</em>
          Most of what we look at now isn't the physical world — it's a rectangle.
          Maps, messages, faces, feeds. The screen is where we actually <em>are</em>.
          The front camera captures your face; the back camera captures the room.
          Neither captures what you were doing.
        </p>
      </Section>

      <Section roman="III" year="the idea">
        <p>
          Screengram is what Frontback would be if it were made today. A screenshot
          of whatever was on your screen, paired with a photo of wherever you were.
          <em> What you were looking at, and where you were while you looked at it.</em>
        </p>
        <p className="kicker">
          The resulting image is strange in the right way. It's more honest than
          either would be alone.
        </p>
      </Section>

      <div className="rule" />
    </article>
  );
}

function Section({ roman, year, children }) {
  return (
    <section className="seg">
      <div className="seg-mark mono small">
        <span className="seg-roman">{roman}</span>
        <span className="seg-year"> — {year}</span>
      </div>
      <div className="seg-body">{children}</div>
    </section>
  );
}

// ─── Gallery ───────────────────────────────────────────────────────
function GalleryHeader({ t }) {
  return (
    <div className="gal-h">
      <div className="gal-h-roman mono small">— iv —</div>
      <h2 className="gal-h-title">the archive.</h2>
      <p className="gal-h-sub">
        Volumes <em>{t.issueNumber}</em> through <em>10</em>. Drop a photo onto
        any tile to fill its second half. Each Screengram is a screenshot, plus
        the room you were in.
      </p>
    </div>
  );
}

function Gallery({ t }) {
  return (
    <div className="gal">
      {VOLUMES.map((v) => {
        const Mock = window[v.mock];
        return (
          <figure key={v.num} className="card">
            <Composite
              photoSlot={
                <image-slot
                  id={'vol-' + v.num}
                  shape="rect"
                  placeholder={'drop a photo · ' + v.where}
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              }
              screen={<Mock />}
              layout={t.layout}
              corner={t.pipCorner}
              vintage={t.vintage}
              issue={v.num}
              tone={v.tone}
            />
            {t.showCaptions && (
              <figcaption className="cap mono small">
                <span>VOL. {v.num} —</span>
                <span className="cap-title"> {v.title}.</span>
                <span className="cap-meta"> {v.when} · {v.where}</span>
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}

// ─── CTA + Colophon ─────────────────────────────────────────────────
function CTA({ t }) {
  return (
    <section className="cta">
      <div className="rule" />
      <div className="cta-row">
        <div className="cta-text">
          <div className="mono small">— v —</div>
          <h2>You've read about it. Now <em>gram</em> something.</h2>
          <p>
            The app is a working prototype. Capture a screen, frame the room,
            review the pair, save it to your archive.
          </p>
        </div>
        <a className="cta-btn" href="Screengram App.html">
          <span>open the app</span>
          <span className="arr">↗</span>
        </a>
      </div>
      <div className="rule" />
    </section>
  );
}

function Colophon({ t }) {
  return (
    <footer className="colo">
      <div className="colo-row mono small">
        <div>
          <div className="colo-k">PUBLISHER</div>
          <div className="colo-v">screengram press</div>
        </div>
        <div>
          <div className="colo-k">VOLUME</div>
          <div className="colo-v">{t.issueNumber} of ∞</div>
        </div>
        <div>
          <div className="colo-k">SET IN</div>
          <div className="colo-v">newsreader &amp; jetbrains mono</div>
        </div>
        <div>
          <div className="colo-k">PRINTED</div>
          <div className="colo-v">on a rectangle</div>
        </div>
      </div>
      <div className="colo-tag">
        <em>What you were looking at, and where you were while you looked at it.</em>
      </div>
    </footer>
  );
}

// ─── Mount ──────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ConceptPage />);
