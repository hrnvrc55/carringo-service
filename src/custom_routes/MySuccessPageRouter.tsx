import React, {useEffect, useState} from "react";
import {AppProviderContext} from "../providers/AppProvider";
import {appointmentValidate, garageValidate, serviceValidate} from "../utils/validation";
import {Redirect, Route, Switch} from "react-router-dom";
import SuccessPage from "../pages/SuccessPage";

type MyVehicleRouterProps = {
    path: string,
    exact: boolean,
}

function MySuccessPageRouter({path, exact}: MyVehicleRouterProps){
    const provider = React.useContext(AppProviderContext);
    let [isRoute, setIsRoute] = useState<boolean>(true);

    useEffect(() => {
        let validate = appointmentValidate(provider?.form);
        if(validate.length > 0){
            setIsRoute(false);
        }
    },[provider?.form])

    return (
        <>
            {isRoute ? (
                <Route exact={exact} path={path} component={SuccessPage} />
            ) : (
                <Redirect to={"/"}/>
            )}
        </>
    )
}

export default MySuccessPageRouter;
