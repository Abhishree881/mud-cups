import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { connect } from "react-redux";

function CategoryCard(props) {
  return (
    <Link
      to={`/admin/${props.franchise}/category/${props.data.categoryName}/items`}
    >
      <div className="category-card w-full h-full rounded-[15px] flex items-center justify-between p-5 cursor-pointer]">
        <div className="flex-[2] category-card-logo w-[20px] max-w-[40px] bg-[#f2f2f2] rounded-[10px]">
          <img
            className="rounded-[10px]"
            src={props.data.imageUrl}
            alt={props.data.categoryName}
          />
        </div>
        <div className="flex-[10] font-semibold flex flex-col pl-[16px]">
          <div className="text-l text-black font-bold">
            {props.data.categoryName}
          </div>
          <div className="text-[#573a21] font-[400] text-sm bg-transparent">
            {props.data.items
              ? `${props.data.items.length} item${
                  props.data.items.length !== 1 ? "s" : ""
                } in this list`
              : `No item added yet`}
          </div>
        </div>
        <div className="flex-[1] flex justify-center">
          <FaChevronRight className="text-[#a2630b] " />
        </div>
      </div>
    </Link>
  );
}
const mapStateToProps = (state) => ({
  menu: state.menuReducer.menu,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
