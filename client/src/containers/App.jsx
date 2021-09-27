import { useState } from 'react';
import Routes from '../components/Routes';

export default function App() {

  const [isloggedin, setisloggedin] = useState(false);

  return (
    <div className="App">
      <Routes loggedin={isloggedin} setloggedin={setisloggedin}/>
    </div>
  );
}
