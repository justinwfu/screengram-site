import { useState } from 'react';
import { MockNotes } from './MockScreens.jsx';

type Layout = 'pip' | 'sbs' | 'stack';
type Corner = 'tl' | 'tr' | 'bl' | 'br';

interface Props {
  photoSrc: string;
  photoAlt?: string;
}

function PhoneMockReact({
  photoSrc,
  photoAlt,
  layout,
  corner,
  caption,
}: {
  photoSrc: string;
  photoAlt?: string;
  layout: Layout;
  corner: Corner;
  caption?: string;
}) {
  const photo = (
    <div className="pm-photo">
      <img src={photoSrc} alt={photoAlt ?? ''} />
    </div>
  );
  const inset = <MockNotes />;
  return (
    <div className="pm pm-big">
      <div className="pm-bezel">
        <div className="pm-island" />
        <div className={`pm-inner pm-${layout}`}>
          {layout === 'sbs' ? (
            <>
              {photo}
              <div className="pm-screen-side">{inset}</div>
            </>
          ) : layout === 'stack' ? (
            <>
              {photo}
              <div className="pm-screen-stack">{inset}</div>
            </>
          ) : (
            <>
              {photo}
              <div className={`pm-screen-pip pm-corner-${corner}`}>{inset}</div>
            </>
          )}
          {caption && <div className="pm-caption mono">{caption}</div>}
        </div>
      </div>
    </div>
  );
}

export default function Layouts({ photoSrc, photoAlt }: Props) {
  const [layout, setLayout] = useState<Layout>('pip');
  const [corner, setCorner] = useState<Corner>('bl');

  const layoutOptions: Array<[Layout, string]> = [
    ['pip', 'PiP'],
    ['sbs', 'side-by-side'],
    ['stack', 'stack'],
  ];
  const corners: Corner[] = ['tl', 'tr', 'bl', 'br'];

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
          <div className="seg" role="group" aria-label="Layout">
            {layoutOptions.map(([v, l]) => (
              <button
                key={v}
                type="button"
                data-on={layout === v ? '1' : '0'}
                aria-pressed={layout === v}
                onClick={() => setLayout(v)}
              >
                {l}
              </button>
            ))}
          </div>
          {layout === 'pip' && (
            <div className="seg seg-mini" role="group" aria-label="PiP corner">
              {corners.map((c) => (
                <button
                  key={c}
                  type="button"
                  data-on={corner === c ? '1' : '0'}
                  aria-pressed={corner === c}
                  onClick={() => setCorner(c)}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="layouts-stage">
        <PhoneMockReact
          photoSrc={photoSrc}
          photoAlt={photoAlt}
          layout={layout}
          corner={corner}
          caption="desk, before light — tue 6:51 am"
        />
      </div>
    </section>
  );
}
