import React, {useState, useEffect, createContext} from "react";
import ConfirmDialog from "../components/dialogs/ConfirmDialog";

interface ApiContextData {
    isLogin: boolean,
    user: any,
    login: (username: string, password: any) => void
    logout: () => void
}


export const ApiProviderContext = createContext<ApiContextData | undefined>(undefined)

type LoginProviderProps = {
    children: React.ReactNode,

}

function ApiProvider(props: LoginProviderProps){

    let [isLogin, setIsLogin] = useState<boolean>(false);
    let [user, setUser] = useState<any>(null);
    let [confirmDialog, setConfirmDialog] = useState(false);

    useEffect(() => {
       if(Boolean(localStorage.getItem("user-carringo-service"))){
           let newUserData = JSON.parse(localStorage.getItem("user-carringo-service") || "");

           setUser(newUserData);
           setIsLogin(true);
       }
    },[])

    function login(username: string, password: any){
        let userData : any = {id: 1, username: username};
        localStorage.setItem("user-carringo-service", JSON.stringify(userData));
        setUser(userData);
        setIsLogin(true);
    }

    function logout() {

        setConfirmDialog(true);
    }

    function confirmDialogClose(value: any){

        if(value === true) {
            localStorage.removeItem("user-carringo-service");
            setUser(null);
            setIsLogin(false);
            setConfirmDialog(false);
            window.location.assign("/");

        }else{
            setConfirmDialog(false);
        }
    }


    return (
        <ApiProviderContext.Provider value={{isLogin, user, login, logout}}>
            <ConfirmDialog open={confirmDialog} alertType={"confirm"} description={"Çıkış yapmak istediğinize emin misiniz?"} onClose={confirmDialogClose}/>
            {props.children}
        </ApiProviderContext.Provider>
    )
}

export default ApiProvider;
