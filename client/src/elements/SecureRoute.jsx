import {Route, Redirect} from "react-router-dom";

const SecuredRoute = ({loggedstate,goto,goback,Component}) =>{
    return (
        <Route exact path={goto}>
            {loggedstate ? '' : <Redirect to={goback} />}
            <Component/>
        </Route>
    )
}

export default SecuredRoute;