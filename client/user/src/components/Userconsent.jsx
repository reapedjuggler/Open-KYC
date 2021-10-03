import React, { useState, useEffect } from 'react'
import { Form, Select } from 'semantic-ui-react'
import { url } from '../util/data';
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';

export default function Userconsent() {

    const history = useHistory();

    const [data, setdata] = useState({aadhar:"",pan:""});
    const [clicked, setclicked] = useState(false);
    const [isapply, setisapply] = useState(false);
    const [checkbox, setcheckbox] = useState(false);
    const [bank, setbank] = useState("");
    const [email] = useState(localStorage.getItem("email") || "");

    const [bankoptions] = useState([
        { key: 'm', text: 'Bank A', value: 'A' },
        { key: 'f', text: 'Bank B', value: 'B' },
        { key: 'o', text: 'Bank C', value: 'C' },
    ])

    useEffect(() => {
        if(!email) return;
        fetch(`${url}/kyc/getdetails`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            email: email,
          })
      }).then(response => response.json())
      .then(res => {
          if(res.success) {
            setdata(res.message[0])
          }
      })
      }, [email])

    useEffect(() => {
        if (!isapply) return;
        if (!clicked) {
            setcheckbox(true);
            setTimeout(() => {
                setcheckbox(false);
                setclicked(false);
                setisapply(false);
            }, 3000);
            return;
        }
        else {
            fetch(`${url}/kyc/apply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bank: bank,
                    email: email,
                    aadhar: data.aadhar , 
                    pan: data.pan 
                })
            }).then(response => response.json())
                .then(data => {
                    if (data.success) {
                        history.push('/');
                    }
                }).catch(err => console.log(err))
        }
    }, [isapply, history, bank, email, clicked, data])

    return (
        <div className="rounded-md bg-white p-5 m-12 w-11/12 lg:w-1/2 mx-auto text-center">
            <h2 className="text-gray-700">Let's get you verified</h2>
            <p>I give my consent to use my documents which includes Aadhar Card, Pan Card, Biometrics and Photograph to be used by the bank to verify my documents and approve me as a valid user by checking on the box below i hereby accept my consent to utilize my documents by the bank.</p>
            <p className="text-gray-600 font-bold">Select Bank to apply for</p>
            <Form.Field
                control={Select}
                options={bankoptions}
                label={{ htmlFor: 'form-select-bank' }}
                placeholder='Banks'
                search
                onChange={(e, d) => setbank(d.value)}
                searchInput={{ id: 'form-select-bank' }}
            />
            <Form.Checkbox onChange={(e) => { setclicked(true) }} value={clicked} className="my-4" name="istrue" label='I agree to share my KYC details' />
            {checkbox && <Alert severity="error">Please check the checkbox to apply for KYC!</Alert>}
            <button onClick={() => { setisapply(true); }} className="ui primary button">Apply</button>
        </div>
    )
}
