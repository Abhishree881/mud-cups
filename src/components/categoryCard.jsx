import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

function CategoryCard(props) {
  return (
    <Link to={`/admin/items/${props.data.name}`}>
      <div className="category-card w-full h-full rounded-[15px] flex items-center justify-between p-5 cursor-pointer bg-[#e3e4ed]">
        <div className="flex-[2] category-card-logo w-[20px] max-w-[40px] bg-[#f2f2f2] rounded-[10px]"></div>
        <div className="flex-[10] font-semibold flex flex-col pl-[16px]">
          <div className="text-l text-black font-bold">{props.data.name}</div>
          <div className="text-[#573a21] font-[400] text-sm">
            {props.data.len} item{props.data.len !== 1 && "s"} in this list
          </div>
        </div>
        <div className="flex-[1] flex justify-center">
          <FaChevronRight className="text-[#8283ad] " />
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
