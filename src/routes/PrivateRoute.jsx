import {Route} from "react-router-dom";

const PrivateRoute = ({element, path}) => {
    return <Route element={element} path={path}/>
}

export default PrivateRoute