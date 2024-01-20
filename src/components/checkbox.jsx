import React, { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { connect } from 'react-redux';
import { updateCart, setActiveItem } from '../Actions/CartActions';

function CheckBox(props) {

    const checked = props.activeItem.added.find(obj => obj === props.index)
    const HandleClick = () => {
        if (checked === undefined) {
            const newPrice = props.activeItem.price + props.activeItem.addOn[props.index - 1].cost
            const newItem = { ...props.activeItem, added: [...props.activeItem.added, props.index], price: newPrice }
            props.setActiveItem(newItem)
        }
        else {
            const updatedAdded = props.activeItem.added.filter(idx => idx != props.index);
            const newPrice = props.activeItem.price - props.activeItem.addOn[props.index - 1].cost
            const newItem = { ...props.activeItem, added: updatedAdded, price: newPrice };
            props.setActiveItem(newItem)
        }
    }
    return (
        <div className={`w-[14px] h-[14px] border border-[#6d4d23] rounded-[3px] flex items-center justify-center ${checked ? 'bg-[#a2630e]' : ''}`} onClick={() => HandleClick()}>
            {checked && <FaCheck color='white' fontSize={'10px'} />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentCart: state.cartReducer.currentCart,
    activeItem: state.cartReducer.activeItem
});

const mapDispatchToProps = {
    updateCart,
    setActiveItem
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckBox)