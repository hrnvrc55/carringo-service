import React, {useState, useEffect, createContext, useContext} from "react";
import ConfirmDialog from "../components/dialogs/ConfirmDialog";
import axios, {AxiosError, AxiosResponse} from "axios";
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';


interface ApiContextData {
    isLogin: boolean,
    user: any,
    api: any,
    login: (username: string, password: any) => void
    logout: () => void,
}

export const ApiProviderContext = createContext<ApiContextData | undefined>(undefined)

type LoginProviderProps = {
    children: React.ReactNode,
}

const apiUrl = "https://api.parcapaketi.com/api";

export function useApi(){
    return useContext(ApiProviderContext);
}

function ApiProvider(props: LoginProviderProps){
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

    axios.interceptors.response.use((response: AxiosResponse) => {

        return response;
    }, (error: AxiosError) => {
        console.log("error aldı baba");
        if(!error.response){
            handleError("Sunucuya Bağlanılamıyor");
        }else if(error?.response?.data?.error?.message){
            handleError(error?.response?.data?.error?.message);
        }else{
            handleError();

        }

        return Promise.reject(error);
    })

    const handleError = (message?: string) => {
        enqueueSnackbar(message ? message : "Hata oluştu", {
            variant: 'error',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
        });
    };

    const api = {
        get: (endPoint : any, params: any) => {
            return new Promise(function(resolve, reject) {
                return   axios({
                    method: 'get',
                    url: apiUrl + '/' + endPoint ,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        //"Authorization" : isLogin() ? "Bearer " + user.token : null
                    },
                }).then(async resp => {
                    if (resp.status === 200 || resp.status === 201) {
                        resolve((await resp));
                    } else {
                        throw (await resp);
                    }
                }).catch(error => {
                    reject(error);
                    return error;
                });
            });
        },
        post: (endPoint : any, params: any) => {
            return new Promise(function(resolve, reject) {
                return   axios({
                    method: 'post',
                    url: apiUrl + '/' + endPoint ,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        //"Authorization" : isLogin() ? "Bearer " + user.token : null
                    },
                    data: params
                }).then(async resp => {
                    if (resp.status === 200 || resp.status === 201) {
                        resolve((await resp));
                    } else {
                        throw (await resp);
                    }
                }).catch(error => {
                    reject(error);
                    return error;
                });
            });
        }
    };


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
        <ApiProviderContext.Provider value={{api, isLogin, user, login, logout}}>
            <ConfirmDialog open={confirmDialog} alertType={"confirm"} description={"Çıkış yapmak istediğinize emin misiniz?"} onClose={confirmDialogClose}/>
            {props.children}
        </ApiProviderContext.Provider>
    )
}

export default ApiProvider;
