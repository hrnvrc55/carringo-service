import React from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSquare, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons'

function Footer(){

    return (
        <>
            <DesktopFooter/>
            <MobileFooter/>
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
                                <a href="" className="item">Anasayfa</a>
                                <a href="" className="item">Randevu Sorgula</a>
                            </div>
                            <div className="flex-fill list ">
                                <span className="title mb-2">Hizmetler</span>
                                <a href="" className="item">Klima</a>
                                <a href="" className="item">Frenler</a>
                                <a href="" className="item">Akü</a>
                                <a href="" className="item">Bakım</a>
                            </div>


                        </div>

                    </div>
                    <div className="col-4 ">
                        <div className="d-flex justify-content-end">
                            <div className="contact mt-3">
                                <a href="tel:0362 555 5555" className="text-decoration-none"><p className="mb-2"><FontAwesomeIcon icon={faPhoneSquare}/> 0362 555 5555</p></a>
                                <a href="mailto:info@email.com" className="text-decoration-none"><p className="mb-2"><FontAwesomeIcon icon={faEnvelopeSquare}/> info@email.com</p></a>
                                <div className="text-center social-icons">
                                    <a href="" target="_blank"><FacebookIcon className="" fontSize={"large"}/></a>
                                    <a href="" target="_blank"><InstagramIcon className=" ml-2"  fontSize={"large"}/></a>
                                    <a href="" target="_blank"><LinkedInIcon className=" ml-2" fontSize={"large"}/></a>
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
                        <a rel="nofollow" className="logo" href="https://www.teksenbilisim.com/" target="_blank"><img className="" src="/teksen-logo.svg" height={35}/></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function MobileFooter(){

    return (
        <footer className="bg-dark d-md-none d-mb-block mobile-footer">
            <div className="d-flex justify-content-between bg-white mobile-top-border align-items-center py-3 pl-2">
                <div>
                   <span className="phone"><FontAwesomeIcon className="icon" icon={faPhoneSquare}/> 0362 554 3445</span>
                </div>
                <div className="d-flex justify-content-center align-items-center pr-2">
                    <FacebookIcon className="text-secondary" fontSize={"large"}/>
                    <InstagramIcon className="text-secondary ml-2"  fontSize={"large"}/>
                    <LinkedInIcon className="text-secondary ml-2" fontSize={"large"}/>
                </div>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center py-4">
                <small className="text-white">Site Creation & Technology by</small>
                <a rel="nofollow" href="https://www.teksenbilisim.com/" target="_blank"><img className="" src="/teksen-logo.svg" height={35}/></a>
            </div>
        </footer>
    )
}

export default Footer;
