import React from 'react';

export default function Dashboard({approved, data}) {
    return (
        <div>
            <h1 className="text-gray-800 text-center p-4">{approved?'Approved Users':'Pending Approvals'}</h1> 
            <div>
                
            </div>
        </div>
    )
}
