import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { url } from '../util/data';
import Loading from '../shared/Loading';

export default function Dashboard() {

    const history = useHistory();

    const [email] = useState(localStorage.getItem("email"));
    const [isloading, setisloading] = useState(false);
    const [iserror, setiserror] = useState(false);
    const [bank, setbank] = useState("");
    const [value, setvalue] = useState("");

    const [data, setdata] = useState([]);

    useEffect(() => {
        if (!email) return;
        setisloading(true);
        fetch(`${url}/kyc/getalltrackingdetails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email
            })
        }).then(response => response.json())
            .then(res => {
                console.log(res,email,"getalltrack")
                if (res.success) {
                    setdata(res.message.message);
                }
                else {
                    setisloading(false);
                    setiserror(true);
                }
            }).catch(() => {
                setisloading(false);
                setiserror(true);
            })
    }, [email]);

    useEffect(() => {
        if (!value || !email) return;
        setisloading(true);
        fetch(`${url}/kyc/trackandtrace`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bankEmail: email,
			    userEmail: value,
            })
        }).then(response => response.json())
            .then(res => {
                console.log(res,email,"trackdetail")
                if (res.success) {
                    setdata(res.message);
                }
                else {
                    setdata([]);
                    setisloading(false);
                    setiserror(true);
                }
            }).catch(() => {
                setisloading(false);
                setiserror(true);
            })
    }, [value, email]);

    useEffect(() => {
        if (!email) return;
        setisloading(true);
        fetch(`${url}/util/getuserdetails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email
            })
        }).then(response => response.json())
            .then(res => {
                console.log(res,email,"getuserdet")
                if (res.success) {
                    setbank(res.message.name);
                }
                else {
                    setisloading(false);
                    setiserror(true);
                }
            }).catch((err) => {
                console.error(err);
                setisloading(false);
                setiserror(true);
            })
    }, [email]);

    if (isloading) {
        return (
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
            <h2 className="text-center text-gray-700">{`Welcome to ${bank} Admin Dashboard`}</h2>
            <div className="flex w-full justify-center items-center">
                <input className="" type="search" onChange={(e) =>setvalue(e.target.value)}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {
                    (data === undefined || data.length <= 0 ) ? <div className="">No data found !</div>
                    :
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        {
                            data.map((val, idx) => {
                                return (
                                    <div className="rounded-xl m-4 drop-shadow-md bg-white w-10/12 mx-auto">
                                        <p className="text-gray-600">{val.email}</p>
                                        <p className="text-gray-600">{val.type_of_transaction}</p>
                                        <p className="text-gray-600">{val.timestamp}</p>
                                        <p className="text-gray-600">{val.bank}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}
