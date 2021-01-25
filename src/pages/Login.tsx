import Layout from "../components/Layout";
import React, {useState} from "react";
import TextInput from "../components/TextInput";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {AppProviderContext} from "../providers/AppProvider";
import {loginValidate, registerValidate} from "../utils/validation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {LoginProviderContext} from "../providers/LoginProvider";

function Login(){
    let history = useHistory();
    const provider = React.useContext(AppProviderContext);
    const loginProvider = React.useContext(LoginProviderContext);


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
            loginProvider?.login(form?.username, form?.password);
            history.push("/");
            ///api eklenecek
            /// anasayfaya yönlenecek
        }
    }

    return(
        <Layout title={"Giriş Yap"} stepper={false}>
            <div className="d-flex justify-content-center mt-3 mt-md-2 mb-3 ">
                <div className="login-form animate__animated animate__fadeInLeft my-4">
                    <div className="form-group p-3">
                        <div>
                            <h4>Giriş Yap</h4>
                            <small>Size ait randevularınızı görmek veya randevularınızla ilgili işlemler için giriş yapınız.
                                Üye değilseniz <a href="/register"><strong>buraya</strong></a> tıklayarak yeni üyelik açabilirsiniz.
                            </small>
                            <hr/>
                        </div>
                        <TextInput errors={errors} label={"Kullanıcı Adı / Eposta"} defaultValue={form?.username} name={"username"} onChange={onChange}/>
                        <TextInput type={"password"} errors={errors} label={"Şifre"} defaultValue={form?.password} name={"password"} onChange={onChange}/>

                        <Button fullWidth={true} variant={"contained"} color="primary" onClick={() => submit()} className="text-white custom-button" >Giriş Yap</Button>
                        <div className="d-flex justify-content-between mt-3">
                            <a href="#">Şifremi Unuttum</a>
                            <a className="text-orange" href="/register">Yeni Üyelik <FontAwesomeIcon icon={faChevronRight}/></a>
                        </div>
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
