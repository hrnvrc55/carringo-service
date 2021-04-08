import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import Button from "@material-ui/core/Button";
import {AppProviderContext} from "../providers/AppProvider";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import DateInput from "../components/DateInput";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import TimeInput from "../components/TimeInput";
import PhoneInput from "../components/PhoneInput";
import {Chip} from "@material-ui/core";
import {appointmentValidate, garageValidate, homeValidate, serviceValidate} from "../utils/validation";
import {useHistory} from "react-router-dom";
import {HideAt, ShowAt} from "react-with-breakpoints";
import {Accordion, Card} from "react-bootstrap";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from "moment";
import axios from "axios";
import {DatePicker} from "@material-ui/pickers";
import {apiUrl} from "../utils/config";
import DenemeSelect from "../components/DenemeSelect";
import {start} from "repl";
import FullLoader from "../components/FullLoader";
import {faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {platformArray} from "../utils/appointment-status";


function Appointment(){
    const provider = React.useContext(AppProviderContext);
    let [errors, setErrors] = useState<any>([]);
    let [activeCollapseKey, setActiveCollapseKey] = useState<any>(null);
    let [maxDate, setMaxDate] = useState<any>(null);
    let [minDate, setMinDate] = useState<any>(null);
    let [availableDates, setAvailableDates] = useState<any>(null);
    let [availableTimes, setAvailableTimes] = useState<any>([]);
    let [loading, setLoading] = useState<boolean>(false);
    let [createdAppointment, setCreatedAppointment] = useState<any>(null);
    let history = useHistory();

    useEffect(() => {
        load()
    }, [])

    async function load() {
        let startDate =moment().add(1, 'days')
        let endDate =moment().add(3, 'days').add(1, 'months').subtract(1, 'days')
        console.log(startDate, 'start date')
        let id = provider?.form?.garage?.id;
        setMinDate(startDate);
        setMaxDate(endDate);
        const params = {
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
            companyPropertyId: id,
        };
       setLoading(true);
        axios.get(apiUrl + "/services/app/Appointment/GetAvailableAppointment", {params}).then(resp => {
            if(resp.data.result.length > 0) {
                setAvailableDates(resp.data.result);
                setAvailableTimes(resp.data?.result[0]?.time)
            }
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        })
    }


    function onChange(key: string, value: any) {
        provider?.onChange(key, value);
    }

    function onChangeDate(key: string, value: any, times: any){
        provider?.onChange(key, value);
        setAvailableTimes(times);
    }

    function submit(){
        let validateError = appointmentValidate(provider?.form);

        if(validateError.length > 0){
            setErrors(validateError);
            return false;
        }else{
            let homeValidateData = homeValidate(provider?.form);
            let serviceValidateData = serviceValidate(provider?.form);
            let garageValidateData = garageValidate(provider?.form);

            if(homeValidateData.length > 0){
                history.push('/');
                provider?.openGlobalAlert(true, "Uyarı", "Gerekli bilgileri doldurmadan adımı geçmemelisiniz", "warning");
            }else if(serviceValidateData && serviceValidateData.status === false){
                history.push('/services');
                provider?.openGlobalAlert(true, "Uyarı", serviceValidateData.message, "warning");

            }else if(garageValidateData === false){
                history.push('/garages');
                provider?.openGlobalAlert(true, "Uyarı", "Lütfen servis noktası seçiniz", "warning");

            }else {

                let currentForm = provider?.form;

                let replaced = currentForm?.phone.replace("(", '').replace(")", '').replace(" ", '');
                let currentPhone = replaced.replace(" ", '');
                let hizmetler: any = "";
                let plate: any = "";
                let vehicle = currentForm?.brand?.name + " " + currentForm?.model?.name + " " +currentForm?.gear?.name + " " + currentForm?.engine?.name
                currentForm?.services.map((item: any, idx: number) => {
                    hizmetler = hizmetler + item.name + "(";
                    Object.keys(item.selectedDetails).map((key) => {
                        if(item.selectedDetails[key]?.data){
                            hizmetler = hizmetler + item.selectedDetails[key]?.data?.name + ","
                        }
                    })
                    hizmetler = hizmetler + ")";
                })
                if(currentForm?.plate !== undefined){
                    plate = "(" +currentForm?.plate + ")";
                }

                let message = "Sayın " + currentForm?.first_name + " " + currentForm?.last_name + "; " + moment(currentForm.date).format("DD/MM/YYYY") + " tarihinde saat " + currentForm.time + " 'de " + currentForm?.garage.name + " için randevunuz oluşturulmuştur. Adres: " + currentForm?.garage?.address + ", Telefon: " + currentForm?.garage?.phone +". Konum: "+ "http://maps.google.com/maps?q="+currentForm?.garage?.lat +"," + currentForm?.garage?.lng;

                let serviceMessage = currentForm?.first_name + " " + currentForm?.last_name + " adına servisinizden "+moment(currentForm.date).format("DD/MM/YYYY")+" ("+currentForm.time +") tarihinde randevu alınmıştır.Telefon: " + currentPhone +",Email: " + currentForm?.email + ". Hizmetler: " + hizmetler + " Araç: " + vehicle + plate;

                let selectedDate = moment(provider?.form?.date).format('YYYY-MM-DD') + ' ' + provider?.form?.time;
                let selectedStartDate = moment(selectedDate).format('YYYY-MM-DD HH:mm');
                let selectedEndDate = moment(selectedDate).add(30, 'minute').format('YYYY-MM-DD HH:mm');

                let infoData = {
                   selectedServices: currentForm.services,
                   brand: provider?.form?.brand,
                   model: provider?.form?.model,
                   gear: provider?.form?.gear,
                   engine: provider?.form?.engine,
                   description:  provider?.form?.description
                }

                let params = {
                    plate: provider?.form?.plate,
                    companyPropertyId: provider?.form?.garage?.id,
                    caption: currentForm?.first_name + " " + currentForm?.last_name,
                    startDate: selectedStartDate,
                    endDate: selectedEndDate,
                    description: JSON.stringify(infoData),
                    firstName: currentForm?.first_name,
                    lastName: currentForm?.last_name,
                    eMailAddress: currentForm?.email,
                    phoneNumber: currentForm?.phone,
                    orderId: null,
                    status: 0,
                    source: platformArray.find(x => x.name === "Carringo")?.id,
                }

                let servicePhone = provider?.form?.garage?.phone;
                let serviceEmail = provider?.form?.garage?.email;

                setLoading(true);
                axios.post(apiUrl + "/services/app/Appointment/Create", params).then(resp => {
                    sendMessage(currentPhone, message, serviceMessage, currentForm?.email, servicePhone, serviceEmail);
                    provider?.saveAppointment(resp.data.result);
                    history.push("/success")
                    setLoading(false);
                }).finally(() => {
                    setLoading(false);
                })

            }
        }
    }

    async function sendMessage(phone: any , message: any, serviceMessage: any, email: any, servicePhone: any, serviceEmail: any){
        let params = {
            "kullaniciMesaji": message,
            "servisMesaji": serviceMessage,
            "numara": phone,
            "servisNumara": servicePhone,
            "servisMail" : serviceEmail,
            "mail": email
        }

        provider?.isLoading(true);
        await axios({
            method: 'post',
            url: 'https://api.carringoservis.com/sms/smsgonder' ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Carv': '!aldkjf01k31**_'
                //"Authorization" : isLogin() ? "Bearer " + user.token : null
            },
            data: params
        }).then(resp => {
            provider?.isLoading(false);
        }).catch((error) => {

            provider?.isLoading(false);
        }).finally(() => {
            provider?.isLoading(false);

        })
    }

    return (
        <Layout title={"Randevu"} stepper={true}>
            <FullLoader show={loading}/>
            <div className="mt-2 mb-3 px-3 pt-3">
            <div className="row">
                <div className="col-12 col-md-6 d-none d-md-block">
                        <div className="">
                            <div className="custom-card bottom-shadow p-3 mb-3 animate__animated animate__bounceInUp ">
                                <DoneAllIcon className="done-icon"/>
                                <span className="h5">Araç Bilgileri</span>
                                <hr className="my-2"/>
                                {provider?.form?.plate && (
                                    <span className="plate h5">{provider?.form?.plate}</span>
                                )}
                                <p>{provider?.form?.brand?.name} - {provider?.form?.model?.name} - {provider?.form?.gear?.name} - {provider?.form?.engine?.name}</p>
                                <p>{provider?.form?.kilometer} Km'de</p>
                            </div>
                            <div className="custom-card bottom-shadow p-3 mb-3 animate__animated animate__bounceInUp">
                                <DoneAllIcon className="done-icon"/>
                                <span className="h5">Seçilen Hizmetler</span>
                                <hr className="my-2"/>
                                <div className="d-flex justify-content-start">
                                    {provider?.form?.services?.map((item: any) => (
                                        <div className="d-flex flex-column flex-wrap">
                                            <Chip
                                                label={item.name}
                                                className="mr-2"
                                                variant="outlined"
                                                color="secondary"
                                            />
                                            <div className="d-flex flex-column pl-3 pt-2">
                                                {item.selectedDetails && (
                                                    <>
                                                        {Object.keys(item.selectedDetails).map((detail:any, idx: number) => {
                                                            if(item.selectedDetails[detail]?.data === '' || item.selectedDetails[detail]?.data === null){
                                                                return false;
                                                            }else{
                                                                return (
                                                                    <small className="w-100">- {item.selectedDetails[detail]?.data?.name} </small>
                                                                )
                                                            }
                                                        })}
                                                    </>
                                                )}

                                            </div>

                                        </div>

                                    ))}
                                </div>

                            </div>
                            <div className="custom-card bottom-shadow p-3 mb-3 animate__animated animate__bounceInUp">
                                <DoneAllIcon className="done-icon"/>
                                <span className="h5">Seçilen Servis</span>
                                <hr className="my-2"/>
                                <p className="mb-0">{provider?.form?.garage?.name}</p>
                                <p className="text-muted mb-0">{provider?.form?.garage?.address}</p>
                            </div>
                        </div>
                    </div>
                <div className="col-12 d-md-none d-block mb-3">
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} eventKey="0" onClick={() => setActiveCollapseKey(0)}>
                                    Araç Bilgilerim {activeCollapseKey === 0 ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0" >
                                <Card.Body>
                                    <div>
                                        {provider?.form?.plate && (
                                            <span className="plate h5">{provider?.form?.plate}</span>
                                        )}
                                        <p>{provider?.form?.brand?.name} - {provider?.form?.model?.name} - {provider?.form?.gear?.name} - {provider?.form?.engine?.name}</p>
                                        <p>{provider?.form?.kilometer} Km'de</p>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button}  eventKey="1" onClick={() => setActiveCollapseKey(1)}>
                                    Seçilen Servis {activeCollapseKey === 1 ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <p className="mb-0">{provider?.form?.garage?.name}</p>
                                    <p className="text-muted">{provider?.form?.garage?.address}</p>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button}  eventKey="2" onClick={() => setActiveCollapseKey(2)}>
                                    Seçilen Hizmetler {activeCollapseKey === 2 ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <div className="d-flex flex-wrap justify-content-start">
                                        {provider?.form?.services?.map((item: any) => (
                                            <div className="d-flex flex-column w-100">
                                                <Chip
                                                    label={item.name}
                                                    className=""
                                                    variant="outlined"
                                                    color="secondary"
                                                />
                                                <div className="d-flex flex-column pl-3 pt-2 mb-2">
                                                    {item.selectedDetails && (
                                                        <>
                                                            {Object.keys(item.selectedDetails).map((detail:any, idx: number) => {
                                                                if(item.selectedDetails[detail]?.data === '' || item.selectedDetails[detail]?.data === null){
                                                                    return false;
                                                                }else{
                                                                    return (
                                                                        <small className="w-100">- {item.selectedDetails[detail]?.data?.name} </small>
                                                                    )
                                                                }
                                                            })}
                                                        </>
                                                    )}

                                                </div>

                                            </div>

                                        ))}
                                    </div>

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>

                <div className="col-12  col-md-6 animate__animated animate__bounceInUp">
                    <div className="p-3 bg-light custom-shadow">
                        <div className="d-flex justify-content-center">
                            <div className="d-flex flex-column text-center mb-2">
                                <span className="h4">Randevu Bilgileri</span>
                                <small>Randevu tarih ve saatini seçip, bilgileri doldurunuz</small>
                            </div>
                        </div>
                        <hr/>
                        <DateInput
                            minDate={minDate}
                            maxDate={maxDate}
                            name={"date"}
                            onChange={onChangeDate}
                            label={"Tarih"}
                            availableDates={availableDates}
                        />
                        <TimeInput name={"time"} times={availableTimes} onChange={onChange} label={"Saat"}/>
                        <TextInput errors={errors} defaultValue={provider?.form?.first_name} label={"Adınız"} onChange={onChange} name={"first_name"}/>
                        <TextInput errors={errors} defaultValue={provider?.form?.last_name} label={"Soyadınız"} onChange={onChange} name={"last_name"}/>
                        <TextInput errors={errors} defaultValue={provider?.form?.email} label={"Eposta"} onChange={onChange} name={"email"}/>
                        <PhoneInput errors={errors} defaultValue={provider?.form?.phone} label={"Telefon"} onChange={onChange} name={"phone"}/>
                        <TextArea errors={errors} defaultValue={provider?.form?.description} label={"Açıklama"} onChange={onChange} name={"description"}/>
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => submit()} color={"primary"} variant={"contained"} className="text-white custom-button">Randevu Al</Button>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </Layout>
    )
}

export default Appointment;
