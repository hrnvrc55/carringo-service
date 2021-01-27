import React, {useEffect, useState} from "react";
import {AppProviderContext} from "../providers/AppProvider";
import {homeValidate} from "../utils/validation";
import {Redirect, Route, Switch} from "react-router-dom";
import Garages from "../pages/Garages";

type MyGaragesRouterProps = {
    path: string,
    exact: boolean,
}

function MyGaragesRouter({path, exact}: MyGaragesRouterProps){
    const provider = React.useContext(AppProviderContext);
    let [isRoute, setIsRoute] = useState<boolean>(true);

    useEffect(() => {
        let validate = homeValidate(provider?.form);
        if(validate.length > 0){
            setIsRoute(false);
        }
    },[provider?.form])

    return (
        <>
            {isRoute ? (
                <Route exact={exact} path={path} component={Garages} />
            ) : (
                <Redirect to={"/"}/>
            )}
        </>
    )
}

export default MyGaragesRouter;
