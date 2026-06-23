import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutGrid, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { useStore } from '../lib/store';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Find Creators' },
  { to: '/support', label: 'Support' },
  { to: '/help', label: 'Help' },
];

export function NavBar() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    setAuthUser(null);
    setProfileOpen(false);
    navigate('/login');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-signal' : 'text-text-dim hover:text-text'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {authUser ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(v => !v)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-full border border-line hover:border-signal/30 transition-colors">
                <div className="w-7 h-7 rounded-full bg-signal/20 flex items-center justify-center text-signal font-bold text-xs">
                  {authUser.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm font-medium max-w-[100px] truncate">{authUser.name}</span>
                <ChevronDown size={14} className={`text-text-faint transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-line bg-panel shadow-2xl overflow-hidden z-50 animate-fade-up"
                  style={{ animationDuration: '0.2s' }}>
                  <div className="px-4 py-3 border-b border-line">
                    <div className="text-sm font-semibold">{authUser.name}</div>
                    <div className="text-xs text-text-faint truncate">{authUser.email || authUser.phone}</div>
                  </div>
                  <div className="py-1">
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-dim hover:text-text hover:bg-panel-raised transition-colors">
                      <LayoutGrid size={15} /> Dashboard
                    </Link>
                    <button onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors w-full text-left">
                      <LogOut size={15} /> Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-text-dim hover:text-text px-4 py-2.5 transition-colors">
                Log in
              </Link>
              <Link to="/signup"
                className="text-sm font-bold bg-signal text-ink px-5 py-2.5 rounded-full hover:brightness-110 transition-all"
                style={{ background: 'linear-gradient(135deg,#3B82F6,#4FD1C5)' }}>
                Get Started
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden text-text p-2" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mt-2 mx-4 rounded-2xl border border-line bg-panel overflow-hidden animate-fade-up" style={{ animationDuration: '0.2s' }}>
          <nav className="flex flex-col">
            {LINKS.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3.5 px-5 text-sm border-b border-line-soft ${isActive ? 'text-signal' : 'text-text-dim'}`}>
                {l.label}
              </NavLink>
            ))}
            {authUser && (
              <Link to="/dashboard" onClick={() => setOpen(false)}
                className="py-3.5 px-5 text-sm border-b border-line-soft text-text-dim flex items-center gap-2">
                <LayoutGrid size={15} /> Dashboard
              </Link>
            )}
          </nav>
          <div className="flex gap-3 p-4">
            {authUser ? (
              <button onClick={handleLogout} className="flex-1 text-center py-2.5 text-sm border border-danger/30 text-danger rounded-full">
                Log out
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 text-sm border border-line rounded-full text-text-dim">
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 text-sm text-ink rounded-full font-bold"
                  style={{ background: 'linear-gradient(135deg,#3B82F6,#4FD1C5)' }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}