import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";

function AddToCart(props) {
    const [price, setPrice] = useState(props.data.price)
    return (
        <div className='w-full h-full flex flex-col justify-between border bg-[#fffaf7] pt-[16px] px-[12px] rounded-tl-[16px] rounded-tr-[16px]'>
            <div className='h-[70px] w-full flex'>
                <div className='h-full w-full flex-[21] max-w-[70px] bg-gray-200 rounded-[6px]' style={{
                    backgroundImage: `url(${props.data.imgUrl})`,
                    backgroundSize: "100% 100%",
                }}></div>
                <div className='h-full w-full flex flex-[79] flex-col pl-[12px] overflow-hidden'>
                    <span className='text-[18px] font-[700]'>{props.data.name}</span>
                    <span className='text-[15px] italic text-gray-700'>{props.data.description}</span>
                </div>
            </div>

            <div className='w-full h-fit font-[700] pb-[6px] pt-[12px]'>Add-Ons</div>
            <div className="w-full h-[0.25px]" style={{ background: "#ded6cd" }}></div>

            {props.data.addOn?.map((index) => {
                return <div className='w-full h-fit flex flex-col justify-center'>
                    <div className='w-full h-full flex items-center py-[6px]'>{index.name}</div>
                    <div className="w-full h-[1px]" style={{ background: "#ded6cd" }}></div>
                </div>
            })}
            <div className='w-full h-[60px] flex gap-[12px] items-center'>
                <div className='flex-[30] w-full h-[40px] border border-[#a2630e] bg-[#f7e8d1] rounded-[3px] flex'>
                    <span className='w-[30%] h-full flex items-center justify-center'><IoMdAdd /></span>
                    <span className='text-[16px] font-[700] w-[40%] h-full flex items-center justify-center'>1</span>
                    <span className='w-[30%] h-full flex items-center justify-center'><RiSubtractFill /></span>
                </div>
                <div className='flex-[70] w-full h-[40px] bg-[#a2630e] rounded-[3px] text-white font-[700] flex items-center justify-center'>Add Item {<MdCurrencyRupee />} {price}</div>
            </div>
        </div>
    )
}

export default AddToCart