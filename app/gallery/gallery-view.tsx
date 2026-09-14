'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Home,
  Layers,
  Leaf,
  Moon,
  PartyPopper,
  RotateCcw,
  Sun,
  Utensils,
  X,
} from 'lucide-react';
import { InteriorFooter, InteriorHeader } from '../interior-shell';
import FacebookReels from '../facebook-reels';
import rawGalleryData from '../gallery.json';

export type CategoryKey = 'indoor' | 'outdoor' | 'day' | 'night' | 'food' | 'occasion';

export type GalleryPhoto = {
  id: string;
  src: string;
  thumbnail: string;
  title: string;
  note: string;
  alt: string;
  tags: CategoryKey[];
  source: string;
  width: number;
  height: number;
};

const allPhotos = rawGalleryData as GalleryPhoto[];


interface CategoryItem {
  id: CategoryKey;
  label: string;
  Icon: typeof Layers;
}

const individualCategories: CategoryItem[] = [
  { id: 'indoor', label: 'ইনডোর', Icon: Home },
  { id: 'outdoor', label: 'আউটডোর', Icon: Leaf },
  { id: 'day', label: 'ডে ভিউ', Icon: Sun },
  { id: 'night', label: 'নাইট ভিউ', Icon: Moon },
  { id: 'food', label: 'ফুড', Icon: Utensils },
  { id: 'occasion', label: 'আয়োজন', Icon: PartyPopper },
];

export function GalleryView() {
  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>([]);
  const [matchMode, setMatchMode] = useState<'any' | 'all'>('any');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isAll = selectedCategories.length === 0;

  // Filter photos based on multi-select categories and match mode
  const filteredPhotos = allPhotos.filter((p) => {
    if (isAll) return true;
    if (matchMode === 'any') {
      return selectedCategories.some((cat) => p.tags.includes(cat));
    }
    return selectedCategories.every((cat) => p.tags.includes(cat));
  });

  // Calculate total counts for each category
  const counts: Record<CategoryKey | 'all', number> = {
    all: allPhotos.length,
    indoor: allPhotos.filter((p) => p.tags.includes('indoor')).length,
    outdoor: allPhotos.filter((p) => p.tags.includes('outdoor')).length,
    day: allPhotos.filter((p) => p.tags.includes('day')).length,
    night: allPhotos.filter((p) => p.tags.includes('night')).length,
    food: allPhotos.filter((p) => p.tags.includes('food')).length,
    occasion: allPhotos.filter((p) => p.tags.includes('occasion')).length,
  };

  const handleSelectAll = () => {
    setSelectedCategories([]);
    setLightboxIndex(null);
  };

  const handleSelectAllCategories = () => {
    setSelectedCategories(individualCategories.map((c) => c.id));
    setLightboxIndex(null);
  };

  const toggleCategory = (key: CategoryKey) => {
    setLightboxIndex(null);
    setSelectedCategories((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      }
      return [...prev, key];
    });
  };

  // Keyboard navigation for lightbox
  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredPhotos.length - 1 : prev - 1;
    });
  }, [filteredPhotos.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredPhotos.length - 1 ? 0 : prev + 1;
    });
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <div className="gallery-page language-bn" lang="bn">
      <InteriorHeader active="gallery" />

      <main className="gallery-main" id="gallery-content">
        {/* Minimal Single-Line Heading & Controls */}
        <section className="gallery-top-bar" aria-labelledby="gallery-single-heading">
          <div className="gallery-top-inner">
            <h1 id="gallery-single-heading" className="gallery-single-title">
              ক্যাফে অরণ্যের আসল মুহূর্ত — ছবি ও ভিডিও গ্যালারি
            </h1>

          </div>
        </section>
        <FacebookReels lang="bn" compactHeading={true} />
        <section className="gallery-photo-controls" aria-label="ছবি বেছে নিন">
          {/* Sub-Category Multi-Select Filter Bar (Shown only in Photos Sector) */}
            <div className="gallery-filter-wrapper">
              <nav className="gallery-filter-bar" aria-label="ছবির ক্যাটাগরি ফিল্টার">
                {/* সব ছবি (All) Pill */}
                <button
                  type="button"
                  className={`gallery-filter-pill ${isAll ? 'gallery-filter-pill--active' : ''}`}
                  onClick={handleSelectAll}
                  aria-pressed={isAll}
                >
                  <Layers size={14} />
                  <span>সব ছবি</span>
                  <small className="gallery-pill-count">{counts.all}</small>
                </button>

                {/* Individual Multi-Select Category Pills */}
                {individualCategories.map(({ id, label, Icon }) => {
                  const isSelected = selectedCategories.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      className={`gallery-filter-pill gallery-filter-pill--multi ${
                        isSelected ? 'gallery-filter-pill--active' : ''
                      }`}
                      onClick={() => toggleCategory(id)}
                      aria-pressed={isSelected}
                      title={isSelected ? `${label} ফিল্টার সরান` : `${label} ফিল্টার যুক্ত করুন`}
                    >
                      {isSelected ? <Check size={14} className="gallery-pill-check" /> : <Icon size={14} />}
                      <span>{label}</span>
                      <small className="gallery-pill-count">{counts[id]}</small>
                    </button>
                  );
                })}
              </nav>

              {/* Subbar: Active Filter Summary, Match Mode Toggle (OR / AND), and Reset */}
              {!isAll && (
                <div className="gallery-filter-subbar">
                  <div className="gallery-filter-summary">
                    <span className="gallery-summary-text">
                      ফিল্টার অনুযায়ী <strong>{filteredPhotos.length}টি</strong> ছবি দেখাচ্ছে
                      {selectedCategories.length > 1 && ` (${selectedCategories.length}টি ক্যাটাগরি নির্বাচিত)`}
                    </span>
                  </div>

                  <div className="gallery-filter-subbar-right">
                    {/* Match mode switch when 2 or more categories selected */}
                    {selectedCategories.length > 1 && (
                      <div className="gallery-match-mode-group" role="radiogroup" aria-label="ফিল্টারিং মেলানোর ধরন">
                        <span className="gallery-match-mode-label">শর্ত:</span>
                        <div className="gallery-match-mode-pills">
                          <button
                            type="button"
                            className={`gallery-mode-toggle ${matchMode === 'any' ? 'gallery-mode-toggle--active' : ''}`}
                            onClick={() => {
                              setMatchMode('any');
                              setLightboxIndex(null);
                            }}
                            title="নির্বাচিত যেকোনো একটি ক্যাটাগরি মিললেই ছবি দেখাবে"
                          >
                            যেকোনো মিল (OR)
                          </button>
                          <button
                            type="button"
                            className={`gallery-mode-toggle ${matchMode === 'all' ? 'gallery-mode-toggle--active' : ''}`}
                            onClick={() => {
                              setMatchMode('all');
                              setLightboxIndex(null);
                            }}
                            title="নির্বাচিত সবকয়টি ক্যাটাগরি একসাথে মিললে ছবি দেখাবে"
                          >
                            সব শর্ত মিল (AND)
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="gallery-filter-actions">
                      {selectedCategories.length < individualCategories.length && (
                        <button
                          type="button"
                          className="gallery-filter-action-btn"
                          onClick={handleSelectAllCategories}
                          title="সবগুলো ক্যাটাগরি একসাথে নির্বাচন করুন"
                        >
                          সব নির্বাচন
                        </button>
                      )}
                      <button
                        type="button"
                        className="gallery-filter-action-btn gallery-filter-action-btn--reset"
                        onClick={handleSelectAll}
                        title="ফিল্টার রিসেট করে সব ছবি দেখুন"
                      >
                        <RotateCcw size={12} />
                        <span>রিসেট</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </section>

        {/* PHOTOS SECTOR: Pure Photo Grid (No Text, Maximum Images Per Row, Original Aspect Ratio) */}
          <section className="gallery-pure-section" aria-label="ছবির গ্যালারি">
            <div className="gallery-pure-grid">
              {filteredPhotos.map((item, index) => (
                <button
                  type="button"
                  className="gallery-pure-item"
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`${item.title} — ক্লিক করে বড় আকারে দেখুন`}
                >
                  {/* oxlint-disable-next-line next/no-img-element */}
                  <img
                    src={item.thumbnail}
                    srcSet={`${item.thumbnail} 640w, ${item.src} ${item.width}w`}
                    sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                    width={item.width}
                    height={item.height}
                    alt={item.alt}
                    loading="lazy"
                  />
                  <span className="gallery-pure-overlay">
                    <Camera size={22} />
                    <span>বড় করে দেখুন</span>
                  </span>
                </button>
              ))}
            </div>

            {filteredPhotos.length === 0 && (
              <div className="gallery-empty-state">
                <Compass size={36} />
                <p>নির্বাচিত ফিল্টারের সমন্বয়ে বর্তমানে কোনো ছবি পাওয়া যায়নি।</p>
                {matchMode === 'all' && selectedCategories.length > 1 && (
                  <p className="gallery-empty-hint">
                    পরামর্শ: &apos;যেকোনো মিল (OR)&apos; মোড নির্বাচন করলে যেকোনো একটি ক্যাটাগরি মিললেই ছবি দেখা যাবে।
                  </p>
                )}
                <div className="gallery-empty-actions">
                  {matchMode === 'all' && selectedCategories.length > 1 && (
                    <button
                      type="button"
                      className="gallery-btn gallery-btn--secondary"
                      onClick={() => setMatchMode('any')}
                    >
                      যেকোনো মিল (OR) মোডে দেখুন
                    </button>
                  )}
                  <button
                    type="button"
                    className="gallery-btn gallery-btn--primary"
                    onClick={handleSelectAll}
                  >
                    সব ছবি দেখুন ({allPhotos.length})
                  </button>
                </div>
              </div>
            )}
          </section>

        {/* Next Step Section */}
        <section className="gallery-next" aria-labelledby="gallery-next-title">
          <div className="gallery-next-heading">
            <p className="gallery-kicker">ছবির পর, এবার সরাসরি আসুন</p>
            <h2 id="gallery-next-title">
              আপনার পরের সুন্দর সময়টি
              <br />
              <em>কাটুক অরণ্যে।</em>
            </h2>
          </div>
          <div className="gallery-next-grid">
            <Link href="/spaces">
              <span>
                <Leaf size={21} />
              </span>
              <small>ইনডোর ও আউটডোর</small>
              <strong>পরিবেশ ঘুরে দেখুন</strong>
              <ArrowUpRight size={19} />
            </Link>
            <Link href="/menu">
              <span>
                <Utensils size={21} />
              </span>
              <small>মুখরোচক খাবার</small>
              <strong>খাবারের মেনু দেখুন</strong>
              <ArrowUpRight size={19} />
            </Link>
            <Link href="/celebrate">
              <span>
                <PartyPopper size={21} />
              </span>
              <small>জন্মদিন ও আয়োজন</small>
              <strong>আয়োজনের পরিকল্পনা</strong>
              <ArrowUpRight size={19} />
            </Link>
          </div>
        </section>
      </main>

      {/* FULLSCREEN LIGHTBOX MODAL: Pure Fullscreen Image with Controls */}
      {activePhoto && (
        <div className="gallery-lightbox-backdrop">
          <button
            type="button"
            className="gallery-lightbox-backdrop-btn"
            onClick={() => setLightboxIndex(null)}
            aria-label="মোডাল বন্ধ করুন"
          />

          <div className="gallery-lightbox-modal">
            {/* Top Bar with Counter and Close Button */}
            <div className="gallery-lightbox-controls">
              <span className="gallery-lightbox-pill">
                {((lightboxIndex ?? 0) + 1).toLocaleString('bn-BD', {
                  minimumIntegerDigits: 2,
                })}{' '}
                / {filteredPhotos.length.toLocaleString('bn-BD', { minimumIntegerDigits: 2 })}
              </span>

              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="বন্ধ করুন"
              >
                <X size={24} />
              </button>
            </div>

            {/* Left/Right Navigation Arrows */}
            <button
              type="button"
              className="gallery-lightbox-arrow gallery-lightbox-arrow--prev"
              onClick={handlePrev}
              aria-label="পূর্ববর্তী ছবি"
            >
              <ChevronLeft size={30} />
            </button>

            <button
              type="button"
              className="gallery-lightbox-arrow gallery-lightbox-arrow--next"
              onClick={handleNext}
              aria-label="পরবর্তী ছবি"
            >
              <ChevronRight size={30} />
            </button>

            {/* Pure Fullscreen Image with Original Aspect Ratio */}
            <div className="gallery-lightbox-pure-view">
              {/* oxlint-disable-next-line next/no-img-element */}
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                width={activePhoto.width}
                height={activePhoto.height}
                className="gallery-lightbox-full-img"
              />
            </div>
          </div>
        </div>
      )}

      <InteriorFooter />
    </div>
  );
}
