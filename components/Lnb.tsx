'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';


const Lnb = (props: any) => {

    let [isFold, setIsFold] = useState(false);

    return (
        <div className={`w-full ${isFold ? 'md:w-1/4' : ''}`}>
            <button onClick={() => {
                setIsFold(!isFold)
            }}>Button</button>
        </div>
    )
}

export default Lnb;