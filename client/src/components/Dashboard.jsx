import React, {useState} from 'react';
import Card from '../elements/Card';

export default function Dashboard() {
    //eslint-disable-next-line
    const [data, setdata] = useState([{profile:"url",aadhar:true,pan:true,bio:true}, {profile:"url2",aadhar:true,pan:true,bio:true}, {profile:"url3",aadhar:true,pan:true,bio:true}]);

    return (
        <div>
            <div>
                {
                    data.map((val,k)=>{
                       return <Card data={val} key={k}/>
                    })
                }
            </div>
        </div>
    )
}
