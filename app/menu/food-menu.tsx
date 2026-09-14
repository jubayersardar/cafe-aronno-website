'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Search, X, Phone, Download, Leaf, Flame, Pizza, Coffee, Soup, Utensils, Sandwich, Sunrise, Salad, Wheat, CookingPot, Beef, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import menu from '../menu.json';
import { InteriorFooter, InteriorHeader } from '../interior-shell';
import './menu.css';

type Dish = { id:string; name_bn:string; name_en:string; uncertain_name?:boolean; price_bdt?:number|null; prices_bdt?:{label_en:string; label_bn:string; price:number|null}[]; contents_bn?:string[]; contents_en?:string[] };
type Category = { id:string; name_bn:string; name_en:string; items:Dish[] };
type PrintedMenuLanguage = 'bn'|'en';
const categories=menu.categories as Category[];
const icons=[Sandwich,Utensils,Sunrise,Flame,Wheat,CookingPot,Pizza,Beef,Soup,Utensils,Salad,Coffee,Utensils];
const printedMenus:Record<PrintedMenuLanguage,{src:string;label:string;currentLabel:string;alt:string;download:string}>={
 bn:{src:'/images/cafe-aronno-menu-bangla.png',label:'বাংলা',currentLabel:'বাংলা মেনু',alt:'ক্যাফে অরণ্যের বাংলা মেনু ও মূল্যতালিকা',download:'Cafe-Aronno-Menu-Bangla.png'},
 en:{src:'/images/cafe-aronno-menu-english.png',label:'English',currentLabel:'English menu',alt:'Cafe Aronno English menu and price list',download:'Cafe-Aronno-Menu-English.png'},
};
const descriptions:Record<string,string>={
 'fast-food':'ছোট্ট ক্ষুধা কিংবা আড্ডার ফাঁকে', appetizers:'সুস্বাদু শুরুর আয়োজন',breakfast:'সকালের সহজ, চেনা খাবার','kabab-grill':'গ্রিলের ঘ্রাণে জমে উঠুক টেবিল','naan-roti':'কাবাবের সঙ্গে পছন্দের রুটি',chinese:'রাইস, চাউমিন ও সিজলিং',pizza:'আপনার পছন্দের সাইজে',biriyani:'ভরপেট খাওয়ার আয়োজন',soups:'উষ্ণ এক বাটি স্বাদ','halim-fuchka-chatpoti':'বিকেলের আড্ডার সঙ্গী',salad:'টেবিলে একটু সতেজতা','tea-coffee':'কাপে কাপে গল্প জমুক','set-menu':'এক প্লেটে গোছানো খাবার',
};
const number=(n:number)=>new Intl.NumberFormat('bn-BD').format(n);
function name(d:Dish){return d.uncertain_name?'কফি':d.name_bn.replace(' (V4)','');}
function Price({dish}:{dish:Dish}) {
 if(dish.prices_bdt) return <div className="dish-variants">{dish.prices_bdt.map(v=><div key={v.label_en}><span>{v.label_bn}</span><strong>{v.price==null?'জেনে নিন':`৳${number(v.price)}`}</strong></div>)}</div>;
 return <div className="dish-price"><span>{dish.price_bdt==null?'ওজন অনুযায়ী মূল্য':'মূল্য'}</span><strong>{dish.price_bdt==null?<a href="tel:+8801689442223">ফোনে জেনে নিন <ArrowUpRight size={16}/></a>:`৳${number(dish.price_bdt)}`}</strong></div>;
}
export default function FoodMenu(){
 const [query,setQuery]=useState('');
 const [activeFilter,setActiveFilter]=useState('all');
 const [scrolledCategory,setScrolledCategory]=useState('all');
 const [originalOpen,setOriginalOpen]=useState(false);
 const [printedMenuLanguage,setPrintedMenuLanguage]=useState<PrintedMenuLanguage>('bn');
 const printedMenu=printedMenus[printedMenuLanguage];

 const isClickScrollingRef=useRef(false);
 const scrollTimeoutRef=useRef<ReturnType<typeof setTimeout>|null>(null);
 const navRef=useRef<HTMLElement|null>(null);

 const filtered=useMemo(()=>{
  const q=query.trim().toLocaleLowerCase();
  return categories
   .filter(c=>activeFilter==='all'||c.id===activeFilter)
   .map(c=>({
     ...c,
     items: q ? c.items.filter(d=>`${d.name_bn} ${d.name_en} ${c.name_bn} ${c.name_en}`.toLocaleLowerCase().includes(q)) : c.items,
   }))
   .filter(c=>c.items.length);
 },[query,activeFilter]);

 const count=filtered.reduce((sum,c)=>sum+c.items.length,0);

 const updateScrolledCategory=useCallback(()=>{
  if(isClickScrollingRef.current) return;
  if(activeFilter!=='all') return;
  if(!filtered.length) return;

  const scrollY=window.scrollY||window.pageYOffset;
  const windowHeight=window.innerHeight;
  const docHeight=document.documentElement.scrollHeight;

  // If scrolled to bottom of page, activate the last category
  if(windowHeight+scrollY>=docHeight-80){
   setScrolledCategory(filtered[filtered.length-1].id);
   return;
  }

  // If above the first category, set to 'all'
  const firstEl=document.getElementById(filtered[0]?.id);
  if(firstEl){
   const firstRect=firstEl.getBoundingClientRect();
   if(firstRect.top>220){
    setScrolledCategory('all');
    return;
   }
  }

  // Focal point around upper reading area
  const focalPoint=160;
  let currentActive:string|null=null;

  for(let i=0;i<filtered.length;i++){
   const c=filtered[i];
   const el=document.getElementById(c.id);
   if(!el) continue;
   const rect=el.getBoundingClientRect();
   if(rect.top<=focalPoint && rect.bottom>focalPoint){
    currentActive=c.id;
    break;
   }
  }

  if(!currentActive){
   for(let i=filtered.length-1;i>=0;i--){
    const c=filtered[i];
    const el=document.getElementById(c.id);
    if(!el) continue;
    const rect=el.getBoundingClientRect();
    if(rect.top<=focalPoint){
     currentActive=c.id;
     break;
    }
   }
  }

  if(currentActive){
   setScrolledCategory(currentActive);
  }
 },[activeFilter,filtered]);

 useEffect(()=>{
  let ticking=false;
  const onScroll=()=>{
   if(!ticking){
    window.requestAnimationFrame(()=>{
     updateScrolledCategory();
     ticking=false;
    });
    ticking=true;
   }
  };

  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll,{passive:true});

  const initialTimer=setTimeout(()=>{
   updateScrolledCategory();
  },0);

  return ()=>{
   clearTimeout(initialTimer);
   window.removeEventListener('scroll',onScroll);
   window.removeEventListener('resize',onScroll);
   if(scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
  };
 },[updateScrolledCategory]);

 // Scroll active button horizontally into view on mobile
 useEffect(()=>{
  if(!navRef.current) return;
  const currentKey=activeFilter==='all'?scrolledCategory:activeFilter;
  const targetBtn=navRef.current.querySelector<HTMLElement>(`[data-category="${currentKey}"]`);
  if(targetBtn && navRef.current.scrollWidth>navRef.current.clientWidth){
   targetBtn.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  }
 },[activeFilter,scrolledCategory]);

 // Check initial URL hash
 useEffect(()=>{
  if(typeof window!=='undefined' && window.location.hash){
   const hash=window.location.hash.replace('#','');
   if(hash){
    const target=document.getElementById(hash);
    if(target){
     setTimeout(()=>{
      target.scrollIntoView({behavior:'smooth',block:'start'});
      setScrolledCategory(hash);
     },200);
    }
   }
  }
 },[]);

 const handleCategoryClick=useCallback((categoryId:string)=>{
  if(scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
  isClickScrollingRef.current=true;

  setActiveFilter(categoryId);
  setScrolledCategory(categoryId);

  const resultsEl=document.getElementById('food-results')||document.getElementById('food-top');
  if(resultsEl){
   const targetY=window.scrollY+resultsEl.getBoundingClientRect().top-80;
   window.scrollTo({top:Math.max(0,targetY),behavior:'smooth'});
  }

  scrollTimeoutRef.current=setTimeout(()=>{
   isClickScrollingRef.current=false;
  },600);
 },[]);

 const reset=()=>{
  setQuery('');
  handleCategoryClick('all');
 };

 const activeCategoryName=useMemo(()=>{
  if(activeFilter==='all') return null;
  return categories.find(c=>c.id===activeFilter)?.name_bn??null;
 },[activeFilter]);

 return <div className="food-page" lang="bn" id="food-top">
  <a className="skip-link" href="#food-results">সরাসরি খাবারের তালিকায় যান</a>
  <InteriorHeader active="menu" />
  <main>
   <section className="food-intro"><div className="food-intro-copy"><p className="eyebrow" lang="en"><Leaf size={16}/> A CURATED MENU FOR EVERY MOMENT.</p><h1>আপনার পছন্দের স্বাদ, <em>অরণ্যের আয়োজনে।</em></h1><p>হালকা নাস্তা থেকে পরিপূর্ণ ভোজ—প্রতিটি মুহূর্তের জন্য যত্নে সাজানো আমাদের মেনু থেকে বেছে নিন আপনার পছন্দের খাবার।</p><div className="food-intro-meta"><span><strong>১৩</strong> বিভাগ</span><span><strong>৬৫</strong> মেনু আইটেম</span><button onClick={()=>setOriginalOpen(true)}>ছাপানো মেনু <ArrowUpRight size={16}/></button></div></div><div className="food-intro-photo"><Image src="/images/menu-explorer-ai.webp" sizes="(max-width:700px) 100vw, 38vw" alt="কালো মেনু ফোলিওতে স্ন্যাকস, গ্রিল, বিরিয়ানি, পিৎজা ও চা-কফির বিভাগভিত্তিক প্রিমিয়াম উপস্থাপনা" width={1440} height={810} priority/><div><span lang="en">THE COMPLETE ARONNO MENU</span><strong>এক মেনুতে পছন্দের সব আয়োজন</strong></div></div></section>
   <div className="food-workspace">
    <aside className="food-sidebar">
     <p className="food-nav-label">মেনুর বিভাগ</p>
     <nav ref={navRef} aria-label="খাবারের বিভাগ">
      <button
       type="button"
       data-category="all"
       className={`${activeFilter==='all'?'selected ':''}${activeFilter==='all'&&scrolledCategory==='all'?'scrolling-active ':''}`.trim()}
       aria-pressed={activeFilter==='all'}
       onClick={()=>handleCategoryClick('all')}
      >
       <Utensils size={17}/>সব খাবার<span>৬৫</span>
      </button>
      {categories.map((c,i)=>{
       const Icon=icons[i];
       const isCombo=c.id==='set-menu';
       const isSelected=activeFilter===c.id;
       const isScrolled=activeFilter==='all'&&scrolledCategory===c.id;
       return <button
        type="button"
        key={c.id}
        data-category={c.id}
        className={`${isSelected?'selected ':''}${isScrolled?'scrolling-active ':''}${isCombo?'food-nav-combo':''}`.trim()}
        aria-label={isCombo?`${c.name_bn}, বিশেষ কম্বো`:undefined}
        aria-pressed={isSelected}
        onClick={()=>handleCategoryClick(c.id)}
       >
        <Icon size={17}/>{c.name_bn}
        {isCombo&&<small className="food-nav-special" aria-hidden="true">স্পেশাল কম্বো</small>}
        <span>{number(c.items.length)}</span>
       </button>;
      })}
     </nav>
     <div className="food-sidebar-note"><Leaf size={24}/><strong>একটু অরণ্য, একটু আড্ডা।</strong><p>হিরা স্কয়ার, স্কুল রোড<br/>কোলারহাট বাজার, রাজবাড়ী</p><Link href="/visit">চলে আসুন <ArrowUpRight size={15}/></Link></div>
    </aside>
    <div className="food-content">
     <div className="food-toolbar">
      <div className="food-search">
       <Search size={20}/>
       <Input value={query} onChange={e=>setQuery(e.target.value)} aria-label="বাংলা বা ইংরেজিতে খাবার খুঁজুন" placeholder="খাবার খুঁজুন · Search dishes"/>
       {query&&<button onClick={()=>setQuery('')} aria-label="সার্চ মুছুন"><X size={18}/></button>}
      </div>
      <output aria-live="polite">{number(count)}টি খাবার</output>
     </div>
     {activeCategoryName&&<div className="food-filter-banner">
      <span>শুধু <strong>{activeCategoryName}</strong> বিভাগের খাবার দেখছেন</span>
      <button type="button" onClick={()=>handleCategoryClick('all')}>সব খাবার দেখুন (৬৫) <X size={14}/></button>
     </div>}
     <p className="food-price-note">সব মূল্য টাকায় (৳)। অর্ডারের সময় বর্তমান মূল্য ও প্রাপ্যতা নিশ্চিত করুন।</p>
     <div id="food-results" tabIndex={-1}>
      {filtered.length?filtered.map(c=>{
       const index=categories.findIndex(x=>x.id===c.id);
       const Icon=icons[index];
       return <section id={c.id} className={`food-category food-category-${c.id}`} key={c.id} aria-labelledby={`heading-${c.id}`}>
        <div className="food-category-heading">
         <div className="food-category-icon"><Icon size={27} strokeWidth={1.5}/></div>
         <div>
          <span lang="en" className="food-category-english">{String(index+1).padStart(2,'0')} / {c.name_en}</span>
          <h2 id={`heading-${c.id}`}>{c.name_bn}</h2>
          <p>{descriptions[c.id]}</p>
         </div>
         <span className="food-category-count">{number(c.items.length)}টি</span>
        </div>
        <div className="dish-grid">
         {c.items.map((d,i)=><article className={`dish-card ${d.contents_bn?'dish-set':''}`} key={d.id} id={d.id}>
          <div className="dish-topline">
           <span lang="en">{String(index+1).padStart(2,'0')}.{String(i+1).padStart(2,'0')}</span>
           {d.name_en.includes('Special')&&<span className="dish-special"><Leaf size={12}/>অরণ্য স্পেশাল</span>}
          </div>
          <h3>{name(d)}</h3>
          <p className="dish-english" lang="en">{d.name_en.replace(' (V4)','')}</p>
          {d.contents_bn&&<ul>{d.contents_bn.map(line=><li key={line}>{line}</li>)}</ul>}
          <Price dish={d}/>
         </article>)}
        </div>
       </section>;
      }):<div className="food-empty">
       <Search size={38}/>
       <h2>এই নামে খাবার পাওয়া যায়নি</h2>
       <p>অন্য কোনো নাম লিখুন অথবা সব খাবার দেখুন।</p>
       <button className="button button-dark" onClick={reset}>সব খাবার দেখুন</button>
      </div>}
     </div>
     <section className="food-invitation">
      <div>
       <span lang="en">GOOD FOOD. GREENER MOMENTS.</span>
       <h2>টেবিলে দেখা হোক।</h2>
       <p>খাবারের প্রাপ্যতা, গ্রুপ বুকিং বা বিশেষ আয়োজন সম্পর্কে জানতে ফোন করুন।</p>
       <a className="button button-dark" href="tel:+8801689442223"><Phone size={17}/><span lang="en">01689-442223</span></a>
      </div>
      <Image src="/images/food-invitation-meal.webp" width={1920} height={864} loading="lazy" alt="অরণ্যের পরিবেশনে সাজানো একটি পূর্ণ খাবারের থালি"/>
     </section>
     <div className="food-bottom-links">
      <button onClick={()=>setOriginalOpen(true)}>মূল মেনুর ছবি দেখুন <ArrowUpRight size={16}/></button>
      <a href="#food-top">উপরে ফিরে যান <ChevronUp size={17}/></a>
     </div>
    </div>
   </div>
  </main>
  <InteriorFooter />
  <Dialog open={originalOpen} onOpenChange={setOriginalOpen}>
   <DialogContent className="menu-photo-dialog">
    <DialogTitle>অরণ্যের ছাপানো মেনু</DialogTitle>
    <DialogDescription>বাংলা অথবা English বেছে নিন। অর্ডারের সময় বর্তমান মূল্য ও প্রাপ্যতা নিশ্চিত করুন।</DialogDescription>
    <fieldset className="menu-language-switch">
     <legend className="sr-only">মেনুর ভাষা নির্বাচন</legend>
     {(Object.keys(printedMenus) as PrintedMenuLanguage[]).map(language=><button type="button" key={language} className={printedMenuLanguage===language?'selected':''} aria-pressed={printedMenuLanguage===language} lang={language} onClick={()=>setPrintedMenuLanguage(language)}>{printedMenus[language].label}</button>)}
    </fieldset>
    <a className="menu-photo-link" href={printedMenu.src} target="_blank" rel="noreferrer" aria-label={`${printedMenu.currentLabel} বড় করে দেখুন`}>
     <Image key={printedMenu.src} src={printedMenu.src} alt={printedMenu.alt} width={1536} height={1024} sizes="(max-width: 1100px) 90vw, 1050px" unoptimized/>
    </a>
    <div className="menu-photo-actions">
     <span aria-live="polite">দেখছেন: <strong lang={printedMenuLanguage}>{printedMenu.currentLabel}</strong></span>
     <a className="button button-dark" href={printedMenu.src} download={printedMenu.download}><Download size={17}/>এই মেনু ডাউনলোড</a>
    </div>
   </DialogContent>
  </Dialog>
 </div>;
}
