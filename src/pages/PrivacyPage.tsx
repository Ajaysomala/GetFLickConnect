import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

const SECTIONS = [
  { h: '1. Information we collect', p: 'We collect information you provide directly, including your name, email, profile details, gear lists, portfolio uploads, and certification documents. We also collect booking and payment activity needed to operate the marketplace, and basic device information for security and performance.' },
  { h: '2. How we use your information', list: [
    'To create and display your client or Creator profile.',
    'To process bookings, payments, and payouts.',
    'To verify Creator identity and drone certification status.',
    'To send booking confirmations, reminders, and account notifications.',
    'To improve search, matching, and platform safety.',
  ]},
  { h: '3. Sharing of information', p: 'Profile information you mark as public (name, bio, gear, portfolio, rate) is visible to other users by design. We share booking details only with the client and Creator involved in that booking, and with payment processors as needed to complete transactions. We do not sell personal data to third parties.' },
  { h: '4. Certification and verification documents', p: 'Part 107 certificates and other credentials uploaded during registration are used solely for verification and are not displayed publicly beyond the resulting "verified" badge on your profile.' },
  { h: '5. Data retention', p: 'We retain account and booking data for as long as your account is active, and for a limited period afterward as required for tax, legal, or dispute-resolution purposes.' },
  { h: '6. Your choices', p: 'You can edit or remove most profile information from your dashboard at any time. You may request account deletion by contacting support, subject to retention requirements described above.' },
  { h: '7. Security', p: 'We use industry-standard safeguards to protect your data, including encrypted storage for sensitive documents and restricted internal access to verification materials.' },
  { h: '8. Changes to this policy', p: 'We may update this policy periodically. Material changes will be communicated via email or an in-app notice before they take effect.' },
];

export function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <NavBar />
      <section className="pt-32 pb-12 border-b border-line">
        <div className="max-w-3xl mx-auto px-6">
          <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Legal</div>
          <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-text-faint text-sm mb-10">Last updated: June 1, 2026</p>
          {SECTIONS.map((s) => (
            <div key={s.h} className="mb-10">
              <h2 className="font-display text-xl font-bold mb-3">{s.h}</h2>
              {s.p && <p className="text-text-dim text-sm leading-relaxed">{s.p}</p>}
              {s.list && (
                <ul className="space-y-2 mt-3">
                  {s.list.map((item) => (
                    <li key={item} className="text-text-dim text-sm leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-signal">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div>
            <h2 className="font-display text-xl font-bold mb-3">9. Contact</h2>
            <p className="text-text-dim text-sm">
              For privacy questions or data requests, contact{' '}
              <a href="mailto:jaydeveloper010@gmail.com" className="text-signal hover:text-signal-bright">jaydeveloper010@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
