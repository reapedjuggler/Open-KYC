import React, {useEffect} from 'react';
import Apply from '../assets/apply';
import Inprogress from '../assets/inprogress';
import Completed from '../assets/completed';
import {useHistory} from 'react-router-dom';

export default function Dashboard({ type = "apply" }) {

    const history = useHistory();

    useEffect(()=>{
        fetch(`${url}/status`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                bank: values.bank, 
                email: values.email, 
                aadhar: values.aadhar + "||" + values.aadhar_file, 
                pan: values.pan + "||" + values.pan_file
            })
        }).then(response => response.json())
        .then(data => {
            if(data.success){
                history.push('/');
            }
        })
    },[])

    return (
        <div>
            <h1 className="text-gray-800 text-center p-4">{"KYC Status"}</h1>
            <div>
                {type === "apply" && <div className="h-1/4 w-1/4 mx-auto"><Apply /></div>}
                {type === "pending" && <div className="h-1/4 w-1/4 mx-auto"><Inprogress /></div>}
                {type === "done" && <div className="h-1/4 w-1/4 mx-auto"><Completed /></div>}
                <div className="mt-12 flex justify-center">
                    {type === "apply" && <button onClick={() => history.push('/kyc')} className="ui primary button">Complete your KYC now!</button>}
                    {type === "pending" && <h3 className="text-gray-800 text-center p-4">{"Your KYC details is being Verified. (Please wait for 2-3 buisness days)"}</h3>}
                    {type === "done" && <h3 className="text-green-600 text-center p-4">{"KYC Completed!"}</h3>}

                </div>
            </div>
        </div>
    )
}
