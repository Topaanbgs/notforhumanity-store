import React from "react";
import { Routes, Route } from "react-router-dom";

// Context Providers
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { OrderProvider } from "./context/OrderContext";
import { WishlistProvider } from "./context/WishlistContext";

// Komponen Sidebar
import Wishlist from "./components/cart/Wishlist";
import Cart from "./components/cart/Cart";

// Frontpages
import MainLayout from "./layouts/public/MainLayout";
import Dashboard from "./pages/shop/Home";
import ProductDetail from "./pages/shop/ProductDetail";
import Checkout from "./pages/shop/Checkout";
import PaymentPage from "./pages/shop/PaymentPage";
import Categories from "./pages/shop/Categories";
import Search from "./pages/shop/Search";

// Admin pages
import AdminLayout from "./layouts/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminProfile from "./pages/admin/Profile";
import OrderDetail from "./pages/admin/OrderDetail";

export default function App() {
  return (
    <ProductProvider>
      <WishlistProvider>
        <OrderProvider>
          <CartProvider>
            <SearchProvider>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products/:slug" element={<ProductDetail />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="payment" element={<PaymentPage />} />
                  <Route path="category/:slug" element={<Categories />} />
                  <Route path="search" element={<Search />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route path="order/:orderId" element={<OrderDetail />} />
                </Route>
              </Routes>

              <Cart />
              <Wishlist />
            </SearchProvider>
          </CartProvider>
        </OrderProvider>
      </WishlistProvider>
    </ProductProvider>
  );
}
