import { useState } from 'react';
import Routes from '../components/Routes';
import Header from '../components/Header';

export default function App() {

  const [isloggedin, setisloggedin] = useState(JSON.parse(localStorage.getItem('amexloggedin')) || false);     //eslint-disable-next-line

  return (
    <div className="App bg-gray-200 min-h-screen">
      <Header loggedin={isloggedin} setloggedin={setisloggedin}/>
      <Routes loggedin={isloggedin} setloggedin={setisloggedin}/>
    </div>
  );
}
