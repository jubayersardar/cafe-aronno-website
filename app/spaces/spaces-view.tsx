'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Coffee,
  Grid,
  Heart,
  Layers,
  Leaf,
  MapPin,
  Moon,
  Snowflake,
  Users,
  Utensils,
  X,
} from 'lucide-react';
import { InteriorFooter, InteriorHeader } from '../interior-shell';

type VenuePhotoProps = {
  name: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
};

function VenuePhoto({
  name,
  alt,
  width,
  height,
  sizes,
  className,
  priority = false,
}: VenuePhotoProps) {
  return (
    // Local pre-sized WebP sources avoid sending the full image to small screens.
    // oxlint-disable-next-line next/no-img-element
    <img
      className={className}
      src={`/images/${name}.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}.webp ${width}w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}

const facts = [
  { Icon: Leaf, title: 'খোলা বাগান', detail: 'সবুজের মাঝে টেবিল ও ছায়াঘেরা বসার জায়গা' },
  {
    Icon: Snowflake,
    title: 'ফুলি এসি ইনডোর',
    detail: 'আরামদায়ক, রঙিন ও শীতাতপনিয়ন্ত্রিত পরিবেশ',
  },
  { Icon: Moon, title: 'সন্ধ্যার আলো', detail: 'আলো জ্বললে বাগান পায় একেবারে নতুন আবহ' },
  { Icon: Users, title: 'আপনজনের সময়', detail: 'পরিবার, বন্ধু ও ছোট আয়োজনের জন্য' },
];

type MainSpace = {
  id: string;
  tabLabel: string;
  Icon: typeof Leaf;
  number: string;
  eyebrow: string;
  kicker: string;
  title: string;
  desc: string;
  points: { icon: typeof Coffee; text: string }[];
  linkText: string;
  linkHref: string;
  image: string;
  imageAlt: string;
};

const mainSpaces: MainSpace[] = [
  {
    id: 'outdoor',
    tabLabel: 'খোলা বাগান',
    Icon: Leaf,
    number: '01',
    eyebrow: 'OUTDOOR GARDEN',
    kicker: 'সবুজের খুব কাছে',
    title: 'খোলা আকাশের নিচে সবুজ বাগান',
    desc: 'বাগানের পথ, ছাতার নিচে টেবিল আর চারপাশের সবুজ—বিকেলের চা থেকে পরিবারের সঙ্গে ধীরে সময় কাটানো পর্যন্ত, আউটডোরে প্রতিটি আড্ডাই একটু বেশি প্রাণবন্ত।',
    points: [
      { icon: Coffee, text: 'চা, গল্প ও হালকা আড্ডার স্বচ্ছন্দ পরিবেশ' },
      { icon: Users, text: 'পরিবার ও বন্ধুদের সঙ্গে বসার জন্য উন্মুক্ত জায়গা' },
      { icon: Camera, text: 'দোলনা, শাপলা ও ছবি তোলার মন জুড়ানো কোণ' },
    ],
    linkText: 'বাগানের আরও ছবি',
    linkHref: '/gallery',
    image: 'living-wall',
    imageAlt: 'ক্যাফে অরণ্যের হাঁটার পথের পাশে টব, ফার্ন ও সবুজ গাছের দেয়াল',
  },
  {
    id: 'indoor',
    tabLabel: 'ফুলি এসি ইনডোর',
    Icon: Snowflake,
    number: '02',
    eyebrow: 'FULLY AIR-CONDITIONED',
    kicker: 'পরম আরামে বসুন',
    title: 'ফুলি এসি ইনডোর ডাইনিং',
    desc: 'উজ্জ্বল রঙ, আরামদায়ক চেয়ার-টেবিল ও সম্পূর্ণ শীতাতপনিয়ন্ত্রিত শান্ত পরিবেশ। রোদ, গরম কিংবা বৃষ্টির দিনেও খাবার আর আলাপচারিতার জন্য ভেতরে রয়েছে স্বস্তির আয়োজন।',
    points: [
      { icon: Snowflake, text: 'সম্পূর্ণ শীতাতপনিয়ন্ত্রিত আধুনিক ডাইনিং' },
      { icon: Utensils, text: 'ছোট ও বড় টেবিলে একসঙ্গে খাবারের ব্যবস্থা' },
      { icon: Heart, text: 'পরিবার ও আপনজনের সঙ্গে কোলাহলহীন সময়' },
    ],
    linkText: 'খাবারের মেনু দেখুন',
    linkHref: '/menu',
    image: 'dining-room',
    imageAlt: 'কমলা দেয়াল, নীল খিলান, ঝুলন্ত আলো ও এয়ার কন্ডিশনারসহ ক্যাফে অরণ্যের ইনডোর ডাইনিং',
  },
  {
    id: 'evening',
    tabLabel: 'সন্ধ্যার আলো',
    Icon: Moon,
    number: '03',
    eyebrow: 'EVENING GLOW',
    kicker: 'সন্ধ্যার পর অরণ্য',
    title: 'আলো জ্বললে বদলে যায় চারপাশ',
    desc: 'বাগানের পথ, পারগোলা আর সবুজের ভেতর পরিকল্পিত উষ্ণ আলো—দিনের পরিচিত জায়গাটিই সন্ধ্যায় হয়ে ওঠে আরও শান্ত, মায়াবী, ঘনিষ্ঠ ও স্মরণীয়।',
    points: [
      { icon: Moon, text: 'উষ্ণ আলোর স্নিগ্ধ সন্ধ্যা ও মায়াবী পরিবেশ' },
      { icon: Coffee, text: 'সন্ধ্যাবেলার গরম কফি, বারবিকিউ ও জমাটি আড্ডা' },
      { icon: Camera, text: 'ঝুলন্ত বাতি ও আলোর রেখায় দারুণ ছবির ফ্রেম' },
    ],
    linkText: 'সন্ধ্যায় আসার পরিকল্পনা করুন',
    linkHref: '/visit',
    image: 'garden-evening',
    imageAlt: 'সন্ধ্যার আকাশের নিচে উষ্ণ আলোয় সাজানো ক্যাফে অরণ্যের বাগান ও পথ',
  },
  {
    id: 'gathering',
    tabLabel: 'উৎসব ও আয়োজন',
    Icon: Heart,
    number: '04',
    eyebrow: 'CELEBRATE TOGETHER',
    kicker: 'একসঙ্গে হওয়ার উপলক্ষ',
    title: 'আপনজন বেশি হলে, আয়োজন হোক বিশেষ',
    desc: 'জন্মদিন, পারিবারিক মিলনমেলা, বিবাহবার্ষিকী বা বন্ধুদের গেট-টুগেদার—তারিখ, অতিথির সংখ্যা এবং কেমন সাজসজ্জা চান জানালে আমরা নিখুঁত আয়োজনের ব্যবস্থা করি।',
    points: [
      { icon: Heart, text: 'জন্মদিন ও পারিবারিক মিলনমেলার জন্য পারগোলা বা ইনডোর' },
      { icon: Users, text: 'বড় দলের জন্য বিশেষ আসনবিন্যাস ও বেলুন ডেকোরেশন' },
      { icon: Utensils, text: 'পছন্দসই সেট মেনু, কেক কাটার স্থান ও আন্তরিক সেবা' },
    ],
    linkText: 'আয়োজনের বিস্তারিত দেখুন',
    linkHref: '/celebrate',
    image: 'pergola-celebration',
    imageAlt: 'ক্যাফে অরণ্যের পারগোলায় জন্মদিন ও উৎসবের বিশেষ ব্যানার ও বসার আয়োজন',
  },
];

type MomentCorner = {
  name: string;
  tag: 'garden' | 'seating' | 'events';
  tagLabel: string;
  width: number;
  height: number;
  title: string;
  eyebrow: string;
  desc: string;
  alt: string;
};

const moods: MomentCorner[] = [
  {
    name: 'flower-garden',
    tag: 'garden',
    tagLabel: 'বাগান ও ফুল',
    width: 1080,
    height: 810,
    title: 'রঙিন ফুলের বাগান ও ক্যাফে চত্বর',
    eyebrow: 'BLOOMING GARDEN',
    desc: 'ক্যাফে অরণ্যের প্রধান ভবনের সামনে ডালিয়া ও নানা রঙের ফুলের সমারোহ—প্রকৃতির মাঝে স্নিগ্ধ এক সকাল বা বিকেল।',
    alt: 'ক্যাফে অরণ্য সাইনবোর্ড ও প্রধান ভবনের সামনে নানা রঙের ফুলের বাগান',
  },
  {
    name: 'garden-lawn',
    tag: 'seating',
    tagLabel: 'খোলা আড্ডা',
    width: 1080,
    height: 810,
    title: 'সবুজ লন ও ছাতার নিচে আড্ডা',
    eyebrow: 'SUNSHINE & LAWN',
    desc: 'পাথুরে হাঁটার পথ, কলাগাছের ছায়া আর লাল ছাতার নিচে গোল টেবিল—খোলা বাতাসে আড্ডা জমানোর চমৎকার ওপেন স্পেস।',
    alt: 'ক্যাফে অরণ্যের সবুজ ঘাসের লনে পাথুরে পথ ও ছাতার নিচে বসার লাল গোল টেবিল',
  },
  {
    name: 'pergola-celebration',
    tag: 'events',
    tagLabel: 'উৎসব ও ফ্রেম',
    width: 1080,
    height: 810,
    title: 'পারগোলায় জন্মদিন ও বিশেষ মুহূর্ত',
    eyebrow: 'ROOFTOP PERGOLA',
    desc: 'ছাদের ওপেন পারগোলায় সাজানো বসার জায়গা—জন্মদিন, সারপ্রাইজ পার্টি কিংবা যেকোনো আনন্দ মুহূর্ত উদযাপনের সেরা কর্নার।',
    alt: 'ক্যাফে অরণ্যের ছাদের পারগোলায় জন্মদিনের বেলুন ও ব্যানার দিয়ে সাজানো উৎসবের বসার জায়গা',
  },
  {
    name: 'garden-swing',
    tag: 'garden',
    tagLabel: 'বাগান ও ফুল',
    width: 1080,
    height: 1350,
    title: 'দোলনায় একটু অবসর',
    eyebrow: 'SLOW MOMENTS',
    desc: 'সবুজ আলো ও পাতার মাঝে ক্যাফে অরণ্যের সাদা বাগানের দোলনা—একটু বসা আর ধীর লয়ে হারিয়ে যাওয়ার শান্ত কোণ।',
    alt: 'সবুজ আলো ও পাতার মাঝে ক্যাফে অরণ্যের সাদা বাগানের দোলনা',
  },
  {
    name: 'water-lilies',
    tag: 'garden',
    tagLabel: 'বাগান ও ফুল',
    width: 1080,
    height: 1350,
    title: 'শাপলার পাশে শান্ত সময়',
    eyebrow: 'BY THE WATER',
    desc: 'ক্যাফে অরণ্যের ছোট জলাশয়ে ফুটে থাকা গোলাপি শাপলা ও জলজ পাতা—চোখ জুড়ানো প্রাকৃতিক প্রশান্তি।',
    alt: 'ক্যাফে অরণ্যের জলাশয়ে ফুটে থাকা গোলাপি শাপলা',
  },
  {
    name: 'golden-wings',
    tag: 'events',
    tagLabel: 'উৎসব ও ফ্রেম',
    width: 1080,
    height: 1350,
    title: 'স্মৃতির জন্য সোনালি ডানা',
    eyebrow: 'A PHOTO TO KEEP',
    desc: 'রাতের বাগানে সোনালি ডানার আলোকসজ্জিত ব্যাকড্রপ—প্রিয়জনের সঙ্গে একটি সুন্দর মুহূর্ত ফ্রেমবন্দী করে রাখার স্পট।',
    alt: 'ক্যাফে অরণ্যের রাতের বাগানে সোনালি ডানার ছবি তোলার জায়গা',
  },
  {
    name: 'maps-pergola',
    tag: 'seating',
    tagLabel: 'খোলা আড্ডা',
    width: 1080,
    height: 810,
    title: 'কাঠের পারগোলা ও ছায়াবীথি',
    eyebrow: 'PERGOLA WALKWAY',
    desc: 'গাছের ছায়া আর কাঠের সিলিংয়ে ঘেরা সুন্দর হাঁটার করিডোর—শান্ত বিকেল কিংবা সন্ধ্যার উষ্ণ আলোয় হেঁটে বেড়ানোর দারুণ অনুভূতি।',
    alt: 'গাছ ও সবুজ পাতায় ঘেরা ক্যাফে অরণ্যের কাঠের তৈরি ওপেন পারগোলা প্যাসেজ',
  },
];

type CategoryFilter = 'all' | 'garden' | 'seating' | 'events';

export function SpacesView() {
  const [activeMainIndex, setActiveMainIndex] = useState(0);
  const [showAllMainSpaces, setShowAllMainSpaces] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [showAllMoments, setShowAllMoments] = useState(false);
  const [activeModalMood, setActiveModalMood] = useState<MomentCorner | null>(null);

  const activeSpace = mainSpaces[activeMainIndex];

  // Filtering moment corners
  const filteredMoods = moods.filter((m) => {
    if (selectedCategory === 'all') return true;
    return m.tag === selectedCategory;
  });

  // Decide how many items to display:
  // When 'all' is selected and showAllMoments is false, show first 4.
  // Otherwise, show all filtered items.
  const displayedMoods =
    selectedCategory === 'all' && !showAllMoments
      ? filteredMoods.slice(0, 4)
      : filteredMoods;

  const handlePrevSpace = () => {
    setActiveMainIndex((prev) => (prev === 0 ? mainSpaces.length - 1 : prev - 1));
  };

  const handleNextSpace = () => {
    setActiveMainIndex((prev) => (prev === mainSpaces.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="spaces-page" lang="bn">
      <InteriorHeader active="spaces" />
      <main id="main-content">
        {/* Hero Section */}
        <section className="sp-hero" aria-labelledby="spaces-title">
          <div className="sp-hero-inner">
            <div className="sp-hero-copy">
              <p className="sp-kicker">
                <Leaf size={15} /> CAFE ARONNO · RAJBARI
              </p>
              <h1 id="spaces-title">
                আপনার সময়ের জন্য <em>পছন্দের একটি কোণ।</em>
              </h1>
              <p className="sp-lead">
                খোলা আকাশের নিচে সবুজ বাগান, কিংবা রঙিন ও সম্পূর্ণ শীতাতপনিয়ন্ত্রিত
                ইনডোর—মনের মতো পরিবেশে বসে জমুক খাবার আর আড্ডা।
              </p>
              <div className="sp-hero-actions">
                <Link className="sp-button sp-button--primary" href="/visit">
                  চলে আসুন <ArrowUpRight size={18} />
                </Link>
                <Link className="sp-button sp-button--quiet" href="/gallery">
                  আরও ছবি দেখুন <Camera size={17} />
                </Link>
              </div>
            </div>
            <figure className="sp-hero-photo">
              <VenuePhoto
                name="indoor-maps"
                width={1440}
                height={1920}
                sizes="(max-width: 719px) 100vw, 58vw"
                priority
                alt="নীল খিলান, হলুদ দেয়াল, ঝুলন্ত উষ্ণ আলো ও গুড ফুড সাইনবোর্ডসহ ক্যাফে অরণ্যের ইনডোর ডাইনিং"
              />
              <figcaption>
                <span>01</span> খোলা হাওয়া · সবুজ বাগান · আপন সময়
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 4 Quick Facts */}
        <section
          className="sp-facts"
          aria-label="ক্যাফে অরণ্যের পরিবেশের প্রধান সুবিধা"
        >
          <div className="sp-shell sp-facts-grid">
            {facts.map(({ Icon, title, detail }) => (
              <article key={title}>
                <span className="sp-fact-icon">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <div>
                  <h2>{title}</h2>
                  <p>{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Main 4 Spaces Showcase with Tabs and Compact Mode */}
        <section className="sp-choose sp-shell" aria-labelledby="choose-title">
          <header className="sp-section-heading sp-choose-header">
            <div>
              <p className="sp-kicker">দিনের মেজাজ, আপনার পছন্দ</p>
              <h2 id="choose-title">
                ক্যাফে অরণ্যের
                <br />
                <em>প্রধান ৪টি পরিবেশ।</em>
              </h2>
            </div>
            <div className="sp-view-toggle-wrap">
              <button
                type="button"
                className={`sp-view-toggle-btn ${showAllMainSpaces ? 'sp-view-toggle-btn--active' : ''}`}
                onClick={() => setShowAllMainSpaces((prev) => !prev)}
                aria-pressed={showAllMainSpaces}
              >
                {showAllMainSpaces ? (
                  <>
                    <Layers size={16} />
                    <span>ট্যাব ভিউতে সংক্ষেপ করুন (হাইড)</span>
                  </>
                ) : (
                  <>
                    <Grid size={16} />
                    <span>সবগুলো ৪টি পরিবেশ একসাথে দেখুন</span>
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Interactive Navigation Tabs for the 4 Spaces */}
          <nav className="sp-main-tabs" aria-label="প্রধান ৪টি পরিবেশ নির্বাচন">
            {mainSpaces.map((space, idx) => {
              const TabIcon = space.Icon;
              const isActive = activeMainIndex === idx;
              return (
                <button
                  key={space.id}
                  type="button"
                  className={`sp-main-tab ${isActive ? 'sp-main-tab--active' : ''}`}
                  onClick={() => {
                    setActiveMainIndex(idx);
                    if (showAllMainSpaces) {
                      setShowAllMainSpaces(false);
                    }
                  }}
                  aria-selected={isActive}
                  role="tab"
                >
                  <span className="sp-main-tab-icon">
                    <TabIcon size={18} />
                  </span>
                  <span className="sp-main-tab-text">
                    <small>{space.number}</small>
                    <strong>{space.tabLabel}</strong>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Single Focused View (Compact & Clean) */}
          {!showAllMainSpaces ? (
            <div className="sp-focused-space-container">
              <article className="sp-place-card sp-place-card--focused" key={activeSpace.id}>
                <div className="sp-place-photo">
                  <VenuePhoto
                    name={activeSpace.image}
                    width={1536}
                    height={1152}
                    sizes="(max-width: 719px) 100vw, 52vw"
                    alt={activeSpace.imageAlt}
                    priority
                  />
                  <span>{activeSpace.eyebrow}</span>
                </div>
                <div className="sp-place-copy">
                  <div className="sp-place-topline">
                    <span className="sp-place-number">{activeSpace.number}</span>
                    <p className="sp-kicker">
                      <activeSpace.Icon size={14} /> {activeSpace.kicker}
                    </p>
                  </div>
                  <h3>{activeSpace.title}</h3>
                  <p>{activeSpace.desc}</p>
                  <ul>
                    {activeSpace.points.map((pt) => {
                      const PtIcon = pt.icon;
                      return (
                        <li key={pt.text}>
                          <PtIcon size={17} />
                          <span>{pt.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="sp-place-footer">
                    <Link className="sp-button sp-button--dark" href={activeSpace.linkHref}>
                      {activeSpace.linkText} <ArrowUpRight size={17} />
                    </Link>
                    <div className="sp-place-nav-btns">
                      <button
                        type="button"
                        className="sp-nav-arrow-btn"
                        onClick={handlePrevSpace}
                        aria-label="পূর্ববর্তী পরিবেশ"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <span className="sp-place-counter">
                        {activeMainIndex + 1} / {mainSpaces.length}
                      </span>
                      <button
                        type="button"
                        className="sp-nav-arrow-btn"
                        onClick={handleNextSpace}
                        aria-label="পরবর্তী পরিবেশ"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ) : (
            /* All 4 Spaces Expanded in a Compact Grid */
            <div className="sp-all-spaces-grid">
              {mainSpaces.map((space) => {
                const SpaceIcon = space.Icon;
                return (
                  <article className="sp-place-card sp-place-card--compact" key={space.id}>
                    <div className="sp-place-photo">
                      <VenuePhoto
                        name={space.image}
                        width={1080}
                        height={810}
                        sizes="(max-width: 719px) 100vw, 48vw"
                        alt={space.imageAlt}
                      />
                      <span>{space.eyebrow}</span>
                    </div>
                    <div className="sp-place-copy">
                      <span className="sp-place-number">{space.number}</span>
                      <p className="sp-kicker">
                        <SpaceIcon size={14} /> {space.kicker}
                      </p>
                      <h3>{space.title}</h3>
                      <p>{space.desc}</p>
                      <ul>
                        {space.points.map((pt) => {
                          const PtIcon = pt.icon;
                          return (
                            <li key={pt.text}>
                              <PtIcon size={17} />
                              <span>{pt.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <Link className="sp-button sp-button--dark" href={space.linkHref}>
                        {space.linkText} <ArrowUpRight size={17} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* 7 Moments / Corners Section with Category Filters & Expand/Hide */}
        <section className="sp-moments sp-shell" aria-labelledby="moments-title">
          <header className="sp-section-heading sp-section-heading--split">
            <div>
              <p className="sp-kicker">খাবারের বাইরেও নিজস্ব সময়</p>
              <h2 id="moments-title">
                ছোট ছোট মুহূর্তের
                <br />
                <em>৭টি বিশেষ কোণ।</em>
              </h2>
            </div>
            <p>
              ফুলের বাগান, সবুজ লনে আড্ডা, দোলনা, জলাশয়ের শাপলা কিংবা ছাদের পারগোলায়
              জন্মদিন—ক্যাফে অরণ্যের প্রতিটি কোণেই রয়েছে নিজস্ব সৌন্দর্য ও গল্প।
            </p>
          </header>

          {/* Category Filter Pills */}
          <div className="sp-filter-bar" role="tablist" aria-label="মুহূর্তের ক্যাটাগরি">
            <button
              type="button"
              className={`sp-filter-pill ${selectedCategory === 'all' ? 'sp-filter-pill--active' : ''}`}
              onClick={() => {
                setSelectedCategory('all');
                setShowAllMoments(false);
              }}
            >
              সব কোণ ({moods.length})
            </button>
            <button
              type="button"
              className={`sp-filter-pill ${selectedCategory === 'garden' ? 'sp-filter-pill--active' : ''}`}
              onClick={() => setSelectedCategory('garden')}
            >
              <Leaf size={14} /> বাগান ও ফুল (৩)
            </button>
            <button
              type="button"
              className={`sp-filter-pill ${selectedCategory === 'seating' ? 'sp-filter-pill--active' : ''}`}
              onClick={() => setSelectedCategory('seating')}
            >
              <Coffee size={14} /> খোলা আড্ডা (২)
            </button>
            <button
              type="button"
              className={`sp-filter-pill ${selectedCategory === 'events' ? 'sp-filter-pill--active' : ''}`}
              onClick={() => setSelectedCategory('events')}
            >
              <Camera size={14} /> উৎসব ও ফ্রেম (২)
            </button>
          </div>

          {/* Sequential List of Moment Corner Cards */}
          <div className="sp-moment-list">
            {displayedMoods.map((mood, idx) => (
              <article
                className={`sp-moment-row ${idx % 2 === 1 ? 'sp-moment-row--reverse' : ''}`}
                key={mood.name}
              >
                <div className="sp-moment-row-photo">
                  <VenuePhoto
                    name={mood.name}
                    width={mood.width}
                    height={mood.height}
                    sizes="(max-width: 719px) 100vw, 48vw"
                    alt={mood.alt}
                  />
                  <span className="sp-moment-row-badge">{mood.tagLabel}</span>
                </div>
                <div className="sp-moment-row-copy">
                  <span className="sp-moment-row-num">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="sp-kicker" lang="en">
                    {mood.eyebrow}
                  </p>
                  <h3>{mood.title}</h3>
                  <p>{mood.desc}</p>
                  <Link className="sp-text-link sp-moment-row-link" href="/gallery">
                    আরও ছবি দেখুন <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Expand / Hide Toggle Button for Moments */}
          {selectedCategory === 'all' && (
            <div className="sp-moments-toggle-wrap">
              <button
                type="button"
                className="sp-toggle-more-btn"
                onClick={() => setShowAllMoments((prev) => !prev)}
                aria-expanded={showAllMoments}
              >
                {showAllMoments ? (
                  <>
                    <ChevronUp size={18} />
                    <span>সংক্ষেপে দেখুন (বাকি ৩টি কোণ হাইড করুন)</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={18} />
                    <span>আরও ৩টি সুন্দর কোণ দেখুন (মোট ৭টি কোণ)</span>
                  </>
                )}
              </button>
            </div>
          )}

          <Link className="sp-text-link" href="/gallery">
            অরণ্যের পুরো ছবির গ্যালারি দেখুন <ArrowUpRight size={18} />
          </Link>
        </section>

        {/* Modal / Lightbox for Individual Moment Corners */}
        {activeModalMood && (
          <div className="sp-modal-backdrop">
            <button
              type="button"
              className="sp-modal-backdrop-btn"
              onClick={() => setActiveModalMood(null)}
              aria-label="মোডাল বন্ধ করুন"
            />
            <div className="sp-modal-card" role="document">
              <button
                type="button"
                className="sp-modal-close"
                onClick={() => setActiveModalMood(null)}
                aria-label="বন্ধ করুন"
              >
                <X size={20} />
              </button>
              <div className="sp-modal-photo">
                <VenuePhoto
                  name={activeModalMood.name}
                  width={activeModalMood.width}
                  height={activeModalMood.height}
                  sizes="(max-width: 768px) 100vw, 800px"
                  alt={activeModalMood.alt}
                  priority
                />
              </div>
              <div className="sp-modal-info">
                <span className="sp-modal-badge">{activeModalMood.tagLabel}</span>
                <span className="sp-modal-eyebrow" lang="en">
                  {activeModalMood.eyebrow}
                </span>
                <h3>{activeModalMood.title}</h3>
                <p>{activeModalMood.desc}</p>
                <div className="sp-modal-actions">
                  <Link
                    className="sp-button sp-button--primary"
                    href="/visit"
                    onClick={() => setActiveModalMood(null)}
                  >
                    এখানে আসতে চান? লোকেশন দেখুন <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Step Navigation */}
        <section className="sp-next" aria-labelledby="next-title">
          <div className="sp-shell sp-next-inner">
            <div>
              <p className="sp-kicker">পরের ধাপ</p>
              <h2 id="next-title">
                পছন্দের জায়গা ঠিক?
                <br />
                <em>এবার টেবিলের আয়োজন।</em>
              </h2>
            </div>
            <div className="sp-next-links">
              <Link href="/menu">
                <span>
                  <Utensils size={19} /> কী খাবেন দেখুন
                </span>
                <ArrowUpRight size={19} />
              </Link>
              <Link href="/celebrate">
                <span>
                  <Heart size={19} /> আয়োজনের পরিকল্পনা
                </span>
                <ArrowUpRight size={19} />
              </Link>
              <Link href="/visit">
                <span>
                  <MapPin size={19} /> ঠিকানা ও আসার পথ
                </span>
                <ArrowUpRight size={19} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <InteriorFooter />
    </div>
  );
}
