import React, { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { connect } from 'react-redux';
import { updateCart } from '../Actions/CartActions';

function CheckBox(props) {
    const top = props.currentCart.length - 1
    const checked = props.currentCart[top].added.find(obj => obj === props.index)
    const HandleClick = () => {
        if (checked === undefined) {
            const newPrice = props.currentCart[top].price + props.currentCart[top].addOn[props.index - 1].cost
            const newItem = { ...props.currentCart[top], added: [...props.currentCart[top].added, props.index], price: newPrice }
            props.updateCart(newItem, top)
        }
        else {
            const updatedAdded = props.currentCart[top].added.filter(idx => idx != props.index);
            const newItem = { ...props.currentCart[top], added: updatedAdded, };
            props.updateCart(newItem, top);
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
    updateCart
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckBox)