import React, { useEffect, useState } from 'react';
import Card from '../elements/Card';
import { url } from '../util/data';

export default function Dashboard({approved}) {

    const [data, setdata] = useState([]);

    useEffect(() => {
        fetch(`${url}/kyc/getapprovals`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            bank:"A"
          })
      }).then(response => response.json())
      .then(res => {
          if(res.success) {
            approved?setdata(res.message.approved):setdata(res.message.pending);
          }
      }).catch(() => {setdata([])})
      }, [approved]);

    return (
        <div>
            <h1 className="text-gray-800 text-center p-4">{approved?'Approved Users':'Pending Approvals'}</h1> 
            <div>
                {
                    data.length <= 0 ? <h2 className="text-gray-600 text-center">No data available</h2>
                    :
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
