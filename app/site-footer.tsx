import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone, Leaf } from 'lucide-react';
import { BengaliBrandName } from './brand-elements';
import './site-footer.css';

export default function SiteFooter({lang='bn'}:{lang?:'bn'|'en'}){
  const t=(en:string,bn:string)=>lang==='en'?en:bn;
  const pages=[['/','Home','হোম'],['/menu','Our menu','খাবারের মেনু'],['/spaces','Our spaces','আমাদের পরিবেশ'],['/gallery','Photos & videos','ছবি ও ভিডিও'],['/celebrate','Celebrations','বিশেষ আয়োজন'],['/visit','Plan your visit','ভিজিট ও যাতায়াত']];
  return <footer className="aronno-footer" lang={lang}>
    <div className="af-invitation"><div><span><Leaf size={15}/>{t('MAKE TIME FOR ARONNO','একটু সময় থাকুক অরণ্যের জন্য')}</span><h2>{t('Good food. Beautiful moments.','স্বাদের টানে, সুন্দর সময়ের খোঁজে।')}</h2></div><Link href="/visit">{t('Plan a visit','চলে আসুন অরণ্যে')}<ArrowUpRight size={19}/></Link></div>
    <div className="af-columns">
      <div className="af-about"><Link href="/" className="af-brand" aria-label={t('Cafe Aronno home','ক্যাফে অরণ্য হোম')}><Image src="/images/logo.webp" width={58} height={58} alt=""/><span>CAFE ARONNO<BengaliBrandName/></span></Link><p>{t('A place for familiar flavours, green surroundings and time with your favourite people in Rajbari.','রাজবাড়ীতে পরিচিত স্বাদ, সবুজ পরিবেশ আর আপন মানুষের সঙ্গে সুন্দর সময় কাটানোর ঠিকানা।')}</p><div className="af-social"><a href="https://www.facebook.com/profile.php?id=61584126660660" target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={14}/></a><a href="https://www.instagram.com/cafearonno/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14}/></a></div></div>
      <nav aria-label={t('Footer shortcuts','ফুটার শর্টকাট')}><h3>{t('Explore Aronno','ঘুরে দেখুন')}</h3>{pages.map(([href,en,bn])=><Link key={href} href={href}>{t(en,bn)}</Link>)}</nav>
      <div className="af-contact"><h3>{t('Find us & get in touch','ঠিকানা ও যোগাযোগ')}</h3><address><MapPin size={18}/><span>{t('Hira Square, School Road, Kolarhat Bazar, Rajbari Sadar, Rajbari, Bangladesh.','হিরা স্কয়ার, স্কুল রোড, কোলারহাট বাজার, রাজবাড়ী সদর, রাজবাড়ী।')}</span></address><a href="tel:+8801689442223"><Phone size={17}/><span>01689-442223</span></a><a href="mailto:cafearonno@gmail.com"><Mail size={17}/><span>cafearonno@gmail.com</span></a><a className="af-map" href="https://maps.app.goo.gl/MykfZKgoHP9VUGPU7" target="_blank" rel="noreferrer">{t('Get directions','গুগল ম্যাপে পথ দেখুন')}<ArrowUpRight size={16}/></a></div>
      <div className="af-occasion"><h3>{t('Your next occasion','আপনার বিশেষ দিন')}</h3><p>{t('Birthdays, family gatherings and conversations that last a little longer. Speak with us about your plans.','জন্মদিন, পারিবারিক মিলনমেলা কিংবা বন্ধুদের আড্ডা—আপনার পছন্দের আয়োজন নিয়ে আমাদের সঙ্গে কথা বলুন।')}</p><Link href="/celebrate">{t('Explore celebrations','আয়োজনের বিস্তারিত')}<ArrowUpRight size={16}/></Link><small>{t('Please call for opening hours and table availability.','খোলার সময় ও টেবিলের প্রাপ্যতা জানতে ফোন করুন।')}</small></div>
    </div>
    <div className="af-bottom"><span>© {new Date().getFullYear()} Cafe Aronno. {t('All rights reserved.','সর্বস্বত্ব সংরক্ষিত।')}</span><Link href="/privacy">{t('Privacy & website information','গোপনীয়তা ও ওয়েবসাইটের তথ্য')}</Link><a href="#page-top">{t('Back to top ↑','উপরে যান ↑')}</a></div>
  </footer>;
}
