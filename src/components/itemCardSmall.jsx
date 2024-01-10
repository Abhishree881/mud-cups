import React from 'react'
import { FaRegHeart } from "react-icons/fa";

function ItemCardSmall(props) {
    return (
        <div className='min-w-[130px] h-full flex flex-col gap-[6px] relative'>
            <div className='absolute w-fit top-[6px] left-[-5px] text-white bg-[#a2630b] text-[12px] leading-[14px] rounded-[6px] font-[400] px-[6px] py-[3px]'>{props.data.category}</div>
            <div className='flex-[75] rounded-[8px]' style={{ backgroundImage: `url(${props.data.imgUrl})`, backgroundSize: '100% 100%', backgroundPosition: 'center' }}></div>
            <div className='flex-[25] flex flex-col gap-[6px]'>
                <div className='text-[15px] leading-[14px] font-[600]'>{props.data.name}</div>
            </div>
        </div>
    )
}

export default ItemCardSmall