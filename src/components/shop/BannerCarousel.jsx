import { useState, useEffect } from "react";

const banners = [
  "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758793946/banner1_equnou.webp",
  "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758793946/banner2_zz0cbc.webp",
  "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758793960/banner3_q2fhqo.webp",
  "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758793961/banner4_wbmhd9.webp",
  "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758793963/banner5_ifzb1s.webp",
];

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p === banners.length - 1 ? 0 : p + 1)), 4000);
    return () => clearInterval(t);
  }, []);

  const next = () => setCurrent((p) => (p === banners.length - 1 ? 0 : p + 1));
  const prev = () => setCurrent((p) => (p === 0 ? banners.length - 1 : p - 1));

  return (
    <div className="relative w-full h-[75vh] overflow-hidden">
      <div className="flex w-full h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {banners.map((src, i) => (
          <img key={i} src={src} alt={`Banner ${i + 1}`} className="w-full h-full object-cover flex-shrink-0" />
        ))}
      </div>

      <button onClick={prev} className="absolute top-1/2 left-4 -translate-y-1/2 text-white rounded-full p-2 bg-black/20">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button onClick={next} className="absolute top-1/2 right-4 -translate-y-1/2 text-white rounded-full p-2 bg-black/25">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
