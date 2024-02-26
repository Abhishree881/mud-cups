import React, { useState, useRef, useEffect, useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";
import CheckBox from "./checkbox";
import { connect } from "react-redux";
import { addToCart, setActiveItem } from "../Actions/CartActions";
import { AuthContext } from "../AuthContext";

function AddToCart(props) {
  const { currentUser } = useContext(AuthContext);
  const currentPrice = parseFloat(props.activeItem?.itemPrice) * props.activeItem?.count;
  const [startX, setStartX] = useState(null);
  const popupRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX === null) {
      return;
    }

    const currentX = e.touches[0].clientX;
    const distance = startX - currentX;

    if (Math.abs(distance) > 100) {
      props.setIsVisible(!props.isVisible);
      setStartX(null);
      setOffset(0);
    } else {
      setOffset(-distance / 5);
    }
  };
  const handleTouchEnd = () => {
    setStartX(null);
    setOffset(0);
  };
  const HandleClick = (isAdd) => {
    if (isAdd) {
      const newActiveItem = {
        ...props.activeItem,
        count: props.activeItem.count + 1,
      };
      props.setActiveItem(newActiveItem);
    } else {
      if (props.activeItem.count === 1) {
        props.setActiveItem({});
        props.setIsVisible(false);
      } else {
        const newActiveItem = {
          ...props.activeItem,
          count: props.activeItem.count - 1,
        };
        props.setActiveItem(newActiveItem);
      }
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-between border bg-[#fffaf7] pt-[16px] px-[12px] rounded-tl-[16px] rounded-tr-[16px]"
      ref={popupRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ transform: `translateX(${offset}px)` }}
    >
      <div className="h-[70px] w-full flex">
        <div
          className="h-full w-full flex-[21] max-w-[70px] bg-gray-200 rounded-[6px]"
          style={{
            backgroundImage: `url(${props.activeItem?.imageUrl})`,
            backgroundSize: "100% 100%",
          }}
        ></div>
        <div className="h-full w-full flex flex-[79] flex-col pl-[12px] overflow-hidden font-[700]">
          <span className="text-[18px]">{props.activeItem?.itemName}</span>
          <span className="text-[15px] text-[#00000050]">
            {props.activeItem?.itemDesc}
          </span>
        </div>
      </div>

      {props.activeItem?.addOn?.length > 0 && (
        <div className="w-full h-fit font-[700] pb-[6px] pt-[12px]">
          Add-Ons
        </div>
      )}
      {props.activeItem?.addOn?.length > 0 && (
        <div
          className="w-full h-[0.25px]"
          style={{ background: "#ded6cd" }}
        ></div>
      )}
      {!props.activeItem?.addOn?.length > 0 && (
        <div className="w-full h-[10px]"></div>
      )}

      {props.activeItem?.addOn?.map((index) => {
        return (
          <div className="w-full h-fit flex flex-col justify-center">
            <div className="w-full h-full flex justify-between items-center py-[6px]">
              <div className="text-[16px] flex items-center">
                <span className="pr-[6px] font-[700] text-[#00000085]">
                  {index.name}
                </span>
                <div className="bg-[#a2630e] pl-[2px] pr-[4px] py-[1px] rounded-[4px] flex items-center font-[600] text-white text-[12px]">
                  <MdCurrencyRupee fontSize={"12px"} color="white" />
                  {index.cost}
                </div>
              </div>
              <CheckBox index={index.index} name={props.activeItem.name} />
            </div>
            <div
              className="w-full h-[1px]"
              style={{ background: "#ded6cd" }}
            ></div>
          </div>
        );
      })}
      <div className="w-full h-[60px] flex gap-[12px] items-center">
        <div className="flex-[30] w-full h-[40px] border border-[#a2630e] bg-[#f7e8d1] rounded-[3px] flex">
          <span
            className="w-[30%] h-full flex items-center justify-center"
            onClick={() => HandleClick(true)}
          >
            <IoMdAdd />
          </span>
          <span className="text-[16px] font-[700] w-[40%] h-full flex items-center justify-center">
            {props.activeItem?.count}
          </span>
          <span
            className="w-[30%] h-full flex items-center justify-center"
            onClick={() => HandleClick(false)}
          >
            <RiSubtractFill />
          </span>
        </div>
        <div
          className="flex-[70] w-full h-[40px] bg-[#a2630e] rounded-[3px] text-white font-[700] flex items-center justify-center"
          onClick={() => {
            props.addToCart({ currentUser, activeItem: props.activeItem });
            props.setIsVisible(false);
          }}
        >
          Add Item{<MdCurrencyRupee />} {currentPrice?.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentCart: state.cartReducer.currentCart,
  activeItem: state.cartReducer.activeItem,
});

const mapDispatchToProps = {
  setActiveItem,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
