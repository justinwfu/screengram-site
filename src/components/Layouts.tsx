import { useState } from 'react';
import { MockNotes } from './MockScreens.jsx';

type Layout = 'pip' | 'sbs' | 'stack';
type Corner = 'tl' | 'tr' | 'bl' | 'br';

const PHOTO_SRC = '/images/p-kitchen-warm.png';
const CAPTION = 'desk, before light — tue 6:51 am';

function PhoneMock({ layout, corner }: { layout: Layout; corner: Corner }) {
  return (
    <div className="pm pm-big">
      <div className="pm-bezel">
        <div className="pm-island" />
        <div className={`pm-inner pm-${layout}`}>
          <div
            className="pm-photo"
            style={{ backgroundImage: `url('${PHOTO_SRC}')` }}
          />
          {layout === 'pip' && (
            <div className={`pm-screen-pip pm-corner-${corner}`}>
              <MockNotes />
            </div>
          )}
          {layout === 'sbs' && (
            <div className="pm-screen-side">
              <MockNotes />
            </div>
          )}
          {layout === 'stack' && (
            <div className="pm-screen-stack">
              <MockNotes />
            </div>
          )}
          <div className="pm-caption mono">{CAPTION}</div>
        </div>
      </div>
      <div className="pm-shadow" />
    </div>
  );
}

export default function Layouts() {
  const [layout, setLayout] = useState<Layout>('pip');
  const [corner, setCorner] = useState<Corner>('bl');

  const modes: ReadonlyArray<[Layout, string]> = [
    ['pip', 'PiP'],
    ['sbs', 'side-by-side'],
    ['stack', 'stack'],
  ];
  const corners: ReadonlyArray<Corner> = ['tl', 'tr', 'bl', 'br'];

  return (
    <section className="layouts" id="layouts">
      <div className="layouts-text">
        <div className="mono small">— three layouts —</div>
        <h2>same pair. different vibe.</h2>
        <p>
          Same screenshot, same photo. Switch how they sit together. Pick
          whichever one says the truer thing today.
        </p>
        <div className="lay-controls">
          <div className="seg">
            {modes.map(([v, label]) => (
              <button
                key={v}
                data-on={layout === v ? '1' : '0'}
                onClick={() => setLayout(v)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          {layout === 'pip' && (
            <div className="seg seg-mini">
              {corners.map((c) => (
                <button
                  key={c}
                  data-on={corner === c ? '1' : '0'}
                  onClick={() => setCorner(c)}
                  type="button"
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="layouts-stage">
        <PhoneMock layout={layout} corner={corner} />
      </div>
    </section>
  );
}
