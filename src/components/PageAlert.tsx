import React from "react";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

type AlertPageProps = {
    message: string,
    type: string
}

function PageAlert({message, type}: AlertPageProps){

    return (
        <div className="d-flex justify-content-center">
            <div className={"d-flex align-items-center alert alert-" + type}>
                {type === "danger" && (<ErrorOutlineIcon className="mr-2"/>)}
                {message}
            </div>
        </div>
    )
}

export default PageAlert
