import React, { useEffect, useState } from 'react';
import Apply from '../assets/apply';
import Inprogress from '../assets/inprogress';
import Completed from '../assets/completed';
import { useHistory } from 'react-router-dom';
import { url } from '../util/data';

export default function Dashboard({ type = "apply" }) {

    const history = useHistory();

    const [email] = useState(localStorage.getItem("email"));
    const [data, setdata] = useState([]);

    useEffect(() => {
        fetch(`${url}/kyc/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
            })
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    setdata(data.message)
                }
            })
    }, [email])

    return (
        <div>
            {
                data.map((val, idx) => {
                    <div>
                        <h1 className="text-gray-800 text-center p-4">{val.bank}</h1>
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
                })
            }
        </div>
    )
}
