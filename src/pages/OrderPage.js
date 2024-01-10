import React, { useEffect, useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom';
import Logo from '../assets/image/logo.jpeg'
import Hi from '../assets/gifs/hi.gif'
import { TbLogout } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import SampleData from '../components/sampleData';
import ItemCardSmall from '../components/itemCardSmall';

function OrderPage() {
    let { id } = useParams();
    const [isVisible, setIsVisible] = useState(true);
    const [isActive, setIsActive] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    const fData = []
    return (
        <div className='w-[100vw] h-[100vh] flex justify-center'>
            <div className='w-full max-w-[450px] h-full flex flex-col relative'>
                {/* Top navbar starts here */}
                <div className='flex h-[50px] items-center border justify-between px-[12px]'>
                    <div className='flex items-center gap-2'>
                        <div className='w-[40px] h-[40px] rounded-[50%]' style={{ backgroundImage: `url(${Logo})`, backgroundSize: '100% 100%' }}></div>
                        <div className='font-[600] text-[18px]'>Anmol Srivastava</div>
                        {isVisible && <div className='w-[20px] h-[20px] rounded-[50%]' style={{ backgroundImage: `url(${Hi})`, backgroundSize: '100% 100%' }}></div>}
                    </div>
                    <div className='flex gap-1'>
                        <div className='w-[36px] h-[36px] rounded-[50%] bg-[#fcecd5] flex items-center justify-center'>{id}</div>
                        <div className='w-[36px] h-[36px] rounded-[50%] bg-[#fcecd5] flex items-center justify-center pl-1'>
                            <TbLogout fontSize={"20px"} />
                        </div>
                    </div>
                </div>
                {/* Search bar starts here */}
                <div className='flex h-[36px] items-center border border-[#a2630b] mx-[12px] my-[6px] rounded-[10px]'>
                    <div className='px-[6px] search-icon relative h-[80%] flex items-center'><IoSearch fontSize={"18px"} color={"#4b3619"} /></div>
                    <div className='italic text-[14px] pl-[6px]'>Search</div>
                </div>
                {/* for you heading */}
                <div className='h-fit w-full my-[6px] flex items-center justify-center relative'>
                    <div className='h-[1px] w-full absolute top-[50%] horizontal-line'></div>
                    <span className='text-[#a2630b] text-[12px] font-[700] bg-white z-[1] px-2 tracking-wider'>FOR YOU</span>
                </div>
                {/* option to choose recommended or favourites */}
                <div className='flex w-full h-[28px] my-[6px] justify-center'>
                    <div className='border w-full max-w-[224px] h-full rounded-[10px] flex text-[12px] overflow-hidden'>
                        <div className={`w-full h-full flex items-center justify-center border gap-1 ${isActive && 'activeChannelLeft'}`} onClick={() => setIsActive(!isActive)} >Recommended</div>
                        <div className={`w-full h-full flex items-center justify-center border gap-1 ${!isActive && 'activeChannelRight'}`} onClick={() => setIsActive(!isActive)} >
                            <div className='pt-[1px]'>{isActive ? <FaRegHeart fontSize={"12px"} /> : <FaHeart fontSize={"12px"} fill={'#eb1727'} />} </div>
                            Favourites</div>
                    </div>
                </div>
                {/* recommended/favourites section */}
                <div className='overflow-scroll h-[170px] my-[10px] px-[12px] flex gap-[12px]'>
                    {isActive && SampleData[0].items.map((index) => {
                        return <ItemCardSmall data={index} key={index.index} />
                    })}
                    {!isActive && (fData.length > 0 ? fData.map((index) => { }) : <div className='w-full h-full flex items-center justify-center italic'>No favourites added yet</div>)}
                </div>
                {/* Explore heading */}
                <div className='h-fit w-full my-[6px] flex items-center justify-center relative'>
                    <div className='h-[1px] w-full absolute top-[50%] horizontal-line'></div>
                    <span className='text-[#a2630b] text-[12px] font-[700] bg-white z-[1] px-2 tracking-wider'>EXPLORE</span>
                </div>

                {/* bottom navbar */}
                <div className='absolute h-[50px] w-full bottom-0 border'>

                </div>
            </div>
        </div>
    )
}

export default OrderPage