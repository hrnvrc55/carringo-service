import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import MapArea from "../components/MapArea";
import Button from "@material-ui/core/Button";
import { useHistory} from "react-router-dom";
import ForwardIcon from "@material-ui/icons/Forward";
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import {AppProviderContext} from "../providers/AppProvider";
import {themeData} from "../utils/theme";
import TextInput from "../components/TextInput";
import AlertDialog from "../components/dialogs/AlertDialog";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListIcon from '@material-ui/icons/List';
import RoomIcon from '@material-ui/icons/Room';
import {garageValidate} from "../utils/validation";

const garagesData = [
    {id: 1, name: "Tekşen Servis", address: "Teksen Otomotiv, Yenimahalle, 55080 Canik/Samsun",  selected: false, lat: 41.2965075, lng: 36.2389533},
    {id: 2, name: "ÖZDERE Service", address: "Çankırı Sanayi No: 5 Çankırı/Çerkeş",  selected: false, lat: 40.912348, lng: 32.806211},
    {id: 3, name: "Ünsal Servis Bakım", address: "Bayburt Sanayi No: 4 Bayburt/Atakum", selected: false, lat: 40.217851, lng: 40.205518},
    {id: 4, name: "YILMAZ Service", address: "Gaziantep Sanayi No: 8 Gaziantep/Merkez", selected: false, lat: 41.279701, lng: 36.336067},

]

const CustomRadio = withStyles({
    root: {
        color: themeData.third,
        '&$checked': {
            color: themeData.success,
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

type AlertDialog = {
    open: boolean,
    alertType: string,
    title?: string,
    description?: string
}

function Garages(){

    const provider = React.useContext(AppProviderContext);
    let history = useHistory();

    let [garages, setGarages] = useState<any>([]);
    const [value, setValue] = useState<any>(0);
    let [openAlertDialog, setOpenAlertDialog] = useState<AlertDialog>({open: false, alertType: '', title:'', description: ''})
    const [tab, setTab] = useState<any>(0);


    useEffect(() => {
        setGarages(garagesData);
        setValue(provider?.form?.garage?.id);
    },[provider?.form?.garage])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
        let found = garages.find((x: any) => x.id === Number(event.target.value));
        provider?.onChange("garage", found);
    };

    const tableChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    }

    function onAlertDialogClose(){
        setOpenAlertDialog({open: false, alertType: '', title:'', description: ''});
    }

    function submit(){

        let validateStatus = garageValidate(provider?.form);
        if(validateStatus === false){
            setOpenAlertDialog({open: true, title: 'Dikkat!', description: "Lütfen servis seçiniz", alertType: "danger"});
            return false;
        }else{
            history.push('/appointment');
        }
    }

    return (
        <Layout title={"Servisler"} stepper={true}>
            <AlertDialog
                open={openAlertDialog.open}
                title={openAlertDialog.title}
                onClose={onAlertDialogClose}
                alertType={openAlertDialog.alertType}
                description={openAlertDialog.description}
            />

            <div className="mt-3 mt-md-2 mb-3 mx-2 px-3 bg-light custom-shadow">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column text-center mt-2">
                        <span className="h4">Servis Noktaları</span>
                        <small>Listeden veya haritadan randevu almak istediğiniz servisi seçin</small>
                    </div>
                </div>
                <div>
                    <Tabs
                        className="d-md-none d-block"
                        value={tab}
                        onChange={tableChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab icon={<ListIcon/>} label="Listeden Seç" />
                        <Tab icon={<RoomIcon/>} label="Haritadan Seç" />
                    </Tabs>
                </div>

                <hr/>
                <div className="row">
                    {tab === 0 && (
                        <div className="col-12 col-md-4 animate__animated animate__bounceInLeft">
                            <TextInput label={"Ara"} onChange={() => {}} name={"search"}/>
                            <div className="list-area">
                                <FormControl component="fieldset" className="list-items">
                                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                        {garages.map((item: any, idx: number) => (
                                            <div key={"garage-list-item" + idx} className={"mb-2 pl-2 pt-2 list-card custom-shadow" + (value === item.id ? " active": " ")}>
                                                <FormControlLabel
                                                    value={item.id}
                                                    control={<CustomRadio />}
                                                    label={item.name}
                                                    labelPlacement="end"
                                                />
                                                <p className="text-muted">{item.address}</p>

                                            </div>
                                        ))}

                                    </RadioGroup>
                                </FormControl>

                            </div>
                        </div>
                    )}

                    {tab === 1 && (
                        <div className="col-12 col-md-8 d-block animate__animated animate__bounceInRight">
                            <MapArea garages={garages} />
                        </div>
                    )}

                    <div className="col-12 col-md-8 d-none d-md-block animate__animated animate__bounceInRight">
                        <MapArea garages={garages} />
                    </div>

                </div>
                <div className="d-flex justify-content-end my-3">
                    <Button variant={"contained"} color={"primary"} onClick={() => submit()} className="text-white custom-button" >Devam Et <ForwardIcon/></Button>
                </div>
            </div>
        </Layout>
    )
}

export default Garages;
