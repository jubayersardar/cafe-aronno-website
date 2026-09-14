'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from 'lucide-react';
import './facebook-reels.css';

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const profileUrl = 'https://www.facebook.com/profile.php?id=61584126660660&sk=reels_tab';

export const reels = [
  { id: '2770504929966430', en: 'Warm corners of the dining room', bn: 'ইনডোরের উষ্ণ সাজ' },
  { id: '993804396926005', en: 'The signature feature wall', bn: 'সিগনেচার ইন্টেরিয়র' },
  { id: '1003581532085442', en: 'A quiet look around Aronno', bn: 'অরণ্যের এক শান্ত ঝলক' },
  { id: '904217585841728', en: 'Flowers welcome you in', bn: 'ফুলে সাজানো স্বাগত' },
  { id: '4531795113718942', en: 'Greenery along the walkway', bn: 'সবুজে ঘেরা পথ' },
  { id: '911364254990153', en: 'Little details, lovely moments', bn: 'ছোট্ট সাজে সুন্দর মুহূর্ত' },
  { id: '1035403382656894', en: 'Colourful indoor seating', bn: 'রঙিন ইনডোর আয়োজন' },
  { id: '1007621288982241', en: 'The Aronno sign after dark', bn: 'রাতের আলোয় অরণ্য' },
  { id: '1416612653898623', en: 'A table ready for conversation', bn: 'আড্ডার জন্য প্রস্তুত টেবিল' },
  { id: '916315377662407', en: 'A walk through the garden', bn: 'বাগানের পথে এক ঝলক' },
] as const;

const numeral = (value: number, lang: 'en' | 'bn') =>
  value.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-BD', { minimumIntegerDigits: 2, useGrouping: false });

function getEmbedUrl(reelId: string) {
  return `https://www.facebook.com/plugins/video.php?height=570&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${reelId}%2F&show_text=false&width=320&t=0`;
}

export default function FacebookReels({
  lang = 'bn',
  compactHeading = false,
}: {
  lang?: 'en' | 'bn';
  compactHeading?: boolean;
}) {
  const t = (en: string, bn: string) => (lang === 'en' ? en : bn);
  const trackRef = useRef<HTMLDivElement>(null);

  // Active inline playing reel ID
  const [inlineReelId, setInlineReelId] = useState<string | null>(null);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [slowLoad, setSlowLoad] = useState(false);
  useEffect(() => {
    if (!inlineReelId) return;
    const timer = window.setTimeout(() => setSlowLoad(true), 15000);
    return () => window.clearTimeout(timer);
  }, [inlineReelId]);
  const scroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = trackRef.current.clientWidth * 0.75;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      className={`home-reels ${compactHeading ? 'home-reels--compact' : ''}`}
      id="facebook-videos"
      aria-labelledby="home-reels-heading"
    >
      <div className="home-reels-container">
        {/* Header with Title and Scroll Controls */}
        <header className="home-reels-heading">
          <div className="home-reels-title-group">
            <p className="home-reels-eyebrow">
              <FacebookIcon size={15} />
              {t('LATEST FROM FACEBOOK', 'ফেসবুকের সাম্প্রতিক ১০টি ভিডিও')}
            </p>
            <h2 id="home-reels-heading">
              {t('See Aronno', 'ভিডিওতে দেখুন')}
              <br />
              <em>{t('in motion.', 'অরণ্যের আসল মুহূর্ত।')}</em>
            </h2>
          </div>

          <div className="home-reels-controls-group">
            <p className="home-reels-desc">
              {t(
                'Ten recent reels from our official Facebook page. Click any video to watch directly on this website. Scroll horizontally to explore all.',
                'ক্যাফে অরণ্যের অফিসিয়াল ফেসবুক পেজের সাম্প্রতিক ১০টি রিল—যেকোনো ভিডিওতে ক্লিক করে সরাসরি ওয়েবসাইটের ভেতরেই দেখুন। ডানে-বামে স্ক্রল করে সব ভিডিও উপভোগ করুন।'
              )}
            </p>
            <div className="home-reels-nav-buttons">
              <button
                type="button"
                className="home-reels-arrow-btn"
                onClick={() => scroll('left')}
                aria-label={t('Scroll videos left', 'বাম দিকে স্ক্রল করুন')}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                className="home-reels-arrow-btn"
                onClick={() => scroll('right')}
                aria-label={t('Scroll videos right', 'ডান দিকে স্ক্রল করুন')}
              >
                <ArrowRight size={18} />
              </button>
              <a href={profileUrl} target="_blank" rel="noreferrer" className="home-reels-all-link">
                <span>{t('All Facebook Reels', 'সব রিল দেখুন')}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </header>

        {/* Single-Row Horizontal Scrolling Track (10 Videos) */}
        <div
          className="home-reels-track"
          ref={trackRef}
          aria-label={t('Ten recent Cafe Aronno Facebook reels', 'ক্যাফে অরণ্যের সাম্প্রতিক দশটি ফেসবুক রিল')}
        >
          {reels.map((reel, index) => {
            const isPlaying = inlineReelId === reel.id;

            return (
              <div
                className={`home-reel-card ${isPlaying ? 'home-reel-card--playing' : ''}`}
                key={reel.id}
              >
                {isPlaying ? (
                  <>
                    {/* Inline embedded video player */}
                    <div className="home-reel-inline-player">
                      {!playerLoaded && <output className="home-reel-loading"><Image src={`/images/facebook-reels/reel-${reel.id}.webp`} width={540} height={960} alt=""/><span>{slowLoad ? t('Taking longer than usual. Watch on Facebook below.', 'লোড হতে সময় লাগছে। নিচের লিংকে ফেসবুকে দেখুন।') : t('Loading video…', 'ভিডিও লোড হচ্ছে…')}</span></output>}
                      <iframe
                        className="home-reel-frame"
                        src={getEmbedUrl(reel.id)}
                        onLoad={() => setPlayerLoaded(true)}
                        title={t(reel.en, reel.bn)}
                        width="320"
                        height="570"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen={true}
                      />
                    </div>
                    {/* Bottom Action Bar */}
                    <div className="home-reel-inline-bar">
                      <div className="home-reel-bar-right">
                        <a
                          href={`https://www.facebook.com/reel/${reel.id}/`}
                          target="_blank"
                          rel="noreferrer"
                          className="home-reel-inline-fb"
                          title={t('Open on Facebook', 'ফেসবুকে খুলুন')}
                        >
                          <FacebookIcon size={12} /><span>{t('Watch on Facebook', 'ফেসবুকে দেখুন')}</span>
                        </a>
                        <button
                          type="button"
                          className="home-reel-inline-close"
                          onClick={() => setInlineReelId(null)}
                          aria-label={t('Close video', 'ভিডিও বন্ধ করুন')}
                          title={t('Close video', 'ভিডিও বন্ধ করুন')}
                        >
                          <X size={15} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    className="home-reel-card-btn"
                    onClick={() => { setPlayerLoaded(false); setSlowLoad(false); setInlineReelId(reel.id); }}
                    aria-label={`${t(reel.en, reel.bn)} — ভিডিওটি দেখুন`}
                  >
                    <Image
                      src={`/images/facebook-reels/reel-${reel.id}.webp`}
                      width={540}
                      height={960}
                      sizes="(max-width: 640px) 70vw, (max-width: 1080px) 35vw, 290px"
                      alt=""
                      loading="lazy"
                    />
                    <span className="home-reel-shade" />
                    <span className="home-reel-index">ভিডিও {numeral(index + 1, lang)}</span>
                    <span className="home-reel-play">
                      <Play size={22} fill="currentColor" />
                    </span>
                    <span className="home-reel-copy">
                      <strong>{t(reel.en, reel.bn)}</strong>
                      <small className="home-reel-action-tag">
                        <span>ক্লিক করে প্লে করুন</span>
                        <Play size={11} fill="currentColor" />
                      </small>
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

