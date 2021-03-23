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
import {HideAt, ShowAt} from "react-with-breakpoints";
import ServiceDetailCollapse from "./dialogs/ServiceDetailCollapse";
import {services} from "../utils/static-datas";



type ServiceCardProps = {
    data: any,
    onClick:(item: any) => void,
}


function ServiceCard({data, onClick} : ServiceCardProps) {


    let [open, setOpen] = useState<boolean>(false);
    let [openCollapse, setOpenCollapse] = useState<boolean>(false);
    let [haveDetail, setHaveDetail] = useState<boolean>(false);

    useEffect(() => {
        setHaveDetail(Boolean(data?.details?.length > 0));

    }, [data]);

    function onClickCard(){
        //onClick(data)
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

    function onClickCollapse(){
        setOpenCollapse(!openCollapse);
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

    return (
        <>
            <HideAt breakpoint={"mediumAndBelow"}>

                <div className="position-relative">
                    <Card onClick={() => onClickCard()}
                          className={"service-card m-2 animate__animated animate__backInLeft" + (data.selectedDetails || data.selected ? " active" : " ")}>
                        <CardContent>
                            <div className={"d-flex justify-content-center"}>
                                <div className="d-flex flex-column justify-content-center align-items-center  title">
                                    {data.selected && (
                                        <CheckCircleIcon className="selected-icon text-success"/>
                                    )}
                                    <div>
                                        {services.find(x => x.name === data.name)?.icon}

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
                            onSubmit={(checkedList: any) => {
                                onSubmit(checkedList)
                            }}
                            onClose={() => setOpen(false)}
                        />
                    )}
                </div>
            </HideAt>
            <ShowAt breakpoint={"mediumAndBelow"}>
                <div className=" mb-3 w-100">
                    {data.details.length > 0 ? (
                        <Accordion className={"" + (data.selected ? " border border-success rounded" : " ")}
                                   onClick={() => onClickCollapse()}>
                            <CardB>
                                <CardB.Header className="bg-white">
                                    <Accordion.Toggle as={Button} variant="link" eventKey={data.id + "accordion"}
                                                      className="w-100">
                                    <span className="text-dark ">{data.icon} <span
                                        className="pl-2">{data.name}</span></span>
                                    </Accordion.Toggle>
                                </CardB.Header>
                                <Accordion.Collapse eventKey={data.id + "accordion"}>
                                    <CardB.Body>
                                        <div className="w-100">
                                            {data?.details?.length > 0 && (
                                                <ServiceDetailCollapse
                                                    list={data?.details}
                                                    defaultList={data?.selectedDetails}
                                                    onSubmit={(checkedList: any) => {
                                                        onSubmit(checkedList)
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </CardB.Body>
                                </Accordion.Collapse>
                            </CardB>
                        </Accordion>
                    ) : (
                        <Button onClick={() => onClickCard()} className={"bg-white w-100 py-3 border" + (data.selectedDetails || data.selected ? "  border-success" : " ")}>
                                <span className="text-dark ">{data.icon} <span
                                    className="pl-2">{data.name}</span></span>
                        </Button>
                    )}

                </div>
            </ShowAt>
        </>
    );
}

export default ServiceCard;
