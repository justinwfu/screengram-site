// MockScreens.jsx
// Small, identifiable iOS-esque screen mocks rendered in pure CSS/SVG,
// used as the inset (PiP) screenshot inside Screengram gallery cards.
// They're intentionally stylized abstractions — not pixel-accurate iOS UI.
// Do not adjust toward Apple's HIG.

const screenSurface = (bg) => ({
  background: bg,
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  overflow: 'hidden',
  position: 'relative',
  fontFamily: '-apple-system, "SF Pro Text", system-ui',
  WebkitFontSmoothing: 'antialiased',
  fontSize: 9,
  color: '#111',
  display: 'flex',
  flexDirection: 'column',
});

const StatusRow = ({ time = '4:45', dark = false }) => {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '6px 12px 4px', flexShrink: 0, fontSize: 8, color: c,
      fontWeight: 600, letterSpacing: 0.1,
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
        <svg width="9" height="6" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c} opacity="0.9"/>
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c} opacity="0.9"/>
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c} opacity="0.9"/>
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c}/>
        </svg>
        <svg width="9" height="6" viewBox="0 0 17 12">
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={c}/>
          <circle cx="8.5" cy="10.5" r="1.5" fill={c}/>
        </svg>
        <svg width="13" height="6" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3" stroke={c} strokeOpacity="0.4" fill="none"/>
          <rect x="2" y="2" width="14" height="9" rx="1.5" fill={c}/>
        </svg>
      </div>
    </div>
  );
};

export function MockMaps() {
  return (
    <div style={screenSurface('#dde6d4')}>
      <StatusRow />
      <div style={{ flex: 1, position: 'relative' }}>
        <svg width="100%" height="100%" viewBox="0 0 200 280" preserveAspectRatio="none"
             style={{ position: 'absolute', inset: 0 }}>
          <rect width="200" height="280" fill="#dde6d4"/>
          <path d="M0 60 L70 50 L80 110 L0 130 Z" fill="#bbd1a0"/>
          <path d="M120 200 L200 180 L200 280 L130 280 Z" fill="#bbd1a0"/>
          <path d="M150 0 L200 0 L200 60 L160 80 Z" fill="#a8c5dc"/>
          <path d="M-10 150 L210 130" stroke="#fff" strokeWidth="6"/>
          <path d="M-10 150 L210 130" stroke="#e9d77a" strokeWidth="3"/>
          <path d="M80 -10 L100 290" stroke="#fff" strokeWidth="5"/>
          <path d="M0 220 L210 240" stroke="#fff" strokeWidth="4"/>
          <path d="M40 -10 L60 290" stroke="#fff" strokeWidth="3"/>
          <path d="M140 -10 L160 290" stroke="#fff" strokeWidth="3"/>
          <path d="M30 240 Q70 200 100 160 T180 80" stroke="#1f7df5" strokeWidth="4"
                fill="none" strokeLinecap="round"/>
          <path d="M30 240 Q70 200 100 160 T180 80" stroke="#1f7df5" strokeWidth="2"
                fill="none" strokeLinecap="round" opacity="0.45"
                strokeDasharray="0.1,3"/>
          <circle cx="30" cy="240" r="4.5" fill="#fff" stroke="#1f7df5" strokeWidth="2"/>
          <circle cx="180" cy="80" r="6" fill="#e84d3d"/>
          <path d="M180 86 L180 92" stroke="#e84d3d" strokeWidth="1.5"/>
        </svg>
      </div>
      <div style={{
        position: 'absolute', top: 26, left: 10, right: 10, height: 22,
        background: 'rgba(255,255,255,0.92)', borderRadius: 22,
        display: 'flex', alignItems: 'center', padding: '0 10px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.15)', fontSize: 8,
      }}>
        <span style={{ color: 'rgba(0,0,0,0.7)' }}>◉ Search Maps</span>
      </div>
      <div style={{
        position: 'absolute', left: 8, right: 8, bottom: 8,
        background: 'rgba(255,255,255,0.96)', borderRadius: 12,
        padding: '8px 10px', boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
      }}>
        <div style={{ fontSize: 9, fontWeight: 600 }}>14 min</div>
        <div style={{ fontSize: 7, color: 'rgba(0,0,0,0.7)' }}>5.2 mi · via I-580 W</div>
      </div>
    </div>
  );
}

export function MockMessages() {
  const me = '#0a84ff', them = '#e6e6eb';
  const Bub = ({ side, w, children }) => (
    <div style={{
      alignSelf: side === 'me' ? 'flex-end' : 'flex-start',
      maxWidth: w || '70%',
      background: side === 'me' ? me : them,
      color: side === 'me' ? '#fff' : '#111',
      borderRadius: 11, padding: '4px 8px', marginBottom: 2,
      fontSize: 8.5, lineHeight: 1.25,
    }}>{children}</div>
  );
  return (
    <div style={screenSurface('#fff')}>
      <StatusRow />
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '4px 0 8px', borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        flexShrink: 0,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 14, background: '#cfc8d8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 600, color: '#5a4d70',
        }}>M</div>
        <div style={{ fontSize: 8, marginTop: 2, color: '#595959' }}>Mom</div>
      </div>
      <div style={{
        flex: 1, padding: '8px 8px 4px', display: 'flex',
        flexDirection: 'column', gap: 1, overflow: 'hidden',
      }}>
        <div style={{ alignSelf: 'center', fontSize: 6.5, color: '#595959', margin: '0 0 4px' }}>
          TODAY 4:42 PM
        </div>
        <Bub side="them">are you home for dinner sunday?</Bub>
        <Bub side="them">dad's making the brisket</Bub>
        <Bub side="me">yes!! what time</Bub>
        <Bub side="them">6 ish. bring nothing.</Bub>
        <Bub side="me">love u</Bub>
        <div style={{ alignSelf: 'flex-end', fontSize: 6, color: '#999', marginTop: 2 }}>
          Delivered
        </div>
      </div>
      <div style={{
        margin: '0 8px 8px', padding: '4px 10px',
        border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 14,
        fontSize: 8, color: '#595959', flexShrink: 0,
      }}>iMessage</div>
    </div>
  );
}

export function MockMusic() {
  return (
    <div style={screenSurface('linear-gradient(180deg,#3d2a4a 0%,#1a1220 100%)')}>
      <StatusRow dark />
      <div style={{ flex: 1, padding: '6px 14px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Now Playing</div>
        <div style={{
          aspectRatio: '1', margin: '8px 0 10px',
          background: 'linear-gradient(135deg,#c46b3a 0%,#5e2a18 60%,#241008 100%)',
          borderRadius: 4, position: 'relative',
          boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            position: 'absolute', inset: '20% 18%',
            border: '0.5px solid rgba(255,255,255,0.25)', borderRadius: 2,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            padding: 4, color: 'rgba(255,255,255,0.7)', fontSize: 5,
            letterSpacing: 0.3,
          }}>
            <div style={{ fontFamily: 'serif', fontStyle: 'italic' }}>nocturnes</div>
            <div style={{ alignSelf: 'flex-end' }}>side a</div>
          </div>
        </div>
        <div style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>Aisha, alone</div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 8 }}>Pall — Nocturnes</div>
        <div style={{ marginTop: 8, height: 2, background: 'rgba(255,255,255,0.18)', borderRadius: 2 }}>
          <div style={{ width: '34%', height: '100%', background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 6,
                      color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
          <span>1:24</span><span>-2:38</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center',
                      marginTop: 'auto', paddingBottom: 4, color: '#fff' }}>
          <span style={{ fontSize: 14 }}>⏮</span>
          <span style={{ fontSize: 22 }}>⏸</span>
          <span style={{ fontSize: 14 }}>⏭</span>
        </div>
      </div>
    </div>
  );
}

export function MockNotes() {
  return (
    <div style={screenSurface('#fbf6e9')}>
      <StatusRow />
      <div style={{
        padding: '0 12px 4px', flexShrink: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ color: '#7a5800', fontSize: 9 }}>‹ Notes</span>
        <span style={{ color: '#7a5800', fontSize: 11 }}>⊕</span>
      </div>
      <div style={{
        flex: 1, padding: '4px 14px', overflow: 'hidden',
        fontFamily: 'Newsreader, Georgia, serif',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#1a140e', marginBottom: 2 }}>
          Things to remember
        </div>
        <div style={{ fontSize: 6.5, color: 'rgba(0,0,0,0.7)', marginBottom: 6 }}>May 7 · 4:31 PM</div>
        <div style={{ fontSize: 8.5, lineHeight: 1.45, color: '#1a140e' }}>
          <p style={{ margin: '0 0 5px' }}>The screen is the dominant surface now. Most of what we look at isn't the world — it's a rectangle.</p>
          <p style={{ margin: '0 0 5px' }}>The front camera captures your face. The back camera captures the room. Neither captures what you were <em>doing</em>.</p>
          <p style={{ margin: 0 }}>Build the third one.</p>
        </div>
      </div>
    </div>
  );
}

export function MockSafari() {
  return (
    <div style={screenSurface('#f4f4f6')}>
      <StatusRow />
      <div style={{
        margin: '2px 8px 4px', height: 18, background: '#fff',
        borderRadius: 9, display: 'flex', alignItems: 'center',
        padding: '0 8px', fontSize: 7, color: 'rgba(0,0,0,0.7)',
        boxShadow: '0 0.5px 0 rgba(0,0,0,0.06)', flexShrink: 0,
      }}>
        <span style={{ marginRight: 4, color: '#595959' }}>𝐀𝐀</span>
        <span style={{ color: 'rgba(0,0,0,0.7)' }}>nytimes.com</span>
        <span style={{ marginLeft: 'auto' }}>↻</span>
      </div>
      <div style={{
        flex: 1, background: '#fff', margin: '0 8px', borderRadius: 6,
        padding: '8px 10px', overflow: 'hidden',
        fontFamily: 'Newsreader, Georgia, serif',
      }}>
        <div style={{ fontSize: 6, color: '#9c1d1d', textTransform: 'uppercase',
                      letterSpacing: 0.4, fontWeight: 700 }}>OPINION</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#1a140e',
                      marginTop: 2, lineHeight: 1.15 }}>
          The quiet collapse of the<br/>front-facing era
        </div>
        <div style={{ fontSize: 7, color: 'rgba(0,0,0,0.55)', marginTop: 4,
                      fontStyle: 'italic' }}>By S. Kapoor — May 6, 2026</div>
        <div style={{ fontSize: 7.5, color: '#222', marginTop: 6, lineHeight: 1.45 }}>
          For ten years, the camera looked at us. We posed, we tilted, we performed.
          Now the camera is looking at the world again — and the world has changed.
          A new generation of apps is asking what, exactly, is worth a photograph.
        </div>
      </div>
    </div>
  );
}

export function MockCalendar() {
  const days = ['M','T','W','T','F','S','S'];
  return (
    <div style={screenSurface('#fff')}>
      <StatusRow />
      <div style={{ padding: '4px 14px 6px', flexShrink: 0 }}>
        <div style={{ fontSize: 8, color: '#b32d1f', fontWeight: 700 }}>MAY 2026</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#111', letterSpacing: -0.4 }}>Friday 8</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)',
                    padding: '0 6px 4px', flexShrink: 0 }}>
        {days.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 6,
                                 color: i === 0 ? '#e84d3d' : '#888' }}>
            <div>{d}</div>
            <div style={{
              margin: '2px auto 0', width: 14, height: 14, borderRadius: 7,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: i === 0 ? '#e84d3d' : 'transparent',
              color: i === 0 ? '#fff' : '#111', fontSize: 8, fontWeight: 600,
            }}>{4 + i}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '6px 10px', display: 'flex',
                    flexDirection: 'column', gap: 4, fontSize: 7, overflow: 'hidden' }}>
        {[
          ['9:00','standup','#3478f6'],
          ['11:30','dentist','#e89e2f'],
          ['1:00','lunch w/ J','#34a853'],
          ['4:30','—','#aaa'],
          ['7:00','dinner @ 320','#e84d3d'],
        ].map(([t, l, c], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 22, color: '#595959', fontVariantNumeric: 'tabular-nums' }}>{t}</span>
            <span style={{ width: 2, height: 14, background: c, borderRadius: 1 }} />
            <span style={{ color: '#111' }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockPhotos() {
  const tones = [
    'linear-gradient(135deg,#e8c39a,#9b6638)',
    'linear-gradient(135deg,#3a4d6a,#1a2438)',
    'linear-gradient(135deg,#d8c0a4,#7a6448)',
    'linear-gradient(135deg,#5a3d2a,#1f130a)',
    'linear-gradient(135deg,#cfa67c,#6e4226)',
    'linear-gradient(135deg,#1a1a22,#3a3a48)',
    'linear-gradient(135deg,#e2d2b4,#8a6a40)',
    'linear-gradient(135deg,#7a4830,#28150a)',
    'linear-gradient(135deg,#9c8a6e,#3e2e1a)',
  ];
  return (
    <div style={screenSurface('#000')}>
      <StatusRow dark />
      <div style={{ padding: '4px 14px 6px', flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Library</div>
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>2,148 photos</div>
      </div>
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: 1.5, padding: '0 4px 4px',
      }}>
        {tones.map((t, i) => (
          <div key={i} style={{ background: t, borderRadius: 1, aspectRatio: '1' }} />
        ))}
      </div>
    </div>
  );
}

export function MockWallet() {
  return (
    <div style={screenSurface('#0a0a0c')}>
      <StatusRow dark />
      <div style={{ padding: '4px 14px 6px', flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Wallet</div>
      </div>
      <div style={{ flex: 1, padding: '4px 14px 8px', display: 'flex',
                    flexDirection: 'column', gap: 4 }}>
        {[
          ['#1a3a6e','#0a1a3a','VISA','•• 4421'],
          ['#3a1a1a','#1a0a0a','AMEX','•• 9082'],
          ['#1f3a1f','#0a1a0a','CASH','tap to pay'],
        ].map(([a, b, t, n], i) => (
          <div key={i} style={{
            background: `linear-gradient(135deg,${a},${b})`,
            borderRadius: 8, padding: '8px 10px', color: '#fff',
            display: 'flex', justifyContent: 'space-between',
            border: '0.5px solid rgba(255,255,255,0.08)',
          }}>
            <div>
              <div style={{ fontSize: 7, opacity: 0.7, letterSpacing: 0.4 }}>{t}</div>
              <div style={{ fontSize: 9, marginTop: 8 }}>{n}</div>
            </div>
            <div style={{ alignSelf: 'flex-end', fontSize: 6, opacity: 0.5 }}>◢</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockCode() {
  const lines = [
    ['function ', 'screengram', '() {'],
    ['  const ', 'screen', ' = await ', 'capture', '()'],
    ['  const ', 'photo', '  = await ', 'rear', '()'],
    ['  return ', 'compose', '(screen, photo)'],
    ['}'],
    [''],
    ['// the third image'],
  ];
  return (
    <div style={screenSurface('#1a1612')}>
      <StatusRow dark />
      <div style={{
        flex: 1, padding: '4px 10px', overflow: 'hidden',
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: 7.5, lineHeight: 1.6, color: '#d6c8a8',
      }}>
        {lines.map((parts, i) => (
          <div key={i} style={{ display: 'flex', gap: 6 }}>
            <span style={{ color: 'rgba(255,255,255,0.25)', width: 10, textAlign: 'right' }}>{i + 1}</span>
            <span>
              {parts.map((p, j) => {
                if (p.startsWith('//')) return <span key={j} style={{ color: '#7a8c5c' }}>{p}</span>;
                if (['function ', 'const ', 'await ', 'return '].includes(p))
                  return <span key={j} style={{ color: '#c97c4a' }}>{p}</span>;
                if (['screengram','capture','rear','compose'].includes(p))
                  return <span key={j} style={{ color: '#e8b974' }}>{p}</span>;
                if (['screen','photo'].includes(p))
                  return <span key={j} style={{ color: '#9bb5c9' }}>{p}</span>;
                return <span key={j}>{p}</span>;
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
