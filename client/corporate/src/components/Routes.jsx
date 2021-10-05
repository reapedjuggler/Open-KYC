import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import Forget from './Forget';
import Reset from './Reset';
import Details from './Detail';
import Header from '../components/Header';

export default function Routes({loggedin,setloggedin}) {
    return (
        <div>
        <Router>
            <Header loggedin={loggedin} setloggedin={setloggedin}/>
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
                    <Dashboard approved={false} corp={false}/>
                </Route>
                <Route exact path="/dashboard/approved" >
                    {!loggedin && <Redirect to='/' />}
                    <Dashboard approved={true} corp={false}/>
                </Route>
                <Route exact path="/dashboard/request" >
                    {!loggedin && <Redirect to='/' />}
                    <Dashboard approved={true} corp={true}/>
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
