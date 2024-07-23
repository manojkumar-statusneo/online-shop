"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ParentContainer from "@/components/parentContainer";
import { addToCart } from "@/lib/slices/cartSlice";
import "../../components/style.css";
import Link from "next/link";

const path = process.env.NEXT_PUBLIC_API_PATH;
const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  const onPressCart = (e: any, item: any) => {
    e.currentTarget.classList.add("animate-shake");
    setTimeout(() => {
      e.currentTarget.classList.remove("animate-shake");
    }, 1000);
    dispatch(addToCart(item));
    toast.success("Item added to cart");
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${path}/api/all-products`);
      const response = await res.json();
      setProducts(response?.data);
    } catch (error) {
      console.log("eroor", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <ParentContainer cartCount={cart?.cartCount || 0} activeTab={"Shop"}>
      <div className="mx-2 my-2 no-scrollbar">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 no-scrollbar">
          {products?.length &&
            products?.map((callout: any, index: number) => (
              <div
                key={index}
                className="max-w-xs rounded overflow-hidden shadow-lg no-scrollbar"
              >
                <Link href={`/product-detail/${callout._id}`}>
                  <img
                    className="w-full h-48"
                    src={callout?.images && callout?.images[0]}
                    alt={callout?.images && callout?.images[0]}
                  />
                </Link>
                <div className="pb-1 flex flex-col text-center items-center overflow-hidden px-1">
                  <h2 className="mt-2 text-sm truncate overflow-hidden mx-2 w-full font-medium">
                    {callout.title}
                  </h2>
                  <div className="flex flex-row items-center">
                    <h3 className="text-sm font-medium">{`₹${callout.price}`}</h3>
                    <h3 className=" text-xs line-through pl-1 text-gray italic">{`₹${Number(
                      Number(callout.price) + 100
                    )}`}</h3>
                    <h3 className=" text-xs pl-1  text-green-800">
                      {"(33% off)"}
                    </h3>
                  </div>

                  <button
                    className="text-xs justify-center items-center py-2 flex self-center my-1 w-full border rounded-md border-slate-900 bg-white"
                    onClick={(e) => {
                      onPressCart(e, callout);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
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
