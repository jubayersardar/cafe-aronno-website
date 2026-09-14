import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Navigation,
  Phone,
  UsersRound,
} from 'lucide-react';
import { InteriorFooter, InteriorHeader } from '../interior-shell';
import './visit.css';
import VisitMap from './visit-map';

export const metadata: Metadata = {
  title: 'ঠিকানা ও যোগাযোগ — Cafe Aronno | ক্যাফে অরণ্য',
  description:
    'হিরা স্কয়ার, স্কুল রোড, কোলারহাট বাজার, রাজবাড়ীতে ক্যাফে অরণ্যের ঠিকানা, ফোন নম্বর ও Google Maps পথনির্দেশনা।',
  alternates: { canonical: '/visit' },
  openGraph: {
    title: 'ক্যাফে অরণ্যে চলে আসুন',
    description: 'ঠিকানা, ফোন ও Google Maps পথনির্দেশনা এক জায়গায়।',
    url: '/visit',
    images: ['/images/story-exterior-dusk.webp'],
  },
};

const PHONE = 'tel:+8801689442223';
const MAPS = 'https://maps.app.goo.gl/MykfZKgoHP9VUGPU7';
const ADDRESS = 'হিরা স্কয়ার, স্কুল রোড, কোলারহাট বাজার, রাজবাড়ী সদর, রাজবাড়ী ৭৭০০';

const arrivalNotes = [
  {
    icon: Clock3,
    title: 'রওনা হওয়ার আগে',
    copy: 'আজকের খোলার সময় এবং টেবিলের প্রাপ্যতা ফোনে নিশ্চিত করে নিন।',
  },
  {
    icon: Navigation,
    title: 'পথ খুঁজতে',
    copy: 'Google Maps-এর লিংক খুলে সরাসরি ক্যাফে অরণ্য পর্যন্ত পথনির্দেশনা নিন।',
  },
  {
    icon: UsersRound,
    title: 'বড় দল বা আয়োজন',
    copy: 'একসঙ্গে অনেকে এলে কিংবা বিশেষ আয়োজন থাকলে অতিথির সংখ্যা জানিয়ে আগে কথা বলুন।',
  },
] as const;

export default function VisitPage() {
  return (
    <div className="visit-page" lang="bn">
      <InteriorHeader active="visit" />
      <main id="visit-main">
        <section className="visit-hero" aria-labelledby="visit-title">
          <div className="visit-hero-copy">
            <p className="visit-kicker">
              <span /> FIND CAFE ARONNO
            </p>
            <h1 id="visit-title">
              চলে আসুন
              <br />
              <em>অরণ্যের ঠিকানায়।</em>
            </h1>
            <p className="visit-lede">
              কোলারহাট বাজারের হিরা স্কয়ারে আমাদের খুঁজে পাবেন। রওনা হওয়ার আগে খোলার সময় ও
              টেবিলের প্রাপ্যতা ফোনে জেনে নিলে আপনার আসা আরও সহজ হবে।
            </p>
            <div className="visit-hero-actions">
              <a
                className="visit-primary"
                href={MAPS}
                target="_blank"
                rel="noreferrer"
              >
                <Navigation size={18} /> Google Maps-এ পথ দেখুন
              </a>
              <a className="visit-call" href={PHONE}>
                <Phone size={17} /> ০১৬৮৯-৪৪২২২৩
              </a>
            </div>
          </div>
          <div className="visit-hero-photo">
            <Image
              src="/images/hero-outdoor.webp"
              sizes="(max-width: 760px) 92vw, 52vw"
              width="1536"
              height="2048"
              alt="দিনের আলোয় ক্যাফে অরণ্যের ভবন ও প্রবেশপথ"
              fetchPriority="high"
            />
            <div className="visit-photo-label">
              <MapPin size={18} />
              <span>
                <small>CAFE ARONNO</small>হিরা স্কয়ার · কোলারহাট · রাজবাড়ী
              </span>
            </div>
          </div>
        </section>

        <section className="visit-before" aria-labelledby="before-title">
          <div className="visit-section-heading">
            <div>
              <p className="visit-kicker">আসার আগে ছোট্ট প্রস্তুতি</p>
              <h2 id="before-title">
                যাত্রাটা হোক
                <br />
                একটু নিশ্চিন্ত।
              </h2>
            </div>
            <p>
              সময় ও প্রাপ্যতা বদলাতে পারে। তাই প্রয়োজনীয় বিষয়গুলো ফোনে নিশ্চিত করাই সবচেয়ে
              নির্ভরযোগ্য।
            </p>
          </div>
          <div className="visit-note-grid">
            {arrivalNotes.map(({ icon: Icon, title, copy }, index) => (
              <article key={title}>
                <div className="visit-note-topline">
                  <span>
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <small>0{index + 1}</small>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="visit-map-embed" aria-labelledby="map-embed-title">
          <div className="visit-map-embed-heading">
            <p className="visit-kicker">ম্যাপে অরণ্য</p>
            <h2 id="map-embed-title">
              আমাদের অবস্থান
              <br />
              সরাসরি দেখুন।
            </h2>
            <p>
              নিচের ম্যাপে ক্যাফে অরণ্যের সঠিক অবস্থান দেখুন। Google Maps-এ
              পথনির্দেশনা পেতে বোতামে ক্লিক করুন।
            </p>
          </div>
          <VisitMap/>
          <div className="visit-map-embed-actions">
            <a
              className="visit-primary"
              href={MAPS}
              target="_blank"
              rel="noreferrer"
            >
              <Navigation size={18} /> Google Maps-এ পথনির্দেশনা নিন
            </a>
            <div className="visit-map-embed-address">
              <MapPin size={16} />
              <span>হিরা স্কয়ার, স্কুল রোড, কোলারহাট বাজার, রাজবাড়ী ৭৭০০</span>
            </div>
          </div>
        </section>

        <section className="visit-contact" aria-labelledby="contact-title">
          <div className="visit-contact-heading">
            <p className="visit-kicker">ঠিকানা ও যোগাযোগ</p>
            <h2 id="contact-title">
              যে তথ্যটি
              <br />
              হাতের কাছে রাখবেন।
            </h2>
          </div>
          <div className="visit-contact-grid">
            <article className="visit-address-card">
              <span className="visit-card-icon">
                <MapPin size={25} strokeWidth={1.6} />
              </span>
              <p className="visit-card-label">পূর্ণ ঠিকানা</p>
              <h3>{ADDRESS}</h3>
              <p lang="en">
                Hira Square, School Road, Kolarhat Bazar, Rajbari Sadar, Rajbari
                7700
              </p>
              <a href={MAPS} target="_blank" rel="noreferrer">
                ম্যাপে খুলুন <ArrowUpRight size={18} />
              </a>
            </article>
            <article className="visit-phone-card">
              <span className="visit-card-icon">
                <Phone size={25} strokeWidth={1.6} />
              </span>
              <p className="visit-card-label">সরাসরি ফোন</p>
              <a className="visit-phone-number" href={PHONE}>
                ০১৬৮৯-৪৪২২২৩
              </a>
              <p>
                খোলার সময়, টেবিল, টেকঅ্যাওয়ে, ডেলিভারি-সংক্রান্ত তথ্য বা বিশেষ আয়োজন জানতে
                ফোন করুন।
              </p>
              <a href={PHONE}>
                এখনই ফোন করুন <ArrowUpRight size={18} />
              </a>
            </article>
          </div>
        </section>

      </main>
      <InteriorFooter />
    </div>
  );
}
