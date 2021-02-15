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

    function submit(){
        let validateError = homeValidate(provider?.form);
        if(validateError.length > 0){
            setErrors(validateError);
            return false;
        }else{
            history.push("/garages");
        }
    }

    return (
        <Layout title={"Anasayfa"} stepper={true}>
            <div className="d-flex justify-content-center mt-3 mt-md-2 mb-3">
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

                            <Button fullWidth={true} variant={"contained"} color="primary" onClick={() => submit()} className="text-white custom-button" >Devam Et <ForwardIcon/></Button>
                        </div>
                    </div>

                {/*<div className="col-12 col-md-6 position-relative">*/}
                {/*    /!*<img style={{position: "absolute", right: 0, bottom: 0, width: "100%"}} src={"/car.png"}/>*!/*/}
                {/*</div>*/}
            </div>
        </Layout>
    )
}

export default Home;
