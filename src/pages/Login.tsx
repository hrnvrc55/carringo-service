import Layout from "../components/Layout";
import React, {useState} from "react";
import AutoCompleteSelector from "../components/AutoCompleteSelector";
import TextInput from "../components/TextInput";
import Button from "@material-ui/core/Button";
import ForwardIcon from "@material-ui/icons/Forward";
import {useHistory} from "react-router-dom";
import {AppProviderContext} from "../providers/AppProvider";
import {loginValidate, registerValidate} from "../utils/validation";

function Login(){
    let history = useHistory();
    const provider = React.useContext(AppProviderContext);

    let [errors, setErrors] = useState<any>([]);
    let [form, setForm] = useState<any>(null);

    function onChange(key: string, value: any){
        let oldForm = form;
        setForm({
            ...oldForm,
            [key]: value
        })
    }

    function submit(){
        let errors = loginValidate(form);
        if(errors.length > 0) {
            setErrors(errors);
            return false;
        }else{
            console.log(form, 'errors');
            ///api eklenecek
            /// anasayfaya yönlenecek
        }
    }

    return(
        <Layout title={"Giriş Yap"}>
            <div className="d-flex justify-content-center mt-3 mt-md-2 mb-3 ">
                <div className="login-form animate__animated animate__fadeInLeft my-4">
                    <div className="form-group p-3">
                        <div>
                            <h4>Giriş Yap</h4>
                            <small></small>
                            <hr/>
                        </div>
                        <TextInput errors={errors} label={"Kullanıcı Adı / Eposta"} defaultValue={form?.username} name={"username"} onChange={onChange}/>
                        <TextInput type={"password"} errors={errors} label={"Şifre"} defaultValue={form?.password} name={"password"} onChange={onChange}/>

                        <Button fullWidth={true} variant={"contained"} color="primary" onClick={() => submit()} className="text-white custom-button" >Girş Yap</Button>
                    </div>
                </div>

                {/*<div className="col-12 col-md-6 position-relative">*/}
                {/*    /!*<img style={{position: "absolute", right: 0, bottom: 0, width: "100%"}} src={"/car.png"}/>*!/*/}
                {/*</div>*/}
            </div>
        </Layout>
    )
}

export default Login;
