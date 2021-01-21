import React, {useEffect, useState} from "react";
import TopBar from "./TopBar";
import StepperComponent from "./StepperComponent";
import {useHistory} from 'react-router-dom';
import {AppProviderContext} from "../providers/AppProvider";
import MobileStepperComponent from "./MobileStepperComponent";
import FullLoader from "./FullLoader";
import Footer from "./Footer";
import {appointmentValidate, garageValidate, homeValidate, serviceValidate} from "../utils/validation";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';


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
                <div className="container px-0 d-none d-md-block">
                    <div className="d-flex justify-content-between my-3 align-items-center px-2">
                        <div>
                            <Typography variant={"h5"} >{title}</Typography>
                        </div>
                        <div>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" href="/" onClick={() => {}}>
                                    Anasayfa
                                </Link>
                                <Typography color="textPrimary">{title}</Typography>
                            </Breadcrumbs>
                        </div>
                    </div>
                </div>
                <main className="">
                    <div className="bg-white container card shadow shadow-sm mb-4" >
                        <StepperComponent active={stepCount}/>
                        {children}
                    </div>
                </main>
                <Footer/>
            </>
    )
}

export default Layout
