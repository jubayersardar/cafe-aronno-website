import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Camera } from 'lucide-react';
import './home-gallery-preview.css';

type Language = 'en' | 'bn';

interface GalleryPreviewItem {
  id: string;
  image: string;
  alt_en: string;
  alt_bn: string;
  label_en: string;
  label_bn: string;
}

const previewPhotos: GalleryPreviewItem[] = [
  {
    id: 'wings-day',
    image: 'aronno-032',
    alt_en: 'Golden wings photo spot in day light',
    alt_bn: 'দিনের আলোয় সোনালি ডানা ফটোস্পট',
    label_en: 'Outdoor Photo Spot',
    label_bn: 'আউটডোর ফটোস্পট',
  },
  {
    id: 'lounge-night',
    image: 'aronno-067',
    alt_en: 'Pergola party lounge with warm evening lights',
    alt_bn: 'রাতের আলোয় পারগোলা পার্টি লাউঞ্জ',
    label_en: 'Night View',
    label_bn: 'নাইট ভিউ',
  },
  {
    id: 'indoor-hall',
    image: 'aronno-083',
    alt_en: 'AC indoor arches and warm dream lighting',
    alt_bn: 'ইনডোরের আর্চ ও ঝুলন্ত বাতির ড্রিম ভিউ',
    label_en: 'AC Indoor Lounge',
    label_bn: 'এসি ইনডোর',
  },
  {
    id: 'food-steak',
    image: 'aronno-060',
    alt_en: 'Crispy fried chicken steak with special sauce',
    alt_bn: 'ক্রিস্পি ফ্রাইড চিকেন স্টেক ও সস',
    label_en: 'Signature Food',
    label_bn: 'সিগনেচার ফুড',
  },
  {
    id: 'birthday-setup',
    image: 'aronno-040',
    alt_en: 'Golden party zone for birthdays and celebrations',
    alt_bn: 'হ্যাপি বার্থডে গোল্ডেন পার্টি জোন',
    label_en: 'Celebration Moment',
    label_bn: 'বিশেষ আয়োজন',
  },
{"id": "aronno-015", "image": "aronno-015", "alt_en": "Cafe Aronno official gallery photograph", "alt_bn": "ক্যাফে অরণ্য — বাগানে ফুটে থাকা হলুদ গাঁদা ফুল", "label_en": "Cafe Aronno", "label_bn": "ক্যাফে অরণ্য"},{"id": "aronno-020", "image": "aronno-020", "alt_en": "Cafe Aronno official gallery photograph", "alt_bn": "ক্যাফে অরণ্য — রাতের আলোয় সবুজ পাম গাছ", "label_en": "Cafe Aronno", "label_bn": "ক্যাফে অরণ্য"},{"id": "aronno-106", "image": "aronno-106", "alt_en": "Cafe Aronno official gallery photograph", "alt_bn": "ক্যাফে অরণ্য — জলাশয়ের শান্ত জল ও শাপলা কুঁড়ি", "label_en": "Cafe Aronno", "label_bn": "ক্যাফে অরণ্য"},{"id": "aronno-107", "image": "aronno-107", "alt_en": "Cafe Aronno official gallery photograph", "alt_bn": "ক্যাফে অরণ্য — রাতের আলোয় সাদা বাগানের দোলনা", "label_en": "Cafe Aronno", "label_bn": "ক্যাফে অরণ্য"},{"id": "aronno-108", "image": "aronno-108", "alt_en": "Cafe Aronno official gallery photograph", "alt_bn": "ক্যাফে অরণ্য — টাইলস বাঁধানো চত্বরে সোনালি ডানার কর্নার", "label_en": "Cafe Aronno", "label_bn": "ক্যাফে অরণ্য"},
];

export default function HomeGalleryPreview({ lang }: { lang: Language }) {
  const t = (en: string, bn: string) => (lang === 'en' ? en : bn);

  return (
    <section className="home-gallery-preview" id="gallery" aria-labelledby="home-gallery-preview-heading">
      <div className="hgp-container">
        {/* Header */}
        <header className="hgp-header">
          <div className="hgp-header-copy">
            <p className="hgp-eyebrow">
              <Camera size={15} />
              {t('REAL MOMENTS AT ARONNO', 'ক্যাফে অরণ্যের আসল মুহূর্ত')}
            </p>
            <h2 id="home-gallery-preview-heading">
              {t('A glimpse of life,', 'জীবন্ত স্মৃতির ঝলক,')}
              <br />
              <em>{t('captured in frames.', 'ক্যামেরায় বন্দি গল্প।')}</em>
            </h2>
          </div>
          <div className="hgp-header-desc">
            <p>
              {t(
                'Browse a few captured moments from our cafe. Open our complete gallery to filter across 120+ high-resolution photos by Day, Night, Indoor, Outdoor, Food and Occasions.',
                'ক্যাফে অরণ্যের আসল কিছু মুহূর্তের ঝলক। আমাদের সম্পূর্ণ গ্যালারিতে রয়েছে দিন, রাত, ইনডোর, আউটডোর, ফুড ও আয়োজনের ১২০টিরও বেশি আসল ছবি ও ফুলস্ক্রিন ভিউ।'
              )}
            </p>
          </div>
        </header>

        {/* 5 Curated Photos Grid (Pure Photos, No Text on Cards) */}
        <div className="hgp-grid" aria-label={t('Featured gallery photos', 'নির্বাচিত গ্যালারি ছবি')}>
          {previewPhotos.map((photo) => (
            <Link
              href="/gallery"
              key={photo.id}
              className="hgp-item"
              aria-label={`${t(photo.alt_en, photo.alt_bn)} — গ্যালারিতে দেখুন`}
            >
              <Image
                src={`/images/gallery/${photo.image}.webp`}
                alt={t(photo.alt_en, photo.alt_bn)}
                width={560}
                height={420}
                sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 20vw"
                loading="lazy"
              />
              <span className="hgp-overlay">
                <Camera size={20} />
                <span>{t(photo.label_en, photo.label_bn)}</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Highlighted More Button to /gallery */}
        <div className="hgp-more-bar">
          <div className="hgp-more-text">
            <strong>{t('Explore the full photographic collection', 'সম্পূর্ণ ফটো ও ভিডিও সংগ্রহ দেখতে চান?')}</strong>
            <span>
              {t(
                '120+ photos · Multi-select filters · Fullscreen viewer · Official videos',
                '১২০+ ছবি · মাল্টি-সিলেক্ট ক্যাটাগরি ফিল্টার · ফুলস্ক্রিন লাইটবক্স · ফেসবুক ভিডিও'
              )}
            </span>
          </div>
          <Link href="/gallery" className="hgp-more-btn" aria-label={t('Open full gallery page', 'সম্পূর্ণ গ্যালারি পেজ খুলুন')}>
            <span>{t('View Complete Gallery (120+ Photos)', 'সম্পূর্ণ গ্যালারি দেখুন (১২০+ ছবি)')}</span>
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
