import type { ReactNode } from 'react';

export function SpecBadge({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'signal' | 'ok' | 'muted' }) {
  const toneClass = {
    default: 'bg-panel-raised text-text-dim border-line',
    signal: 'bg-signal/10 text-signal-bright border-signal/30',
    ok: 'bg-ok/10 text-ok border-ok/25',
    muted: 'bg-transparent text-text-faint border-line',
  }[tone];

  return (
    <span className={`font-mono text-[0.72rem] px-2.5 py-1 rounded-md border ${toneClass} inline-flex items-center gap-1.5 whitespace-nowrap`}>
      {children}
    </span>
  );
}

export function Pill({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
        active
          ? 'bg-signal text-ink border-signal'
          : 'bg-transparent text-text-dim border-line hover:border-text-faint hover:text-text'
      }`}
    >
      {children}
    </button>
  );
}
