interface FilmstripProps {
  photos: string[];
  /** when true, frames are clickable-feeling but purely decorative */
  size?: 'sm' | 'md' | 'lg';
  scroll?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const SIZE_MAP = {
  sm: 'h-16 w-24',
  md: 'h-24 w-36',
  lg: 'h-40 w-60',
};

function Sprockets({ count = 6, vertical = false }: { count?: number; vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="flex justify-between w-full px-1.5 py-1">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className="w-1.5 h-2.5 rounded-[2px] bg-ink/70" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between h-full py-1.5 px-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="h-1.5 w-2.5 rounded-[2px] bg-ink/70" />
      ))}
    </div>
  );
}

export function Filmstrip({ photos, size = 'md', scroll = false, orientation = 'horizontal', className = '' }: FilmstripProps) {
  const frameClass = SIZE_MAP[size];
  const sequence = scroll ? [...photos, ...photos] : photos;

  if (orientation === 'vertical') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="flex flex-col bg-[#0E0E10] gap-0 h-full">
          {sequence.map((src, i) => (
            <div key={i} className="flex flex-col items-stretch bg-[#0E0E10] border-x border-line-soft flex-1 min-h-0">
              <Sprockets vertical />
              <div className="relative flex-1 min-h-0 overflow-hidden border-y border-line-soft bg-panel">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[15%] contrast-[1.05]"
                />
              </div>
              <Sprockets vertical />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`flex bg-[#0E0E10] ${scroll ? 'filmstrip-track w-max' : 'flex-wrap'} gap-0`}>
        {sequence.map((src, i) => (
          <div key={i} className="flex items-stretch bg-[#0E0E10] border-y border-line-soft">
            <Sprockets />
            <div className={`${frameClass} relative flex-shrink-0 overflow-hidden border-x border-line-soft bg-panel`}>
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover grayscale-[15%] contrast-[1.05]"
              />
            </div>
            <Sprockets />
          </div>
        ))}
      </div>
    </div>
  );
}
