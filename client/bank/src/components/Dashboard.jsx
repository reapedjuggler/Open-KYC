import React, { useEffect, useState } from 'react';
import Card from '../elements/Card';
import { url } from '../util/data';
import Loading from '../shared/Loading';
import {useHistory} from 'react-router-dom';

export default function Dashboard({approved}) {

    const history = useHistory();

    const [data, setdata] = useState([]);
    const [email] = useState(localStorage.getItem("email"));
    const [isloading, setisloading] = useState(false);
    const [iserror, setiserror] = useState(false);
    const [bankname, setbankname] = useState("");

    useEffect(() => {
        if(!email) return;
        setisloading(true);
        fetch(`${url}/util/getuserdetails`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            email:email
          })
      }).then(response => response.json())
      .then(res => {
          if(res.success) {
            setbankname(res.message.name);
            localStorage.setItem('bank',res.message.name)
          }
          else{
            setdata([]);
            setisloading(false);
            setiserror(true);
          }
      }).catch(()=>{
          setisloading(false);
          setiserror(true);
        })
      }, [email]);

    useEffect(() => {
        if(bankname === "") return;
        setisloading(true);
        fetch(`${url}/kyc/getapprovals`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            bank:bankname
          })
      }).then(response => response.json())
      .then(res => {
          if(res.success) {
            approved?setdata(res.message.approved):setdata(res.message.pending);
            setisloading(false);
          }
          else{
            setdata([]);
            setisloading(false);
            setiserror(true);
          }
      }).catch(() => {
          setdata([]);
          setisloading(false);
          setiserror(true);
      })
      }, [approved,bankname]);

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
            <h1 className="text-gray-800 text-center p-4">{`Welcome to ${bankname==="A"?"HDFC Bank":"Bank of America"} Dashboard`}</h1> 
            <h1 className="text-gray-800 text-center p-4">{approved?'Approved Users':'Pending Approvals'}</h1> 
            <div>
                {
                    (data.length === undefined || data.length <= 0) ? <h2 className="text-gray-600 text-center">No data available</h2>
                    :
                    data.map((val,k)=>{
                       return( 
                        <div className="flex justify-center">
                            <Card data={val} key={k} bank={bankname}/>
                        </div>
                       )
                    })
                }
            </div>
        </div>
    )
}
