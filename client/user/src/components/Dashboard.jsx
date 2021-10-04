import React, { useEffect, useState } from 'react';
import Apply from '../assets/apply';
import Inprogress from '../assets/inprogress';
import Completed from '../assets/completed';
import { useHistory } from 'react-router-dom';
import { url } from '../util/data';
import Loading from '../shared/Loading';

export default function Dashboard() {

    const history = useHistory();

    const [email] = useState(localStorage.getItem("email"));
    const [data, setdata] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [iserror, setiserror] = useState(false);

    // const [data, setdata] = useState([{
    //     "user": "test@test.com",
    //     "bank": "BankB, L=Mumbai, C=IN",
    //     "approval": "false"
    // },
    // {
    //     "user": "test@test.com",
    //     "bank": "BankA, L=New York, C=US",
    //     "approval": "true"
    // }]);

    useEffect(() => {
        setisloading(true);
        fetch(`${url}/kyc/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
            })
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    setdata(data.message);
                    setisloading(false);
                }
            }).catch(() => {
                setisloading(false);
                setiserror(true);
            })
    }, [email])

    if(isloading){
        return(
        <React.Fragment>
            <div className='flex items-center justify-center bg-white ma3 br2 vh-75'>
				<Loading text="Loading Dashboard" />
			</div>
        </React.Fragment>
        );
    }

    if (iserror) {
        return (
            <React.Fragment>
                <div className='flex flex-column items-center justify-center bg-white ma3 br2 vh-75'>
                    <p className="f3 gray">Something Went Wrong!</p>
                    <button className="mt4 fw6 f6 bn dim br1 ph3 pointer pv2 dib white" style={{ background: "#6EB6FF" }} onClick={() => history.push('/')}>Go Back</button>
                </div>
            </React.Fragment>
        );
    }

    return (
        <div>
            {
                data.length <= 0 ?
                    <div className="rounded-xl py-20 w-11/12 mx-auto mt-10 drop-shadow-md bg-white">
                        <div>
                            <h1 className="text-gray-800 text-center p-4">KYC</h1>
                            <div>
                                {<div className="h-2/3 w-2/3 md:h-1/4 md:w-1/4 mx-auto"><Apply /></div>}
                                <div className="mt-12 flex justify-center">
                                    {<button onClick={() => history.push('/kyc')} className="ui primary button">Complete your KYC now!</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                    {<button onClick={() => history.push('/consent')} className="fixed bottom-4 right-4 ui primary button">Apply for KYC!</button>}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {
                            data.map((val, idx) => {
                                return (
                                    <div className="rounded-xl m-4 drop-shadow-md bg-white w-10/12 mx-auto">
                                        <div >
                                            <h1 className="text-gray-800 text-center text-2xl md:text-3xl p-4">{`${val.bank.split(",")[0]}, ${val.bank.split(",")[1].split("=")[1]}, ${val.bank.split(",")[2].split("=")[1]}`}</h1>
                                            <div>
                                                {val.approval === "false" && <div className="h-1/2 w-1/2 md:h-1/4 md:w-1/4 mx-auto"><Inprogress /></div>}
                                                {val.approval === "true" && <div className="h-1/2 w-1/2 md:h-1/4 md:w-1/4 mx-auto"><Completed /></div>}
                                                <div className="mt-12 flex justify-center">
                                                    {val.approval === "false" && <h3 className="text-gray-800 pb-6 text-md md:text-lg lg:text-xl text-center">{"Your KYC details is being Verified. (Please wait for 2-3 buisness days)"}</h3>}
                                                    {val.approval === "true" && <h3 className="text-green-600 pb-6 text-md md:text-lg lg:text-xl text-center">{"KYC Completed!"}</h3>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    </>
            }
        </div>
    )
}
