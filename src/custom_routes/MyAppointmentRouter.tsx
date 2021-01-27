import React, {useEffect, useState} from "react";
import {AppProviderContext} from "../providers/AppProvider";
import {garageValidate, serviceValidate} from "../utils/validation";
import {Redirect, Route, Switch} from "react-router-dom";
import Appointment from "../pages/Appointment";

type MyVehicleRouterProps = {
    path: string,
    exact: boolean,
}

function MyAppointmentRouter({path, exact}: MyVehicleRouterProps){
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
                <Route exact={exact} path={path} component={Appointment} />
            ) : (
                <Redirect to={"/"}/>
            )}
        </>
    )
}

export default MyAppointmentRouter;
