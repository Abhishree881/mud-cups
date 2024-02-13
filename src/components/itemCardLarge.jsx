import React, { useState } from "react";
import NonVegIcon from "../assets/image/nonveg.png";
import VegIcon from "../assets/image/veg.png";
import { FaStar } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { connect } from "react-redux";
import { setActiveItem } from "../Actions/CartActions";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { setItem, setFavourite } from "../Actions/MenuActions";

function ItemCardLarge(props) {
  const HandleClick = () => {
    const i = props.expanded.indexOf(props.data.index);
    if (i === -1) {
      let temp = props.expanded;
      temp.push(props.data.index);
      props.setExpanded(temp);
      setExpand(true);
    } else {
      let temp = props.expanded;
      temp.splice(i, 1);
      props.setExpanded(temp);
      setExpand(false);
    }
  };
  const [expand, setExpand] = useState(false);
  return (
    <div
      className={`w-full ${
        expand ? "h-[200px]" : "h-[160px]"
      } relative transition-all duration-[500ms] flex justify-between pt-[10px]`}
    >
      <div className="w-auto h-full flex flex-col">
        <div className="flex gap-[6px] items-center">
          <div
            className="w-[18px] h-[18px] relative"
            style={{
              backgroundImage: `url(${
                props.data.isVeg ? VegIcon : NonVegIcon
              })`,
              backgroundSize: "100% 100%",
            }}
          ></div>
          {props.data.isRecommended && (
            <div className="text-[10px] font-bold bg-[#a2630e] text-white flex items-center justify-center px-[4px] h-[16px] leading-[12px] rounded-[6px]">
              Must Try
            </div>
          )}
        </div>
        <div className="font-[800] text-[18px] leading-[24px] pt-1">
          {props.data.itemName}
        </div>
        <div className="text-[14px] font-[700] flex items-center py-[6px]">
          {/* <span className="pt-[1px]">
            <MdCurrencyRupee fontSize={"15px"} /> 
          </span> */}
          <span className="leading-[16px]">&#x20B9;{props.data.itemPrice}</span>
        </div>
        <div className="flex items-center justify-center w-fit gap-[4px] bg-[#38751f] px-[6px] py-[4px] rounded-[6px]">
          <FaStar fontSize={"10px"} color="white" />
          <div className="font-[700] text-[12px] text-white leading-[12px] mt-[0.5px] tracking-wider">
            {props.data.rating}
          </div>
        </div>
        <div
          className="w-fit h-[16px] mt-2 py-[12px] pl-[8px] pr-[4px] border rounded-[12px] font-[700] text-[12px] flex items-center justify-center gap-[2px]"
          onClick={HandleClick}
        >
          {expand ? "Less Details" : "More Details"}
          <div
            className={`flex items-center transition-all duration-[500ms] justify-center ${
              expand && "rotate-180"
            }`}
          >
            <MdKeyboardArrowDown fontSize={"14px"} />
          </div>
        </div>
        <div
          className={`max-w-[200px] overflow-hidden text-[12px] font-[700] italic text-gray-400 pt-[6px] ${
            expand ? "h-[60px] delay-500" : "h-[0] delay-0"
          }`}
        >
          {props.data.itemDesc}
        </div>
      </div>
      <div
        className="relative w-[140px] h-[130px] rounded-[12px] flex justify-center"
        style={{
          backgroundImage: `url(${props.data.imageUrl})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        <div
          className="w-[16px] h-[16px] flex items-center justify-center absolute top-[10px] right-[8px]"
          onClick={() => {
            const newMenuItem = {
              ...props.menu[props.categoryIndex - 1].items[
                props.data.itemIndex - 1
              ],
              isFavourite:
                !props.menu[props.categoryIndex - 1].items[
                  props.data.itemIndex - 1
                ].isFavourite,
            };
            props.setItem(
              newMenuItem,
              props.categoryIndex - 1,
              props.data.itemIndex - 1
            );
            props.setFavourite(
              props.categoryIndex - 1,
              props.data.itemIndex - 1
            );
          }}
        >
          {props.menu[props.categoryIndex - 1]?.items[props.data.itemIndex - 1]
            ?.isFavourite ? (
            <FaHeart color="red" />
          ) : (
            <FaRegHeart color="white" />
          )}
        </div>
        <div
          style={{ boxShadow: "-5px -5px 5px rgb(0,0,0,0.3)" }}
          className="absolute bottom-[-12px] cursor-pointer text-[#a2630e] border bg-[#f7e8d1] w-[100px] rounded-[10px] h-[35px] flex items-center justify-center"
        >
          <span
            className="text-[14px] font-[600]"
            onClick={() => {
              if (!props.isVisible) {
                props.setIsVisible(!props.isVisible);
                props.setActiveItem({ ...props.data, count: 1, added: [] });
              } else {
                props.setActiveItem({ ...props.data, count: 1, added: [] });
              }
            }}
          >
            Add Item
          </span>
        </div>
      </div>
      <div
        className="absolute w-full h-[0.25px] bottom-[-8px]"
        style={{ background: "#ded6cd" }}
      ></div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentCart: state.cartReducer.currentCart,
  activeItem: state.cartReducer.activeItem,
  menu: state.menuReducer.menu,
});

const mapDispatchToProps = {
  setActiveItem,
  setItem,
  setFavourite,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCardLarge);
