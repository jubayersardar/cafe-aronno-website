import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Home, Leaf, Moon } from 'lucide-react';
import './home-spaces-preview.css';

type Language = 'en' | 'bn';

interface SpaceHighlight {
  id: string;
  image: string;
  title_en: string;
  title_bn: string;
  desc_en: string;
  desc_bn: string;
  badge_en: string;
  badge_bn: string;
  icon: typeof Leaf;
}

const spaceHighlights: SpaceHighlight[] = [
  {
    id: 'ac-indoor',
    image: 'aronno-083',
    title_en: 'Fully Air-Conditioned Indoor Lounge',
    title_bn: 'শীতাতপনিয়ন্ত্রিত কাঁচঘেরা ইনডোর লাউঞ্জ',
    desc_en: 'Warm hanging lights, arched walkways & comfortable seating in all weather.',
    desc_bn: 'উষ্ণ বাতির স্নিগ্ধ আলো, দৃষ্টিনন্দন আর্চ এবং যেকোনো আবহাওয়ায় আরামদায়ক বসার আয়োজন।',
    badge_en: 'AC Indoor Dining',
    badge_bn: 'এসি ইনডোর ডাইনিং',
    icon: Home,
  },
  {
    id: 'outdoor-pergola',
    image: 'aronno-001',
    title_en: 'Garden Lawn & Open-Air Pergola',
    title_bn: 'সবুজ বাগান ও ছায়াঘেরা আউটডোর পারগোলা',
    desc_en: 'Open skies, gentle breeze, lush green plants & natural stone patio.',
    desc_bn: 'উন্মুক্ত আকাশ, মিষ্টি বাতাস, সবুজ গাছপালা আর টাইলস বাঁধানো চত্বরের প্রশান্তি।',
    badge_en: 'Open Garden & Lawn',
    badge_bn: 'উন্মুক্ত বাগান ও লন',
    icon: Leaf,
  },
  {
    id: 'evening-ambiance',
    image: 'aronno-061',
    title_en: 'Sparkling Evening Lights',
    title_bn: 'ঝলমলে সন্ধ্যার আলোকসজ্জা',
    desc_en: 'Warm lights bring the entrance and outdoor spaces to life after sunset.',
    desc_bn: 'সন্ধ্যা নামলেই ঝলমলে আলোয় সেজে ওঠে অরণ্যের প্রবেশপথ ও আউটডোর—চারপাশে তৈরি হয় মনোরম আবহ।',
    badge_en: 'Evening Ambiance',
    badge_bn: 'সান্ধ্যকালীন রূপ',
    icon: Moon,
  },
];

export default function HomeSpacesPreview({ lang }: { lang: Language }) {
  const t = (en: string, bn: string) => (lang === 'en' ? en : bn);

  return (
    <section className="home-spaces-preview" id="spaces" aria-labelledby="home-spaces-preview-heading">
      <div className="hsp-container">
        {/* Section Heading */}
        <header className="hsp-header">
          <div className="hsp-header-copy">
            <p className="hsp-eyebrow">
              <Leaf size={15} />
              {t('OUR ATMOSPHERE & SPACES', 'ক্যাফে অরণ্যের পরিবেশ ও আয়োজন')}
            </p>
            <h2 id="home-spaces-preview-heading">
              {t('Greenery by day,', 'দিনের আলোয় সবুজ,')}
              <br />
              <em>{t('golden lights by night.', 'রাতের আলোয় মায়াবী।')}</em>
            </h2>
          </div>
          <div className="hsp-header-desc">
            <p>
              {t(
                'Spread over a spacious natural estate with a lush lawn, modern AC interior and pergola seating—crafted for your memorable moments.',
                'সবুজ আঙিনা, খোলামেলা পারগোলা আর সুসজ্জিত এসি ইনডোর নিয়ে ক্যাফে অরণ্য আপনার একান্ত সময় ও আড্ডার অনন্য ঠিকানা।'
              )}
            </p>
          </div>
        </header>

        {/* 3 Spaces Cards */}
        <div className="hsp-grid" aria-label={t('Spaces highlights', 'পরিবেশের প্রধান আকর্ষণসমূহ')}>
          {spaceHighlights.map((space) => {
            const Icon = space.icon;
            return (
              <div className="hsp-card" key={space.id}>
                <div className="hsp-card-media">
                  <Image
                    src={`/images/gallery/${space.image}.webp`}
                    alt={t(space.title_en, space.title_bn)}
                    width={560}
                    height={420}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <span className="hsp-badge">
                    <Icon size={13} />
                    <span>{t(space.badge_en, space.badge_bn)}</span>
                  </span>
                </div>
                <div className="hsp-card-content">
                  <h3 className="hsp-card-title">{t(space.title_en, space.title_bn)}</h3>
                  <p className="hsp-card-desc">{t(space.desc_en, space.desc_bn)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlighted "More" Button leading to /spaces */}
        <div className="hsp-more-bar">
          <p className="hsp-more-text">
            {t(
              'Explore full walk-through moments, seating capacities, pergola patio, and evening lighting.',
              'ইনডোর-আউটডোরের আরও ছবি, বসার বিন্যাস ও পরিবেশের সম্পূর্ণ খুঁটিনাটি দেখুন।'
            )}
          </p>
          <Link href="/spaces" className="hsp-more-btn" aria-label={t('Explore our spaces page', 'পরিবেশ পেজ দেখুন')}>
            <span>{t('Explore Full Spaces Page', 'সম্পূর্ণ পরিবেশ ঘুরে দেখুন')}</span>
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
