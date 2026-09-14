import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Coffee, Flame, Pizza, Sparkles, Utensils } from 'lucide-react';
import './home-menu-compact.css';

type Language = 'en' | 'bn';

interface SignatureDish {
  id: string;
  image: string;
  name_en: string;
  name_bn: string;
  category_en: string;
  category_bn: string;
  note_en: string;
  note_bn: string;
  icon: typeof Utensils;
}

const signatureDishes: SignatureDish[] = [
  {
    id: 'doi-fuchka',
    image: 'aronno-089',
    name_en: 'Crispy Special Doi Fuchka',
    name_bn: 'স্পেশাল ক্রিস্পি দই ফুচকা',
    category_en: 'Appetizers & Snacks',
    category_bn: 'অ্যাপেটাইজার ও চাট',
    note_en: 'Crispy puris with seasoned curd & tamarind glaze',
    note_bn: 'মচমচে ফুচকা, মিষ্টি দই ও তেঁতুলের ঘন চাটনি',
    icon: Sparkles,
  },
  {
    id: 'chicken-pizza',
    image: 'aronno-097',
    name_en: 'Cheese Loaded Chicken Pizza',
    name_bn: 'চিজ লোডেড চিকেন পিৎজা',
    category_en: 'Pizza',
    category_bn: 'পিৎজা',
    note_en: 'Oven-baked crust generously loaded with mozzarella',
    note_bn: 'ওভেনে বেকড মোজারেলা চিজ ও স্পাইসি চিকেন',
    icon: Pizza,
  },
  {
    id: 'chili-chicken-naan',
    image: 'aronno-104',
    name_en: 'Hot Chili Chicken & Garlic Naan',
    name_bn: 'হট চিলি চিকেন ও গার্লিক নান থালি',
    category_en: 'Grill & Chinese',
    category_bn: 'গ্রিল ও চাইনিজ',
    note_en: 'Sizzling spicy chicken with freshly toasted naan',
    note_bn: 'ধোঁয়া ওঠা ঝাল চিকেন ও গরম তুলতুলে নান',
    icon: Flame,
  },
  {
    id: 'aronno-special-tea',
    image: 'aronno-114',
    name_en: 'Aronno Signature Milk Tea',
    name_bn: 'অরণ্য স্পেশাল দুধ চা',
    category_en: 'Tea & Coffee',
    category_bn: 'চা ও কফি',
    note_en: 'Rich, aromatic blend for soulful table conversations',
    note_bn: 'গাঢ় লিকার ও দুধের স্বাদে জমজমাট আড্ডার চা',
    icon: Coffee,
  },
];

export default function HomeMenuCompact({ lang }: { lang: Language }) {
  const t = (en: string, bn: string) => (lang === 'en' ? en : bn);

  return (
    <section className="home-menu-compact" id="menu" aria-labelledby="home-menu-compact-heading">
      <div className="hmc-container">
        {/* Header with Title & Context */}
        <header className="hmc-header">
          <div className="hmc-header-copy">
            <p className="hmc-eyebrow">
              <Utensils size={15} />
              {t('A TASTE OF ARONNO', 'অরণ্যের স্বাদ ও সিগনেচার মেনু')}
            </p>
            <h2 id="home-menu-compact-heading">
              {t('A few favourites,', 'পছন্দের কিছু স্বাদ,')}
              <br />
              <em>{t('one complete menu.', 'এক পূর্ণাঙ্গ মেনু।')}</em>
            </h2>
          </div>
          <div className="hmc-header-desc">
            <p>
              {t(
                'A light preview of our most-loved dishes. Visit our dedicated menu page to explore all 13 categories, 65+ food items, combos, portions and prices.',
                'জনপ্রিয় কয়েকটি খাবারের ছোট্ট এক ঝলক। আমাদের ১৩টি ক্যাটাগরির ৬৫টিরও বেশি খাবার, স্পেশাল কম্বো, পরিমাপ ও মূল্য তালিকা দেখতে আলাদা মেনু পেজে যান।'
              )}
            </p>
          </div>
        </header>

        {/* 4 Compact Signature Food Cards */}
        <div className="hmc-grid" aria-label={t('Signature dishes preview', 'সিগনেচার খাবারের প্রিভিউ')}>
          {signatureDishes.map((dish) => {
            const Icon = dish.icon;
            return (
              <div className="hmc-card" key={dish.id}>
                <div className="hmc-card-media">
                  <Image
                    src={`/images/gallery/${dish.image}.webp`}
                    alt={t(dish.name_en, dish.name_bn)}
                    width={480}
                    height={360}
                    sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <span className="hmc-card-badge">
                    <Icon size={12} />
                    <span>{t(dish.category_en, dish.category_bn)}</span>
                  </span>
                </div>
                <div className="hmc-card-info">
                  <h3 className="hmc-card-title">{t(dish.name_en, dish.name_bn)}</h3>
                  <p className="hmc-card-note">{t(dish.note_en, dish.note_bn)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlighted CTA Banner directly leading to the full Menu Page */}
        <div className="hmc-cta-bar">
          <div className="hmc-cta-text">
            <strong>{t('Want to see the entire menu?', 'সম্পূর্ণ খাবারের মেনু দেখতে চান?')}</strong>
            <span>
              {t(
                '13 categories · 65+ dishes · Drinks, grill, biriyani & desserts',
                '১৩টি ক্যাটাগরি · ৬৫+ খাবার · বিরিয়ানি, চাইনিজ, গ্রিল, পিৎজা ও পানীয়'
              )}
            </span>
          </div>
          <Link href="/menu" className="hmc-primary-btn" aria-label={t('Open dedicated menu page', 'সম্পূর্ণ মেনু পেজ খুলুন')}>
            <span>{t('View Complete Menu Page', 'সম্পূর্ণ মেনু পেজ দেখুন')}</span>
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
