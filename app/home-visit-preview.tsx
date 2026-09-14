import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from 'lucide-react';
import './home-visit-preview.css';

type Language = 'en' | 'bn';

const PHONE = 'tel:+8801689442223';
const MAPS = 'https://maps.app.goo.gl/MykfZKgoHP9VUGPU7';

export default function HomeVisitPreview({ lang }: { lang: Language }) {
  const t = (en: string, bn: string) => (lang === 'en' ? en : bn);

  return (
    <section className="home-visit-preview" id="visit" aria-labelledby="home-visit-preview-heading">
      <div className="hvp-container">
        <div className="hvp-grid">
          {/* Left Column: Location Info & Quick Contacts */}
          <div className="hvp-info">
            <p className="hvp-eyebrow">
              <MapPin size={15} />
              {t('LOCATION & HOURS', 'ক্যাফে অরণ্যে আসার ঠিকানা')}
            </p>
            <h2 id="home-visit-preview-heading">
              {t('Plan your visit,', 'চলে আসুন অরণ্যে,')}
              <br />
              <em>{t('make time for yourself.', 'সময় কাটুক নিজের মতো।')}</em>
            </h2>
            <p className="hvp-desc">
              {t(
                'Located conveniently at Hira Square in Kolarhat Bazar, Rajbari. A peaceful green oasis away from city noise, ready to welcome you with warm food and tea.',
                'রাজবাড়ীর কোলারহাট বাজার সংলগ্ন হিরা স্কয়ারে শান্ত-সবুজ পরিবেশে ক্যাফে অরণ্য। শহরের কোলাহল এড়িয়ে প্রিয়জনদের সাথে সুন্দর সময় কাটাতে চলে আসুন যেকোনো দিন।'
              )}
            </p>

            <div className="hvp-details">
              <div className="hvp-detail-item">
                <span className="hvp-icon-circle">
                  <MapPin size={18} />
                </span>
                <div>
                  <strong>{t('Address', 'ঠিকানা')}</strong>
                  <p>{t('Hira Square, School Road, Kolarhat Bazar, Rajbari', 'হিরা স্কয়ার, স্কুল রোড, কোলারহাট বাজার, রাজবাড়ী')}</p>
                </div>
              </div>

              <div className="hvp-detail-item">
                <span className="hvp-icon-circle">
                  <Clock size={18} />
                </span>
                <div>
                  <strong>{t('Opening Hours', 'সময়সূচি')}</strong>
                  <p>{t('Call to confirm today’s opening hours.', 'আজকের খোলার সময় ফোনে নিশ্চিত করুন।')}</p>
                </div>
              </div>

              <div className="hvp-detail-item">
                <span className="hvp-icon-circle">
                  <Phone size={18} />
                </span>
                <div>
                  <strong>{t('Direct Contact', 'যোগাযোগ ও বুকিং')}</strong>
                  <a href={PHONE} className="hvp-phone-link">
                    01689-442223
                  </a>
                </div>
              </div>
            </div>

            <div className="hvp-actions">
              <Link href="/visit" className="hvp-primary-btn" aria-label={t('Open full visit page', 'ভিজিট পেজ খুলুন')}>
                <span>{t('Directions & Visit Information', 'যাতায়াত ও সম্পূর্ণ ভিজিট তথ্য')}</span>
                <ArrowUpRight size={19} />
              </Link>
              <a href={MAPS} target="_blank" rel="noreferrer" className="hvp-maps-btn">
                <Navigation size={15} />
                <span>{t('Open Google Maps', 'গুগল ম্যাপে দেখুন')}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Photo of Entrance & Campus */}
          <div className="hvp-visual">
            <div className="hvp-media-card">
              <Image
                src="/images/story-exterior-dusk.webp"
                alt={t('Cafe Aronno entrance glowing at dusk', 'সন্ধ্যার আলোয় আলোকিত ক্যাফে অরণ্যের প্রবেশপথ')}
                width={720}
                height={540}
                sizes="(max-width: 768px) 100vw, 45vw"
                loading="lazy"
              />
              <div className="hvp-visual-overlay">
                <span className="hvp-visual-badge">
                  <MapPin size={13} />
                  <span>কোলারহাট, রাজবাড়ী</span>
                </span>
                <p className="hvp-visual-title">ক্যাফে অরণ্যের প্রবেশদ্বার ও সুপরিসর চত্বর</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
