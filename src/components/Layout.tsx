import React, {useEffect, useState} from "react";
import TopBar from "./TopBar";
import StepperComponent from "./StepperComponent";
import {useHistory} from 'react-router-dom';
import {AppProviderContext} from "../providers/AppProvider";
import MobileStepperComponent from "./MobileStepperComponent";
import FullLoader from "./FullLoader";
import Footer from "./Footer";
import {appointmentValidate, garageValidate, homeValidate, serviceValidate} from "../utils/validation";

type LayoutProps = {title: string, children: React.ReactNode};

function Layout({title, children}: LayoutProps,){
    let history = useHistory();
    const provider = React.useContext(AppProviderContext);

    let [stepCount, setStepCount] = useState<number | any>(0);

    useEffect(() => {
        setStepCount(provider?.changePage(history.location.pathname));
        history.listen(location => {
            window.scrollTo(0,0);
            provider?.isLoading(true);
            setTimeout(() => {
                provider?.isLoading(false);
            },1000)


        })

    }, [history])

    return (
            <>
                <TopBar/>
                <title>{title} - Carringo Servis</title>
                <MobileStepperComponent active={stepCount}/>
                <FullLoader show={provider?.loading}/>
                <main className="h-100">
                    <div className="bg-white container card shadow shadow-sm my-4" >
                        <StepperComponent active={stepCount}/>
                        {children}
                    </div>
                </main>
                <Footer/>
            </>
    )
}

export default Layout
