/* eslint-disable next/no-img-element -- Hero uses pre-generated owner-photo WebP srcsets for precise responsive delivery. */
'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Leaf, Play } from 'lucide-react';
import { heroSlides } from './hero-slides';
import './immersive-hero.css';

export default function ImmersiveHero({lang}:{lang:'en'|'bn'}){
  const [active,setActive]=useState(0);
  const hero=useRef<HTMLElement>(null);
  const pick=(copy:readonly [string,string])=>copy[lang==='en'?0:1];
  const current=heroSlides[active];
  const select=(index:number)=>setActive((index+heroSlides.length)%heroSlides.length);

  useEffect(()=>{
    const element=hero.current;
    if(!element)return;
    const pointer=window.matchMedia('(hover: hover) and (pointer: fine)');
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    const reset=()=>{
      window.cancelAnimationFrame(frame);
      element.style.setProperty('--ah-pointer-x','0');
      element.style.setProperty('--ah-pointer-y','0');
    };
    const move=(event:PointerEvent)=>{
      if(!pointer.matches||motion.matches)return;
      window.cancelAnimationFrame(frame);
      frame=window.requestAnimationFrame(()=>{
        const bounds=element.getBoundingClientRect();
        const x=Math.max(-1,Math.min(1,(event.clientX-bounds.left)/bounds.width*2-1));
        const y=Math.max(-1,Math.min(1,(event.clientY-bounds.top)/bounds.height*2-1));
        element.style.setProperty('--ah-pointer-x',x.toFixed(3));
        element.style.setProperty('--ah-pointer-y',y.toFixed(3));
      });
    };
    element.addEventListener('pointermove',move,{passive:true});
    element.addEventListener('pointerleave',reset);
    return ()=>{reset();element.removeEventListener('pointermove',move);element.removeEventListener('pointerleave',reset);};
  },[]);

  useEffect(()=>{
    const headers=Array.from(document.querySelectorAll('.site-header,.announcement'));
    const measure=()=>hero.current?.style.setProperty('--ah-header-height',`${headers.reduce((height,element)=>height+element.getBoundingClientRect().height,0)}px`);
    const observer=new ResizeObserver(measure);
    headers.forEach(element=>observer.observe(element));
    measure();
    return ()=>observer.disconnect();
  },[]);

  return <section ref={hero} id="home" className="aronno-hero" style={{'--scene-rgb':current.palette,'--scene-glow':current.glow,'--scene-gold':current.gold} as CSSProperties} aria-roledescription={lang==='en'?'carousel':'স্লাইডশো'} aria-label={lang==='en'?'Discover Cafe Aronno':'ক্যাফে অরণ্য ঘুরে দেখুন'}>
    <div className="ah-stage">
      <div className="ah-visual"><div className="ah-scenes">
        {heroSlides.map((slide,index)=><div key={slide.id} className={`ah-scene ${index===active?'is-current':''}`} aria-hidden={index!==active} style={{'--scene-position':slide.position,'--scene-mobile-position':slide.mobilePosition,'--scene-rgb':slide.palette,'--scene-glow':slide.glow,'--scene-gold':slide.gold} as CSSProperties}>
          <div className="ah-media"><img src={`/images/hero-${slide.id}.webp`} srcSet={`/images/hero-${slide.id}-480.webp 480w, /images/hero-${slide.id}-640.webp 640w, /images/hero-${slide.id}-1080.webp 1080w, /images/hero-${slide.id}.webp ${slide.width}w`} sizes="(max-width:700px) 100vw, 60vw" width={slide.width} height={slide.height} alt={index===active?pick(slide.alt):''} loading={index===0?'eager':'lazy'} fetchPriority={index===0?'high':'auto'} decoding="async"/></div>
        </div>)}
      </div><div className="ah-photo-caption" key={`${current.id}-caption`} aria-hidden="true"><span/>{pick(current.caption)}</div></div>
      <div className="ah-content" key={`${current.id}-${lang}`}>
        <p className="ah-location"><span/> CAFE ARONNO <span className="ah-location-divider"/> {lang==='en'?'RAJBARI':'রাজবাড়ী'}</p>
        <div className="ah-story">
          <p className="ah-kicker">{pick(current.kicker)}</p>
          <h1>{pick(current.title)}<br/><em>{pick(current.accent)}</em></h1>
          <p className="ah-description">{pick(current.description)}</p>
        </div>
        <div className="ah-actions"><Link href={current.href} className="ah-primary">{pick(current.action)}<ArrowUpRight size={18}/></Link><Link href="/gallery" className="ah-video-link"><span><Play size={12} fill="currentColor"/></span>{lang==='en'?'A glimpse of Aronno':'এক ঝলক অরণ্য'}</Link></div>
        <div className="ah-detail"><Leaf size={16}/><span>{pick(current.detail)}</span></div>
      </div>
      <fieldset className="ah-slide-controls"><legend className="sr-only">{lang==='en'?'Change hero photo':'হিরোর ছবি পরিবর্তন করুন'}</legend>
        <button type="button" onClick={()=>select(active-1)} aria-label={lang==='en'?'Previous photo':'আগের ছবি'}><ArrowLeft size={17}/></button>
        <button type="button" onClick={()=>select(active+1)} aria-label={lang==='en'?'Next photo':'পরের ছবি'}><ArrowRight size={17}/></button>
      </fieldset>
    </div>
    <p className="sr-only" aria-live="polite" aria-atomic="true">{pick(current.kicker)} — {active+1} / {heroSlides.length}</p>
  </section>;
}
