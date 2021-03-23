import React, {useEffect, useState} from "react";
import {AppProviderContext} from "../providers/AppProvider";
import {garageValidate} from "../utils/validation";
import {Redirect, Route, Switch} from "react-router-dom";
import Services from "../pages/Services";

type MyVehicleRouterProps = {
    path: string,
    exact: boolean,
}

function MyServicesRouter({path, exact}: MyVehicleRouterProps){
    const provider = React.useContext(AppProviderContext);
    let [isRoute, setIsRoute] = useState<boolean>(true);

    useEffect(() => {
        let validate = garageValidate(provider?.form);

        if(!validate){
            setIsRoute(false);
        }
    },[provider?.form])

    return (
       <>
           {isRoute ? (
               <Route exact={exact} path={path} component={Services} />
           ) : (
             <Redirect to={"/"}/>
           )}
       </>
    )
}

export default MyServicesRouter;
