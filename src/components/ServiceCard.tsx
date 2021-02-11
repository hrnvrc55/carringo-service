import Card from "@material-ui/core/Card";
import CardB from "react-bootstrap/Card";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect, useState} from "react";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Accordion, Button, Overlay} from "react-bootstrap";



type ServiceCardProps = {
    data: any,
    onClick:(item: any) => void,
}


function ServiceCard({data, onClick} : ServiceCardProps) {

    let [open, setOpen] = useState<boolean>(false);
    let [haveDetail, setHaveDetail] = useState<boolean>(false);

    useEffect(() => {
        setHaveDetail(Boolean(data?.details?.length > 0));

    }, []);

    function onClickCard(){
        onClick(data)
        setOpen(!open);
    }

    return(
        <>
        <div className="d-none d-md-block position-relative">
            <Card onClick={() => onClickCard()}
                  className={"service-card m-2 animate__animated animate__backInLeft" + (data.selected && haveDetail ? " active have-detail" : data.selected && !haveDetail ? " active" : " ")}>
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



                        {/*{open && data.details.length > 0 && (*/}
                        {/*    <div className="d-flex flex-fill flex-wrap ml-3 pl-3 detail animate__animated animate__backInRight">*/}
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
                        {/*)}*/}
                    </div>
                </CardContent>
            </Card>
            {open && data.details.length > 0 && (
            <div className="services-detail">
                <div className="col">
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
                        />
                    ))}
                </div>
            </div>
            )}
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
