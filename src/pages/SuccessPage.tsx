import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import {useHistory} from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {AppProviderContext} from "../providers/AppProvider";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import moment from "moment";
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import Chip from '@material-ui/core/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faPhoneSquare,
    faEnvelope,
    faCarSide,
    faTachometerAlt,
    faFileAlt, faInfoCircle, faPhone
} from '@fortawesome/free-solid-svg-icons'
import {Button} from "@material-ui/core";


function SuccessPage(){

    let history = useHistory();
    const provider = React.useContext(AppProviderContext);
    let [info, setInfo] = useState<any>(null);


    useEffect(() => {
        let form = provider?.recordedForm;
        console.log(form, 'success page yeahh');
        if(form === null || form === undefined || form === ""){
            history.push("/");
        }else{
            let newInfo = {
                name: form?.first_name + " " + form?.last_name,
                phone: form?.phone,
                email: form?.email,
                description: form?.description,
                vehicle: form?.brand?.name + "-" +form?.model?.name + "-" + form?.gear?.name+ "-" + form?.engine?.name,
                km: form?.kilometer,
                date: moment(form?.date).format("DD/MM/YYYY"),
                time: form?.time,
                garage: form?.garage,
                services: form?.services,
                plate: form?.plate
            }
            setInfo(newInfo);
        }

    },[provider?.form])

    return (
        <Layout title={"Randevu Bilgileri"} stepper={false}>
            <div className="success-page my-4">
                <div className="d-flex justify-content-center">
                    <CheckCircleIcon className="text-success icon"/>
                </div>
                <div className="d-flex justify-content-center">
                    <span className="title">Randevunuz Oluşturuldu</span>
                </div>
                {info && (
                    <>
                    <div className="row mt-3">
                        <div className="col-12 col-md-6 mb-3">
                            <div className="info-card animate__animated animate__bounceInRight">
                                <p><span className="strong-title"><FontAwesomeIcon icon={faUser}/> İsim: </span><span className="text">{info?.name}</span></p>
                                <p><span className="strong-title"><FontAwesomeIcon icon={faPhoneSquare}/> Telefon: </span><span className="text">{info?.phone}</span></p>
                                <p><span className="strong-title"><FontAwesomeIcon icon={faEnvelope}/> Eposta: </span><span className="text">{info?.email}</span></p>
                                <p><span className="strong-title"><FontAwesomeIcon icon={faCarSide}/> Araç: </span><span className="text">{info?.vehicle}</span></p>
                                {info?.plate && (
                                    <p><span className="strong-title"><FontAwesomeIcon icon={faInfoCircle}/> Plaka: </span><span className="text">{info?.plate}</span></p>
                                )}
                                <p><span className="strong-title"><FontAwesomeIcon icon={faTachometerAlt}/> Km: </span><span className="text">{info?.km}</span></p>
                                <p><span className="strong-title"><FontAwesomeIcon icon={faFileAlt}/> Açıklama: </span><span className="text">{info?.description}</span></p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <div className="info-card animate__animated animate__bounceInLeft">
                                <div className="mb-3">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <div className="">
                                            <EmojiTransportationIcon className="garage-icon"/>
                                        </div>
                                        <div className="flex-fill pl-2">
                                            <p className="garage-title">{info?.garage?.name}</p>
                                            <small>{info?.garage?.address}</small>
                                            <p><FontAwesomeIcon icon={faPhone} className="mr-2"/>{info?.garage?.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <div className="">
                                            <QueryBuilderIcon className="garage-icon"/>
                                        </div>
                                        <div className="flex-fill pl-2">
                                            <p className="pb-0 mb-0">{info?.date}</p>
                                            <p className="pb-0 mb-0">{info?.time}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="">
                                        {info.services?.map((item: any) => (
                                            <>
                                            <div className="d-flex justify-content-start align-items-center mb-2">
                                                <Chip
                                                    label={item.name}
                                                    className="mr-2 text-white"
                                                    variant="default"
                                                    color="secondary"
                                                />
                                                <div className="d-flex flex-wrap justify-content-start align-items-center">
                                                    {item.selectedDetails && (
                                                        <>
                                                            {Object.keys(item.selectedDetails).map((detail:any, idx: number) => {
                                                                if(item.selectedDetails[detail]?.data === '' || item.selectedDetails[detail]?.data === null){
                                                                    return false;
                                                                }else{
                                                                    return (
                                                                        <small className="badge badge-secondary mr-2 my-1">{item.selectedDetails[detail]?.data?.name} </small>
                                                                    )
                                                                }
                                                            })}
                                                        </>
                                                    )}

                                                </div>
                                             </div>
                                                <hr/>
                                            </>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                        <hr/>
                        <div className="d-flex justify-content-center mt-2">
                            <Button href="/" variant="outlined" style={{width: "150px"}} color="primary" className="mr-2">Yeni Randevu</Button>

                            <Button href="https://carringoservis.com" variant="outlined" style={{width: "150px"}} color="secondary" className="ml-2">Siteye Git</Button>

                        </div>
                    </>
                )}


            </div>
        </Layout>
    )
}

export default SuccessPage;
