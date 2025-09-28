import { Link } from "react-router-dom";
import { slugify } from "../../utils/Slugify";

const collections = [
  { id: 1, image: "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758794219/collection1_kc3wnb.webp", name: "Aletta Collection" },
  { id: 2, image: "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758794217/collection2_gr5eab.webp", name: "Daily Playlist Collection" },
  { id: 3, image: "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758794185/collection3_iydhct.webp", name: "Trucker Hat Collection" },
  { id: 4, image: "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758794185/collection4_aaczaw.webp", name: "Artbycode Collection" },
];

export default function Collections() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-2">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Special Collections</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {collections.map((col) => (
          <Link key={col.id} to={`/category/${slugify(col.name)}`} className="relative aspect-square overflow-hidden shadow-lg group cursor-pointer">
            <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-red-600 bg-opacity-90 px-2 py-1 text-white font-bold text-sm shadow-sm">Explore More</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
