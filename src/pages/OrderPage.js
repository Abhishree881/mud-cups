import React from 'react'
import { useParams } from 'react-router-dom';

function OrderPage() {
    let { id } = useParams();
    return (
        <div>OrderPage with customer id : {id}</div>
    )
}

export default OrderPage