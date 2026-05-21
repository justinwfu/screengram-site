// screengram-app.jsx
// Interactive Screengram prototype — mirrors the shipped iOS app.
// Behavioral source of truth (HTML prototype): updated 2026-05-20 to match
// what's actually on `main` (flat library + user-curated albums, no
// Volume metaphor; 3-page dictionary onboarding; animated headline;
// daily prompt; 3 composite layouts; 5-tab bar; reel export).

const { useState, useEffect, useRef, useMemo } = React;

const APP_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cream",
  "shutterStyle": "rotate",
  "captureLayout": "pip",
  "screenshotOverlay": true,
  "skipOnboarding": false,
  "useLatestHero": true,
  "showDailyPrompt": true
}/*EDITMODE-END*/;

// ─── Palettes (mirror Tokens.swift / concept page) ─────────────────
const APP_PALETTES = {
  cream:     { bg:'#f0e7d3', card:'#f7eedb', ink:'#1a140e', faded:'#6e5f48', accent:'#a3431a', chrome:'#ebe1c9' },
  sepia:     { bg:'#d8c8a4', card:'#dfcca5', ink:'#2a1a0c', faded:'#6e4d2a', accent:'#7a2c0e', chrome:'#cbb888' },
  newsprint: { bg:'#f3efe6', card:'#fff', ink:'#0e0e0d', faded:'#5a584f', accent:'#0e0e0d', chrome:'#e9e4d8' },
  ink:       { bg:'#181612', card:'#241f18', ink:'#e8dcc2', faded:'#9a8e74', accent:'#d96930', chrome:'#1f1d18' },
};

// ─── Demo library (no Volume numbers — flat library) ───────────────
// Each item is a single filed screengram. Albums below reference these
// by id.
const SEED_LIBRARY = [
  { id:'a', mock:'MockPhotos',   when:'sun · 11:48 pm',  where:'living room',         caption:'a year, in tiles',          month:'2026-05' },
  { id:'b', mock:'MockCalendar', when:'fri · 11:09 am',  where:'meeting room 4',      caption:'next week',                 month:'2026-05' },
  { id:'c', mock:'MockSafari',   when:'wed · 7:22 pm',   where:'cafe table',          caption:'reading',                   month:'2026-05' },
  { id:'d', mock:'MockNotes',    when:'tue · 6:51 am',   where:'desk, before light',  caption:'three sentences',           month:'2026-05' },
  { id:'e', mock:'MockMusic',    when:'sat · 2:03 am',   where:'kitchen floor',       caption:'side a',                    month:'2026-04' },
  { id:'f', mock:'MockMessages', when:'thu · 10:48 pm',  where:'bed, brooklyn',       caption:'asynchronous',              month:'2026-04' },
  { id:'g', mock:'MockMaps',     when:'sun · 9:14 am',   where:'kitchen, oakland',    caption:'morning, no destination',   month:'2026-04' },
];

const SEED_ALBUMS = [
  { id:'al1', title:'mornings',     coverId:'g', items:['g','d'] },
  { id:'al2', title:'late nights',  coverId:'e', items:['e','f','a'] },
  { id:'al3', title:'on the road',  coverId:'b', items:['b','c'] },
];

const DAILY_PROMPTS = [
  'the alarm + you ignoring it',
  'the last thing you screenshotted to remember.',
  'whatever pulled you out of the moment.',
  'a map of where you wanted to be.',
  'the message you saved to think about later.',
];

// ─── Top-level App ────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(APP_TWEAK_DEFAULTS);
  const p = APP_PALETTES[t.palette] || APP_PALETTES.cream;
  const [screen, setScreen] = useState(t.skipOnboarding ? 'home' : 'onboarding');
  const [library, setLibrary] = useState(SEED_LIBRARY);
  const [albums, setAlbums] = useState(SEED_ALBUMS);
  const [pendingScreengram, setPendingScreengram] = useState(null);
  const [active, setActive] = useState(null); // active screengram / album

  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--bg', p.bg);
    r.setProperty('--card', p.card);
    r.setProperty('--ink', p.ink);
    r.setProperty('--faded', p.faded);
    r.setProperty('--accent', p.accent);
    r.setProperty('--chrome', p.chrome);
  }, [p]);

  // Daily prompt — pinned for the session, can be shuffled.
  const [promptIdx, setPromptIdx] = useState(0);
  const [promptDismissed, setPromptDismissed] = useState(false);

  return (
    <div className="app-stage">
      <div className="stage-bg" />
      <div className="stage-frame">
        <IOSDevice width={402} height={874} dark={t.palette === 'ink'}>
          <ScreenRouter
            screen={screen}
            setScreen={setScreen}
            t={t}
            p={p}
            library={library}
            setLibrary={setLibrary}
            albums={albums}
            setAlbums={setAlbums}
            pending={pendingScreengram}
            setPending={setPendingScreengram}
            active={active}
            setActive={setActive}
            prompt={DAILY_PROMPTS[promptIdx]}
            promptDay={47 + promptIdx}
            promptDismissed={promptDismissed}
            setPromptDismissed={setPromptDismissed}
            shufflePrompt={() => setPromptIdx((i) => (i + 1) % DAILY_PROMPTS.length)}
          />
        </IOSDevice>
      </div>

      <SideRail screen={screen} setScreen={setScreen} />

      <TweaksPanel title="Screengram · App">
        <TweakSection label="Theme">
          <TweakColor label="Palette" value={t.palette}
            options={['cream','sepia','newsprint','ink'].map((v) => ({ value: v, label: v }))}
            onChange={(v) => setTweak('palette', v)} />
        </TweakSection>
        <TweakSection label="Capture">
          <TweakRadio label="Composite" value={t.captureLayout}
            options={[
              { value:'pip', label:'PiP' },
              { value:'sbs', label:'Side' },
              { value:'stack', label:'Stack' },
            ]}
            onChange={(v) => setTweak('captureLayout', v)} />
          <TweakRadio label="Shutter" value={t.shutterStyle}
            options={[
              { value:'rotate', label:'Rotate' },
              { value:'pulse', label:'Pulse' },
              { value:'flash', label:'Flash' },
            ]}
            onChange={(v) => setTweak('shutterStyle', v)} />
          <TweakToggle label="Compose-time overlay"
            value={t.screenshotOverlay}
            onChange={(v) => setTweak('screenshotOverlay', v)} />
        </TweakSection>
        <TweakSection label="Home">
          <TweakToggle label="Use latest hero" value={t.useLatestHero}
            onChange={(v) => setTweak('useLatestHero', v)} />
          <TweakToggle label="Daily prompt" value={t.showDailyPrompt}
            onChange={(v) => setTweak('showDailyPrompt', v)} />
        </TweakSection>
        <TweakSection label="Demo">
          <TweakToggle label="Skip onboarding" value={t.skipOnboarding}
            onChange={(v) => setTweak('skipOnboarding', v)} />
          <TweakButton label="Restart at intro"
            onClick={() => setScreen('onboarding')} />
          <TweakButton label="Open capture flow"
            onClick={() => setScreen('cap-screenshot')} />
          <TweakButton label="Open reel export"
            onClick={() => { setActive(library[0]); setScreen('reel-export'); }} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

// ─── Side rail with quick links ───────────────────────────────────
function SideRail({ screen, setScreen }) {
  const links = [
    ['onboarding', 'intro'],
    ['home', 'home'],
    ['cap-screenshot', 'capture'],
    ['library', 'library'],
    ['albums', 'albums'],
    ['profile', 'profile'],
    ['settings', 'settings'],
  ];
  return (
    <nav className="side-rail">
      <div className="rail-mark">
        <a href="/" className="rail-back">← back</a>
      </div>
      <div className="rail-list">
        {links.map(([k, l]) => (
          <button key={k}
                  data-on={screen === k || (k === 'cap-screenshot' && screen.startsWith('cap-')) ? '1' : '0'}
                  onClick={() => setScreen(k)}>
            {l}
          </button>
        ))}
      </div>
      <div className="rail-foot">prototype<br/>v.0.4 — week 4</div>
    </nav>
  );
}

// ─── Router ────────────────────────────────────────────────────────
function ScreenRouter(props) {
  const { screen } = props;
  switch (screen) {
    case 'onboarding': return <Onboarding {...props} />;
    case 'home': return <Home {...props} />;
    case 'cap-screenshot': return <CapScreenshot {...props} />;
    case 'cap-camera': return <CapCamera {...props} />;
    case 'cap-review': return <CapReview {...props} />;
    case 'cap-saved': return <CapSaved {...props} />;
    case 'library': return <Library {...props} />;
    case 'detail': return <ScreengramDetail {...props} />;
    case 'reel-export': return <ReelExport {...props} />;
    case 'albums': return <Albums {...props} />;
    case 'album-detail': return <AlbumDetail {...props} />;
    case 'profile': return <Profile {...props} />;
    case 'settings': return <Settings {...props} />;
    case 'how-to-use': return <HowToUse {...props} />;
    default: return <Home {...props} />;
  }
}

// ─── Onboarding — three-page dictionary entry ──────────────────────
// Verbatim from OnboardingView.swift in the repo.
function Onboarding({ setScreen }) {
  const [page, setPage] = useState(0);
  const PAGES = [
    { eyebrow:'screengram', kind:'noun',
      body:'a paired record of what you were looking at and where you were looking from.' },
    { eyebrow:'screengram', kind:'verb',
      body:'to capture experiences with meaningful context.' },
    { eyebrow:'screengram', kind:'noun',
      body:'screenshot camera app. usage tips in How to use Screengram under Settings.' },
  ];
  const cur = PAGES[page];
  const isLast = page === PAGES.length - 1;
  const next = () => isLast ? setScreen('home') : setPage(page + 1);

  return (
    <div className="onb onb-v2">
      <div className="onb-dict">
        <div className="onb-dict-head">
          <h1 className="onb-dict-word">{cur.eyebrow}</h1>
          <div className="onb-dict-kind">{cur.kind}</div>
        </div>
        <p className="onb-dict-body">{cur.body}</p>
      </div>

      <div className="onb-foot">
        <div className="onb-dots-v2">
          {PAGES.map((_, i) => (
            <span key={i} data-on={i === page ? '1' : '0'} />
          ))}
        </div>
        <button className="onb-cta-v2" onClick={next}>
          <span>{isLast ? 'Go' : 'Next'}</span>
          <span className="arr">→</span>
        </button>
        {!isLast ? (
          <button className="onb-skip mono small" onClick={() => setScreen('home')}>skip</button>
        ) : (
          <div style={{ height: 22 }} />
        )}
      </div>
    </div>
  );
}

// ─── Home ──────────────────────────────────────────────────────────
function Home(props) {
  const { setScreen, library, t, prompt, promptDay, promptDismissed,
          setPromptDismissed, shufflePrompt } = props;

  // Animated headline phase: 0=two-line, 1=merged single line
  const [merged, setMerged] = useState(false);
  useEffect(() => {
    if (merged) return;
    const t1 = setTimeout(() => setMerged(true), 1800);
    return () => clearTimeout(t1);
  }, [merged]);

  const recent5 = library.slice(0, 5);
  const showPrompt = t.showDailyPrompt && !promptDismissed;

  return (
    <div className="home home-v2">
      <div className="home-mast">
        <AnimatedHeadline merged={merged} />
      </div>

      {recent5.length > 0 && (
        <RecentStrip items={recent5} onTap={(sg) => { props.setActive(sg); setScreen('detail'); }} />
      )}

      {showPrompt && (
        <DailyPromptCard
          text={prompt}
          day={promptDay}
          onTake={() => setScreen('cap-screenshot')}
          onSkip={() => setPromptDismissed(true)}
          onShuffle={shufflePrompt}
        />
      )}

      <div className="home-spacer" />

      <button className="go-shutter" onClick={() => setScreen('cap-screenshot')}>
        <div className="go-outer" />
        <div className="go-inner">GO</div>
      </button>

      <div className="home-spacer" />

      {t.useLatestHero && (
        <button className="latest-hero" onClick={() => setScreen('cap-camera')}>
          <div className="latest-thumb"><window.MockMaps /></div>
          <div className="latest-text">
            <div className="mono small">use latest</div>
            <div className="latest-sub">taken just now</div>
          </div>
          <div className="latest-arr">→</div>
        </button>
      )}

      <BottomTabs current="home" setScreen={setScreen} />
    </div>
  );
}

function AnimatedHeadline({ merged }) {
  return (
    <h1 className={'ah ' + (merged ? 'ah-merged' : 'ah-two')}>
      <span className="ah-two-text">
        a <em>screen</em>shot,<br/>
        a photo<em>graph</em>.
      </span>
      <span className="ah-one-text">
        <em>screengram</em>.
      </span>
    </h1>
  );
}

function RecentStrip({ items, onTap }) {
  return (
    <div className="recent-strip">
      {items.map((sg) => {
        const M = window[sg.mock];
        return (
          <button key={sg.id} className="rstrip-cell" onClick={() => onTap(sg)}>
            <div className="rstrip-bg" />
            <div className="rstrip-pip"><M /></div>
          </button>
        );
      })}
    </div>
  );
}

function DailyPromptCard({ text, day, onTake, onSkip, onShuffle }) {
  return (
    <div className="prompt-card">
      <div className="prompt-head">
        <span className="prompt-dot" />
        <span className="mono small">today's prompt · day {day}</span>
        <span className="prompt-spacer" />
        <button className="prompt-shuffle" onClick={onShuffle} aria-label="Shuffle prompt">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M3 4h2.5l5 8H13M3 12h2.5l5-8H13"/>
            <path d="M11 2l2 2-2 2M11 10l2 2-2 2"/>
          </svg>
        </button>
      </div>
      <div className="prompt-text">{text}</div>
      <div className="prompt-actions">
        <button className="prompt-take" onClick={onTake}>
          <span className="prompt-ico">●</span>
          <span>take it</span>
        </button>
        <button className="prompt-skip mono small" onClick={onSkip}>skip</button>
      </div>
    </div>
  );
}

// ─── Capture: 1) screenshot pull ──────────────────────────────────
function CapScreenshot({ setScreen, setPending }) {
  const [phase, setPhase] = useState('framing');

  useEffect(() => {
    if (phase === 'framing') {
      const id = setTimeout(() => setPhase('flashing'), 1100);
      return () => clearTimeout(id);
    }
    if (phase === 'flashing') {
      const id = setTimeout(() => {
        setPending({ screenComp: 'MockSafari' });
        setScreen('cap-camera');
      }, 700);
      return () => clearTimeout(id);
    }
  }, [phase]);

  return (
    <div className="cap cap-1">
      <div className="cap-stage screen-stage">
        <div className="cap-stage-inner">
          <window.MockSafari />
        </div>
        {phase === 'flashing' && <div className="cap-flash" />}
      </div>
      <div className="cap-pill mono">
        <span className="cap-dot" />
        pulling latest screenshot…
      </div>
      <div className="cap-cancel">
        <button onClick={() => setScreen('home')} className="mono small">cancel</button>
      </div>
    </div>
  );
}

// ─── Capture: 2) camera with compose-time overlay ──────────────────
function CapCamera({ setScreen, t, pending, setPending }) {
  const [snapped, setSnapped] = useState(false);
  const [overlayOn, setOverlayOn] = useState(t.screenshotOverlay !== false);
  const [pipPos, setPipPos] = useState({ x: 14, y: 14 }); // bl-ish, in % from corner
  const [pipScale, setPipScale] = useState(1);
  const Mock = pending && window[pending.screenComp] ? window[pending.screenComp] : window.MockSafari;

  const trigger = () => {
    setSnapped(true);
    setTimeout(() => {
      setPending({ ...pending, photoIdx: Math.floor(Math.random() * 4), pipScale, pipPos });
      setScreen('cap-review');
    }, 380);
  };

  return (
    <div className={'cap cap-2' + (snapped ? ' snapped' : '')}>
      <div className="vf">
        <div className="vf-photo" />
        <div className="vf-corners">
          <span /><span /><span /><span />
        </div>

        {overlayOn && (
          <div className="vf-shot-overlay"
               style={{
                 left: `${pipPos.x}%`, bottom: `${pipPos.y}%`,
                 transform: `scale(${pipScale})`, transformOrigin: 'left bottom',
               }}>
            <div className="vf-shot-frame">
              <Mock />
            </div>
            <div className="vf-shot-tip mono small">drag · pinch</div>
          </div>
        )}

        <div className="vf-overlay">
          <button
            className="vf-chip mono small"
            onClick={() => setOverlayOn((v) => !v)}>
            <span className="vf-chip-dot" data-on={overlayOn ? '1' : '0'} />
            {overlayOn ? 'overlay on' : 'overlay off'}
          </button>
          <div className="vf-pill mono small">
            <span className="cap-dot" />
            frame the room
          </div>
        </div>

        {snapped && <div className="cap-flash white" />}
      </div>

      <div className="cap-controls">
        <button className="cap-side mono small" onClick={() => setScreen('cap-screenshot')}>
          retake screen
        </button>
        <button className="cap-shutter" data-style={t.shutterStyle} onClick={trigger}>
          <div className="cap-shutter-ring">
            <div className="cap-shutter-core" />
          </div>
        </button>
        <div className="cap-side-stack">
          <button className="cap-side mono small" onClick={() => setPipScale((s) => Math.min(1.4, s + 0.15))}>
            zoom +
          </button>
          <button className="cap-side mono small" onClick={() => setPipScale((s) => Math.max(0.6, s - 0.15))}>
            zoom −
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Capture: 3) review with layout switcher + overlay text ───────
function CapReview({ setScreen, pending, setPending, library, setLibrary, t }) {
  const [layout, setLayout] = useState(t.captureLayout);
  const [corner, setCorner] = useState('bl');
  const [overlayText, setOverlayText] = useState('');
  const [overlayDragX, setOverlayDragX] = useState(50); // % from left
  const [overlayDragY, setOverlayDragY] = useState(72); // % from top
  const Mock = pending && window[pending.screenComp] ? window[pending.screenComp] : window.MockSafari;

  const save = () => {
    const next = {
      id: 'n' + (library.length + 1),
      mock: pending?.screenComp || 'MockSafari',
      when: 'today · ' + new Date().toLocaleTimeString([], { hour:'numeric', minute:'2-digit' }).toLowerCase(),
      where: 'right here',
      caption: overlayText || 'just now',
      month: '2026-05',
    };
    setLibrary([next, ...library]);
    setPending(null);
    setScreen('cap-saved');
  };

  return (
    <div className="cap cap-3">
      <div className="cap3-header">
        <button className="cap3-close" onClick={() => setScreen('home')}>✕</button>
        <div className="cap3-title">
          <div className="mono small">— review —</div>
          <div>file it.</div>
        </div>
        <div style={{ width: 32 }} />
      </div>

      <div className="cap3-stage">
        <div className={'review-comp review-' + layout + ' review-' + corner}>
          <div className="review-bg" />
          <div className="review-screen"><Mock /></div>
          {overlayText && (
            <div className="review-overlay-text"
                 style={{ left: `${overlayDragX}%`, top: `${overlayDragY}%` }}>
              {overlayText}
            </div>
          )}
        </div>
      </div>

      <div className="cap3-controls">
        <div className="seg-mini">
          {['pip','sbs','stack'].map((k) => (
            <button key={k} data-on={layout === k ? '1' : '0'} onClick={() => setLayout(k)}>
              {k}
            </button>
          ))}
        </div>
        {layout === 'pip' && (
          <div className="seg-mini">
            {['tl','tr','bl','br'].map((c) => (
              <button key={c} data-on={corner === c ? '1' : '0'} onClick={() => setCorner(c)}>
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        <div className="overlay-field">
          <span className="mono small overlay-field-k">caption</span>
          <input
            type="text"
            value={overlayText}
            onChange={(e) => setOverlayText(e.target.value)}
            placeholder="add a line on the photo…"
            maxLength={48}
          />
        </div>

        <div className="cap3-meta mono small">
          <div><span className="k">when</span><span className="v">today · 4:48 pm</span></div>
          <div><span className="k">where</span><span className="v">desk, oakland</span></div>
          <div><span className="k">source</span><span className="v">safari · nytimes.com</span></div>
        </div>

        <div className="cap3-actions">
          <button className="ghost mono small" onClick={() => setScreen('cap-screenshot')}>retake</button>
          <button className="primary" onClick={save}>file to library</button>
        </div>
      </div>
    </div>
  );
}

// ─── Capture: 4) saved stamp ──────────────────────────────────────
function CapSaved({ setScreen, library }) {
  useEffect(() => {
    const id = setTimeout(() => setScreen('library'), 1800);
    return () => clearTimeout(id);
  }, []);
  const sg = library[0];
  return (
    <div className="cap cap-4">
      <div className="saved-stamp">
        <div className="stamp">
          <div className="stamp-inner">
            <div className="mono small">— filed —</div>
            <div className="stamp-num stamp-num-v2">in library</div>
            <div className="mono small">{sg.when}</div>
          </div>
        </div>
        <p className="saved-msg">added to your library.</p>
      </div>
    </div>
  );
}

// ─── Library — flat grid + search + chip filters ──────────────────
function Library(props) {
  const { setScreen, library, albums, setActive } = props;
  const [query, setQuery] = useState('');
  const [albumFilter, setAlbumFilter] = useState(null);
  const [monthFilter, setMonthFilter] = useState(null);
  const [showAlbumSheet, setShowAlbumSheet] = useState(false);
  const [showMonthSheet, setShowMonthSheet] = useState(false);

  const months = useMemo(() => {
    return Array.from(new Set(library.map((s) => s.month))).sort().reverse();
  }, [library]);

  const filtered = useMemo(() => {
    return library.filter((sg) => {
      if (query && !(sg.caption.toLowerCase().includes(query.toLowerCase()) ||
                     (sg.where || '').toLowerCase().includes(query.toLowerCase()))) return false;
      if (albumFilter) {
        const a = albums.find((al) => al.id === albumFilter);
        if (!a || !a.items.includes(sg.id)) return false;
      }
      if (monthFilter && sg.month !== monthFilter) return false;
      return true;
    });
  }, [library, albums, query, albumFilter, monthFilter]);

  const activeFilter = albumFilter
    ? 'album: ' + (albums.find((a) => a.id === albumFilter)?.title || '')
    : monthFilter
      ? 'month: ' + monthLabel(monthFilter)
      : null;

  return (
    <div className="lib">
      <div className="lib-top">
        <div className="lib-title">library</div>
      </div>

      <div className="lib-search">
        <span className="lib-search-ico">⌕</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)}
               placeholder="search captions, places" />
      </div>

      <div className="lib-chips">
        {activeFilter ? (
          <button className="lib-chip lib-chip-active mono small"
                  onClick={() => { setAlbumFilter(null); setMonthFilter(null); }}>
            {activeFilter} <span className="lib-chip-x">✕</span>
          </button>
        ) : (
          <>
            <button className="lib-chip mono small" onClick={() => setShowAlbumSheet(true)}>by album</button>
            <button className="lib-chip mono small" onClick={() => setShowMonthSheet(true)}>by month</button>
          </>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="lib-empty">
          <div className="mono small">— no matches —</div>
          <div className="lib-empty-sub">Try a different search or clear the filter.</div>
        </div>
      ) : (
        <div className="lib-grid">
          {filtered.map((sg) => {
            const M = window[sg.mock];
            return (
              <button key={sg.id} className="lcell"
                      onClick={() => { setActive(sg); setScreen('detail'); }}>
                <div className="lcell-bg" />
                <div className="lcell-pip"><M /></div>
              </button>
            );
          })}
        </div>
      )}

      {showAlbumSheet && (
        <FilterSheet title="filter by album" items={albums.map((a) => ({ id: a.id, label: a.title }))}
                     onPick={(id) => { setAlbumFilter(id); setMonthFilter(null); setShowAlbumSheet(false); }}
                     onClose={() => setShowAlbumSheet(false)} />
      )}
      {showMonthSheet && (
        <FilterSheet title="filter by month" items={months.map((m) => ({ id: m, label: monthLabel(m) }))}
                     onPick={(id) => { setMonthFilter(id); setAlbumFilter(null); setShowMonthSheet(false); }}
                     onClose={() => setShowMonthSheet(false)} />
      )}

      <BottomTabs current="library" setScreen={setScreen} />
    </div>
  );
}

function monthLabel(ym) {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  const names = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  return names[parseInt(m, 10) - 1] + ' ' + y;
}

function FilterSheet({ title, items, onPick, onClose }) {
  return (
    <div className="sheet-scrim" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title mono small">{title}</div>
        <div className="sheet-list">
          {items.map((it) => (
            <button key={it.id} className="sheet-row" onClick={() => onPick(it.id)}>
              {it.label}
            </button>
          ))}
        </div>
        <button className="sheet-cancel mono small" onClick={onClose}>cancel</button>
      </div>
    </div>
  );
}

// ─── Screengram detail (replaces Volume detail) ───────────────────
function ScreengramDetail({ setScreen, active, setActive }) {
  if (!active) {
    useEffect(() => { setScreen('library'); }, []);
    return null;
  }
  const M = window[active.mock] || window.MockSafari;
  return (
    <div className="vd vd-v2">
      <div className="vd-top">
        <button className="vd-back" onClick={() => setScreen('library')}>←</button>
        <div className="mono small">screengram</div>
        <button className="vd-share">⋯</button>
      </div>
      <div className="vd-stage">
        <div className="review-comp review-pip review-bl">
          <div className="review-bg" />
          <div className="review-screen"><M /></div>
        </div>
      </div>
      <div className="vd-meta">
        <h2 className="vd-title"><em>{active.caption}</em></h2>
        <div className="vd-rows mono small">
          <div><span className="k">when</span><span className="v">{active.when}</span></div>
          <div><span className="k">where</span><span className="v">{active.where}</span></div>
          <div><span className="k">filed</span><span className="v">private library</span></div>
        </div>
        <div className="vd-actions">
          <button className="ghost">share</button>
          <button className="ghost"
                  onClick={() => setScreen('reel-export')}>export reel</button>
          <button className="ghost">add to album</button>
          <button className="ghost danger">delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── Reel export sheet (animated reveal video) ────────────────────
function ReelExport({ setScreen, active }) {
  const [t01, setT01] = useState(0); // reveal progress 0..1
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const dt = (now - start) / 1800;
      setT01(Math.min(1, dt));
      if (dt < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active?.id]);

  const M = window[active?.mock] || window.MockSafari;
  return (
    <div className="reel">
      <div className="reel-top">
        <button className="vd-back" onClick={() => setScreen('detail')}>←</button>
        <div className="mono small">export reel</div>
        <div style={{ width: 32 }} />
      </div>

      <div className="reel-stage">
        <div className="reel-frame">
          <div className="reel-screen"><M /></div>
          <div className="reel-photo" style={{ clipPath: `inset(0 0 ${(1 - t01) * 100}% 0)` }} />
          <div className="reel-watermark mono small">made with screengram</div>
        </div>
      </div>

      <div className="reel-controls">
        <div className="reel-row mono small">
          <span className="k">duration</span>
          <span className="v">1.8s reveal · 0.6s hold</span>
        </div>
        <div className="reel-row mono small">
          <span className="k">size</span>
          <span className="v">1080 × 1920 · h.264</span>
        </div>
        <div className="reel-row mono small">
          <span className="k">watermark</span>
          <span className="v">on</span>
        </div>
        <div className="reel-actions">
          <button className="ghost mono small"
                  onClick={() => setT01(0)}>replay</button>
          <button className="primary">save reel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Albums tab ───────────────────────────────────────────────────
function Albums({ setScreen, albums, library, setActive }) {
  return (
    <div className="alb">
      <div className="alb-top">
        <div className="alb-title">albums</div>
        <button className="alb-plus" aria-label="New album">＋</button>
      </div>

      {albums.length === 0 ? (
        <div className="lib-empty">
          <div className="mono small">— no albums —</div>
          <div className="lib-empty-sub">Create from any screengram's menu, or tap + above.</div>
        </div>
      ) : (
        <div className="alb-list">
          {albums.map((a) => {
            const cover = library.find((sg) => sg.id === a.coverId) || library[0];
            const M = cover ? window[cover.mock] : null;
            return (
              <button key={a.id} className="alb-row"
                      onClick={() => { setActive({ ...a, items: a.items }); setScreen('album-detail'); }}>
                <div className="alb-cover">
                  <div className="alb-cover-bg" />
                  {M && <div className="alb-cover-pip"><M /></div>}
                </div>
                <div className="alb-row-meta">
                  <div className="alb-row-title">{a.title}</div>
                  <div className="mono small alb-row-count">
                    {a.items.length} screengram{a.items.length === 1 ? '' : 's'}
                  </div>
                </div>
                <div className="alb-row-chev">›</div>
              </button>
            );
          })}
        </div>
      )}

      <BottomTabs current="albums" setScreen={setScreen} />
    </div>
  );
}

function AlbumDetail({ setScreen, active, library, setActive }) {
  if (!active) { useEffect(() => setScreen('albums'), []); return null; }
  const items = library.filter((sg) => active.items.includes(sg.id));
  return (
    <div className="lib">
      <div className="lib-top">
        <button className="vd-back" onClick={() => setScreen('albums')}>←</button>
        <div className="lib-title" style={{ flex: 1, textAlign: 'center' }}>{active.title}</div>
        <button className="vd-share">⋯</button>
      </div>
      <div className="lib-grid">
        {items.map((sg) => {
          const M = window[sg.mock];
          return (
            <button key={sg.id} className="lcell"
                    onClick={() => { setActive(sg); setScreen('detail'); }}>
              <div className="lcell-bg" />
              <div className="lcell-pip"><M /></div>
            </button>
          );
        })}
      </div>
      <BottomTabs current="albums" setScreen={setScreen} />
    </div>
  );
}

// ─── Profile (simplified to match shipped) ────────────────────────
function Profile({ setScreen, library }) {
  return (
    <div className="prof prof-v2">
      <div className="prof-top">
        <div className="prof-title">profile</div>
      </div>
      <div className="prof-card">
        <div className="prof-avatar-v2"><em>S</em></div>
        <div className="prof-name">Screengrammer</div>
        <div className="mono small prof-sub">— private library —</div>
      </div>
      <div className="prof-stat-card">
        <div className="prof-stat-n">{library.length}</div>
        <div className="mono small prof-stat-k">screengrams</div>
      </div>
      <BottomTabs current="profile" setScreen={setScreen} />
    </div>
  );
}

// ─── Settings (mirrors SettingsView.swift) ────────────────────────
function Settings({ setScreen }) {
  const [freshMin, setFreshMin] = useState(10);
  const [haptics, setHaptics] = useState(true);
  const [useLatest, setUseLatest] = useState(true);
  const [watermark, setWatermark] = useState(true);

  return (
    <div className="set set-v2">
      <div className="prof-top">
        <div className="prof-title">settings</div>
      </div>

      <SettingsGroup label="capture">
        <div className="set-row-card">
          <div className="set-slider-head">
            <div className="set-label">Freshness window</div>
            <div className="mono small set-slider-v">{freshMin} min</div>
          </div>
          <input type="range" min="1" max="60" step="1"
                 value={freshMin} onChange={(e) => setFreshMin(parseInt(e.target.value))} />
          <div className="set-sub mono small">how recent a screenshot must be to appear as "use latest".</div>
        </div>
        <ToggleRow title="Haptics" sub="subtle taps on shutter and file."
                   value={haptics} onChange={setHaptics} />
        <ToggleRow title="Use latest by default"
                   sub='show the "use latest" hero on Home when a fresh screenshot exists.'
                   value={useLatest} onChange={setUseLatest} />
        <ToggleRow title="Reel watermark"
                   sub='adds "made with screengram" to exported reels. default on.'
                   value={watermark} onChange={setWatermark} />
      </SettingsGroup>

      <SettingsGroup label="support">
        <LinkRow title="How to use Screengram"
                 sub="capture, library, albums, reels — short tour of the main flows."
                 onClick={() => setScreen('how-to-use')} />
        <LinkRow title="Send feedback" sub="goes straight to the developer." />
        <LinkRow title="Export event log" sub="share the local activity log via AirDrop or Files." />
      </SettingsGroup>

      <SettingsGroup label="data">
        <StaticRow k="Storage" v="Local only" />
        <StaticRow k="Cloud sync" v="Coming soon" />
      </SettingsGroup>

      <SettingsGroup label="about">
        <StaticRow k="Version" v="0.4.0" />
        <StaticRow k="Build" v="142" />
      </SettingsGroup>

      <SettingsGroup label="danger zone">
        <button className="set-row-card set-danger"
                onClick={() => setScreen('onboarding')}>
          <span>Replay onboarding</span>
        </button>
      </SettingsGroup>

      <BottomTabs current="settings" setScreen={setScreen} />
    </div>
  );
}

function SettingsGroup({ label, children }) {
  return (
    <div className="set-grp set-grp-v2">
      <div className="set-grp-h mono small">— {label} —</div>
      <div className="set-grp-card">{children}</div>
    </div>
  );
}

function ToggleRow({ title, sub, value, onChange }) {
  return (
    <div className="set-row-card">
      <div className="set-row-text">
        <div className="set-label">{title}</div>
        <div className="set-sub mono small">{sub}</div>
      </div>
      <button className="set-toggle" data-on={value ? '1' : '0'} onClick={() => onChange(!value)}>
        <i />
      </button>
    </div>
  );
}

function LinkRow({ title, sub, onClick }) {
  return (
    <button className="set-row-card set-link-row" onClick={onClick}>
      <div className="set-row-text">
        <div className="set-label">{title}</div>
        <div className="set-sub mono small">{sub}</div>
      </div>
      <span className="set-chev">›</span>
    </button>
  );
}

function StaticRow({ k, v }) {
  return (
    <div className="set-row-card">
      <div className="set-label">{k}</div>
      <div className="mono small set-static-v">{v}</div>
    </div>
  );
}

// ─── How to use ──────────────────────────────────────────────────
function HowToUse({ setScreen }) {
  const steps = [
    ['screenshot anything.',
     'A recipe, a map, a tweet, a passage. iOS shows the thumbnail in the lower-left — leave it, do nothing.'],
    ['open screengram.',
     'Home knows there\'s a fresh screenshot. Tap GO or the "use latest" hero. Camera opens with the screenshot floating in the viewfinder.'],
    ['frame the room.',
     'Drag or pinch the screenshot anywhere on the viewfinder. Hit the shutter when the room behind it looks right.'],
    ['pick a layout, file it.',
     'PiP, side-by-side, or stacked. Add a caption that floats on the photo. Save to your library.'],
    ['live in the library.',
     'Search, filter by month, group into albums. Export a reveal reel and send the screengram anywhere.'],
  ];
  return (
    <div className="howto">
      <div className="prof-top">
        <button className="vd-back" onClick={() => setScreen('settings')}>←</button>
        <div className="prof-title" style={{ flex: 1, textAlign: 'center' }}>how to use</div>
        <div style={{ width: 32 }} />
      </div>
      <div className="howto-list">
        {steps.map(([h, b], i) => (
          <div key={i} className="howto-step">
            <div className="howto-n mono small">— 0{i + 1} —</div>
            <div className="howto-h">{h}</div>
            <div className="howto-b">{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 5-tab bottom bar (matches MainShell.swift) ───────────────────
function BottomTabs({ current, setScreen }) {
  const Tab = ({ k, label, icon }) => (
    <button className="tab" data-on={current === k ? '1' : '0'}
            onClick={() => setScreen(k)}>
      <span className="tab-icon">{icon}</span>
      <span className="tab-label mono small">{label}</span>
    </button>
  );
  return (
    <div className="tabs tabs-5">
      <Tab k="home" label="home" icon={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="10" cy="10" r="4" fill="currentColor"/>
        </svg>
      } />
      <Tab k="library" label="library" icon={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.4"/>
          <rect x="11" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.4"/>
          <rect x="3" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.4"/>
          <rect x="11" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.4"/>
        </svg>
      } />
      <Tab k="albums" label="albums" icon={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="4" y="6" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M5.5 4h9M6.5 2.5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      } />
      <Tab k="profile" label="profile" icon={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M3.5 17c1-3.5 4-5 6.5-5s5.5 1.5 6.5 5"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      } />
      <Tab k="settings" label="settings" icon={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 6h9M14 6h3M3 14h3M8 14h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="13" cy="6" r="1.6" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="6.5" cy="14" r="1.6" stroke="currentColor" strokeWidth="1.4"/>
        </svg>
      } />
    </div>
  );
}

// ─── Mount ─────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
