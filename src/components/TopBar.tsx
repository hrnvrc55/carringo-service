import React, {useState} from "react";
import {AppProviderContext} from "../providers/AppProvider";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import {Divider, ListItem} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const menuList = [
    {name: 'Anasayfa', route: '/', icon: "", className:""},
    {name: 'Randevu Sorgula', route: '', icon: <FontAwesomeIcon icon={faSearch}/>, className: "btn btn-secondary"},

    // {name: 'İletişim', route: '/iletisim'},

]

function TopBar(){

    const ctx = React.useContext(AppProviderContext)!

    let [openMenu, setOpenMenu] = useState<boolean>(false);

    return (
        <header className="header">
            <div className="container pl-2 pl-md-0 pr-2 pr-md-0 py-1">
                <div className="d-flex justify-content-start align-items-center">
                    <div className="">
                        <a href="/"><img src="/carringo-logo-new.png" height={60}/></a>
                    </div>
                    <div className="flex-fill">
                        <div className="justify-content-end d-none d-md-flex align-items-center">
                            {menuList.map((item: any, idx: number) => (
                                <div key={"menu-" + idx} className="ml-4 ">
                                    <a  href={item.route} className={"nav-list-item text-decoration-none "}>{item.name} {item.icon}</a>
                                </div>
                            ))}
                            <div key={"menu-register"} className="ml-4 ">
                                <a  href={"/register"} className={"nav-list-item text-decoration-none "}>Yeni Üyelik</a>
                            </div>
                            <div key={"menu-login"} className="ml-4 ">
                                <a  href={"/login"} className={"nav-list-item text-decoration-none "}>Giriş Yap</a>
                            </div>
                        </div>
                        <MenuIcon onClick={() => setOpenMenu(!openMenu)} className="text-white float-right d-md-none d-block" fontSize={"large"} />
                    </div>
                </div>
            </div>
            <div className="bg-white mobile-menu">
                <Collapse in={openMenu}>
                   <List component="nav" className="pb-1 pt-1">
                       {menuList.map((item: any, idx: number) => (
                           <div key={"mobile-menu" + idx}>
                           <ListItem component={"a"} href={item.route} button>
                               {item.name}
                           </ListItem>
                           <Divider variant="fullWidth" component="li" />
                           </div>
                       ))}
                   </List>
                </Collapse>
            </div>
        </header>
    )
}

export default TopBar;

