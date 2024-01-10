import React, { useEffect, useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom';
import Logo from '../assets/image/logo.jpeg'
import Hi from '../assets/gifs/hi.gif'
import { TbLogout } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
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
    const rData = [
        {
            index: 1,
            name: 'Ragi Dosa',
            price: 220.00,
            imgUrl: 'https://img-mm.manoramaonline.com/content/dam/mm/mo/pachakam/readers-recipe/images/2023/10/27/Square--ragi-dosa.jpg',
            category: 'South Indian',
        },
        {
            index: 2,
            name: 'Veg Biryani',
            price: 150.75,
            imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
            category: 'Rice',
        },
        {
            index: 3,
            name: 'Paneer Tikka Masala',
            price: 180.00,
            imgUrl: 'https://silkroadrecipes.com/wp-content/uploads/2021/12/Paneer-Butter-Masala-square.jpg',
            category: 'North Indian',
        },
        {
            index: 4,
            name: 'Burger',
            price: 190.00,
            imgUrl: 'https://img.freepik.com/premium-photo/hamburger-with-toothpick-it-small-toothpick-top_442337-492.jpg',
            category: 'Chinese',
        },

        {
            index: 5,
            name: 'Veg Momos',
            price: 250.50,
            imgUrl: 'https://media.istockphoto.com/id/1292635321/photo/veg-steam-momo-nepalese-traditional-dish-momo-stuffed-with-vegetables-and-then-cooked-and.jpg?s=612x612&w=0&k=20&c=NyxQvDnBq7Ki09Zi21JEMxpuZ_uVr45ZBSavqXJ2T1s=',
            category: 'Chinese',
        },
    ]
    const fData = []
    return (
        <div className='w-[100vw] h-[100vh] flex justify-center'>
            <div className='w-full max-w-[450px] h-full flex flex-col'>
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
                {/* option to choose recommended or favourites */}
                <div className='flex w-full h-[28px] my-[12px] justify-center'>
                    <div className='border w-full max-w-[224px] h-full rounded-[10px] flex text-[12px] overflow-hidden'>
                        <div className={`w-full h-full flex items-center justify-center border gap-1 ${isActive && 'activeChannelLeft'}`} onClick={() => setIsActive(!isActive)} >Recommended</div>
                        <div className={`w-full h-full flex items-center justify-center border gap-1 ${!isActive && 'activeChannelRight'}`} onClick={() => setIsActive(!isActive)} >
                            <div className='pt-[1px]'>{isActive ? <FaRegHeart fontSize={"12px"} /> : <FaHeart fontSize={"12px"} fill={'#eb1727'} />} </div>
                            Favourites</div>
                    </div>
                </div>
                {/* recommended/favourites section */}
                <div className='overflow-scroll h-[188px] my-[10px] px-[12px] flex gap-[12px]'>
                    {isActive && rData.map((index) => {
                        return <ItemCardSmall data={index} key={index.index} />
                    })}
                    {!isActive && (fData.length > 0 ? fData.map((index) => { }) : <div className='w-full h-full flex items-center justify-center italic'>No favourites added yet</div>)}
                </div>
            </div>
        </div>
    )
}

export default OrderPage