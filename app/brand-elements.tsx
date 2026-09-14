import type { ReactNode } from 'react';

export function BengaliBrandName(){
  return <small className="brand-bengali" lang="bn" aria-label="ক্যাফে অরণ্য"><span className="brand-word-cafe">ক্যাফে</span><span className="brand-word-aronno">অরণ্য</span><span className="brand-leaves" aria-hidden="true"><span/><span/></span></small>;
}

export function BrandAnnouncement({children,className='announcement-copy'}:{children:ReactNode;className?:string}){
  return <span className={className}><span className="announcement-signal" aria-hidden="true"/><strong className="announcement-label">CAFE ARONNO</strong><span className="announcement-divider" aria-hidden="true"/><span className="announcement-message">{children}</span></span>;
}
