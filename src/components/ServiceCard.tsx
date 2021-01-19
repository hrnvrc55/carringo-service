import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import React, {useEffect, useState} from "react";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

type ServiceCardProps = {
    data: any,
    onClick:(item: any) => void
}


function ServiceCard({data, onClick} : ServiceCardProps) {

    function onClickCard(){
        onClick(data)
    }

    return(
        <Card onClick={() => onClickCard()} className={"service-card m-2 animate__animated animate__backInLeft" + (data.selected ? " active" : " ")}>
            <CardContent className="d-flex flex-column justify-content-center align-items-center">
                {data.selected && (
                    <CheckCircleIcon className="selected-icon text-success"/>
                )}
                {data?.icon}
                <span className="mt-2">{data?.name}</span>
            </CardContent>
        </Card>
    )
}

export default ServiceCard;
