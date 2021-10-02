import React, { useEffect, useState } from 'react';
import Apply from '../assets/apply';
import Inprogress from '../assets/inprogress';
import Completed from '../assets/completed';
import { useHistory } from 'react-router-dom';
import { url } from '../util/data';

export default function Dashboard() {

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
                data.length <= 0 ?
                    <div className="rounded-xl py-20 w-11/12 mx-auto mt-10 drop-shadow-md bg-white ">
                        <div>
                            <h1 className="text-gray-800 text-center p-4">KYC</h1>
                            <div>
                                {<div className="h-1/4 w-1/4 mx-auto"><Apply /></div>}
                                <div className="mt-12 flex justify-center">
                                    {<button onClick={() => history.push('/kyc')} className="ui primary button">Complete your KYC now!</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        {
                            data.map((val, idx) => {
                                return (
                                    <div className="rounded-xl m-4 drop-shadow-md bg-white w-10/12 h-96 mx-auto">
                                        <div >
                                            <h1 className="text-gray-800 text-center p-4">{val.bank}</h1>
                                            <div>
                                                {val.approval === "false" && <div className="h-1/4 w-1/4 mx-auto"><Inprogress /></div>}
                                                {val.approval === "true" && <div className="h-1/4 w-1/4 mx-auto"><Completed /></div>}
                                                <div className="mt-12 flex justify-center">
                                                    {val.approval === "false" && <h3 className="text-gray-800 text-center">{"Your KYC details is being Verified. (Please wait for 2-3 buisness days)"}</h3>}
                                                    {val.approval === "true" && <h3 className="text-green-600 text-center">{"KYC Completed!"}</h3>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
            }
        </div>
    )
}
