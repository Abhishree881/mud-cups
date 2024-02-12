import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { connect } from "react-redux";
import { setFavourite, setItem } from "../Actions/MenuActions";

function ItemCardSmall(props) {
  let categoryIndex = -1,
    itemIndex = -1;
  props.menu.forEach((category, cindex) => {
    category.items.forEach((item, iindex) => {
      if (item.name === props.data.name) {
        categoryIndex = cindex;
        itemIndex = iindex;
      }
    });
  });
  return (
    <div className="min-w-[130px] h-full flex flex-col gap-[6px] relative">
      <div className="absolute w-fit top-[6px] left-[-5px] text-white bg-[#a2630b] text-[12px] leading-[14px] rounded-[6px] font-[400] px-[6px] py-[3px]">
        {props.data.itemName.length > 18
          ? props.data.itemName.substring(0, 14) + "..."
          : props.data.itemName}
      </div>
      <div
        className="absolute top-[9px] right-[5px]"
        onClick={() => {
          const newItem = {
            ...props.menu[categoryIndex].items[itemIndex],
            isFavourite:
              !props.menu[categoryIndex].items[itemIndex].isFavourite,
          };
          props.setItem(newItem, categoryIndex, itemIndex);
          props.setFavourite(categoryIndex, itemIndex);
        }}
      >
        {props.menu[categoryIndex].items[itemIndex].isFavourite ? (
          <FaHeart color="#eb1727" fontSize={"14px"} />
        ) : (
          <FaRegHeart color="white" fontSize={"14px"} />
        )}
      </div>
      <div
        className="flex-[80] rounded-[8px]"
        style={{
          backgroundImage: `url(${props.data.imageUrl})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="flex-[20] flex flex-col gap-[6px]">
        <div className="text-[15px] leading-[14px] font-[600] text-wrap max-w-[130px]">
          {props.data.itemName}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  menu: state.menuReducer.menu,
  favourites: state.menuReducer.favourites,
});

const mapDispatchToProps = {
  setFavourite,
  setItem,
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemCardSmall);
