import Card from "@material-ui/core/Card";
import CardB from "react-bootstrap/Card";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect, useState} from "react";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Accordion, Button, Overlay} from "react-bootstrap";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ServiceDetailDialog from "./dialogs/ServiceDetailDialog";



type ServiceCardProps = {
    data: any,
    onClick:(item: any) => void,
}


function ServiceCard({data, onClick} : ServiceCardProps) {

    let [open, setOpen] = useState<boolean>(false);
    let [haveDetail, setHaveDetail] = useState<boolean>(false);

    useEffect(() => {
        setHaveDetail(Boolean(data?.details?.length > 0));
        console.log(data, 'dataa');
    }, []);

    function onClickCard(){
        //onClick(data)
        console.log(data, 'dataa');
        if(data.details.length > 0){
            setOpen(!open);
        }else{
            let newData = {
                id: data.id,
                name: data.name,
                selected: !data.selected,
                icon: data.icon,
                details: data.details,
                selectedDetails: null
            }
            onClick(newData);
        }

    }

    function onSubmit(checkedList: any){
        let filteredData: any = null;

        if(checkedList !== null){
            let filteredArray = Object.keys(checkedList).filter(key => checkedList[key].status === true);
            filteredArray.map((item: any, idx: number) => {
                filteredData = {
                    ...filteredData,
                    [item] : checkedList[item]
                }
            })
        }else{
            filteredData = null;
        }


        let newData = {
            id: data.id,
            name: data.name,
            selected: filteredData ? true : false,
            icon: data.icon,
            details: data.details,
            selectedDetails: filteredData
        }
        onClick(newData);
        setOpen(false);
    }

    return(
        <>
        <div className="d-none d-md-block position-relative">
            <Card onClick={() => onClickCard()}
                  className={"service-card m-2 animate__animated animate__backInLeft" + (data.selectedDetails || data.selected ? " active" : " ")}>
                <CardContent>
                    <div className={"d-flex justify-content-center"}>
                        <div className="d-flex flex-column justify-content-center align-items-center  title">
                            {data.selected && (
                                <CheckCircleIcon className="selected-icon text-success"/>
                            )}
                            <div>
                                {data?.icon}
                            </div>
                            <div>
                                <span className="mt-2">{data?.name}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {data?.details?.length > 0 && open && (
                <ServiceDetailDialog
                    list={data?.details}
                    defaultList={data?.selectedDetails}
                    title={data?.name}
                    open={open}
                    onSubmit={(checkedList: any) =>{onSubmit(checkedList)}}
                    onClose={() => setOpen(false)}
                />
            )}

            {/*{open && data.details.length > 0 && (*/}
            {/*<div className="services-detail">*/}
            {/*    <div className="col">*/}
            {/*        {data.details?.map((item: any, idx: number) => (*/}
            {/*            <FormControlLabel*/}
            {/*                control={*/}
            {/*                    <Checkbox*/}
            {/*                        checked={false}*/}
            {/*                        onChange={(e) => {}}*/}
            {/*                        name="checkedB"*/}
            {/*                        color="primary"*/}
            {/*                    />*/}
            {/*                }*/}
            {/*                label={item.name}*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*)}*/}
        </div>
        <div className="d-md-none d-block mb-3">
            <Accordion className={"" + (data.selected ? " border border-success" : " ")} onClick={() => onClickCard()}>
                <CardB>
                    <CardB.Header className="bg-white">
                        <Accordion.Toggle as={Button} variant="link" eventKey={data.id + "accordion"} className="w-100">
                            <span className="text-dark ">{data.icon} <span className="pl-2">{data.name}</span></span>
                        </Accordion.Toggle>
                    </CardB.Header>
                    <Accordion.Collapse eventKey={data.id + "accordion"}>
                        <CardB.Body>
                            <div className="w-100">
                                {data.details?.map((item: any, idx: number) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={false}
                                                onChange={(e) => {}}
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label={item.name}
                                        className="w-100"
                                    />
                                ))}
                            </div>
                        </CardB.Body>
                    </Accordion.Collapse>
                </CardB>
            </Accordion>
        </div>
        </>
    )
}

export default ServiceCard;
