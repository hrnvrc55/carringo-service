import React, {useState, useEffect, createContext} from "react";

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
      localStorage.removeItem("user-carringo-service");
      setUser(null);
      setIsLogin(false);
    }


    return (
        <ApiProviderContext.Provider value={{isLogin, user, login, logout}}>
            {props.children}
        </ApiProviderContext.Provider>
    )
}

export default ApiProvider;
