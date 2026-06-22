import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, LifeBuoy, Plus } from 'lucide-react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

const QUICK_FAQ = [
  { q: 'How fast do creators respond to booking requests?', a: 'Most creators confirm or decline within 2 hours. You will get a notification the moment your booking status changes.' },
  { q: 'What happens if a creator cancels?', a: 'You are automatically refunded in full, and we will suggest similarly available creators that match your original brief.' },
  { q: 'Is my payment held securely until the shoot is done?', a: 'Yes. Funds are held in escrow and released to the creator 48 hours after the shoot is marked complete, unless a dispute is raised.' },
  { q: 'How do I report a problem with a shoot?', a: 'Open the booking from your dashboard and select "Report an issue." Our team reviews every case within 24 hours.' },
];

export function SupportPage() {
  const [openIdx, setOpenIdx] = useState(0);
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <NavBar />

      <section className="pt-32 pb-12 border-b border-line">
        <div className="max-w-5xl mx-auto px-6">
          <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">We're here to help</div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Support</h1>
          <p className="text-text-dim max-w-xl">
            Reach our team directly, or browse the help center for answers to common questions about bookings, payments, and creator verification.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {[
              { icon: MessageCircle, title: 'Live Chat', body: 'Average response time under 4 minutes during business hours.', cta: 'Start a chat', href: '#' },
              { icon: Mail, title: 'Email Us', body: 'For account, billing, or partnership inquiries.', cta: 'jaydeveloper010@gmail.com', href: 'mailto:jaydeveloper010@gmail.com' },
              { icon: LifeBuoy, title: 'Help Center', body: 'Step-by-step guides for clients and creators.', cta: 'Browse articles', href: '/help' },
            ].map(({ icon: Icon, title, body, cta, href }) => (
              <div key={title} className="rounded-2xl border border-line bg-panel p-7 hover:border-signal/40 transition-colors">
                <div className="h-11 w-11 rounded-xl bg-signal/10 flex items-center justify-center text-signal mb-5">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
                <p className="text-text-dim text-sm mb-5">{body}</p>
                {href.startsWith('/') ? (
                  <Link to={href} className="text-sm font-semibold text-signal hover:text-signal-bright">{cta} →</Link>
                ) : (
                  <a href={href} className="text-sm font-semibold text-signal hover:text-signal-bright">{cta}</a>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <h2 className="font-display text-2xl font-bold mb-3">Send us a message</h2>
              <p className="text-text-dim text-sm mb-8">Fill out the form and our team will get back to you within one business day.</p>

              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-dim mb-2">Name</label>
                    <input required placeholder="Your full name" className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dim mb-2">Email</label>
                    <input type="email" required placeholder="you@example.com" className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dim mb-2">Topic</label>
                  <select className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal">
                    <option>Booking issue</option>
                    <option>Payment & billing</option>
                    <option>Creator verification</option>
                    <option>Account access</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dim mb-2">Message</label>
                  <textarea required rows={4} placeholder="Tell us what's going on..." className="w-full bg-panel-raised border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-signal resize-none" />
                </div>
                <button type="submit" className="bg-signal text-ink font-semibold px-7 py-3.5 rounded-full hover:bg-signal-bright transition-colors">
                  {sent ? 'Message Sent ✓' : 'Send Message'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold mb-3">Quick answers</h2>
              <div className="mt-6 divide-y divide-line">
                {QUICK_FAQ.map((item, i) => (
                  <div key={item.q} className="py-5">
                    <button
                      onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                      className="w-full flex items-center justify-between gap-4 text-left"
                    >
                      <h4 className="font-semibold text-sm">{item.q}</h4>
                      <Plus size={16} className={`flex-shrink-0 text-text-faint transition-transform ${openIdx === i ? 'rotate-45 text-signal' : ''}`} />
                    </button>
                    {openIdx === i && <p className="text-text-dim text-sm mt-3 leading-relaxed">{item.a}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
