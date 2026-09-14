'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, MapPin, Phone, Leaf, Utensils, Coffee, Camera as Instagram, MessageCircle as Facebook, Menu, Star, Heart, CalendarDays } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import galleryData from './gallery.json';
import ImmersiveHero from './immersive-hero';
import SiteFooter from './site-footer';
import HomeMenuCompact from './home-menu-compact';
import HomeSpacesPreview from './home-spaces-preview';
import FacebookReels from './facebook-reels';
import HomeGalleryPreview from './home-gallery-preview';
import HomeCelebratePreview from './home-celebrate-preview';
import HomeVisitPreview from './home-visit-preview';
import { BengaliBrandName, BrandAnnouncement } from './brand-elements';

const FACEBOOK='https://www.facebook.com/profile.php?id=61584126660660';
const INSTAGRAM='https://www.instagram.com/cafearonno/';
const MAPS='https://maps.app.goo.gl/MykfZKgoHP9VUGPU7';
const PHONE='tel:+8801689442223';
const storyPhotos=[
 {id:'story-exterior-dusk',src:'/images/story-exterior-dusk.webp',thumbnail:'/images/story-exterior-dusk-640.webp',alt:'Cafe Aronno entrance and Bengali sign glowing at dusk',width:720,height:960},
 {id:'story-good-food',src:'/images/story-good-food.webp',thumbnail:'/images/story-good-food-640.webp',alt:'Cafe Aronno Good Food feature wall, bicycle and warm indoor lighting',width:1536,height:2048},
];

function Photo({id,className='',priority=false,alt}:{id:string;className?:string;priority?:boolean;alt?:string}){
 const p=storyPhotos.find(i=>i.id===id)??galleryData.find(i=>i.id===id)!;
 return <img className={className} src={p.src} srcSet={`${p.thumbnail} 640w, ${p.src} 1600w`} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 650px" alt={alt||p.alt} width={p.width} height={p.height} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async"/>;
}

export default function CafeWebsite(){
 const [lang,setLang]=useState<'en'|'bn'>('bn');
 const [mobileOpen,setMobileOpen]=useState(false);
 const t=(en:string,bn:string)=>lang==='en'?en:bn;
 useEffect(()=>{try{const saved=localStorage.getItem('aronno-language');if(saved==='en'||saved==='bn')setLang(saved);}catch{}},[]);
 useEffect(()=>{document.documentElement.lang=lang;},[lang]);
 const toggleLanguage=()=>{const next=lang==='en'?'bn':'en';setLang(next);try{localStorage.setItem('aronno-language',next);}catch{}};
 const links=[['/',t('Home','হোম')],['/menu',t('The menu','মেনু')],['/spaces',t('Our spaces','পরিবেশ')],['/gallery',t('Gallery','গ্যালারি')],['/celebrate',t('Celebrate','আয়োজন')],['/visit',t('Visit','ভিজিট')]];

 return <div className={`website language-${lang}`}>
  <a className="skip-link" href="#main-content">{t('Skip to content','মূল অংশে যান')}</a>
  <div className="announcement"><BrandAnnouncement>{t('FLAVOUR · MOMENTS · CELEBRATIONS','স্বাদ · আড্ডা · আয়োজন')}</BrandAnnouncement><a href={MAPS} target="_blank" rel="noreferrer"><MapPin size={13}/>{t('Kolarhat, Rajbari','কোলারহাট, রাজবাড়ী')} <ArrowUpRight size={13}/></a></div>
  <header className="site-header"><a className="brand" href="/" aria-label="Cafe Aronno home"><img src="/images/logo.webp" width="54" height="54" alt="ক্যাফে অরণ্য — official logo"/><span>CAFE ARONNO<BengaliBrandName/></span></a><nav aria-label={t('Main navigation','প্রধান নেভিগেশন')}>{links.map(([href,label])=><a key={href} href={href}>{label}</a>)}</nav><div className="header-actions"><button className="language-button" onClick={toggleLanguage} aria-label={t('Switch to Bengali','Switch to English')}>{t('বাংলা','EN')}</button><a className="button button-small header-visit" href="/visit">{t('Plan a visit','চলে আসুন')} <ArrowUpRight size={17}/></a><Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetTrigger className="mobile-menu icon-button" aria-label={t('Open menu','নেভিগেশন খুলুন')}><Menu size={24}/></SheetTrigger><SheetContent className="navigation-sheet"><SheetTitle>Cafe Aronno</SheetTitle><SheetDescription>ক্যাফে অরণ্য · রাজবাড়ী</SheetDescription><nav aria-label="Mobile navigation">{links.map(([href,label])=><a key={href} href={href} onClick={()=>setMobileOpen(false)}>{label}<ArrowUpRight size={20}/></a>)}</nav><a className="button" href={PHONE}><Phone size={18}/>01689-442223</a></SheetContent></Sheet></div></header>

  <main id="main-content">
  <ImmersiveHero lang={lang}/>
  <div className="welcome-strip"><span><Leaf size={18}/>{t('Spacious outdoor seating','সুবিশাল আউটডোর')}</span><span><Utensils size={18}/>{t('Fully air-conditioned indoors','ফুলি এসি ইনডোর')}</span><span><Heart size={18}/>{t('Your people, your moments','আপন মানুষের আপন সময়')}</span><span><Coffee size={18}/>{t('Stay for another cup','আরেক কাপ চা হয়ে যাক')}</span></div>

  <section className="section story" id="story"><div className="story-images"><Photo id="story-exterior-dusk" className="story-tall" alt={t('Cafe Aronno entrance and sign glowing at dusk','সন্ধ্যার আলোয় ক্যাফে অরণ্যের প্রবেশপথ ও সাইনবোর্ড')}/><Photo id="story-good-food" className="story-small" alt={t('Cafe Aronno Good Food feature wall and indoor dining','ক্যাফে অরণ্যের গুড ফুড দেয়াল ও ইনডোর ডাইনিং')}/><span className="image-note">{t('Rooted in good moments.','সুন্দর মুহূর্তের ঠিকানা।')}</span></div><div className="story-copy"><p className="eyebrow">{t('A WARM WELCOME TO অরণ্য','অরণ্যে আপনাকে স্বাগতম')}</p><h2>{t('More than a meal.','শুধু খাবার নয়।')}<br/><em>{t('A moment of your own.','নিজের মতো কিছু সময়।')}</em></h2><p className="bengali-intro" lang="bn">শহরের ব্যস্ততার মাঝে, একটু অরণ্য।</p><p>{t('Cafe Aronno offers a spacious garden setting and an elegantly designed, fully air-conditioned indoor dining room. By day, the greenery feels fresh and open; after sunset, carefully arranged lighting gives the entire space a warm new character—an inviting backdrop for time with family, friends and the people who matter.','ক্যাফে অরণ্যে রয়েছে সুবিশাল সবুজ আউটডোর এবং রুচিশীলভাবে সাজানো সম্পূর্ণ শীতাতপনিয়ন্ত্রিত ইনডোর। দিনের আলোয় বাগানের সতেজতা, আর রাত নামলে পরিকল্পিত আলোকসজ্জায় পুরো প্রাঙ্গণ পায় মনোরম নতুন রূপ—পরিবার, বন্ধু ও প্রিয়জনদের সঙ্গে সময় কাটানোর জন্য এক স্বস্তিদায়ক পরিবেশ।')}</p><p>{t('Our menu brings together familiar local flavours, biriyani, Chinese favourites, fast food, pizza, grill items, snacks, tea, coffee and more, with prices kept within easy reach.','আমাদের মেনুতে দেশি পরিচিত স্বাদ থেকে বিরিয়ানি, চাইনিজ, ফাস্ট ফুড, পিৎজা, গ্রিল, নাস্তা, চা-কফি ও আরও নানা আয়োজন—মূল্য রাখা হয়েছে সাধ্যের মধ্যে।')}</p><aside className="occasion-highlight"><span className="occasion-highlight-icon"><CalendarDays size={19}/></span><span><strong>{t('YOUR OCCASION, OUR CARE','আপনার আয়োজন, আমাদের যত্ন')}</strong>{t('For birthdays, family gatherings, friendly get-togethers or another special occasion, we can arrange the space and décor around the celebration you have in mind.','জন্মদিন, পারিবারিক মিলনমেলা, বন্ধুদের গেট-টুগেদার কিংবা অন্য যেকোনো বিশেষ উপলক্ষের জন্য পছন্দমতো সাজসজ্জা ও আয়োজনের ব্যবস্থা রয়েছে।')}</span></aside><a className="text-link" href="/spaces">{t('Take a look around','ঘুরে দেখুন অরণ্য')}<ArrowUpRight size={18}/></a></div></section>

  {/* 1. Compact Menu Section */}
  <HomeMenuCompact lang={lang} />

  {/* 2. Compact Spaces Section */}
  <HomeSpacesPreview lang={lang} />

  {/* 3. Facebook 10 Videos Horizontal Carousel */}
  <FacebookReels lang={lang} />

  {/* 4. Curated Gallery Preview */}
  <HomeGalleryPreview lang={lang} />

  {/* 5. Celebrations & Events Preview */}
  <HomeCelebratePreview lang={lang} />

  {/* 6. Location & Visit Section */}
  <HomeVisitPreview lang={lang} />

  <section className="section review-section"><div className="review-score"><p className="eyebrow">{t('A WORD FROM OUR GUESTS','অতিথির অনুভূতি')}</p><div className="rating-number">4.5<span>/ 5</span></div><div className="stars" aria-label="4.5 out of 5 stars">{[0,1,2,3,4].map(i=><Star key={i} size={19} fill={i<4?'currentColor':'none'}/>)}</div><p>{t('13 reviews on Google Maps','গুগল ম্যাপে ১৩টি রিভিউ')}</p><small>{t('Snapshot: 5 September 2026','তথ্য: ৫ সেপ্টেম্বর ২০২৬')}</small><a href={MAPS} className="text-link" target="_blank" rel="noreferrer">{t('Read all guest reviews','সব অতিথির রিভিউ পড়ুন')}<ArrowUpRight size={17}/></a></div><blockquote><span className="quote-mark">“</span><p>Everything is very beautiful, and it&apos;s a place for children to enjoy.</p><footer><span className="review-avatar">B</span><div><strong>Bayezid Sheikh</strong><small>{t('Google Maps · Local Guide','গুগল ম্যাপ · লোকাল গাইড')}</small></div><span className="review-stars">★★★★★</span></footer></blockquote></section>

  <section className="social-section"><div><p className="eyebrow">{t('KEEP A LITTLE অরণ্য IN YOUR FEED','আপনার ফিডেও থাকুক একটু অরণ্য')}</p><h2>{t('Let’s stay connected.','যোগাযোগ থাকুক।')}</h2><p>{t('Fresh moments, food and updates from the café.','ক্যাফের খাবার, নতুন মুহূর্ত আর খবরাখবর।')}</p><div className="actions"><a href={FACEBOOK} target="_blank" rel="noreferrer" className="button"><Facebook size={18}/>Facebook<ArrowUpRight size={17}/></a><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-link light"><Instagram size={18}/>Instagram<ArrowUpRight size={17}/></a></div></div><div className="social-photos">{['aronno-106','aronno-107','aronno-108'].map(id=><a key={id} href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label={t('Visit Cafe Aronno on Instagram','ইনস্টাগ্রামে ক্যাফে অরণ্য দেখুন')}><Photo id={id}/></a>)}</div></section>
  </main>

  <SiteFooter lang={lang}/>

 </div>;
}
