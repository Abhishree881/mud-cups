import React, { useState, useRef, useEffect } from 'react'
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";
import CheckBox from './checkbox';
import { connect } from 'react-redux';
import { removeFromCart, updateCart } from '../Actions/CartActions';


function AddToCart(props) {
    console.log("cart", props.currentCart)
    const top = props.currentCart.length - 1
    const currentPrice = props.currentCart[top]?.price * props.currentCart[top]?.count
    const [startX, setStartX] = useState(null);
    const popupRef = useRef(null);
    const [finalPrice, setFinalPrice] = useState(0)
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
            setOffset(0)
        }
        else {
            setOffset(-distance / 5)
        }
    }
    const handleTouchEnd = () => {
        setStartX(null);
        setOffset(0);
    };
    const HandleClick = (isAdd) => {
        if (isAdd) {
            const newItem = { ...props.currentCart[top], count: props.currentCart[top].count + 1 };
            props.updateCart(newItem, top);
        }
        else {
            if (props.currentCart[top].count == 1) {
                props.removeFromCart(top)
                props.setIsVisible(!props.isVisible);
            }
            const newItem = { ...props.currentCart[top], count: props.currentCart[top].count - 1 };
            props.updateCart(newItem, top);
        }
    }

    return (
        <div className='w-full h-full flex flex-col justify-between border bg-[#fffaf7] pt-[16px] px-[12px] rounded-tl-[16px] rounded-tr-[16px]' ref={popupRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={{ transform: `translateX(${offset}px)` }}>
            <div className='h-[70px] w-full flex'>
                <div className='h-full w-full flex-[21] max-w-[70px] bg-gray-200 rounded-[6px]' style={{
                    backgroundImage: `url(${props.currentCart[top]?.imgUrl})`,
                    backgroundSize: "100% 100%",
                }}></div>
                <div className='h-full w-full flex flex-[79] flex-col pl-[12px] overflow-hidden font-[700]'>
                    <span className='text-[18px]'>{props.currentCart[top]?.name}</span>
                    <span className='text-[15px] text-[#00000050]'>{props.currentCart[top]?.description}</span>
                </div>
            </div>

            {props.currentCart[top]?.addOn?.length > 0 && <div className='w-full h-fit font-[700] pb-[6px] pt-[12px]'>Add-Ons</div>}
            {props.currentCart[top]?.addOn?.length > 0 && <div className="w-full h-[0.25px]" style={{ background: "#ded6cd" }}></div>}
            {!props.currentCart[top]?.addOn?.length > 0 && <div className='w-full h-[10px]'></div>}

            {props.currentCart[top]?.addOn?.map((index) => {
                return <div className='w-full h-fit flex flex-col justify-center'>
                    <div className='w-full h-full flex justify-between items-center py-[6px]'>
                        <div className='text-[16px] flex items-center'>
                            <span className='pr-[6px] font-[700] text-[#00000085]'>{index.name}</span>
                            <div className='bg-[#a2630e] pl-[2px] pr-[4px] py-[1px] rounded-[4px] flex items-center font-[600] text-white text-[12px]'><MdCurrencyRupee fontSize={'12px'} color='white' />{index.cost}</div>
                        </div>
                        <CheckBox index={index.index} name={props.currentCart[top].name} />
                    </div>
                    <div className="w-full h-[1px]" style={{ background: "#ded6cd" }}></div>
                </div>
            })}
            <div className='w-full h-[60px] flex gap-[12px] items-center'>
                <div className='flex-[30] w-full h-[40px] border border-[#a2630e] bg-[#f7e8d1] rounded-[3px] flex'>
                    <span className='w-[30%] h-full flex items-center justify-center' onClick={() => HandleClick(true)}><IoMdAdd /></span>
                    <span className='text-[16px] font-[700] w-[40%] h-full flex items-center justify-center'>{props.currentCart[top]?.count}</span>
                    <span className='w-[30%] h-full flex items-center justify-center' onClick={() => HandleClick(false)}><RiSubtractFill /></span>
                </div>
                <div className='flex-[70] w-full h-[40px] bg-[#a2630e] rounded-[3px] text-white font-[700] flex items-center justify-center'>Add Item{<MdCurrencyRupee />} {currentPrice?.toFixed(2)}</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentCart: state.cartReducer.currentCart
});

const mapDispatchToProps = {
    removeFromCart,
    updateCart
};


export default connect(mapStateToProps, mapDispatchToProps)(AddToCart)