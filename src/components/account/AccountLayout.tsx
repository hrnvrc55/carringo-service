import React from "react";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import {Divider, ListItem} from "@material-ui/core";

type AccountLayoutProps = {children: React.ReactNode};

function AccountLayout({children} : AccountLayoutProps){

    return (
        <div className="row">
            <div className="col-3">
                <Collapse in={true} className="">
                    <List component="nav" className="">
                        <div key={"menu-register"} className="pb-1 pt-1">
                            <ListItem component={"a"} href={"/my-appointments"} button>
                               Randevularum
                            </ListItem>
                            <Divider variant="fullWidth" component="li" />
                            <ListItem component={"a"} href={"/profile"} button>
                                Profilim
                            </ListItem>
                        </div>
                    </List>
                </Collapse>
            </div>
            <div className="col-9">
                {children}
            </div>
        </div>
    )
}

export default AccountLayout;
