import React from 'react'
import { useParams } from 'react-router-dom';

export default function Detail() {
    
    const { userid } = useParams();

    return (
        <div>
            <i className="angle left icon important:text-lg"/>
            <p>{userid}</p>
            <img src="" alt="img"/>
            <p>Name</p>
            <p></p>
            <p></p>
            <img src="" alt="img"/>
            <p></p>
            <p></p>
            <img src="" alt="img"/>
            <p></p>
            <p></p>
            <img src="" alt="img"/>
        </div>
    )
}
