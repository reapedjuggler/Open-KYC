import { useState } from 'react';
import Routes from '../components/Routes';

export default function App() {

  const [isloggedin, setisloggedin] = useState(JSON.parse(localStorage.getItem('amexloggedin')) || false);     //eslint-disable-next-line
  const [video_status, setvideo_status] = useState(false);

  return (
    <div className="App bg-gray-200 min-h-screen">
      <Routes loggedin={isloggedin} setloggedin={setisloggedin} video_status={video_status} setvideo_status={setvideo_status}/>
    </div>
  );
}
