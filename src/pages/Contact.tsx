import Layout from "../components/Layout";
import React from "react";
import TextInput from "../components/TextInput";
import PhoneInput from "../components/PhoneInput";
import TextArea from "../components/TextArea";
import Button from "@material-ui/core/Button";

function Contact(){

    return (
        <Layout title={"İletişim"}>
            <div className="row">
                <div className="col-6">

                </div>
                <div className="col-6">
                  <div className="p-3">
                      <div className="form-wrapper p-3">
                          <TextInput label={"Ad Soyad"} onChange={() =>{}} name={"full_name"}/>
                          <TextInput label={"Eposta"} onChange={() =>{}} name={"email"}/>
                          <PhoneInput label={"Telefon"} onChange={() =>{}} name={"phone"}/>
                          <TextArea label={"Mesaj"} onChange={() =>{}} name={"message"}/>
                          <Button onClick={() => {}} fullWidth={true} color={"primary"} variant={"contained"} className="text-white custom-button">Gönder</Button>

                      </div>
                  </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact;
