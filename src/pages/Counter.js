import React from 'react'
import { useParams } from 'react-router-dom'

function Counter() {
    let { id } = useParams();
    return (
        <div className='font-bold text-2xl'>Counter : {id}</div>
    )
}

export default Counter