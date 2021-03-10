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

import {garages, services} from "../utils/static-datas";
import {apiUrl} from "../utils/config";
import axios from "axios";
import PageAlert from "../components/PageAlert";
import CitySelector from "../components/CitySelector";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {Divider} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '36ch',
        },
        inline: {
            display: 'inline',

        },
    }),
);

const garagesData = garages;

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
    const classes = useStyles();

    const provider = React.useContext(AppProviderContext);
    let history = useHistory();

    let [garages, setGarages] = useState<any>([]);
    const [value, setValue] = useState<any>(0);
    let [openAlertDialog, setOpenAlertDialog] = useState<AlertDialog>({open: false, alertType: '', title:'', description: ''})
    const [tab, setTab] = useState<any>(0);


    useEffect(() => {
        //setGarages(garagesData);
        setValue(provider?.form?.garage);
        let selectedCity = provider?.form?.selectedCity?.il;
        load(selectedCity);
    },[])

    async function load(city?: string){
        console.log(city, 'city selected')
        await axios({
            method: 'get',
            url: apiUrl + '/' + 'services/app/CompanyProperty/GetServices?brandId=' + provider?.form?.brand?.id + (city ? "&city=" + city : "") ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //"Authorization" : isLogin() ? "Bearer " + user.token : null
            },
        }).then(resp => {
            let respData = resp.data.result;
            console.log(respData, 'respp')

            let newRespData = respData.map((item: any, idx: number) => {
                let splitted = item.coordinate.split(",");

                return {
                    id: item.id,
                    name: item.name,
                    address: item.addressDescription,
                    city:item.city,
                    district: item.district,
                    selected: false,
                    lat: Number(splitted[0]),
                    lng: Number(splitted[1]),
                    services: services,
                    phone: item.phoneNumber,
                    email: item.emailAddress
                }
            })

            setGarages(newRespData);
        })
    }

    const handleChange = (value: any) => {
        provider?.onChange("garage", value);
    };

    const tableChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    }

    function onAlertDialogClose(){
        setOpenAlertDialog({open: false, alertType: '', title:'', description: ''});
    }

    function onChangeCitySelector(key: string, value: any){
        console.log(value, 'valuee');
        load(value?.il);
        provider?.onChange("selectedCity", value);
        provider?.onChange("garage", undefined);

    }

    function submit(){

        let validateStatus = garageValidate(provider?.form);
        if(validateStatus === false){
            setOpenAlertDialog({open: true, title: 'Dikkat!', description: "Lütfen servis seçiniz", alertType: "danger"});
            return false;
        }else{
            history.push('/services');
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
                {garages.length > 0 ? (
                    <>
                        <div className="row">
                            {tab === 0 && (
                                <div className="col-12 col-md-4 animate__animated animate__bounceInLeft">
                                    {/*<TextInput label={"Ara"} onChange={() => {}} name={"search"}/>*/}
                                    <CitySelector
                                        name={"city"}
                                        onChange={onChangeCitySelector}
                                        label={"Şehir Seçiniz"}
                                        defaultValue={provider?.form?.selectedCity}
                                        errors={[]}
                                    />
                                    <div className="list-area">
                                        {/*<FormControl component="fieldset" className="list-items">*/}
                                        {/*    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>*/}
                                        {/*        {garages.map((item: any, idx: number) => (*/}
                                        {/*            <div key={"garage-list-item" + idx} className={"mb-2 pl-2 pt-2 list-card custom-shadow" + (value === item.id ? " active": " ")}>*/}
                                        {/*                <FormControlLabel*/}
                                        {/*                    value={item.id}*/}
                                        {/*                    control={<CustomRadio />}*/}
                                        {/*                    label={item.name}*/}
                                        {/*                    labelPlacement="end"*/}
                                        {/*                />*/}
                                        {/*                <p className="text-muted mb-0">{item.address}</p>*/}
                                        {/*                <p className={"text-muted"}>{item.city}/{item.district}</p>*/}

                                        {/*            </div>*/}
                                        {/*        ))}*/}

                                        {/*    </RadioGroup>*/}
                                        {/*</FormControl>*/}
                                        <List component="nav" aria-label="main mailbox folders" className={classes.root}>
                                            {garages.map((item: any, idx: number) => (
                                                <>
                                                <ListItem button onClick={() => {handleChange(item)}} className={"list-card" + (provider?.form?.garage?.id === item?.id ? " active": " ")}>
                                                    {provider?.form?.garage?.id === item?.id ? (
                                                        <CheckCircleIcon className="active-icon text-success"/>
                                                    ) : (
                                                        <RadioButtonUncheckedIcon className="active-icon text-secondary"/>
                                                    )}
                                                    <div>
                                                        <ListItemText primary={item.name} />
                                                        <p className="text-muted mb-0">{item.address}</p>
                                                        <p className={"text-muted"}>{item.city}/{item.district}</p>
                                                    </div>
                                                </ListItem>
                                                </>
                                            ))}
                                        </List>


                                    </div>
                                </div>
                            )}

                            {tab === 1 && (
                                <div className="col-12 col-md-8  animate__animated animate__bounceInRight">
                                    <div className="map-mobil-area">
                                        <MapArea garages={garages}/>
                                    </div>
                                </div>
                            )}

                            <div className="col-12 col-md-8 d-none d-md-block animate__animated animate__bounceInRight">
                                <div className="map-area">
                                    <MapArea garages={garages}/>
                                </div>
                            </div>

                        </div>
                        <div className="d-flex justify-content-end my-3">
                            <Button variant={"contained"} color={"primary"} onClick={() => submit()} className="text-white custom-button" >Devam Et <ForwardIcon/></Button>
                        </div>
                    </>
                ) : (
                    <div>
                        <PageAlert message={"Seçtiğiniz araç markası ve şehre hizmet veren servis bulunmamaktadır!"} type={"danger"}/>
                        <div className="d-flex justify-content-center">
                            <div className="w-50 mt-2">
                                <CitySelector
                                    name={"city"}
                                    onChange={onChangeCitySelector}
                                    label={"Başka Şehir Seç"}
                                    errors={[]}
                                    defaultValue={provider?.form?.selectedCity}

                                />
                            </div>
                        </div>
                    </div>
                )

                }

            </div>
        </Layout>
    )
}

export default Garages;
