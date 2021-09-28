import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import Forget from './Forget';
import Reset from './Reset';
import Details from './Detail';

export default function Routes({loggedin,setloggedin,data}) {
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
                    <Register/>
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
                    <Dashboard approved={false} data={data}/>
                </Route>
                <Route exact path="/dashboard/approved" >
                    {!loggedin && <Redirect to='/' />}
                    <Dashboard approved={true} data={data}/>
                </Route>
                <Route exact path="/user/:userid" >
                    {!loggedin && <Redirect to='/' />}
                    <Details/>
                </Route>
                <Route><Redirect to='/' /></Route>
            </Switch>
        </Router>
        </div>
    );
}
