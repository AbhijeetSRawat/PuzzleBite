import Image from "next/image";

import FlyingPosters from '../components/FlyingPosters';
const items = [
  'https://picsum.photos/500/500?grayscale',
  'https://picsum.photos/600/600?grayscale',
  'https://picsum.photos/400/400?grayscale'
];
export default function Home() {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <FlyingPosters items={items} />
    </div>

  );
}
