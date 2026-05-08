// ConceptPage.jsx — Screengram concept/manifesto page.
// Ported from design-export/concept-page.jsx as a single React component.
// Locked to the cream/pip/bl defaults. Tweaks panel intentionally omitted —
// it's authoring-only tooling and not shipped with the marketing site.
//
// Note: mock iOS screens (imported below) are intentionally stylized
// abstractions, not Apple UI copies. Do not adjust toward the HIG.

import {
  MockMaps, MockMessages, MockMusic, MockNotes, MockSafari,
  MockCalendar, MockPhotos, MockWallet, MockCode,
} from './MockScreens.jsx';

const MOCKS = {
  MockMaps, MockMessages, MockMusic, MockNotes, MockSafari,
  MockCalendar, MockPhotos, MockWallet, MockCode,
};

const T = {
  palette: 'cream',
  layout: 'pip',
  pipCorner: 'bl',
  wordmark: 'italic',
  vintage: true,
  issueNumber: '01',
  showCaptions: true,
  compact: false,
};

const WM = {
  ff: 'Newsreader, serif',
  fs: 'italic',
  fw: 400,
  ls: '-0.04em',
  case: 'none',
};

const VOLUMES = [
  { num: '02', title: 'morning, no destination', mock: 'MockMaps',
    when: 'sun · 9:14 am', where: 'kitchen, oakland', tone: 'warm' },
  { num: '03', title: 'asynchronous', mock: 'MockMessages',
    when: 'thu · 10:48 pm', where: 'bed, brooklyn', tone: 'cool' },
  { num: '04', title: 'side a', mock: 'MockMusic',
    when: 'sat · 2:03 am', where: 'kitchen floor', tone: 'dim' },
  { num: '05', title: 'three sentences', mock: 'MockNotes',
    when: 'tue · 6:51 am', where: 'desk, before light', tone: 'warm' },
  { num: '06', title: 'reading', mock: 'MockSafari',
    when: 'wed · 7:22 pm', where: 'cafe table', tone: 'warm' },
  { num: '07', title: 'next week', mock: 'MockCalendar',
    when: 'fri · 11:09 am', where: 'meeting room 4', tone: 'cool' },
  { num: '08', title: 'a year, in tiles', mock: 'MockPhotos',
    when: 'sun · 11:48 pm', where: 'living room', tone: 'dim' },
  { num: '09', title: 'spending', mock: 'MockWallet',
    when: 'mon · 12:33 pm', where: 'bus, line 18', tone: 'dim' },
  { num: '10', title: 'late commit', mock: 'MockCode',
    when: 'thu · 1:14 am', where: 'kitchen, again', tone: 'dim' },
];

function wmStyle(wm, size) {
  return {
    fontFamily: wm.ff, fontStyle: wm.fs, fontWeight: wm.fw,
    letterSpacing: wm.ls, textTransform: wm.case,
    fontSize: size ? size : undefined,
  };
}

function Topbar() {
  return (
    <div className="topbar">
      <div className="mark" style={wmStyle(WM, 18)}>screengram</div>
      <div className="topbar-mid">
        <span className="mono small">an irregular publication on the third image</span>
      </div>
      <a className="topbar-cta mono" href="#">
        open the app <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

function Masthead() {
  return (
    <header className="masthead">
      <div className="mast-row mono small">
        <span>VOL. {T.issueNumber}</span>
        <span>/</span>
        <span>MAY 2026</span>
        <span className="dot" />
        <span>OAKLAND, CA</span>
        <span className="spacer" />
        <span>$0.00</span>
      </div>

      <h1 className="word" style={wmStyle(WM, null)}>screengram</h1>

      <div className="mast-row mono small mast-row-bot">
        <span>gram the screen.</span>
        <span className="spacer" />
        <span>est. 2026 — late.</span>
      </div>
    </header>
  );
}

function HeroScreenshot() {
  return (
    <div className="phone-frame">
      <div className="phone-frame-inner">
        <img src="/images/vol-1-screen.png" alt="" className="hero-screen-img" />
        <div className="phone-island" />
      </div>
    </div>
  );
}

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
  return (
    <div className={'composite pip ' + (corner || 'bl') + (big ? ' big' : '')}>
      <div className="bg" data-vintage={vintage ? '1' : '0'} data-tone={tone}>
        {photo}
      </div>
      <div className="screen-pip">{screen}</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <Composite
        photoSrc="/images/vol-1-photo.jpg"
        screen={<HeroScreenshot />}
        layout={T.layout}
        corner={T.pipCorner}
        vintage={T.vintage}
        issue={T.issueNumber}
        big
      />
      <figcaption className="cap mono small">
        VOL. {T.issueNumber} — WILL ROGERS BEACH, 6:31 PM, HEAVEN IS A PLACE ON EARTH.
      </figcaption>
    </section>
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

function GalleryHeader() {
  return (
    <div className="gal-h">
      <div className="gal-h-roman mono small">— iv —</div>
      <h2 className="gal-h-title">the archive.</h2>
      <p className="gal-h-sub">
        Volumes <em>{T.issueNumber}</em> through <em>10</em>. Drop a photo onto
        any tile to fill its second half. Each Screengram is a screenshot, plus
        the room you were in.
      </p>
    </div>
  );
}

function ImageSlotPlaceholder({ where }) {
  // Stand-in for the design tool's <image-slot> drag-and-drop web component.
  // For v1 we render a styled empty surface — uploads aren't part of the
  // marketing site (see design-export/README.md, "Image-slot drop").
  return (
    <div className="image-slot" aria-label={`drop a photo · ${where}`} />
  );
}

function Gallery() {
  return (
    <div className="gal">
      {VOLUMES.map((v) => {
        const Mock = MOCKS[v.mock];
        return (
          <figure key={v.num} className="card">
            <Composite
              photoSlot={<ImageSlotPlaceholder where={v.where} />}
              screen={<Mock />}
              layout={T.layout}
              corner={T.pipCorner}
              vintage={T.vintage}
              issue={v.num}
              tone={v.tone}
            />
            {T.showCaptions && (
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

function CTA() {
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
        <a className="cta-btn" href="#">
          <span>open the app</span>
          <span className="arr">↗</span>
        </a>
      </div>
      <div className="rule" />
    </section>
  );
}

function Colophon() {
  return (
    <footer className="colo">
      <div className="colo-row mono small">
        <div>
          <div className="colo-k">PUBLISHER</div>
          <div className="colo-v">screengram press</div>
        </div>
        <div>
          <div className="colo-k">VOLUME</div>
          <div className="colo-v">{T.issueNumber} of ∞</div>
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

export default function ConceptPage() {
  return (
    <div className="page" data-compact={T.compact ? '1' : '0'}>
      <Topbar />
      <Masthead />
      <Hero />
      <Manifesto />
      <GalleryHeader />
      <Gallery />
      <CTA />
      <Colophon />
    </div>
  );
}
