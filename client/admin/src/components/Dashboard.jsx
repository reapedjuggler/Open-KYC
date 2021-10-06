import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react'
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
    const [search, setsearch] = useState(false);
    const [data, setdata] = useState([]);
    // const [data, setdata] = useState(
    //     [
    //         {
    //             "state": {
    //                 "data": {
    //                     "@class": "net.corda.samples.example.states.IOUState",
    //                     "value": 17,
    //                     "lender": "O=UserB, L=Bangalore, C=IN",
    //                     "borrower": "O=BankA, L=New York, C=US",
    //                     "linearId": {
    //                         "externalId": null,
    //                         "id": "c1f8931f-5ac7-40cc-8bf6-f177f91d3526"
    //                     },
    //                     "type_of_transaction": "approval",
    //                     "bank": "bankofamerica@gmail.com",
    //                     "email": "test@test.com",
    //                     "timestamp": "2021-10-05T15:47:12.744"
    //                 },
    //                 "contract": "net.corda.samples.example.contracts.IOUContract",
    //                 "notary": "O=Notary, L=London, C=GB",
    //                 "encumbrance": null,
    //                 "constraint": {
    //                     "@class": "net.corda.core.contracts.SignatureAttachmentConstraint",
    //                     "key": "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
    //                 }
    //             },
    //             "ref": {
    //                 "txhash": "C61705F25F1CE38F3ED8704BE2118350C4F18D8416A8AF1D55078800023BC730",
    //                 "index": 0
    //             }
    //         },
    //         {
    //             "state": {
    //                 "data": {
    //                     "@class": "net.corda.samples.example.states.IOUState",
    //                     "value": 17,
    //                     "lender": "O=UserB, L=Bangalore, C=IN",
    //                     "borrower": "O=BankA, L=New York, C=US",
    //                     "linearId": {
    //                         "externalId": null,
    //                         "id": "3dfa7a13-1147-442a-b0c0-4fc4b5945d8a"
    //                     },
    //                     "type_of_transaction": "reject",
    //                     "bank": "B",
    //                     "email": "test@test.com",
    //                     "timestamp": "2021-10-05T15:49:40.866"
    //                 },
    //                 "contract": "net.corda.samples.example.contracts.IOUContract",
    //                 "notary": "O=Notary, L=London, C=GB",
    //                 "encumbrance": null,
    //                 "constraint": {
    //                     "@class": "net.corda.core.contracts.SignatureAttachmentConstraint",
    //                     "key": "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
    //                 }
    //             },
    //             "ref": {
    //                 "txhash": "69AC87ECED20C31FC7392D3BF32A318C9E92FC567F847373843FA7B67539543A",
    //                 "index": 0
    //             }
    //         },
    //         {
    //             "state": {
    //                 "data": {
    //                     "@class": "net.corda.samples.example.states.IOUState",
    //                     "value": 17,
    //                     "lender": "O=UserB, L=Bangalore, C=IN",
    //                     "borrower": "O=BankA, L=New York, C=US",
    //                     "linearId": {
    //                         "externalId": null,
    //                         "id": "4bbe87e3-38f5-475a-abe0-b5b550363842"
    //                     },
    //                     "type_of_transaction": "approve",
    //                     "bank": "A",
    //                     "email": "test3@test.com",
    //                     "timestamp": "2021-10-05T15:51:14.537"
    //                 },
    //                 "contract": "net.corda.samples.example.contracts.IOUContract",
    //                 "notary": "O=Notary, L=London, C=GB",
    //                 "encumbrance": null,
    //                 "constraint": {
    //                     "@class": "net.corda.core.contracts.SignatureAttachmentConstraint",
    //                     "key": "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
    //                 }
    //             },
    //             "ref": {
    //                 "txhash": "30857469543D8289FD4EB042B5EED32E8CD7A3BA88F130B8F83F4190D980A634",
    //                 "index": 0
    //             }
    //         }
    //     ]);

    useEffect(() => {
        if (!email || search) return;
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
                    setisloading(false);
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
    }, [email,search]);

    useEffect(() => {
        if (!search || !value || !email) return;
        fetch(`${url}/kyc/trackandtrace`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bankEmail: email,
                userEmail: value,
            })
        }).then(response => response.json())
            .then(res => {
                console.log(res, email, "trackdetail")
                if (res.success) {
                    setdata(res.message);
                }
                else {
                    setiserror(true);
                }
            }).catch(() => {
                setisloading(false);
                setiserror(true);
            })
    }, [value, email, search]);

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
                    setisloading(false);
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
                <input className="p-4 rounded-2xl" type="search" value={value} placeholder="User email" onChange={(e) => setvalue(e.target.value)} />
                <div className="flex justify-center ml-5 rounded-2xl"><Form.Button onClick={()=>setsearch(true)} color="blue">Search</Form.Button></div>
                <div classname="ml-2"><i onclick={()=>setsearch(false)} className="undo icon ml-2 cursor-pointer"/></div>
            </div>
            <div className="pl-10 text-gray-700 text-xl">{`List of transactions from ${bank}`}</div> 
            <div className="grid grid-cols-2 md:grid-cols-4">
                {
                    (data === undefined || data.length <= 0) ? <div className="text-center text-gray-700 text-2xl">No data found !</div>
                        :
                        <>
                 {       data.map((val, idx) => {
                            let date = new Date(val.state.data.timestamp);
                            return (
                                <div className="rounded-xl m-4 drop-shadow-md w-10/12 bg-white p-4 mx-auto">
                                    <p className="text-gray-600 my-2">{`Email: ${val.state.data.email}`}</p>
                                    <p className="text-gray-600 my-2">{`State: ${val.state.data.type_of_transaction}`}</p>
                                    <p className="text-gray-600 my-2">{`Date: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</p>
                                    <p className="text-gray-600 my-2">{`Bank Name: ${val.state.data.bank}`}</p>
                                </div>
                            );
                        })
                }
                        </>
                }
            </div>
        </div>
    )
}
