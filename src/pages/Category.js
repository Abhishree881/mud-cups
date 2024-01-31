import React from "react";
import CategoryCard from "../components/categoryCard";
import { FaPlus } from "react-icons/fa6";
import "../assets/styles/category.css";
import logo from "../assets/image/logo.jpeg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Category(props) {
  return (
    <div className="category relative w-[100vw] min-h-[100vh] ">
      <Link to="/admin">
        <div className="category-header py-1 px-2">
          <img src={logo} alt="logo" />
          <span>Mud Cups</span>
        </div>
      </Link>
      <div className="h-fit w-full my-[10px] flex items-center justify-center relative">
        <div className="h-[1px] w-full absolute top-[50%] horizontal-line"></div>
        <span className="text-[#a2630b] text-[12px] font-[700] bg-[#f3eee6] z-[1] px-2 tracking-wider">
          All Categories
        </span>
      </div>
      <div className="flex flex-col gap-[10px] px-5 py-2 h-auto mb-6 z-10">
        {props.menu?.map((index) => {
          return <CategoryCard data={index} key={index.index} />;
        })}
      </div>
      <div className="fixed z-[100] bottom-[20px] right-[20px]">
        <div className="add-category-button w-[48px] h-[48px] bg-blue-700 rounded-[15px] flex items-center justify-center">
          <Link to="/admin/edit">
            <FaPlus fontSize={"25px"} color="white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  menu: state.menuReducer.menu
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
