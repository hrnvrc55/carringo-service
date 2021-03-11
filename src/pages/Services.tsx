import React, {useEffect, useState, useRef} from "react";
import Layout from "../components/Layout";
import ServiceCard from "../components/ServiceCard";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

import {AppProviderContext} from "../providers/AppProvider";
import ForwardIcon from "@material-ui/icons/Forward";
import AlertDialog from "../components/dialogs/AlertDialog";
import {serviceValidate} from "../utils/validation";
import axios from 'axios';
import {apiUrl} from "../utils/config";

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import HealingIcon from "@material-ui/icons/Healing";
import PageAlert from "../components/PageAlert";

type AlertDialog = {
    open: boolean,
    alertType: string,
    title?: string,
    description?: string
}

function Services(){
    let history = useHistory();
    const servicesRef = useRef<HTMLHeadingElement>(null);
    const contractsRef = useRef<HTMLHeadingElement>(null);


    const provider = React.useContext(AppProviderContext);
    const [services, setServices] = useState<any>([]);
    let [openAlertDialog, setOpenAlertDialog] = useState<AlertDialog>({open: false, alertType: '', title:'', description: ''})
    let [loading, setLoading] = useState(false);

    useEffect(() => {
      let selectedGarage = provider?.form?.garage;
      load(selectedGarage);
      console.log(selectedGarage, 'selected garage');
      //setServices(selectedGarage?.services);
    },[history])

    async function load(garage: any){
        setLoading(true);
        await axios.get(apiUrl+'/services/app/ServiceWork/GetServiceWorksGroupedByCategory', {params:{
            serviceId: garage.id
            }}).then(resp => {
            let respData = resp.data.result;
            if(respData.length > 0){
                let newData = respData.map((item: any) => {

                    let newDetails = item.items.map((item: any) => {
                        return {
                            id:item.serviceWorkId,
                            name: item.workItemName,
                            code: ""
                        }
                    })

                    return     {
                        id: item.categoryId,
                        name: item.categoryName,
                        icon: <HealingIcon className="icon"/>,
                        selected: false,
                        details: newDetails
                    }
                })
                setServices(newData);
            }
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        })
    }

    function onClick(data: any){
        let oldServices = services;
        let newData = oldServices.map((item: any) => {
            if(item.id === data.id){
                let newItem = item;
                newItem.selected = data.selected;
                newItem.selectedDetails = data.selectedDetails;
                return newItem;
            }else{
                return item;
            }
        });
        setServices(newData);
        let filterData = newData.filter((x: any) => x.selected === true);
        provider?.onChange("services", filterData);
    }



    function onAlertDialogClose(){
        setOpenAlertDialog({open: false, alertType: '', title:'', description: ''});
    }

    function submit(){
        let validate = serviceValidate(provider?.form);

        if(validate && validate.status === false){
            setOpenAlertDialog({open: true, title: 'Dikkat!', description: validate.message, alertType: "danger"});
            return false;
        }else{
            history.push('/appointment');
        }
    }

    return (
        <Layout title={"Servis Hizmetleri"} stepper={true}>
            <AlertDialog
                open={openAlertDialog.open}
                title={openAlertDialog.title}
                onClose={onAlertDialogClose}
                alertType={openAlertDialog.alertType}
                description={openAlertDialog.description}
            />
            <div className="bg-light mt-3 mt-md-2 mb-3 mx-2 px-3 custom-shadow">
                {loading ? (
                    <div className="d-flex justify-content-center py-4">
                        Yükleniyor...
                    </div>
                ) : (services.length > 0) ? (
                    <>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex flex-column text-center mt-2">
                                <span className="h4">Servis Hizmetleri</span>
                                <p><small>Seçtiğiniz</small> <strong
                                    className="text-primary">{provider?.form?.garage?.name}</strong> <small>aşağıdaki hizmetleri
                                    vermektedir. Almak istediğiniz hizmetleri seçiniz</small></p>
                            </div>
                        </div>
                        <hr/>
                        <div className="d-flex flex-wrap justify-content-center">
                            {services.map((item: any, idx: number) => (
                                <ServiceCard onClick={onClick} key={"service-card" + idx} data={item}/>
                            ))}
                        </div>

                        {provider?.form?.services?.length > 0 && (
                            <div className="mt-4 mb-3 px-3 d-none d-lg-block">
                                <div className="">
                                    <span style={{fontWeight: 600}}>Seçilen Hizmetler</span>
                                </div>
                                <hr className="my-1"/>
                                <ul>
                                    {
                                        provider?.form?.services.map((item: any, idx: number) => (
                                            <li>
                                                <div className="d-flex justify-content-start my-3 align-items-center" key={"selected-services" + idx}>
                                                    <div>
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-start align-items-center">
                                                        {item.selectedDetails && (
                                                            <>
                                                                <KeyboardArrowRightIcon/>
                                                                {Object.keys(item.selectedDetails).map((detail: any, idx: number) => {
                                                                    if (item.selectedDetails[detail]?.data === '' || item.selectedDetails[detail]?.data === null) {
                                                                        return false;
                                                                    } else {
                                                                        return (
                                                                            <span className="ml-1 badge badge-secondary p-2">
                                                                    {item.selectedDetails[detail]?.data?.name}
                                                                </span>
                                                                        )
                                                                    }
                                                                })}
                                                            </>
                                                        )}

                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )}


                        <div className="d-flex justify-content-end mt-2 mb-3">
                            <Button variant={"contained"} color={"primary"} onClick={() => submit()}
                                    className="text-white custom-button">Devam Et <ForwardIcon/></Button>
                        </div>
                    </>
                ) : (
                    <div className="d-flex justify-content-center py-4">
                        <PageAlert message={"Seçtiğiniz " + provider?.form?.garage?.name + " servisinin hizmet listesi bulunmamaktadır" } type={"danger"}/>
                    </div>
                )}

            </div>
        </Layout>
    );
}

export default Services;
