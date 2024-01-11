import React from "react";
import CategoryCard from "../components/categoryCard";
import { FaPlus } from "react-icons/fa6";
import "../assets/styles/category.css";
import logo from "../assets/image/logo.jpeg";

function Category() {
  const data = [
    {
      index: 1,
      name: "North Indian",
      len: 12,
      imgUrl:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png",
    },
    {
      index: 2,
      name: "Punjabi",
      len: 1,
      imgUrl:
        "https://silkroadrecipes.com/wp-content/uploads/2021/12/Paneer-Butter-Masala-square.jpg",
    },
    {
      index: 3,
      name: "American",
      len: 25,
      imgUrl:
        "https://img.freepik.com/premium-photo/hamburger-with-toothpick-it-small-toothpick-top_442337-492.jpg",
    },
    {
      index: 4,
      name: "South Indian",
      len: 30,
      imgUrl:
        "https://img-mm.manoramaonline.com/content/dam/mm/mo/pachakam/readers-recipe/images/2023/10/27/Square--ragi-dosa.jpg",
    },
  ];
  return (
    <div className="category relative w-[100vw] min-h-[100vh] ">
      <div className="watermark"></div>
      <div className="category-header py-4 px-2">Create Category</div>
      <div className="category-sub-header px-[20px]">All Categories</div>
      <div className="flex flex-col gap-[10px] px-5 py-2 h-auto mb-6 z-10">
        {data.map((index) => {
          return <CategoryCard data={index} key={index.index} />;
        })}
      </div>
      <div className="fixed z-[100] bottom-[20px] right-[20px]">
        <div className="add-item-button w-[48px] h-[48px] bg-blue-700 rounded-[15px] flex items-center justify-center">
          <FaPlus fontSize={"25px"} color="white" />
        </div>
      </div>
    </div>
  );
}

export default Category;
