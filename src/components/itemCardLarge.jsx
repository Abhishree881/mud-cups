import React, { useState, useEffect } from 'react'
import NonVegIcon from '../assets/image/nonveg.png'
import VegIcon from '../assets/image/veg.png'
import { FaStar } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

function ItemCardLarge(props) {
    const HandleClick = () => {
        const i = props.expanded.indexOf(props.data.index)
        if (i === -1) {
            let temp = props.expanded;
            temp.push(props.data.index);
            props.setExpanded(temp)
            console.log(props.expanded)
            setExpand(true)
        }
        else {
            let temp = props.expanded;
            temp.splice(i, 1)
            props.setExpanded(temp)
            console.log(props.expanded)
            setExpand(false)
        }
    }
    const [expand, setExpand] = useState(false)
    return (
        <div className={`w-full ${expand ? 'h-[200px]' : 'h-[140px]'} relative transition-all duration-[500ms] flex justify-between`} onClick={HandleClick}>
            <div className='w-auto h-full flex flex-col'>
                <div className='w-[18px] h-[18px] relative' style={{ backgroundImage: `url(${props.data.isVeg ? VegIcon : NonVegIcon})`, backgroundSize: '100% 100%' }}>

                </div>
                <div className='font-[800] text-[18px] leading-[24px]'>{props.data.name}</div>
                <div className='flex items-center w-fit gap-[4px] bg-[#38751f] px-[6px] py-[4px] rounded-[6px]'>
                    <div className='font-[700] text-[12px] text-white leading-[12px] mt-[0.5px] tracking-wider'>{props.data.rating}</div>
                    <FaStar fontSize={'12px'} color='white' />
                </div>
                <div className='text-[14px] font-[700] flex items-center py-[12px]'>
                    <FaRupeeSign fontSize={'14px'} />
                    <span className='leading-[16px]'>{props.data.price.toFixed(2)}</span>
                </div>
                <div className='w-fit h-[16px] py-[8px] pl-[8px] pr-[4px] border rounded-[12px] font-[700] text-[12px] flex items-center justify-center gap-[2px]'>
                    {expand ? 'Less Details' : 'More Details'}
                    <div className={`flex items-center transition-all duration-[500ms] justify-center ${expand && 'rotate-180'}`}><MdKeyboardArrowDown fontSize={'14px'} /></div>
                </div>
                <div className={`max-w-[200px] text-[12px] font-[700] italic text-gray-400 pt-[6px]`}>
                    {props.data.description}
                </div>
            </div>
            <div className='relative w-[140px] h-[130px] rounded-[12px] flex justify-center' style={{ backgroundImage: `url(${props.data.imgUrl})`, backgroundSize: '100% 100%', backgroundPosition: 'center' }}>
                <div className='absolute bottom-[-10px] border bg-[#f7e8d1] border-[#a2630e] w-[100px] rounded-[4px] h-[30px] flex items-center justify-center'>
                    <span className='text-[14px] font-[600]'>Add Item</span>
                </div>
            </div>
            <div className='absolute w-full h-[0.25px] bottom-[-8px]' style={{ background: '#ded6cd' }}></div>
        </div>
    )
}

export default ItemCardLarge