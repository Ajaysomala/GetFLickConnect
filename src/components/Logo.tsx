import { Link } from 'react-router-dom';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-line group-hover:border-signal transition-colors">
        <span className="h-2.5 w-2.5 rounded-full bg-signal rec-dot" />
      </span>
      <span className="font-display text-[1.05rem] font-bold tracking-tight leading-none">
        GET FLICK <span className="text-signal">CONNECT</span>
      </span>
    </Link>
  );
}
