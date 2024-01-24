import React, { useState } from 'react'
import Logo from '../assets/image/logo.jpeg'
import SampleData from '../components/sampleData'
import '../App.css'
import ItemCardLarge from '../components/itemCardLarge'
import AddToCart from '../components/addToCart'

function AllCategories() {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(null)
    const [isInFrame, setInFrame] = useState(false);
    const [expanded, setExpanded] = useState([]);
    return (
        <div className='w-[100vw] h-[100vh]  relative flex justify-center'>
            <div className='w-full h-full max-w-[450px]'>
                <div className="flex h-[50px] items-center border justify-between px-[12px]">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-[40px] h-[40px] rounded-[50%]"
                            style={{ backgroundImage: `url(${Logo})`, backgroundSize: "100% 100%" }}
                        ></div>
                        <div className="font-[600] text-[18px]">All Categories</div>
                    </div>

                </div>
                <div className='w-full h-fit flex flex-wrap px-[12px] py-[12px] justify-start'>
                    {SampleData.map((index) => {
                        return <div className='w-adj aspect-square basis border mr-[12px] mb-[12px] rounded-[6px] flex items-end justify-center pb-[6px]' style={{ backgroundImage: `url(${index.imgUrl || Logo})`, backgroundSize: '100% 100%', filter: 'grayscale(25%)' }} onClick={() => setActiveCategoryIndex(index.index - 1)}>
                            <div className='font-bold text-white'>{index.name}</div>
                        </div>
                    })}
                </div>
                <div className="h-fit w-full mb-[24px] flex items-center justify-center relative">
                    <div className="h-[1px] w-full absolute top-[50%] horizontal-line"></div>
                    <span className="text-[#a2630b] text-[12px] font-[700] bg-white z-[1] px-2 tracking-wider">
                        {SampleData[activeCategoryIndex]?.name.toUpperCase()}
                    </span>
                </div>
                <div className='w-full h-full px-[12px]'>
                    <div className='w-full h-fit flex flex-col gap-[16px] pb-[36px] rounded-tl-[18px] rounded-tr-[18px] overflow-hidden'>
                        <div className='w-full h-[180px] ' style={{ backgroundImage: `url(${SampleData[activeCategoryIndex]?.imgUrl})`, backgroundSize: "100% auto", backgroundPosition: 'center' }}>
                        </div>
                        <div className='w-full h-fit px-[0px] flex flex-col gap-[16px]'>
                            {SampleData[activeCategoryIndex]?.items.map((index) => {
                                return <ItemCardLarge
                                    data={index}
                                    expanded={expanded}
                                    setExpanded={setExpanded}
                                    len={SampleData[activeCategoryIndex]?.items.length}
                                    isVisible={isInFrame}
                                    setIsVisible={setInFrame} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`fixed bottom-[0px] transition-all duration-500 bg-transparent z-[200] h-fit w-full ${isInFrame ? "right-[0px]" : "right-[100%]"
                    } `}
            >
                <AddToCart isVisible={isInFrame} setIsVisible={setInFrame} />
            </div>
        </div>
    )
}

export default AllCategories