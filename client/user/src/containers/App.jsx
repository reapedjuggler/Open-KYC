import { useState } from 'react';
import Routes from '../components/Routes';
import Header from '../components/Header';

export default function App() {

  const [isloggedin, setisloggedin] = useState(JSON.parse(localStorage.getItem('amexloggedin')) || false);     //eslint-disable-next-line
  const [data, setdata] = useState([{id:"101",profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1F7sotb1p-9YuR_1IFYP_nAizS5RpQoiE2g&usqp=CAU",name:"Test", aadhar:true,pan:true,bio:true}, {id:"104",profile:"url2",profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1F7sotb1p-9YuR_1IFYP_nAizS5RpQoiE2g&usqp=CAU",name:"Test2",aadhar:true,pan:false,bio:true}, {id:"105",profile:"url3",profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1F7sotb1p-9YuR_1IFYP_nAizS5RpQoiE2g&usqp=CAU",name:"Test3",aadhar:true,pan:true,bio:false}]);
  const [video_status, setvideo_status] = useState(false);
  return (
    <div className="bg-gray-200 App min-h-screen">
      <Header loggedin={isloggedin} setloggedin={setisloggedin}/>
      <Routes loggedin={isloggedin} setloggedin={setisloggedin} data={data} video_status={video_status} setvideo_status={setvideo_status}/>
    </div>
  );
}
