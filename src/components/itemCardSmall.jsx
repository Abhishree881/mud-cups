import React from 'react'

function ItemCardSmall(props) {
    return (
        <div className='min-w-[250px] h-full rounded-[16px] bg-[#fcf0e1] flex overflow-hidden'>
            <div className='flex-[50] w-full h-full' style={{ backgroundImage: `url(${props.data.imgUrl})`, backgroundSize: '100% 100%' }}></div>
            <div className='flex-[50] w-full h-full px-[8px]'>
                <div className='h-full w-full font-[600] text-[18px] flex flex-col justify-between py-[4px]'>
                    <div className='flex flex-col'>
                        <div className='leading-[20px]'>{props.data.name}</div>
                        <div className='font-[400] text-[12px]'>{props.data.category}</div>
                    </div>
                    <div className='w-fit bg-[#463215] text-[14px] text-white py-[2px] mb-[4px] px-[6px] rounded-[10px]'>Rs. {props.data.price.toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
}

export default ItemCardSmall