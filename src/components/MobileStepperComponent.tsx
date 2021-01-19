import React, {useEffect, useState} from "react";
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import getStepsData from "../utils/steps";
import {useHistory} from "react-router-dom";

const stepsData = getStepsData();

type MobileStepperProps = {
    active: number
}

function MobileStepperComponent({active} : MobileStepperProps){
    let history = useHistory();
    let [data, setData] = useState<any>(null);

    useEffect(() => {
        setData(stepsData[active - 1]);
    },[active])

    const goPage = (page: string) => {
        history.push(page);
    }

    return (
        <>
            {(active >= 0 && active <= 4) && (
                <div className="d-flex justify-content-between align-items-center d-md-none">
                    <IconButton disabled={(active === 1)}  onClick={() => goPage(data?.prev)}>
                        <ChevronLeftIcon className={(active === 1 ? "custom-disable-color" : "text-primary")} fontSize={"large"}/>
                    </IconButton>
                    <Chip color={"secondary"} className="text-white" avatar={<Avatar className="text-white">{active}</Avatar>} label={data?.label} />
                    <IconButton disabled={(active === 4)}  onClick={() => goPage(data?.next)}>
                        <ChevronRightIcon className={(active === 4 ? "custom-disable-color" : "text-primary")}  fontSize={"large"}/>
                    </IconButton>
                </div>
            )}

        </>
    )
}

export default MobileStepperComponent
