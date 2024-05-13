"use client";
import HeroItems from "../../components/hero-items";
import Category from "../../components/category";
import HorizontalList from "../../components/horizontal-list";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ParentContainer from "@/components/parentContainer";
import { addToCart } from "@/lib/slices/cartSlice";
import { BottomSheet } from "react-spring-bottom-sheet";

const path = process.env.NEXT_PUBLIC_API_PATH;
const Home = () => {
  const [products, setProducts] = useState([]);
  const [heroSection, setHeroSections] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  const onPressCart = (item: any) => {
    dispatch(addToCart(item));
    toast.success("Item added to cart");
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${path}/api/all-products`);
      const response = await res.json();
      setProducts(response);
    } catch (error) {
      console.log("eroor", error);
    }
  };
  const fetchHeroSection = async () => {
    try {
      const heroRes = await fetch(`${path}/api/static/heroSection`);
      const heroResponse = await heroRes.json();
      setHeroSections(heroResponse?.data);
    } catch (error) {
      console.log("ERRRROR", error);
    }
  };
  useEffect(() => {
    fetchHeroSection();
    fetchProducts();
  }, []);
  return (
    <ParentContainer cartCount={cart?.cartCount || 0}>
      <HeroItems heroSection={heroSection} />
      <Category />
      <HorizontalList
        title="New Arrival"
        products={products}
        onPressCart={onPressCart}
      />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ParentContainer>
  );
};

export default Home;
