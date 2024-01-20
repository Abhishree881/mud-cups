import React from 'react'
import Logo from '../assets/image/logo.jpeg'
import { FaShoppingCart } from "react-icons/fa";
import { connect } from 'react-redux';

function Cart(props) {
    return (
        <div className="w-[100vw] h-fit overflow-y-scroll flex justify-center relative">
            <div className="w-full max-w-[450px] h-full flex flex-col relative">
                <div className="flex h-[50px] items-center border justify-between px-[12px]">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-[40px] h-[40px] rounded-[50%]"
                            style={{
                                backgroundImage: `url(${Logo})`,
                                backgroundSize: "100% 100%",
                            }}
                        ></div>
                        <div className="font-[600] text-[18px]">Anmol Srivastava</div>
                    </div>
                    <div className="w-fit h-[30px] rounded-[6px] bg-[#fcecd5] px-[8px] flex items-center justify-center text-[14px] font-[700] gap-[4px]">
                        <FaShoppingCart /> {`(5)`}
                    </div>
                </div>
                <p className='pl-2'>
                    Items in cart : {props.currentCart?.length}
                </p>
                <div className='w-full h-[50px] fixed border bottom-0 flex items-center justify-center'>
                    <div className='flex-[70] max-w-[120px] h-[40px] bg-[#a2630e] rounded-[3px] text-white font-[700] flex items-center justify-center'>Pay & Order</div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    currentCart: state.cartReducer.currentCart,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)