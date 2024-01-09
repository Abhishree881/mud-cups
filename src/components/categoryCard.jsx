import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";

function CategoryCard(props) {
    return (
        <Link to={`/admin/items/${props.data.name}`}>
            <div className='w-full h-full min-h-[100px] rounded-[10px] flex items-center justify-between px-[16px] cursor-pointer bg-[#d8a978]'>
                <div className='flex-[2] h-[50px] w-[20px] max-w-[50px] bg-[rgb(238,218,201)] rounded-[10px]'></div>
                <div className='flex-[10] font-semibold flex flex-col pl-[16px]'>
                    <div className='text-xl text-black font-bold'>{props.data.name}</div>
                    <div className='text-[#573a21] font-[400]'>{props.data.len} item{props.data.len !== 1 && "s"} in this list</div>
                </div>
                <div className='flex-[1] flex justify-center'><FaChevronRight /></div>
            </div>
        </Link>
    )
}

export default CategoryCard 