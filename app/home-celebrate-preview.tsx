import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Gift, HeartHandshake, PartyPopper } from 'lucide-react';
import './home-celebrate-preview.css';

type Language = 'en' | 'bn';

export default function HomeCelebratePreview({ lang }: { lang: Language }) {
  const t = (en: string, bn: string) => (lang === 'en' ? en : bn);

  return (
    <section className="home-celebrate-preview" id="celebrate" aria-labelledby="home-celebrate-preview-heading">
      <div className="hcp-container">
        <div className="hcp-card">
          {/* Left Column: Visual Showcase with Real Celebration Photos */}
          <div className="hcp-media-grid">
            <div className="hcp-media-main">
              <Image
                src="/images/gallery/aronno-040.webp"
                alt={t('Birthday celebration zone at Cafe Aronno', 'ক্যাফে অরণ্যে জন্মদিনের সেলিব্রেশন কর্নার')}
                width={720}
                height={540}
                sizes="(max-width: 768px) 100vw, 35vw"
                loading="lazy"
              />
              <span className="hcp-photo-badge">
                <PartyPopper size={13} />
                <span>{t('Celebration Setup', 'বিশেষ আয়োজন')}</span>
              </span>
            </div>
            <div className="hcp-media-sub">
              <div className="hcp-media-small">
                <Image
                  src="/images/gallery/aronno-076.webp"
                  alt={t('Pergola birthday lighting setup', 'পারগোলা জন্মদিনের আলোকসজ্জা')}
                  width={360}
                  height={270}
                  sizes="(max-width: 768px) 50vw, 18vw"
                  loading="lazy"
                />
              </div>
              <div className="hcp-media-small">
                <Image
                  src="/images/gallery/aronno-031.webp"
                  alt={t('Balloon canopy decor at open pergola', 'ওপেন পারগোলায় বেলুন ক্যানোপি ডেকোরেশন')}
                  width={360}
                  height={270}
                  sizes="(max-width: 768px) 50vw, 18vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Copy, Event Types & CTA */}
          <div className="hcp-content">
            <p className="hcp-eyebrow">
              <CalendarDays size={15} />
              {t('EVENTS & CELEBRATIONS', 'আপনার প্রতিটি বিশেষ মুহূর্তের আয়োজন')}
            </p>
            <h2 id="home-celebrate-preview-heading">
              {t('Birthdays, get-togethers,', 'জন্মদিন, বন্ধুদের আড্ডা,')}
              <br />
              <em>{t('or a joyful celebration.', 'কিংবা পারিবারিক উৎসব।')}</em>
            </h2>
            <p className="hcp-desc">
              {t(
                'Make your precious celebrations truly extraordinary. From custom balloon arches and sofa lounges to delicious food platters and warm hospitality, Cafe Aronno arranges it all with heartfelt care.',
                'আপনার জীবনের বিশেষ দিনগুলোকে করে তুলুন আরও স্মরণীয়। নান্দনিক বেলুন ডেকোরেশন, আরামদায়ক সোফা সেটআপ, সুস্বাদু খাবার আর আন্তরিক আতিথেয়তায় ক্যাফে অরণ্য সাজিয়ে দেয় আপনার মনের মতো আয়োজন।'
              )}
            </p>

            <div className="hcp-tags">
              <span>
                <Gift size={13} />
                {t('Birthday Parties', 'বার্থডে পার্টি')}
              </span>
              <span>
                <HeartHandshake size={13} />
                {t('Anniversary Dinners', 'বিবাহবার্ষিকী')}
              </span>
              <span>
                <PartyPopper size={13} />
                {t('Reunions & Get-Togethers', 'গেট-টুগেদার ও পুনর্মিলনী')}
              </span>
            </div>

            <div className="hcp-actions">
              <Link href="/celebrate" className="hcp-primary-btn" aria-label={t('Plan your celebration page', 'আয়োজন পেজ খুলুন')}>
                <span>{t('Plan Your Event & Packages', 'আয়োজনের বিস্তারিত ও প্যাকেজ দেখুন')}</span>
                <ArrowUpRight size={19} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
