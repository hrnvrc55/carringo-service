import React, {useEffect, useState} from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSquare, faEnvelopeSquare, faPhone } from '@fortawesome/free-solid-svg-icons'
import PhoneIcon from '@material-ui/icons/Phone';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from "@material-ui/icons/Home";
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import {HideAt, ShowAt} from "react-with-breakpoints";

function Footer(){

    return (
        <>
            <HideAt breakpoint={"mediumAndBelow"}>
                <DesktopFooter/>
            </HideAt>
            <ShowAt breakpoint={"mediumAndBelow"}>
                <MobileFooter/>
            </ShowAt>
        </>
    )
}

function DesktopFooter(){

    return (
        <footer className="bg-dark footer d-none">
            <div className="container px-0">
                <div className="row footer-top py-4">
                    <div className="col-8">
                        <div className="d-flex justify-content-between">
                            <div className="flex-fill list ">
                                <span className="title mb-2">Menü</span>
                                <a href="!#" className="item">Anasayfa</a>
                                <a href="!#" className="item">Randevu Sorgula</a>
                            </div>
                            <div className="flex-fill list ">
                                <span className="title mb-2">Hizmetler</span>
                                <a href="!#" className="item">Klima</a>
                                <a href="!#" className="item">Frenler</a>
                                <a href="!#" className="item">Akü</a>
                                <a href="!#" className="item">Bakım</a>
                            </div>


                        </div>

                    </div>
                    <div className="col-4 ">
                        <div className="d-flex justify-content-end">
                            <div className="contact mt-3">
                                <a href="tel:0362 555 5555" className="text-decoration-none"><p className="mb-2"><FontAwesomeIcon icon={faPhoneSquare}/> 0362 555 5555</p></a>
                                <a href="mailto:info@email.com" className="text-decoration-none"><p className="mb-2"><FontAwesomeIcon icon={faEnvelopeSquare}/> info@email.com</p></a>
                                <div className="text-center social-icons">
                                    <a href="!#" target="_blank"><FacebookIcon className="" fontSize={"large"}/></a>
                                    <a href="!#" target="_blank"><InstagramIcon className=" ml-2"  fontSize={"large"}/></a>
                                    <a href="!#" target="_blank"><LinkedInIcon className=" ml-2" fontSize={"large"}/></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <hr className="mb-0 bg-secondary"/>
            <div className="container px-0 footer-bottom">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <small className="text">Copyright ©2021 Carringo Car Service</small>
                    </div>
                    <div className="d-flex flex-column text-right">
                        <small className="text">Site Creation & Technology by</small>
                        <a rel="noopener noreferrer" className="logo" href="https://www.teksenbilisim.com/" target="_blank"><img alt="teksen-logo" src="/teksen-logo.svg" height={35}/></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function MobileFooter(){

    return (
        <footer className={"mobile-footer"}>
            <div className="d-flex justify-content-center align-items-center">
                {/*<div className="my-1">*/}
                {/*    <Button variant="contained" color="primary" >Geri</Button>*/}
                {/*</div>*/}
                <div className="my-1 phone-btn">
                    <IconButton className="bg-primary"  href="tel:+90 (850) 840 06 55" aria-label="upload picture" component="a">
                        <PhoneIcon className="text-white"/>
                    </IconButton>
                </div>
                {/*<div className="my-1">*/}
                {/*    <Button variant="contained" color="primary" >İleri</Button>*/}
                {/*</div>*/}

            </div>
            {/*<Tabs*/}
            {/*    value={0}*/}
            {/*    onChange={() => {}}*/}
            {/*    variant="fullWidth"*/}
            {/*    indicatorColor="primary"*/}
            {/*    textColor="primary"*/}
            {/*    aria-label="icon tabs example"*/}
            {/*>*/}
            {/*    <Tab icon={<HomeIcon className="text-primary" />} component={"a"} href={"/"} aria-label="favorite" />*/}
            {/*    <Tab icon={<PhoneIcon className="text-primary" />} component={"a"} href={"tel:0362 554 3445"} aria-label="phone" />*/}
            {/*    /!*<Tab icon={<PersonPinIcon />} aria-label="person" />*!/*/}
            {/*</Tabs>*/}
            {/*<div className="d-flex justify-content-between bg-white mobile-top-border align-items-center py-3 pl-2">*/}
            {/*    <div>*/}
            {/*       <span className="phone"><FontAwesomeIcon className="icon" icon={faPhoneSquare}/> 0362 554 3445</span>*/}
            {/*    </div>*/}
            {/*    <div className="d-flex justify-content-center align-items-center pr-2">*/}
            {/*        <FacebookIcon className="text-secondary" fontSize={"large"}/>*/}
            {/*        <InstagramIcon className="text-secondary ml-2"  fontSize={"large"}/>*/}
            {/*        <LinkedInIcon className="text-secondary ml-2" fontSize={"large"}/>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="d-flex flex-column justify-content-center align-items-center py-4">*/}
            {/*    <small className="text-white">Site Creation & Technology by</small>*/}
            {/*    <a rel="nofollow" href="https://www.teksenbilisim.com/" target="_blank"><img className="" src="/teksen-logo.svg" height={35}/></a>*/}
            {/*</div>*/}
        </footer>
    )
}

export default Footer;
