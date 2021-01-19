import React, {useEffect} from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import RedeemIcon from '@material-ui/icons/Redeem';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import DateRangeIcon from '@material-ui/icons/DateRange';
import {useHistory} from "react-router-dom";
import getStepsData from "../utils/steps";
import {themeData} from "../utils/theme";

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props: StepIconProps) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundColor: themeData.secondary,
        },
    },
    completed: {
        '& $line': {
            backgroundColor: themeData.secondary,
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor: themeData.secondary,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundColor: themeData.secondary,
    },
});

function ColorlibStepIcon(props: StepIconProps) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <DriveEtaIcon />,
        2: <RedeemIcon />,
        3: <EmojiTransportationIcon />,
        4: <DateRangeIcon/>
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);

function getSteps() {
    return getStepsData();
}

function getStepContent(step: number) {
    switch (step) {
        case 1:
            return 'Select campaign settings...';
        case 2:
            return 'What is an ad group anyways?';
        case 3:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

type StepperProps = {
    active: number
}

export default function CustomizedSteppers({active} : StepperProps) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    let history = useHistory();

    useEffect(() => {
       setActiveStep(active -1);
    },[active])

    const goStep = (item: any) => {
        if(item.sort > activeStep){
            return false;
        }else{
            history.push(item.route);
        }
    }

    return (
        <>
        <div className="d-none d-md-block">
            {(activeStep >= 0 && activeStep <= 3) && (
                <div className={classes.root}>
                    <Stepper alternativeLabel activeStep={activeStep} className="" connector={<ColorlibConnector/>}>
                        {steps.map((item) => (
                            <Step style={{cursor: 'pointer'}} onClick={() => {goStep(item)}} key={item.label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{item.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            )}
        </div>
        </>
    );
}

