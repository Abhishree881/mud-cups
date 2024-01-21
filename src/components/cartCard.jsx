import React from 'react'
import NonVegIcon from "../assets/image/nonveg.png";
import VegIcon from "../assets/image/veg.png";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";
import { connect } from 'react-redux';
import { updateCart, removeFromCart } from '../Actions/CartActions';

function CartCard(props) {
    const arr = props.currentCart[props.i].addOn.filter(item => props.currentCart[props.i].added.includes(item.index))
    const HandleClick = (isAdd) => {
        if (isAdd) {
            const newItem = { ...props.currentCart[props.i], count: props.currentCart[props.i].count + 1 }
            props.updateCart(newItem, props.i)
        }
        else {
            if (props.currentCart[props.i].count === 1) {
                props.removeFromCart(props.i)
            }
            else {
                const newItem = { ...props.currentCart[props.i], count: props.currentCart[props.i].count - 1 }
                props.updateCart(newItem, props.i)
            }

        }
    }
    return (
        <div className='w-full h-[110px] rounded-[6px] flex justify-between'>
            <div className='w-auto h-full flex flex-col justify-between'>
                <div className='flex flex-col'>
                    <div
                        className="w-[18px] h-[18px] relative"
                        style={{
                            backgroundImage: `url(${props.currentCart[props.i].isVeg ? VegIcon : NonVegIcon})`,
                            backgroundSize: "100% 100%",
                        }}
                    ></div>
                    <div className='font-[800] text-[18px] leading-[24px]'>{props.currentCart[props.i].name}</div>
                    <div className='font-[800] text-[14px] leading-[20px] flex items-center'><MdCurrencyRupee fontSize={'14px'} />{props.currentCart[props.i].price * props.currentCart[props.i].count}</div>
                </div>

                <div className='w-[80px] h-[32px] border border-[#a2630e] bg-[#f7e8d1] rounded-[3px] flex'>
                    <span className='w-[30%] h-full flex items-center justify-center' onClick={() => HandleClick(true)}><IoMdAdd /></span>
                    <span className='text-[16px] font-[700] w-[40%] h-full flex items-center justify-center'>{props.currentCart[props.i].count}</span>
                    <span className='w-[30%] h-full flex items-center justify-center' onClick={() => HandleClick(false)}><RiSubtractFill /></span>
                </div>
            </div>
            <div className='w-[115px] h-[110px] flex relative rounded-[6px]' style={{ backgroundImage: `url(${props.currentCart[props.i].imgUrl})`, backgroundSize: '100% 100%' }}></div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentCart: state.cartReducer.currentCart,
});

const mapDispatchToProps = {
    updateCart,
    removeFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCard)