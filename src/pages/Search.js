import React, { useState, useRef, useEffect } from 'react';
import '../App.css'
import { RxCross2 } from "react-icons/rx";
import SampleData from '../components/sampleData';
import ItemCardLarge from '../components/itemCardLarge';
import { Link, useParams } from "react-router-dom";
import AddToCart from '../components/addToCart';

function Search(props) {
    const inputRef = useRef(null);
    const [isInFrame, setInFrame] = useState(false);
    const [expanded, setExpanded] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const { id } = useParams()
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleInputChange = (e) => {
        e.preventDefault();
        const query = e.target.value.toLowerCase();
        const filtered = SampleData.flatMap(data => data.items).filter(item => {
            return item.name.toLowerCase().includes(query);
        });
        setFilteredItems(filtered);
    };
    const allItems = SampleData.flatMap(data => data.items);
    return (
        <div className='w-[100vw] h-[100vh] flex justify-center'>
            <div className='w-full h-full max-w-[450px] border flex flex-col gap-[8px]'>
                <div className="w-full h-[50px] border flex items-center justify-between pl-[12px]">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search..."
                        className='h-[36px] text-[14px] custom-border w-full pl-[6px] rounded-[6px]'
                        onChange={handleInputChange}
                    />
                    <Link to={`/${id}`}>
                        <div className='w-[30px] h-[50px] flex items-center justify-center' onClick={() => { }}>
                            <RxCross2 fontSize={'24px'} color='#a2630b' />
                        </div>
                    </Link>
                </div>
                <div className='w-full h-fit flex flex-col gap-[16px] px-[12px]'>
                    {filteredItems.map((index) => {
                        return <ItemCardLarge
                            data={index}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            len={allItems.length}
                            isVisible={isInFrame}
                            setIsVisible={setInFrame}
                        />
                    })}
                </div>
                <div
                    className={`absolute bottom-[0px] transition-all duration-500 bg-transparent z-[200] h-fit w-full ${isInFrame ? "right-[0px]" : "right-[100%]"
                        } `}
                >
                    <AddToCart isVisible={isInFrame} setIsVisible={setInFrame} />
                </div>
            </div>

        </div>
    )
}

export default Search