import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

type AlertProps = {
    list: [],
    defaultList?: any
    onSubmit: (checkedList: any) => void,
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="right" ref={ref} {...props} />;
});


function ServiceDetailCollapse({defaultList, onSubmit, list} : AlertProps){

    let [checkedList, setCheckedList] = useState<any>(null);

    console.log(defaultList, 'default list');


    useEffect(() => {
        setCheckedList(defaultList);
    }, [defaultList])

    const onCheck = (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
        if(e.target.name === "checked-all"){
            if(e.target.checked === true){
                let newCheckedList = {
                    ["checked-all"] : {
                        status: e.target.checked,
                        data: item
                    }
                };
                list.map((item: any, idx: number) => {
                    newCheckedList = {
                        ...newCheckedList,
                        ['checked' + item.id] : {
                            status: e.target.checked,
                            data: item
                        }
                    }

                })

                setCheckedList(newCheckedList);
                onSubmit(newCheckedList);
            }else{
                setCheckedList(null);
                onSubmit(null);

            }
        }else{
            let newCheckedList = {
                ...checkedList,
                [e.target.name] : {
                    status: e.target.checked,
                    data: item
                }
            }
            setCheckedList(newCheckedList);
            onSubmit(newCheckedList);

        }
    }



    return (
            <div className="d-flex flex-column">
                <FormControlLabel
                    key={"select-all-key"}
                    control={
                        <Checkbox
                            checked={(checkedList ? Boolean(checkedList['checked-all']?.status) : false)}
                            onChange={(e) => {onCheck(e, '')}}
                            name="checked-all"

                        />
                    }
                    className="select-all"
                    label={"Tümünü Seç"}
                />

                {list?.map((item: any, idx: number) => (
                    <FormControlLabel
                        className="m-0"
                        key={"select" + idx}
                        control={
                            <Checkbox
                                checked={(checkedList ? Boolean(checkedList['checked' + item.id]?.status) : false)}
                                onChange={(e) => {onCheck(e, item)}}
                                name={'checked' + item.id}
                                color="primary"
                            />
                        }
                        label={item.name}
                    />
                ))}
            </div>
    );
}

export default ServiceDetailCollapse;
