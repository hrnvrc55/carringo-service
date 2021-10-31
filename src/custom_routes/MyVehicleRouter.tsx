import React, {useEffect, useState} from "react";
import {AppProviderContext} from "../providers/AppProvider";
import {garageValidate, homeValidate} from "../utils/validation";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "../pages/Home";

type MyGaragesRouterProps = {
    path: string,
    exact: boolean,
}

function MyVehicleRouter({path, exact}: MyGaragesRouterProps){
    const provider = React.useContext(AppProviderContext);
    let [isRoute, setIsRoute] = useState<boolean>(true);

    useEffect(() => {
        let validate = garageValidate(provider?.form);
        if(validate === false){
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
