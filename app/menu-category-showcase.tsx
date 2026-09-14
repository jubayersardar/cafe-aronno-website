import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Coffee, Flame, Leaf, Pizza, Sandwich, Sparkles, Utensils } from 'lucide-react';
import menu from './menu.json';
import './menu-category-showcase.css';

type Dish={id:string;name_bn:string;name_en:string};
type Category={id:string;name_bn:string;name_en:string;items:Dish[]};
type Language='en'|'bn';

const categories=menu.categories as Category[];
const totalItems=categories.reduce((sum,category)=>sum+category.items.length,0);
const featuredIds=['fast-food','appetizers','kabab-grill','pizza','tea-coffee','set-menu'] as const;
const featuredCategories=featuredIds.map(id=>categories.find(category=>category.id===id)).filter((category):category is Category=>Boolean(category));
const categoryDetails:Record<string,{image:string;position:string;icon:typeof Utensils;en:string;bn:string}>={
  'fast-food':{image:'aronno-060',position:'center 48%',icon:Sandwich,en:'Quick favourites for hunger between conversations',bn:'হালকা ক্ষুধা আর আড্ডার ফাঁকে মজাদার সব পছন্দ'},
  appetizers:{image:'aronno-089',position:'center 48%',icon:Sparkles,en:'Crisp, savoury bites to begin the table',bn:'টেবিলের শুরুতে মচমচে ও মজাদার আয়োজন'},
  'kabab-grill':{image:'aronno-013',position:'center 48%',icon:Flame,en:'Smoky favourites, served hot from the grill',bn:'গ্রিলের ধোঁয়া ওঠা ঘ্রাণে জমে উঠুক টেবিল'},
  pizza:{image:'aronno-097',position:'center 52%',icon:Pizza,en:'A warm favourite made for sharing',bn:'একসঙ্গে ভাগ করে খাওয়ার আনন্দময় আয়োজন'},
  'tea-coffee':{image:'aronno-114',position:'center 50%',icon:Coffee,en:'Another cup, another unhurried conversation',bn:'কাপে কাপে আরও একটু গল্প জমুক'},
  'set-menu':{image:'aronno-100',position:'center 54%',icon:Utensils,en:'Complete combinations for an easy, satisfying meal',bn:'এক প্লেটে গোছানো ও পরিপূর্ণ খাবার'},
};

const numeral=(value:number,lang:Language)=>value.toLocaleString(lang==='bn'?'bn-BD':'en-BD');
const clean=(value:string)=>value.replace(' (V4)','');

export default function MenuCategoryShowcase({lang}:{lang:Language}){
  const t=(en:string,bn:string)=>lang==='en'?en:bn;
  return <section className="home-menu-showcase" id="menu" aria-labelledby="home-menu-heading">
    <div className="hm-shell">
      <header className="hm-heading">
        <div>
          <p className="hm-eyebrow"><Leaf size={15}/>{t('A TASTE OF THE ARONNO MENU','অরণ্যের বাছাই করা মেনু')}</p>
          <h2 id="home-menu-heading">{t('A few favourites,','পছন্দের কিছু স্বাদ,')}<br/><em>{t('one complete menu.','এক পূর্ণ আয়োজনে।')}</em></h2>
        </div>
        <div className="hm-heading-copy">
          <p>{t(`Start with a few guest favourites, then open our dedicated menu page to explore all 13 categories and ${totalItems} listed items with portions and prices.`,`জনপ্রিয় কয়েকটি বিভাগ থেকে পছন্দ বেছে নিন। এরপর আলাদা মেনু পেজে ${numeral(13,lang)}টি বিভাগ ও ${numeral(totalItems,lang)}টি খাবারের পরিমাণ, কম্বিনেশন এবং তালিকাভুক্ত মূল্য একসঙ্গে দেখুন।`)}</p>
          <Link href="/menu">{t('Explore the complete menu','সম্পূর্ণ মেনু দেখুন')}<ArrowUpRight size={18}/></Link>
        </div>
      </header>

      <div className="hm-category-grid" aria-label={t('Featured menu categories','নির্বাচিত মেনু বিভাগ')}>
        {featuredCategories.map((category,index)=>{
          const detail=categoryDetails[category.id];
          const Icon=detail.icon;
          const isCombo=category.id==='set-menu';
          return <Link className={`hm-category${isCombo?' hm-category-combo':''}`} href={`/menu#${category.id}`} key={category.id} aria-label={t(`Open ${category.name_en}: ${category.items.length} items`,`খুলুন ${category.name_bn}: ${numeral(category.items.length,lang)}টি আইটেম`)}>
            <div className="hm-category-media">
              <Image src={`/images/gallery/${detail.image}.webp`} width={640} height={800} sizes="(max-width:700px) 76vw, (max-width:1100px) 32vw, 17vw" alt="" loading="lazy" style={{objectPosition:detail.position}}/>
              <span className="hm-card-number">0{index+1}</span>
              {isCombo&&<span className="hm-combo-badge">{t('SPECIAL COMBO','স্পেশাল কম্বো')}</span>}
            </div>
            <div className="hm-category-body">
              <div className="hm-category-title"><span className="hm-category-icon"><Icon size={21} strokeWidth={1.6}/></span><span><strong>{t(category.name_en,category.name_bn)}</strong><small>{numeral(category.items.length,lang)} {t('items','টি আইটেম')}</small></span></div>
              <p>{t(detail.en,detail.bn)}</p>
              <div className="hm-sample-list">{category.items.slice(0,3).map(item=><span key={item.id}>{clean(t(item.name_en,item.name_bn))}</span>)}</div>
              <b className="hm-open-menu">{t('See this category','এই বিভাগ দেখুন')}<ArrowRight size={16}/></b>
            </div>
          </Link>;
        })}
      </div>
      <div className="hm-all-menu"><span>{t(`13 categories · ${totalItems} menu items`,`১৩টি বিভাগ · ${numeral(totalItems,lang)}টি মেনু আইটেম`)}</span><Link href="/menu">{t('Open the complete food menu','সম্পূর্ণ খাবারের মেনু খুলুন')}<ArrowUpRight size={18}/></Link></div>
    </div>
  </section>;
}
