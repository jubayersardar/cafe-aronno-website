import Link from 'next/link';
import SiteFooter from './site-footer';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import './interior-shell.css';
import { BengaliBrandName, BrandAnnouncement } from './brand-elements';

type PageId='home'|'menu'|'spaces'|'gallery'|'celebrate'|'visit';
const pages:{id:PageId;href:string;label:string}[]=[
  {id:'home',href:'/',label:'হোম'},
  {id:'menu',href:'/menu',label:'মেনু'},
  {id:'spaces',href:'/spaces',label:'পরিবেশ'},
  {id:'gallery',href:'/gallery',label:'গ্যালারি'},
  {id:'celebrate',href:'/celebrate',label:'আয়োজন'},
  {id:'visit',href:'/visit',label:'ভিজিট'},
];

export function InteriorHeader({active}:{active?:PageId}){
  return <>
    <div className="interior-announcement"><BrandAnnouncement className="interior-announcement-copy">স্বাদ · আড্ডা · আয়োজন</BrandAnnouncement><a href="https://maps.app.goo.gl/MykfZKgoHP9VUGPU7" target="_blank" rel="noreferrer"><MapPin size={13}/>কোলারহাট, রাজবাড়ী<ArrowUpRight size={13}/></a></div>
    <header className="interior-header"><div className="interior-header-main"><Link className="interior-brand" href="/" aria-label="ক্যাফে অরণ্য হোম"><img src="/images/logo.webp" width="48" height="48" alt="ক্যাফে অরণ্য লোগো"/><span>CAFE ARONNO<BengaliBrandName/></span></Link><nav aria-label="প্রধান নেভিগেশন">{pages.map(page=><Link key={page.id} href={page.href} aria-current={active===page.id?'page':undefined}>{page.label}</Link>)}</nav><a className="interior-call" href="tel:+8801689442223"><Phone size={16}/><span>ফোন করুন</span></a></div><nav className="interior-mobile-nav" aria-label="মোবাইল প্রধান নেভিগেশন">{pages.map(page=><Link key={page.id} href={page.href} aria-current={active===page.id?'page':undefined}>{page.label}</Link>)}</nav></header>
  </>;
}

export function InteriorFooter(){
  return <SiteFooter/>;
}
