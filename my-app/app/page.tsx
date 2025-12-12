"use client";
import { useState } from 'react';
import FlyingPosters from '../components/FlyingPosters';
import CurvedLoop from '../components/CurvedLoop';

const items = [
  'https://picsum.photos/500/500?grayscale',
  'https://picsum.photos/600/600?grayscale',
  'https://picsum.photos/400/400?grayscale'
];

const slides = [
  { bg: 'bg-red-950', text: 'fill-red-500', marqueeText: 'Welcome to TechBro24' },
  { bg: 'bg-blue-950', text: 'fill-blue-500', marqueeText: 'Creative Solutions' },
  { bg: 'bg-purple-950', text: 'fill-purple-500', marqueeText: 'Modern Design' }
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={`transition-colors duration-700 ease-in-out ${slides[activeIndex].bg}`}>
      <div style={{ height: '900px', position: 'relative' }}>
        <CurvedLoop marqueeText={slides[activeIndex].marqueeText} className={`transition-colors duration-700 ease-in-out ${slides[activeIndex].text}`}>
          <FlyingPosters items={items} onActiveIndexChange={setActiveIndex} />
        </CurvedLoop>
      </div>
    </div>
  );
}
