import React, {useEffect, useState} from "react";
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import getStepsData from "../utils/steps";
import {useHistory} from "react-router-dom";
import {appointmentValidate, garageValidate, homeValidate, serviceValidate} from "../utils/validation";
import {AppProviderContext} from "../providers/AppProvider";

const stepsData = getStepsData();

type MobileStepperProps = {
    active: number
}

function MobileStepperComponent({active} : MobileStepperProps){
    let history = useHistory();
    const provider = React.useContext(AppProviderContext);

    let [data, setData] = useState<any>(null);

    useEffect(() => {
        setData(stepsData[active - 1]);
    },[active])

    const goPage = (data: any, type: string) => {
        let form = provider?.form;
        if(type === "next"){
            if(data.code === "services"){
                let validation = serviceValidate(form);
                if(validation && validation.status === false){
                    provider?.openGlobalAlert(true,"Uyarı",validation.message, "danger");
                    return false;
                }else{
                    history.push(data.next);
                }
            }else if(data.code === "main"){
                let validation = homeValidate(form);
                if(validation.length > 0){
                    provider?.openGlobalAlert(true,"Uyarı","Gerekli bilgileri doldurunuz", "danger");
                    return false;
                }else{
                    history.push(data.next);
                }
            }else if(data.code === "garages"){
                let validation = garageValidate(form);
                if(validation === false){
                    provider?.openGlobalAlert(true,"Uyarı","Lütfen servis seçiniz", "danger");
                    return false;
                }else{
                    history.push(data.next);
                }

            }else if(data.code === "appointment"){
                let validation = appointmentValidate(form);
                if(validation.length > 0){
                    provider?.openGlobalAlert(true,"Uyarı","Gerekli bilgileri doldurunuz", "danger");
                    return false;
                }else{
                    history.push(data.next);
                }
            }
        }else if(type === "prev"){
            history.push(data.prev);

        }else{
            history.push(data.route);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center d-md-none">
                <IconButton disabled={(active === 1)}  onClick={() => goPage(data, "prev")}>
                    <ChevronLeftIcon className={(active === 1 ? "custom-disable-color" : "text-primary")} fontSize={"large"}/>
                </IconButton>
                <Chip color={"secondary"} className="text-white" avatar={<Avatar className="text-white">{active}</Avatar>} label={data?.label} />
                <IconButton disabled={(active === 4)}  onClick={() => goPage(data, "next")}>
                    <ChevronRightIcon className={(active === 4 ? "custom-disable-color" : "text-primary")}  fontSize={"large"}/>
                </IconButton>
            </div>
        </>
    )
}

export default MobileStepperComponent
