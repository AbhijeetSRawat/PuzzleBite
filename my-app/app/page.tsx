import Image from "next/image";

import FlyingPosters from '../components/FlyingPosters';
import CurvedLoop from '../components/CurvedLoop';
const items = [
  'https://picsum.photos/500/500?grayscale',
  'https://picsum.photos/600/600?grayscale',
  'https://picsum.photos/400/400?grayscale'
];
export default function Home() {
  return (
    <div className="bg-black">
      <div style={{ height: '900px', position: 'relative' }}>
        <CurvedLoop marqueeText="Welcome to TechBro24" className="fill-lime-500">
          <FlyingPosters items={items} />
        </CurvedLoop>
      </div>

    </div>

  );
}
