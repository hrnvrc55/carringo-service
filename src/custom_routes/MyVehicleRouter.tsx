import React, {useEffect, useState} from "react";
import {AppProviderContext} from "../providers/AppProvider";
import {serviceValidate} from "../utils/validation";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "../pages/Home";

type MyVehicleRouterProps = {
    path: string,
    exact: boolean,
}

function MyVehicleRouter({path, exact}: MyVehicleRouterProps){
    const provider = React.useContext(AppProviderContext);
    let [isRoute, setIsRoute] = useState<boolean>(true);

    useEffect(() => {
        let validate = serviceValidate(provider?.form);
        if(validate){
            setIsRoute(false);
        }
    },[provider?.form])

    return (
       <>
           {isRoute ? (
               <Route exact={exact} path={path} component={Home} />
           ) : (
             <Redirect to={"/"}/>
           )}
       </>
    )
}

export default MyVehicleRouter;
