import React from 'react';
import Card from '../elements/Card';

export default function Dashboard({approved, data}) {
    return (
        <div>
            <h1 className="text-gray-800 text-center p-4">{approved?'Approved Users':'Pending Approvals'}</h1> 
            <div>
                {
                    data.map((val,k)=>{
                       return( 
                        <div className="flex justify-center">
                            <Card data={val} key={k}/>
                        </div>
                       )
                    })
                }
            </div>
        </div>
    )
}
