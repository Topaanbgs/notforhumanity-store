import BannerCarousel from "../../components/shop/BannerCarousel";
import CommunityGallery from "../../components/shop/CommunityGallery";
import Collections from "../../components/shop/Collections";
import ProductSection from "../../components/shop/ProductSection";

export default function Dashboard() {
  return (
    <div className="bg-white">
      <BannerCarousel />
      <CommunityGallery />
      <Collections />
      <ProductSection />
    </div>
  );
}
