import React, {useState} from "react";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

function CheckAppointment(){

    let [errors, setErrors] = useState<any>([]);
    let [form, setForm] = useState<any>(null);

    function onChange(key: string, value: any){
        let oldForm = form;
        setForm({
            ...oldForm,
            [key]: value
        })
    }

    return (
        <Layout title={"Randevu Sorgula"} stepper={false}>
            <div className="d-flex justify-content-center mt-3 mt-md-2 mb-3 ">
                <div className="check-appointment-wrapper animate__animated animate__fadeInLeft my-4">
                    <div className="form-group p-3">
                        <div>
                            <h4>Randevu Sorgula</h4>
                            <small></small>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CheckAppointment;
