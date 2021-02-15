import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

type AlertProps = {
    open: boolean,
    title?: string,
    description?: string,
    alertType?: string,
    onClose: () => void
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type typesArray = {
    [key: string]: React.ReactElement;
    success: React.ReactElement,
    danger: React.ReactElement,
    warning: React.ReactElement,
}


function AlertDialog({open, title, description, alertType, onClose} : AlertProps){
    const typesArray : typesArray = {
        success: <CheckCircleIcon style={{fontSize: "50px"}} className="text-success"/>,
        danger: <ErrorIcon style={{fontSize: "50px"}} className="text-danger"/>,
        warning: <WarningIcon style={{fontSize: "50px"}} className="text-warning"/>,
    }

    useEffect(() => {
        setTimeout(() => {

        }, 3000);
    }, [])
    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={() => handleClose()}
        >
            <DialogContent className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-center">
                    {typesArray[alertType!]}
                </div>
                <DialogContentText id="alert-dialog-slide-description" className="text-center text-md-left mt-2">
                    <strong>{description}</strong>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {/*<Button onClick={handleClose} color="primary">*/}
                {/*    Disagree*/}
                {/*</Button>*/}
                <Button onClick={handleClose} color="primary">
                    Tamam
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog;
