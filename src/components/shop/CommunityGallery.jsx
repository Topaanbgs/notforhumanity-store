const gallery = [
  { id: 1, type: "image", src: "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758860423/comi4_wwzxm8.webp" },
  { id: 2, type: "video", src: "https://res.cloudinary.com/dr2cuy2gx/video/upload/v1758859302/comv2_gue22f.mp4" },
  { id: 3, type: "image", src: "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758860420/comi2_mzkzn3.webp" },
  { id: 4, type: "video", src: "https://res.cloudinary.com/dr2cuy2gx/video/upload/v1758859300/comv3_d94umu.mp4" },
  { id: 5, type: "image", src: "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758860428/comi6_fekmwd.webp" },
  { id: 6, type: "video", src: "https://res.cloudinary.com/dr2cuy2gx/video/upload/v1758859303/comv1_dsydlx.mp4" },
  { id: 7, type: "image", src: "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758860421/comi3_rqntj4.webp" },
  { id: 8, type: "video", src: "https://res.cloudinary.com/dr2cuy2gx/video/upload/v1758860077/comv5_btxasf.mp4" },
  { id: 9, type: "image", src: "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758860426/comi5_n9csty.webp" },
  { id: 10, type: "video", src: "https://res.cloudinary.com/dr2cuy2gx/video/upload/v1758859303/comv4_ywbavt.mp4" },
  { id: 11, type: "image", src: "https://res.cloudinary.com/dr2cuy2gx/image/upload/v1758860420/comi1_lr3d8z.webp" },
  { id: 12, type: "video", src: "https://res.cloudinary.com/dr2cuy2gx/video/upload/v1758860074/comv6_ykoaom.mp4" },
];

export default function CommunityGallery() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Community Gallery</h2>
      <div className="grid grid-cols-3 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="relative w-full aspect-[4/5] overflow-hidden shadow-sm">
            {item.type === "image" ? <img src={item.src} alt={`Gallery ${item.id}`} className="w-full h-full object-cover" /> : <video src={item.src} autoPlay muted loop className="w-full h-full object-cover" />}
          </div>
        ))}
      </div>
    </div>
  );
}
