import type { Metadata } from 'next';
import FoodMenu from './food-menu';

export const metadata: Metadata = {
  title: 'Food Menu — Cafe Aronno | ক্যাফে অরণ্যের খাবারের মেনু',
  description: 'Browse all 65 menu entries across 13 categories at Cafe Aronno, Rajbari. Bengali and English names, pizza sizes, meal portions and prices in taka.',
  alternates: { canonical: '/menu' },
  openGraph: { title: 'The menu at Cafe Aronno', description: 'কাবাব, বিরিয়ানি, চাইনিজ, পিৎজা, নাস্তা ও চা—অরণ্যের পুরো মেনু।', url: '/menu', images: ['/images/fish-bbq.webp'] },
};
export default function MenuPage() { return <FoodMenu/>; }
