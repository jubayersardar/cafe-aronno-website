import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  CakeSlice,
  CalendarDays,
  Heart,
  MessageCircle,
  Phone,
  Sparkles,
  UsersRound,
  UtensilsCrossed,
} from 'lucide-react';
import { InteriorFooter, InteriorHeader } from '../interior-shell';
import './celebrate.css';

export const metadata: Metadata = {
  title: 'বিশেষ আয়োজন — Cafe Aronno | ক্যাফে অরণ্য',
  description:
    'জন্মদিন, পারিবারিক মিলনমেলা, বন্ধুদের গেট-টুগেদার ও বিশেষ দিনের আয়োজন নিয়ে ক্যাফে অরণ্যের টিমের সঙ্গে কথা বলুন।',
  alternates: { canonical: '/celebrate' },
  openGraph: {
    title: 'আপনার বিশেষ দিন, ক্যাফে অরণ্যে',
    description: 'আপনার তারিখ, অতিথির সংখ্যা, খাবার ও আয়োজনের ভাবনা আমাদের জানান।',
    url: '/celebrate',
    images: ['/images/hero-birthday-decor.webp'],
  },
};

const PHONE = 'tel:+8801689442223';

const occasions = [
  {
    icon: CakeSlice,
    number: '০১',
    title: 'জন্মদিন',
    copy: 'কেক কাটার মুহূর্ত, কাছের মানুষ আর প্রাণখোলা আড্ডা—আপনার দিনের পরিকল্পনাটি আগে আমাদের জানান।',
  },
  {
    icon: UsersRound,
    number: '০২',
    title: 'পারিবারিক মিলনমেলা',
    copy: 'ছোট বা বড় পরিবারের একসঙ্গে বসা, খাওয়া আর গল্পের জন্য অতিথির সংখ্যা জানিয়ে কথা বলুন।',
  },
  {
    icon: MessageCircle,
    number: '০৩',
    title: 'বন্ধুদের গেট-টুগেদার',
    copy: 'অনেকদিন পর দেখা কিংবা হঠাৎ জমে ওঠা আড্ডা—দলের জন্য জায়গা ও খাবার আগে ঠিক করে নিন।',
  },
  {
    icon: Sparkles,
    number: '০৪',
    title: 'আপনার বিশেষ উপলক্ষ',
    copy: 'যে দিনটি আপনার কাছে গুরুত্বপূর্ণ, সেটির ধরন ও আপনার পছন্দের আয়োজন নিয়ে সরাসরি টিমের সঙ্গে আলোচনা করুন।',
  },
] as const;

const planning = [
  {
    icon: CalendarDays,
    step: 'প্রথমে',
    title: 'তারিখ ও সম্ভাব্য সময়',
    copy: 'কোন দিন এবং কখন আসতে চান, সেটি বলুন। টিম প্রাপ্যতা দেখে আপনাকে নিশ্চিত করবে।',
  },
  {
    icon: UsersRound,
    step: 'এরপর',
    title: 'অতিথির সংখ্যা',
    copy: 'কতজন থাকবেন জানালে উপযুক্ত বসার ব্যবস্থা নিয়ে কথা বলা সহজ হবে।',
  },
  {
    icon: UtensilsCrossed,
    step: 'সবশেষে',
    title: 'খাবার ও আয়োজন',
    copy: 'মেনু, পরিবেশন এবং প্রয়োজনীয় সাজসজ্জার ভাবনা টিমকে খুলে বলুন।',
  },
] as const;

const celebrationPhotos = [
  { id: 'aronno-040', src: '/images/gallery/aronno-040.webp', title: 'হ্যাপি বার্থডে গোল্ডেন পার্টি জোন', w: 1600, h: 1200 },
  { id: 'aronno-028', src: '/images/gallery/aronno-028.webp', title: 'পারগোলা বার্থডে লাউঞ্জ সেটআপ', w: 1536, h: 2048 },
  { id: 'aronno-067', src: '/images/gallery/aronno-067.webp', title: 'রাতের আলোয় পারগোলা পার্টি লাউঞ্জ', w: 1536, h: 2048 },
  { id: 'aronno-031', src: '/images/gallery/aronno-031.webp', title: 'পারগোলা ছাদে বেলুন ক্যানোপি', w: 960, h: 720 },
  { id: 'aronno-076', src: '/images/gallery/aronno-076.webp', title: 'জন্মদিনের এক্সক্লুসিভ পারগোলা আয়োজন', w: 720, h: 960 },
  { id: 'aronno-063', src: '/images/gallery/aronno-063.webp', title: 'পারগোলা রুফটপ সেলিব্রেশন কর্নার', w: 720, h: 960 },
  { id: 'aronno-091', src: '/images/gallery/aronno-091.webp', title: 'বার্থডে সেলিব্রেশনের ছাদ ও বেলুন মালা', w: 720, h: 960 },
  { id: 'aronno-016', src: '/images/gallery/aronno-016.webp', title: 'পারগোলা জন্মদিনের সিলিং ডেকোরেশন', w: 720, h: 960 },
  { id: 'aronno-037', src: '/images/gallery/aronno-037.webp', title: 'রাতের আলোয় উজ্জ্বল পারগোলা আর্চ', w: 1536, h: 2048 },
  { id: 'aronno-046', src: '/images/gallery/aronno-046.webp', title: 'ক্যাফে প্রাঙ্গণে উৎসবের আনন্দ মুহূর্ত', w: 1536, h: 2048 },
  { id: 'aronno-056', src: '/images/gallery/aronno-056.webp', title: 'প্রাইভেট কনফারেন্স ও ফ্যামিলি মিটিং রুম', w: 1536, h: 2048 },
  { id: 'aronno-086', src: '/images/gallery/aronno-086.webp', title: 'শুভ নববর্ষ বৈশাখী লোকশিল্প দেয়াল', w: 1536, h: 2048 },
  { id: 'aronno-115', src: '/images/gallery/aronno-115.webp', title: 'উৎসবের রঙিন আলোকময় তাঁবু', w: 1542, h: 2048 },
  { id: 'aronno-018', src: '/images/gallery/aronno-018.webp', title: 'স্মৃতির জন্য সোনালি ডানা ব্যাকড্রপ', w: 1536, h: 2048 },
  { id: 'aronno-032', src: '/images/gallery/aronno-032.webp', title: 'দিনের আলোয় সোনালি ডানা ফটোস্পট', w: 1536, h: 2048 },
  { id: 'aronno-108', src: '/images/gallery/aronno-108.webp', title: 'টাইলস বাঁধানো চত্বরে সোনালি ডানার কর্নার', w: 1152, h: 2048 },
  { id: 'aronno-109', src: '/images/gallery/aronno-109.webp', title: 'সোনালি ডানার ফ্রন্টাল ক্লোজআপ', w: 1600, h: 1205 },
  { id: 'aronno-112', src: '/images/gallery/aronno-112.webp', title: 'রাতের রঙিন আলোয় সোনালি ডানা', w: 1542, h: 2048 },
  { id: 'aronno-041', src: '/images/gallery/aronno-041.webp', title: 'নীল আকাশের নিচে রঙিন উৎসব পতাকা', w: 1536, h: 2048 },
] as const;

export default function CelebratePage() {
  return (
    <div className="celebrate-page" lang="bn">
      <InteriorHeader active="celebrate" />
      <main id="celebrate-main">
        <section className="celebrate-hero" aria-labelledby="celebrate-title">
          <div className="celebrate-hero-copy">
            <p className="celebrate-kicker">
              <span /> CELEBRATE AT ARONNO
            </p>
            <h1 id="celebrate-title">
              আপনার দিনটি হোক
              <em>আরও একটু আপন।</em>
            </h1>
            <p className="celebrate-lede">
              জন্মদিন, পারিবারিক মিলনমেলা, বন্ধুদের গেট-টুগেদার কিংবা অন্য কোনো বিশেষ
              উপলক্ষ—আপনার ভাবনাটি জানান, তারপর জায়গা, খাবার ও আয়োজনের বিস্তারিত টিমের সঙ্গে
              ঠিক করে নিন।
            </p>
            <div className="celebrate-hero-actions">
              <a className="celebrate-primary" href={PHONE}>
                <Phone size={18} /> ০১৬৮৯-৪৪২২২৩ নম্বরে কথা বলুন
              </a>
              <a className="celebrate-secondary" href="#plan">
                কী কী জানাবেন <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div className="celebrate-hero-visual">
            <Image
              src="/images/hero-birthday-decor.webp"
              sizes="(max-width: 760px) 92vw, 47vw"
              width="720"
              height="960"
              alt="নীল-হলুদ-কালো বেলুন, HAPPY BIRTHDAY ব্যানার ও সবুজ গাছের সাজে ক্যাফে অরণ্যের জন্মদিনের আয়োজন"
              fetchPriority="high"
            />
            <div className="celebrate-photo-note">
              <Heart size={17} />
              <span>
                <small>YOUR OCCASION</small>
                আপনার মানুষের সঙ্গে
              </span>
            </div>
          </div>
        </section>

        <section
          className="celebrate-occasions"
          aria-labelledby="occasion-title"
        >
          <div className="celebrate-section-heading">
            <div>
              <p className="celebrate-kicker">একসঙ্গে হওয়ার যত উপলক্ষ</p>
              <h2 id="occasion-title">
                কারণটা আপনার,
                <br />
                মুহূর্তটা সবার।
              </h2>
            </div>
            <p>
              প্রতিটি আয়োজন আলাদা। তাই নির্দিষ্ট প্যাকেজ ধরে না নিয়ে আপনার প্রয়োজনটি সরাসরি
              জানানোই সবচেয়ে সহজ।
            </p>
          </div>

          <div className="celebrate-occasion-grid">
            {occasions.map(({ icon: Icon, number, title, copy }) => (
              <article className="celebrate-occasion-card" key={title}>
                <div className="celebrate-occasion-topline">
                  <span className="celebrate-icon">
                    <Icon size={23} strokeWidth={1.6} />
                  </span>
                  <span>{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="celebrate-moments" aria-labelledby="moments-title">
          <div className="celebrate-section-heading">
            <div>
              <p className="celebrate-kicker">আসল মুহূর্ত</p>
              <h2 id="moments-title">
                আয়োজনের
                <br />
                ঝলক দেখুন।
              </h2>
            </div>
            <p>
              জন্মদিন, পার্টি ও বিশেষ উৎসবে ক্যাফে অরণ্যের সাজানো মুহূর্তগুলো সরাসরি
              দেখুন—আপনার পরবর্তী আয়োজনের অনুপ্রেরণা হতে পারে।
            </p>
          </div>
          <div className="celebrate-moments-grid">
            {celebrationPhotos.map(({ id, src, title, w, h }) => (
              <figure className="celebrate-moment-item" key={id}>
                <Image
                  src={src}
                  width={w}
                  height={h}
                  sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
                  alt={title}
                  loading="lazy"
                />
                <figcaption>{title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          className="celebrate-plan"
          id="plan"
          aria-labelledby="plan-title"
        >
          <div className="celebrate-plan-intro">
            <p className="celebrate-kicker">একটি ফোনেই শুরু</p>
            <h2 id="plan-title">
              কথা বলার আগে
              <br />
              তিনটি বিষয় ভেবে নিন।
            </h2>
            <p>
              এই তথ্যগুলো জানালে টিম দ্রুত আপনার আয়োজনের প্রাপ্যতা ও পরবর্তী ধাপ নিয়ে কথা বলতে
              পারবে।
            </p>
          </div>
          <ol className="celebrate-plan-list">
            {planning.map(({ icon: Icon, step, title, copy }, index) => (
              <li key={title}>
                <span className="celebrate-plan-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="celebrate-plan-icon">
                  <Icon size={21} strokeWidth={1.6} />
                </span>
                <div>
                  <small>{step}</small>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="celebrate-final"
          aria-labelledby="celebrate-final-title"
        >
          <div>
            <p className="celebrate-kicker">LET&apos;S PLAN YOUR DAY</p>
            <h2 id="celebrate-final-title">
              আপনার আয়োজন নিয়ে
              <br />
              আজই কথা বলুন।
            </h2>
          </div>
          <div className="celebrate-final-action">
            <p>তারিখ, অতিথির সংখ্যা, খাবার ও সাজসজ্জার প্রয়োজন জানাতে সরাসরি ফোন করুন।</p>
            <a href={PHONE}>
              <span>
                <Phone size={19} /> ০১৬৮৯-৪৪২২২৩
              </span>
              <ArrowUpRight size={21} />
            </a>
          </div>
        </section>
      </main>
      <InteriorFooter />
    </div>
  );
}
