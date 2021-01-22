import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import ServiceCard from "../components/ServiceCard";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
import TollIcon from '@material-ui/icons/Toll';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import HealingIcon from '@material-ui/icons/Healing';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import {AppProviderContext} from "../providers/AppProvider";
import ForwardIcon from "@material-ui/icons/Forward";
import AlertDialog from "../components/dialogs/AlertDialog";
import {serviceValidate} from "../utils/validation";

const servicesData = [
    {id: 1, name: "Klima", icon: <AcUnitIcon className="icon"/>, selected: false},
    {id: 2, name: "Akü", icon: <BatteryCharging60Icon className="icon"/>, selected: false},
    {id: 3, name: "Frenler", icon: <TollIcon className="icon"/>, selected: false},
    {id: 4, name: "Debriyaj", icon: <ViewCarouselIcon className="icon"/>, selected: false},
    {id: 5, name: "Lastikler", icon: <ViewAgendaIcon className="icon"/>, selected: false},
    {id: 6, name: "Bakım", icon: <HealingIcon className="icon"/>, selected: false},
    {id: 7, name: "Triger", icon: <LocationSearchingIcon className="icon"/>, selected: false},

]

type AlertDialog = {
    open: boolean,
    alertType: string,
    title?: string,
    description?: string
}

function Services(){
    let history = useHistory();

    const provider = React.useContext(AppProviderContext);
    const [services, setServices] = useState<any>([]);
    let [openAlertDialog, setOpenAlertDialog] = useState<AlertDialog>({open: false, alertType: '', title:'', description: ''})

    useEffect(() => {
      setServices(servicesData);
    },[])

    function onClick(data: any){
        let oldServices = services;
        let newData = oldServices.map((item: any) => {
            if(item.id === data.id){
                let newItem = item;
                newItem.selected = !data.selected;
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
        let validateStatus = serviceValidate(provider?.form);
        if(validateStatus === false){
            setOpenAlertDialog({open: true, title: 'Dikkat!', description: "Lütfen en az 1 hizmet türü seçiniz", alertType: "danger"});
            return false;
        }else{
            history.push('/garages');
        }
    }

    return (
        <Layout title={"Hizmetler"} stepper={true}>
            <AlertDialog
                open={openAlertDialog.open}
                title={openAlertDialog.title}
                onClose={onAlertDialogClose}
                alertType={openAlertDialog.alertType}
                description={openAlertDialog.description}
            />
            <div className="bg-light mt-3 mt-md-2 mb-3 mx-2 px-3 custom-shadow">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column text-center mt-2">
                        <span className="h4">Hizmetler</span>
                        <small>Almak istediğiniz hizmetleri seçiniz</small>
                    </div>
                </div>
                <hr/>
               <div className="d-flex flex-wrap justify-content-center">
                   {services.map((item : any, idx: number) => (
                       <>
                       <ServiceCard onClick={onClick} key={"service-card" + idx} data={item}/>
                       </>
                   ))}
               </div>
               <div className="d-flex justify-content-end mt-2 mb-3">
                   <Button variant={"contained"} color={"primary"} onClick={() => submit()}  className="text-white custom-button">Devam Et <ForwardIcon/></Button>
               </div>
            </div>
        </Layout>
    )
}

export default Services;
