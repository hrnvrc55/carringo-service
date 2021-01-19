import React from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

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
        <footer className="footer bg-dark px-2 d-none d-md-flex align-items-center">
            <div className="container px-0">
                <div className="d-flex justify-content-start align-items-center">
                    <div className="">
                        <FacebookIcon className="text-white" fontSize={"large"}/>
                        <InstagramIcon className="text-white ml-2"  fontSize={"large"}/>
                        <LinkedInIcon className="text-white ml-2" fontSize={"large"}/>
                    </div>
                    <div className="flex-fill ">
                        <div className="d-flex justify-content-end ">
                            <div className="d-flex flex-column text-right">
                                <small className="text-white">Site Creation & Technology by</small>
                                <a rel="nofollow" href="https://www.teksenbilisim.com/" target="_blank"><img className="" src="/teksen-logo.svg" height={35}/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function MobileFooter(){

    return (
        <footer className="bg-dark d-md-none d-mb-block mobile-footer">
              <div className="d-flex bg-white justify-content-center align-items-center py-3 mobile-top-border">
                  <FacebookIcon className="text-secondary" fontSize={"large"}/>
                  <InstagramIcon className="text-secondary ml-2"  fontSize={"large"}/>
                  <LinkedInIcon className="text-secondary ml-2" fontSize={"large"}/>
              </div>
            <div className="d-flex flex-column justify-content-center align-items-center py-4">
                <small className="text-white">Site Creation & Technology by</small>
                <a rel="nofollow" href="https://www.teksenbilisim.com/" target="_blank"><img className="" src="/teksen-logo.svg" height={35}/></a>
            </div>
        </footer>
    )
}

export default Footer;
