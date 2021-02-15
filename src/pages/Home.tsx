import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import Button from '@material-ui/core/Button';
import {Link, useHistory} from 'react-router-dom';
import {AppProviderContext} from "../providers/AppProvider";
import AutoCompleteSelector from "../components/AutoCompleteSelector";
import TextInput from "../components/TextInput";
import ForwardIcon from '@material-ui/icons/Forward';
import {homeValidate} from "../utils/validation";
import Footer from "../components/Footer";
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import {Simulate} from "react-dom/test-utils";

const brands = [
    {id: 1, name: "Opel"}
];

const models = [
    {id: 1, name: "Corsa"},
    {id: 2, name: "Astra"}

];

const gears = [
    {id: 1, name: "Otomatik"},
    {id: 2, name: "Manuel"}

];

const engines = [
    {id: 1, name: "1.3 CDTİ"},
    {id: 2, name: "1.7 CDTI"}

];

function Home(){
    let history = useHistory();

    const provider = React.useContext(AppProviderContext);

    let [errors, setErrors] = useState<any>([]);

    useEffect(() => {

    },[])

    function onChange(key: string, value: any) {
       provider?.onChange(key, value);
    }

    function onClickContract(event: React.ChangeEvent<HTMLInputElement>){
        provider?.onChange(event.target.name, event.target.checked);
        let filterError : any = errors.filter((x: any) => x.name !== "contract-error");
        setErrors(filterError)
    }

    function submit(){
        let validateError = homeValidate(provider?.form);
        if(validateError.length > 0){
            setErrors(validateError);
            return false;
        }else{
            history.push("/garages");
        }

        //console.log(provider?.form, 'form');
    }

    return (
        <Layout title={"Anasayfa"} stepper={true}>
            <div className="row mt-3 mt-md-2 mb-3">
                <div className="col-12 col-md-6 pl-md-5">
                    <div className="form-wrapper animate__animated animate__fadeInLeft">
                        <div className="form-group p-3">
                            <div>
                                <h4>Araç Bilgileri</h4>
                                <small>Araç bilgilerinizi seçiniz</small>
                                <hr/>
                            </div>
                            <AutoCompleteSelector
                                name={"brand"}
                                options={brands}
                                onChange={onChange}
                                label={"Marka"}
                                defaultValue={provider?.form?.brand}
                                errors={errors}
                            />

                            <AutoCompleteSelector
                                name={"model"}
                                options={models}
                                onChange={onChange}
                                label={"Model"}
                                defaultValue={provider?.form?.model}
                                errors={errors}
                            />

                            <AutoCompleteSelector
                                name={"gear"}
                                options={gears}
                                onChange={onChange}
                                label={"Şanzıman"}
                                defaultValue={provider?.form?.gear}
                                errors={errors}
                            />

                            <AutoCompleteSelector
                                name={"engine"}
                                options={engines}
                                onChange={onChange}
                                label={"Motor"}
                                defaultValue={provider?.form?.engine}
                                errors={errors}
                            />
                            <TextInput type={"number"} errors={errors} label={"Kilometre"} defaultValue={provider?.form?.kilometer} name={"kilometer"} onChange={onChange}/>
                            <TextInput type={"text"} errors={errors} label={"Plaka"} defaultValue={provider?.form?.plate} name={"plate"} onChange={onChange}/>
                        </div>
                    </div>

                </div>
                <div className="col-12 col-md-6 pr-md-5">
                    <div className="">
                        <div className={"animate__animated animate__backInRight" + (Boolean(errors.find((x : any) => x.name === "contract-error")) ? " error-border" : "")}>
                            <div className="d-flex justify-content-start align-items-start">
                                <Checkbox className="pt-0" checked={provider?.form?.data_permission} onChange={onClickContract} name="data_permission" />
                                <span>Carringo Servis <a href="">Veri İşleme İzni</a> metnini okudum, onaylıyorum.</span>
                            </div>
                            <div className="d-flex justify-content-start align-items-start">
                                <Checkbox className="pt-0" checked={provider?.form?.share_permission} onChange={onClickContract} name="share_permission" />
                                <span>......’ya ait diğer markalar kapsamında ..... San. ve Tic. A.Ş.
                             tarafından iletişim bilgilerime reklam, promosyon gibi amaçlarla ticari elektronik
                             ileti gönderilmesini, bilgilerimin bu amaçla kullanılmasını ve üçüncü kişilerle paylaşılmasını,
                             mevzuat kapsamındaki haklarım saklı kalmak kaydı ile kabul ediyorum.</span>
                            </div>
                            <div className="d-flex justify-content-start align-items-start">
                                <Checkbox className="pt-0" checked={provider?.form?.person_data_permission} onChange={onClickContract} name="person_data_permission" />
                                <span><a href="">Kişisel verilerin korunması</a> metnini okudum, kabul ediyorum.</span>
                            </div>

                        </div>
                        {Boolean(errors.find((x : any) => x.name === "contract-error")) && (
                         <small className="text-danger">Lütfen sözleşme metinlerini okuyup, onaylayınız</small>
                        )}
                        <div className="d-flex justify-content-end px-md-5">
                            <Button fullWidth={true} variant={"contained"} color="primary" onClick={() => submit()} className="text-white custom-button mt-3 mt-md-5 " >Devam Et <ForwardIcon/></Button>
                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    )
}

export default Home;
