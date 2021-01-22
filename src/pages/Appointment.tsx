import React, {useState} from "react";
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

function Appointment(){
    const provider = React.useContext(AppProviderContext);
    let [errors, setErrors] = useState<any>([]);
    let history = useHistory();


    function onChange(key: string, value: any) {
        provider?.onChange(key, value);
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
            }else if(serviceValidateData === false){
                history.push('/services');
                provider?.openGlobalAlert(true, "Uyarı", "Lütfen hizmet seçiniz", "warning");

            }else if(garageValidateData === false){
                history.push('/garages');
                provider?.openGlobalAlert(true, "Uyarı", "Lütfen servis noktası seçiniz", "warning");

            }else {
                provider?.saveAppointment();
                history.push("/success");
            }
        }
    }

    return (
        <Layout title={"Randevu"} stepper={true}>
            <div className="mt-2 mb-3 px-3 pt-3">
            <div className="row">
                <div className="col-12 col-md-6 d-none d-md-block">
                    <div className="">
                        <div className="custom-card bottom-shadow p-3 mb-3 animate__animated animate__bounceInUp ">
                            <DoneAllIcon className="done-icon"/>
                            <span className="h5">Araç Bilgileri</span>
                            <hr className="my-2"/>
                            <p>{provider?.form?.brand?.name} - {provider?.form?.model?.name} - {provider?.form?.gear?.name} - {provider?.form?.engine?.name}</p>
                            <p>{provider?.form?.kilometer} Km'de</p>
                        </div>
                        <div className="custom-card bottom-shadow p-3 mb-3 animate__animated animate__bounceInUp">
                            <DoneAllIcon className="done-icon"/>
                            <span className="h5">Seçilen Hizmetler</span>
                            <hr className="my-2"/>
                            {provider?.form?.services?.map((item: any) => (
                                <Chip
                                    label={item.name}
                                    className="mr-2"
                                    variant="outlined"
                                    color="secondary"
                                />
                            ))}
                        </div>
                        <div className="custom-card bottom-shadow p-3 mb-3 animate__animated animate__bounceInUp">
                            <DoneAllIcon className="done-icon"/>
                            <span className="h5">Seçilen Servis</span>
                            <hr className="my-2"/>
                            <p className="mb-0">{provider?.form?.garage?.name}</p>
                            <p className="text-muted">{provider?.form?.garage?.address}</p>
                        </div>
                    </div>

                </div>

                <div className="col-12 col-md-6 animate__animated animate__bounceInUp">
                    <div className="p-3 bg-light custom-shadow">
                        <div className="d-flex justify-content-center">
                            <div className="d-flex flex-column text-center mb-2">
                                <span className="h4">Randevu Bilgileri</span>
                                <small>Randevu tarih ve saatini seçip, bilgileri doldurunuz</small>
                            </div>
                        </div>
                        <hr/>
                        <DateInput name={"date"} onChange={onChange} label={"Tarih"}/>
                        <TimeInput name={"time"} onChange={onChange} label={"Saat"}/>
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
