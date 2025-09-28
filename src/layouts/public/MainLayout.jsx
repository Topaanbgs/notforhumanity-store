import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Cart from "../../components/cart/Cart";
import Footer from "../../components/footer/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col bg-white min-h-screen relative">
      {/* Navbar */}
      <Navbar />

      {/* Dynamic Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      <Cart />
    </div>
  );
}
