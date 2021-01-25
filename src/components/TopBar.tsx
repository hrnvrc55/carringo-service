import React, {useState} from "react";
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import {Divider, ListItem} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {LoginProviderContext} from "../providers/LoginProvider";
import {Dropdown} from "react-bootstrap";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useHistory} from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';



const menuList = [
    {name: 'Anasayfa', route: '/', icon: "", className:""},
    {name: 'Randevu Sorgula', route: '', icon: <FontAwesomeIcon icon={faSearch}/>, className: "btn btn-secondary"},

    // {name: 'İletişim', route: '/iletisim'},

]

function TopBar(){
    let history = useHistory();
    const loginProvider = React.useContext(LoginProviderContext)!

    let [openMenu, setOpenMenu] = useState<boolean>(false);
    let [openAccountMenu, setOpenAccountMenu] = useState<boolean>(false);
    let [popover, setPopover] = useState(false);

    function logout(){
        loginProvider.logout();
        window.location.assign("/");
    }

    return (
        <header className="header">
            <div className="container pl-2 pl-md-0 pr-2 pr-md-0 py-1">
                <div className="d-flex justify-content-start align-items-center">
                    {loginProvider.isLogin === false && (
                        <MenuIcon onClick={() => setOpenMenu(!openMenu)} className="text-white float-right d-md-none d-block" fontSize={"large"} />
                    )}

                    <div className="d-none d-md-block">
                        <a href="/"><img src="/carringo-logo-new.png" height={60}/></a>
                    </div>
                    <div className="d-md-none d-block ml-2">
                        <a href="/"><img src="/carringo-logo-new.png" height={40}/></a>
                    </div>
                    <div className="flex-fill">
                        <div className="justify-content-end d-none d-md-flex align-items-center">
                            <div key={"menu-main"} className="ml-4 ">
                                <a  href={"/"} className={"nav-list-item text-decoration-none "}>Anasayfa</a>
                            </div>

                            {loginProvider?.isLogin === true ? (
                                <>
                                    <div key={"menu-my-account"} className="ml-4 ">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className=" d-flex justify-content-start align-items-center">
                                                <AccountCircleIcon className="text-orange"/><span className="mx-1 ">Hesabım</span><small className="">({loginProvider?.user?.username})</small>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu alignRight={true}>
                                                <Dropdown.Item href="/my-appointments">Randevularım</Dropdown.Item>
                                                <Dropdown.Item href="/profile">Profil</Dropdown.Item>
                                                <Dropdown.Item onClick={() => logout()}>Çıkış</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div key={"menu-ask-appointment"} className="ml-4 ">
                                        <a  href={"check-appointment"} className={"nav-list-item text-decoration-none "}>Randevu Sorgula</a>
                                    </div>
                                    <div key={"menu-register"} className="ml-4 ">
                                    <a  href={"/register"} className={"nav-list-item text-decoration-none "}>Yeni Üyelik</a>
                                    </div>
                                    <div key={"menu-login"} className="ml-4 ">
                                    <a  href={"/login"} className={"nav-list-item text-decoration-none "}>Giriş Yap</a>
                                    </div>
                                </>
                            )}

                        </div>
                        {loginProvider.isLogin === true ? (
                            <AccountCircleIcon onClick={() => setOpenAccountMenu(!openAccountMenu)} className="text-orange float-right d-md-none d-block" fontSize={"large"} />
                        ) : (
                            <PersonOutlineIcon onClick={() => history.push('/login')} className="text-white float-right d-md-none d-block" fontSize={"large"} />
                        )}

                    </div>
                </div>
            </div>
            <div className="bg-white ">
                <Drawer open={openMenu} className="" onClose={() => setOpenMenu(false)}>
                   <div className="bg-primary py-1 pl-2">
                       <a href="/"><img src="/carringo-logo-new.png" height={40}/></a>
                   </div>
                   <List component="nav" className="pt-1 mobile-menu">
                       <div key={"menu-register"} className="pb-1 pt-1">
                           <ListItem component={"a"} href={"/"} button>
                                Anasayfa
                           </ListItem>
                           <Divider variant="fullWidth" component="li" />
                       </div>

                       <div key={"menu-register"} className="pb-1 pt-1">
                           <ListItem component={"a"} href={"/check-appointment"} button>
                                Randevu Sorgula
                           </ListItem>
                           <Divider variant="fullWidth" component="li" />
                       </div>
                       <div key={"menu-register"} className="pb-1 pt-1">
                           <ListItem component={"a"} href={"/register"} button>
                                Yeni Üyelik
                           </ListItem>
                           <Divider variant="fullWidth" component="li" />
                       </div>
                       <div key={"menu-register"} className="pb-1 pt-1 d-flex justify-content-between">
                           <ListItem component={"a"} href={"/login"} button>
                                Giriş Yap
                           </ListItem>
                       </div>
                   </List>
                </Drawer>
                <Drawer  anchor={"right"} open={openAccountMenu} className="" onClose={() => setOpenAccountMenu(false)}>
                    <div className="bg-primary py-1 pl-2">
                        <a href="/"><img src="/carringo-logo-new.png" height={40}/></a>
                    </div>
                    <div className="px-3 py-1">
                        <AccountCircleIcon className="text-success"/> {loginProvider?.user?.username}
                    </div>
                    <List component="nav" className="pt-1 mobile-menu">
                        <div key={"menu-register"} className="pb-1 pt-1">
                            <ListItem component={"a"} href={"/my-appointments"} button>
                                Randevularım
                            </ListItem>
                            <Divider variant="fullWidth" component="li" />
                            <ListItem component={"a"} href={"/profile"} button>
                                Profil
                            </ListItem>
                            <Divider variant="fullWidth" component="li" />

                            <ListItem onClick={() => logout()} button>
                                Çıkış Yap
                            </ListItem>
                        </div>

                    </List>
                </Drawer>

            </div>
        </header>
    )
}

export default TopBar;

