import React from "react";
import CategoryCard from "../components/categoryCard";
import { FaPlus } from "react-icons/fa6";
import "../assets/styles/category.css";

function Category() {
  const data = [
    {
      index: 1,
      name: "North Indian",
      len: 12,
    },
    {
      index: 2,
      name: "Punjabi",
      len: 1,
    },
    {
      index: 3,
      name: "Russian",
      len: 69,
    },
    {
      index: 4,
      name: "South Indian",
      len: 30,
    },
  ];
  return (
    <div className="category relative w-[100vw] min-h-[100vh] py-4 px-2">
      <div className="category-header">Create Category</div>
      <div className="category-sub-header px-[16px]">All Categories</div>
      <div className="flex flex-col gap-[10px] px-4 py-2 h-auto mb-6">
        {data.map((index) => {
          return <CategoryCard data={index} key={index.index} />;
        })}
      </div>
      {/* <div className='fixed z-[100] bottom-[20px] right-[20px]'>
        <div className='w-[48px] h-[48px] bg-blue-500 rounded-[50%] flex items-center justify-center'>
          <FaPlus fontSize={"25px"} color='white' />
        </div>
      </div> */}
    </div>
  );
}

export default Category;
