import Layout from "../components/Layout";
import React, {useState} from "react";
import TextInput from "../components/TextInput";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import PhoneInput from "../components/PhoneInput";
import {registerValidate} from "../utils/validation";

function Register(){

    let history = useHistory();

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
        let errors = registerValidate(form);
        if(errors.length > 0) {
            setErrors(errors);
            return false;
        }else{
            console.log(form, 'errors');
            ///api eklenecek
            /// giriş sayfasına yönlendirilecek
        }
    }

    return (
            <Layout title={"Yeni Üyelik"} stepper={false}>
                <div className="d-flex justify-content-center mt-3 mt-md-2 mb-3 ">
                    <div className="login-form animate__animated animate__fadeInLeft my-4">
                        <div className="form-group p-3">
                            <div>
                                <h4>Yeni Üyelik</h4>
                                <small>Üye olarak randevu oluşturabilir, bu randevular üzerinde güncelleme ve iptal işlemleri yapabilirsiniz.</small>
                                <hr/>
                            </div>
                            <TextInput errors={errors} defaultValue={form?.first_name} label={"Adınız"} onChange={onChange} name={"first_name"}/>
                            <TextInput errors={errors} defaultValue={form?.last_name} label={"Soyadınız"} onChange={onChange} name={"last_name"}/>
                            <TextInput errors={errors} defaultValue={form?.email} label={"Eposta"} onChange={onChange} name={"email"}/>
                            <PhoneInput errors={errors} defaultValue={form?.phone} label={"Telefon"} onChange={onChange} name={"phone"}/>
                            <TextInput errors={errors} defaultValue={form?.username} label={"Kullanıcı Adı"} onChange={onChange} name={"username"}/>
                            <TextInput type={"password"} errors={errors} defaultValue={form?.password} label={"Şifre"} onChange={onChange} name={"password"}/>
                            <TextInput type={"password"} errors={errors} defaultValue={form?.password_again} label={"Şifre Tekrarı"} onChange={onChange} name={"password_again"}/>

                            <Button fullWidth={true} variant={"contained"} color="primary" onClick={() => submit()} className="text-white custom-button" >Üye Ol</Button>
                        </div>
                    </div>

                    {/*<div className="col-12 col-md-6 position-relative">*/}
                    {/*    /!*<img style={{position: "absolute", right: 0, bottom: 0, width: "100%"}} src={"/car.png"}/>*!/*/}
                    {/*</div>*/}
                </div>
            </Layout>
    )
}

export default Register;
