import React, {useEffect, useState, useRef} from "react";
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
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

const servicesData = [
    {id: 1, name: "Klima", icon: <AcUnitIcon className="icon"/>, selected: false},
    {id: 2, name: "Akü", icon: <BatteryCharging60Icon className="icon"/>, selected: false},
    {id: 3, name: "Yağ", icon: <LocalDrinkIcon className="icon"/>, selected: false},
    {id: 4, name: "Lastik & Jant", icon: <ViewAgendaIcon className="icon"/>, selected: false},
    {id: 5, name: "Elektrik", icon: <DeviceHubIcon className="icon"/>, selected: false},
    {id: 6, name: "Bakım", icon: <HealingIcon className="icon"/>, selected: false},

]

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

    useEffect(() => {
      setServices(servicesData);
    },[history])

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

    function onClickContract(event: React.ChangeEvent<HTMLInputElement>){
        provider?.onChange(event.target.name, event.target.checked);
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
            history.push('/my-vehicle');
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
                       <ServiceCard onClick={onClick} key={"service-card" + idx} data={item}/>
                   ))}
               </div>
               <div className="my-3 animate__animated animate__backInUp">
                   <div className="d-flex justify-content-start align-items-start">
                       <Checkbox className="pt-0" checked={provider?.form?.data_permission} onChange={onClickContract} name="data_permission" />
                       <span>Carringo Servis <a href="">Veri İşleme İzni</a> metnini okudum, onaylıyorum.</span>
                   </div>
                   <div className="d-flex justify-content-start align-items-start">
                       <Checkbox className="pt-0" checked={provider?.form?.share_permission} onChange={onClickContract} name="share_permission" />
                       <span>......’ya ait diğer markalar kapsamında ..... San. ve Tic. A.Ş.
                        tarafından yukarıda yer alan iletişim bilgilerime reklam, promosyon gibi amaçlarla ticari elektronik
                        ileti gönderilmesini, bilgilerimin bu amaçla kullanılmasını ve üçüncü kişilerle paylaşılmasını,
                        mevzuat kapsamındaki haklarım saklı kalmak kaydı ile kabul ediyorum.</span>
                   </div>
                   <div className="d-flex justify-content-start align-items-start">
                       <Checkbox className="pt-0" checked={provider?.form?.person_data_permission} onChange={onClickContract} name="person_data_permission" />
                       <span><a href="">Kişisel verilerin korunması</a> metnini okudum, kabul ediyorum.</span>
                   </div>
               </div>

               <div className="d-flex justify-content-end mt-2 mb-3">
                  <Button variant={"contained"} color={"primary"} onClick={() => submit()}  className="text-white custom-button">Devam Et <ForwardIcon/></Button>
               </div>
            </div>
        </Layout>
    )
}

export default Services;
