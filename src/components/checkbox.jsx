import React, { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { connect } from 'react-redux';

function CheckBox(props) {

    const [checked, setIsChecked] = useState(false)
    useEffect(() => {
        setIsChecked(false)
    }, [props.isVisible])
    const HandleClick = () => {
        if (!checked) {
            props.setPrice(props.price + props.addPrice)
            setIsChecked(!checked)
        }
        else {
            props.setPrice(props.price - props.addPrice)
            setIsChecked(!checked)
        }
    }
    return (
        <div className={`w-[14px] h-[14px] border border-[#6d4d23] rounded-[3px] flex items-center justify-center ${checked ? 'bg-[#a2630e]' : ''}`} onClick={() => HandleClick()}>
            {checked && <FaCheck color='white' fontSize={'10px'} />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentCart: state.cartReducer.currentCart
});

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckBox)