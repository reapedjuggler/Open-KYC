import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import Forget from './Forget';
import Reset from './Reset';
import KYC from './KYC';
import UserConsent from './Userconsent';

export default function Routes({loggedin,setloggedin}) {
    return (
        <div>
        <Router>
            <Switch>
                <Route exact path='/'>
                    {loggedin ?<Redirect to='/dashboard'/>:<Redirect to='/login'/>}
                </Route>
                <Route exact path='/login'>
                {loggedin && <Redirect to='/dashboard'/>}
                    <Login setloggedin={setloggedin}/>
                </Route>
                <Route exact path='/register'>
                {loggedin && <Redirect to='/dashboard'/>}
                    <Register setloggedin={setloggedin}/>
                </Route>
                <Route exact path='/forget'>
                {loggedin && <Redirect to='/dashboard'/>}
                    <Forget/>
                </Route>
                <Route exact path='/reset'>
                {loggedin && <Redirect to='/dashboard'/>}
                    <Reset/>
                </Route>
                <Route exact path="/dashboard" >
                    {!loggedin && <Redirect to='/' />}
                    <Dashboard/>
                </Route>
                <Route exact path="/kyc" >
                    {!loggedin && <Redirect to='/' />}
                    <KYC/>
                </Route>
                <Route exact path="/consent" >
                    {!loggedin && <Redirect to='/' />}
                    <UserConsent/>
                </Route>
                <Route><Redirect to='/' /></Route>
            </Switch>
        </Router>
        </div>
    );
}
