import React, { useState, useEffect, createContext} from "react";
import moment from "moment";
import AlertDialog from "../components/dialogs/AlertDialog";

interface AppContextData {
    changePage: (path: string) => number,
    onChange: (key: string, value: any) => void,
    form: any,
    loading: boolean,
    recordedForm: any,
    isLoading: (loadingData: boolean) => void;
    saveAppointment: () => void;
    openGlobalAlert: (open: boolean, title: string, message: string, type: string) => void
    //page: number
}


export const AppProviderContext = createContext<AppContextData | undefined>(undefined)

type AppProviderProps = {
    children: React.ReactNode,
}

const stepCodes = [
    {sort: 1, value: "/"},
    {sort: 2, value: "/my-vehicle"},
    {sort: 3, value: "/garages"},
    {sort: 4, value: "/appointment"},
    {sort: 5, value: "/success"}
]


function AppProvider(props: AppProviderProps){

    let [form, setForm] = useState<any>(null);
    let [loading, setLoading] = useState<boolean>(false);
    let [globalAlert, setGlobalAlert] = useState<any>({open: false, title: null, message: null, type: null});
    let [recordedForm, setRecordedForm] = useState<any>(null);

    useEffect(() => {
         setForm({
             ...form,
             date: moment().format(),
             time: moment().format()
         })
    },[])


    function changePage(path : string){
         let found  = stepCodes.find(x => x.value === path)!;
         if(Boolean(found) === true){
             return found.sort;
         }else{
             return -1
         }
    }

    function onChange(key: string, value: any) {
      let oldForm: any = form;
      setForm({
          ...oldForm,
          [key] : value
      })
    }

    function isLoading(loadingData: boolean){
        setLoading(loadingData);
    }

    function openGlobalAlert(open: boolean, title: string, message: string, type: string) {
       setGlobalAlert({open: open, title: title, message: message, type: type});
    }

    function closeGlobalAlert(){
        setGlobalAlert({open: false, title: null, message: null, type: null});

    }

    function saveAppointment(){
        let oldForm = form;
        setForm({});
        setRecordedForm(oldForm);
        // console.log(homeValidate(form), 'home validate');
        // console.log(appointmentValidate(form), 'appointment validate');
        // console.log(serviceValidate(form), 'service validate');
        // console.log(garageValidate(form), 'garage validate');

    }

    return (
        <AppProviderContext.Provider value={{changePage, isLoading, recordedForm, loading, onChange, form, saveAppointment, openGlobalAlert}}>
            <AlertDialog open={globalAlert.open} description={globalAlert.message} alertType={globalAlert.type} onClose={closeGlobalAlert}/>
            {props.children}
        </AppProviderContext.Provider>
    )
}

export default AppProvider;
