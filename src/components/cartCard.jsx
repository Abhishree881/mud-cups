import React, { useState } from 'react'
import NonVegIcon from "../assets/image/nonveg.png";
import VegIcon from "../assets/image/veg.png";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";
import { connect } from 'react-redux';
import { updateCart, removeFromCart } from '../Actions/CartActions';

function CartCard(props) {
    const [isVisible, setIsVisible] = useState(false)
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
        <div className={`w-full ${isVisible ? 'h-[160px]' : 'h-[110px]'} rounded-[6px] transition-all duration-500 flex justify-between`}>
            <div className='w-auto h-full flex flex-col justify-between'>
                <div className='flex flex-col'>
                    <div className='flex h-fit w-fit gap-[6px] items-center'>
                        <div
                            className="w-[20px] h-[20px] relative"
                            style={{
                                backgroundImage: `url(${props.currentCart[props.i].isVeg ? VegIcon : NonVegIcon})`,
                                backgroundSize: "100% 100%",
                            }}
                        ></div>
                        {arr.length > 0 && <div className='text-[10px] h-[20px] rounded-[4px] leading-[0] font-[800] bg-[#a2630e] px-[6px] flex items-center justify-center text-white relative'>
                            <span onClick={() => { setIsVisible(!isVisible) }}>{isVisible ? 'Hide' : 'View'} AddOns</span>
                        </div>}
                    </div>
                    <div className='font-[800] text-[18px] leading-[24px]'>{props.currentCart[props.i].name}</div>
                    <div className='font-[800] text-[14px] leading-[20px] flex items-center'><MdCurrencyRupee fontSize={'14px'} />{props.currentCart[props.i].price * props.currentCart[props.i].count}</div>
                    <div className={`flex flex-col overflow-scroll transition-all ${isVisible ? 'h-[50px] delay-100' : 'h-[0px] delay-0'}`}>
                        {arr.map((index) => {
                            return <div className='text-[14px] font-[600] leading-[22px] flex items-center'>
                                <div className='pr-[6px]'>{index.name}</div>
                                <>{`(`}<MdCurrencyRupee fontSize={'15px'} /></>
                                {`${index.cost})`}
                            </div>
                        })}
                    </div>
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