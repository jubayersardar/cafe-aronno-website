import type { Metadata } from 'next';
import { SpacesView } from './spaces-view';
import './spaces.css';

export const metadata: Metadata = {
  title: 'পরিবেশ — Cafe Aronno | বাগান ও ফুলি এসি ইনডোর',
  description:
    'ক্যাফে অরণ্যের সবুজ আউটডোর, সম্পূর্ণ শীতাতপনিয়ন্ত্রিত ইনডোর, সন্ধ্যার আলোকসজ্জা ও বসার পরিবেশ দেখুন।',
  alternates: { canonical: '/spaces' },
  openGraph: {
    title: 'ক্যাফে অরণ্যের পরিবেশ',
    description:
      'খোলা বাগান থেকে আরামদায়ক ফুলি এসি ইনডোর—আপনার সময়ের জন্য পছন্দের একটি কোণ।',
    url: '/spaces',
    images: ['/images/indoor-maps.webp'],
  },
};

export default function SpacesPage() {
  return <SpacesView />;
}
