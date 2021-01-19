import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import {useHistory} from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {AppProviderContext} from "../providers/AppProvider";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import moment from "moment";
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import Chip from '@material-ui/core/Chip';


function SuccessPage(){

    let history = useHistory();
    const provider = React.useContext(AppProviderContext);
    let [info, setInfo] = useState<any>(null);


    useEffect(() => {
        console.log(provider?.form)
        let newInfo = {
            name: provider?.form?.first_name + " " + provider?.form?.last_name,
            phone: provider?.form?.phone,
            email: provider?.form?.email,
            description: provider?.form?.description,
            vehicle: provider?.form?.brand?.name + "-" +provider?.form?.model?.name + "-" + provider?.form?.gear?.name+ "-" + provider?.form?.engine?.name,
            km: provider?.form?.kilometer,
            date: moment(provider?.form?.date).format("DD/MM/YYYY"),
            time: moment(provider?.form?.time).format("HH:mm"),
            garage: provider?.form?.garage,
            services: provider?.form?.services
        }
        setInfo(newInfo);
    },[provider?.form])

    return (
        <Layout title={"Başarılı"}>
            <div className="success-page">
                <div className="d-flex justify-content-center">
                    <CheckCircleIcon className="text-success icon"/>
                </div>
                <div className="d-flex justify-content-center">
                    <span className="title">Randevunuz Oluşturuldu</span>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <div className="info-card">
                            <p><strong>İsim: </strong>{info?.name}</p>
                            <p><strong>Telefon: </strong>{info?.phone}</p>
                            <p><strong>Eposta: </strong>{info?.email}</p>
                            <p><strong>Araç: </strong>{info?.vehicle}</p>
                            <p><strong>Km: </strong>{info?.km}</p>
                            <p><strong>Açıklama: </strong>{info?.description}</p>

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="info-card">
                            <div className="mb-3">
                                <div className="d-flex justify-content-start align-items-center">
                                    <div className="">
                                        <EmojiTransportationIcon className="garage-icon"/>
                                    </div>
                                    <div className="flex-fill pl-2">
                                        <p className="garage-title">{info?.garage?.name}</p>
                                        <small>{info?.garage?.address}</small>
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
                               <div className="d-flex justify-content-start">
                                   {info?.services?.length > 0 && info?.services.map((item: any, idx: number) => (
                                       <Chip
                                           label={item.name}
                                           variant="outlined"
                                           className="mr-2"
                                       />
                                   ))}
                               </div>
                           </div>
                        </div>
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default SuccessPage;
