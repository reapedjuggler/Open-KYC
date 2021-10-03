import React, { useEffect, useState } from 'react';
import Card from '../elements/Card';
import { url } from '../util/data';

export default function Dashboard({approved}) {

    const [data, setdata] = useState([
        {
            "email": "test@test.com",
            "name": "Batman",
            "aadhar": "9876676777||null",
            "pan": "7777777777||null",
            "id": "default",
            "approval": "true",
            "approved_by": [
                {
                    "@class": "net.corda.samples.example.states.IOUState",
                    "value": 17,
                    "lender": "O=BankA, L=New York, C=US",
                    "borrower": "O=UserA, L=London, C=GB",
                    "linearId": {
                        "externalId": null,
                        "id": "66fa05be-39e2-46de-98e4-4a76c565a1bc"
                    },
                    "aadhar": "9989797977979||null",
                    "pan": "1234567890||null",
                    "email": "test@test.com",
                    "approval": "true",
                    "timestamp": "2021-10-03T13:48:45.631"
                },
                {
                    "@class": "net.corda.samples.example.states.IOUState",
                    "value": 17,
                    "lender": "O=BankB, L=Mumbai, C=IN",
                    "borrower": "O=UserA, L=London, C=GB",
                    "linearId": {
                        "externalId": null,
                        "id": "0d270560-15c4-46ca-a89e-698fa0748771"
                    },
                    "aadhar": "9876676777||null",
                    "pan": "7777777777||null",
                    "email": "test@test.com",
                    "approval": "true",
                    "timestamp": "2021-10-03T19:34:22.449"
                },
            ]
        },
        {
            "email": "test@test.com",
            "name": "Batman",
            "aadhar": "9876676777||null",
            "pan": "7777777777||null",
            "id": "default",
            "approval": "false",
            "approved_by": [
                {
                    "@class": "net.corda.samples.example.states.IOUState",
                    "value": 17,
                    "lender": "O=BankA, L=New York, C=US",
                    "borrower": "O=UserA, L=London, C=GB",
                    "linearId": {
                        "externalId": null,
                        "id": "66fa05be-39e2-46de-98e4-4a76c565a1bc"
                    },
                    "aadhar": "9989797977979||null",
                    "pan": "1234567890||null",
                    "email": "test@test.com",
                    "approval": "true",
                    "timestamp": "2021-10-03T13:48:45.631"
                },
                {
                    "@class": "net.corda.samples.example.states.IOUState",
                    "value": 17,
                    "lender": "O=BankB, L=Mumbai, C=IN",
                    "borrower": "O=UserA, L=London, C=GB",
                    "linearId": {
                        "externalId": null,
                        "id": "0d270560-15c4-46ca-a89e-698fa0748771"
                    },
                    "aadhar": "9876676777||null",
                    "pan": "7777777777||null",
                    "email": "test@test.com",
                    "approval": "true",
                    "timestamp": "2021-10-03T19:34:22.449"
                },
            ]
        }
    ]);

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
