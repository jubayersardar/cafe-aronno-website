import type { Metadata } from 'next';
import { GalleryView } from './gallery-view';
import './gallery.css';

export const metadata: Metadata = {
  title: 'ছবি ও ভিডিওতে ক্যাফে অরণ্য | Gallery — Cafe Aronno, Rajbari',
  description:
    'ক্যাফে অরণ্যের ইনডোর, আউটডোর, ডে ও নাইট ভিউ, মুখরোচক খাবার, আয়োজন এবং ভিডিওর অফিসিয়াল গ্যালারি।',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'ছবি ও ভিডিওতে ক্যাফে অরণ্য',
    description:
      'সবুজ, আলো, খাবার আর আপন মুহূর্ত—ক্যাফে অরণ্যের আসল ছবির ও ভিডিওর সম্পূর্ণ গ্যালারি।',
    url: '/gallery',
    images: [
      {
        url: '/images/flower-garden.webp',
        width: 1080,
        height: 810,
        alt: 'ক্যাফে অরণ্যের সুবিশাল ফুলের বাগান ও ক্যাফে চত্বর',
      },
    ],
  },
};

export default function GalleryPage() {
  return <GalleryView />;
}
