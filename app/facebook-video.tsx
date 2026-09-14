'use client';

import { useState } from 'react';
import { ArrowUpRight, Leaf, Play } from 'lucide-react';
import './facebook-video.css';

// Public featured reel and embed URL verified on the official page, 7 Sep 2026.
const VIDEO_URL = 'https://www.facebook.com/reel/1003581532085442/';
const EMBED_URL = 'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1003581532085442%2F&show_text=false&width=267&t=0';

export default function FacebookVideo({lang}:{lang:'en'|'bn'}) {
  const [loaded,setLoaded]=useState(false);
  const t=(en:string,bn:string)=>lang==='en'?en:bn;

  return <section className="section facebook-video-section" id="video" aria-labelledby="facebook-video-title">
    <div className="facebook-video-copy">
      <p className="eyebrow"><Leaf size={17}/>{t('A MOMENT AT ARONNO','একটু অরণ্য, কিছু মুহূর্ত')}</p>
      <h2 id="facebook-video-title">{t('A little Aronno,','এক ঝলক')}<br/><em>{t('in motion.','অরণ্য।')}</em></h2>
      <p className="facebook-video-description">{t('Take a closer look at our café through a featured reel from our official Facebook page.','আমাদের অফিসিয়াল ফেসবুক পেজের ফিচারড ভিডিওতে দেখে নিন ক্যাফে অরণ্যের এক ঝলক।')}</p>
      <a className="text-link" href={VIDEO_URL} target="_blank" rel="noreferrer">{t('Watch on Facebook','ফেসবুকে দেখুন')}<ArrowUpRight size={18}/></a>
      <div className="facebook-video-credit"><img src="/images/logo.webp" width="44" height="44" alt=""/><div><strong>Cafe Aronno <span lang="bn">· ক্যাফে অরণ্য</span></strong><span>{t('Official Facebook page · Featured reel','অফিসিয়াল ফেসবুক পেজ · ফিচারড রিল')}</span></div></div>
    </div>
    <div className="facebook-video-card">
      <div className="facebook-video-frame">
        {loaded?<iframe src={EMBED_URL} title={t('Cafe Aronno featured Facebook video','ক্যাফে অরণ্যের ফিচারড ফেসবুক ভিডিও')} width="267" height="476" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>:<button className="facebook-video-poster" onClick={()=>setLoaded(true)} aria-label={t('Load Cafe Aronno Facebook video','ক্যাফে অরণ্যের ফেসবুক ভিডিও দেখুন')}>
          <img src="/images/facebook-video-poster.webp" width="720" height="1280" loading="lazy" alt={t('Pink flowers in front of a blue arch at Cafe Aronno, from the featured video','ফিচারড ভিডিওতে অরণ্যের নীল খিলানের সামনে গোলাপি ফুল')}/>
          <span className="facebook-video-badge" lang="en">FACEBOOK REEL</span>
          <span className="facebook-video-play"><Play size={27} fill="currentColor" strokeWidth={1.5}/></span>
          <span className="facebook-video-watch">{t('Watch the video','ভিডিও দেখুন')}<ArrowUpRight size={17}/></span>
        </button>}
      </div>
      <p className="facebook-video-note">{loaded?<>{t('Player not loading?','ভিডিও লোড হচ্ছে না?')} <a href={VIDEO_URL} target="_blank" rel="noreferrer">{t('Open on Facebook','ফেসবুকে খুলুন')} ↗</a></>:t('Facebook loads when you choose to watch.','ভিডিও দেখার বোতামে চাপ দিলে ফেসবুক প্লেয়ার লোড হবে।')}</p>
    </div>
  </section>;
}
