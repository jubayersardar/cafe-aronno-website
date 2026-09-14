import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Camera, MapPin, Trees, Utensils } from 'lucide-react';
import './home-page-directory.css';

const pages=[
  {href:'/menu',image:'/images/fish-bbq-640.webp',icon:Utensils,en:'Explore the menu',bn:'মেনু দেখুন',detailEn:'13 categories · 65 dishes · portions & prices',detailBn:'১৩ বিভাগ · ৬৫টি খাবার · পরিমাণ ও মূল্য'},
  {href:'/spaces',image:'/images/hero-outdoor-480.webp',icon:Trees,en:'Discover our spaces',bn:'আমাদের পরিবেশ',detailEn:'Spacious outdoor · air-conditioned indoor · night lights',detailBn:'সুবিশাল আউটডোর · ফুলি এসি ইনডোর · নাইট লাইটিং'},
  {href:'/gallery',image:'/images/golden-wings-640.webp',icon:Camera,en:'See the gallery',bn:'ছবি ও ভিডিও',detailEn:'Real photographs and video from Cafe Aronno',detailBn:'ক্যাফে অরণ্যের আসল ছবি ও ভিডিও'},
  {href:'/celebrate',image:'/images/indoor-lights-640.webp',icon:CalendarDays,en:'Plan a celebration',bn:'আয়োজন করুন',detailEn:'Birthdays · family gatherings · special days',detailBn:'জন্মদিন · পারিবারিক মিলনমেলা · বিশেষ দিন'},
  {href:'/visit',image:'/images/story-exterior-dusk-640.webp',icon:MapPin,en:'Plan your visit',bn:'ভিজিট ও ঠিকানা',detailEn:'Location · directions · contact information',detailBn:'লোকেশন · যাতায়াত · যোগাযোগের তথ্য'},
];

export default function HomePageDirectory({lang}:{lang:'en'|'bn'}){
  const t=(en:string,bn:string)=>lang==='en'?en:bn;
  return <section className="home-directory" aria-labelledby="home-directory-heading"><header><p>{t('EVERY PART OF CAFE ARONNO','ক্যাফে অরণ্যের সবকিছু')}</p><h2 id="home-directory-heading">{t('Choose where you would','যেখান থেকে শুরু করতে')}<br/><em>{t('like to begin.','চান, বেছে নিন।')}</em></h2><span>{t('Each section has its own dedicated page with more photographs, details and practical information.','প্রতিটি বিষয়ের জন্য রয়েছে আলাদা পেজ—আরও ছবি, বিস্তারিত তথ্য এবং প্রয়োজনীয় সবকিছু একসঙ্গে।')}</span></header><div className="home-directory-grid">{pages.map(({href,image,icon:Icon,en,bn,detailEn,detailBn},index)=><Link href={href} key={href} className={index===0?'directory-card directory-card-featured':'directory-card'}><img src={image} width="640" height="480" loading="lazy" decoding="async" alt=""/><span className="directory-shade"/><span className="directory-number">0{index+1}</span><span className="directory-icon"><Icon size={20}/></span><span className="directory-copy"><strong>{t(en,bn)}</strong><small>{t(detailEn,detailBn)}</small><b>{t('Open page','পেজটি খুলুন')}<ArrowUpRight size={16}/></b></span></Link>)}</div></section>;
}
