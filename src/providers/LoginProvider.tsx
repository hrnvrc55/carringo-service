import React, {useState, useEffect, createContext} from "react";

interface LoginContextData {
    isLogin: boolean,
    user: any,
    login: (username: string, password: any) => void
    logout: () => void
}


export const LoginProviderContext = createContext<LoginContextData | undefined>(undefined)

type LoginProviderProps = {
    children: React.ReactNode,

}


function LoginProvider(props: LoginProviderProps){

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
        <LoginProviderContext.Provider value={{isLogin, user, login, logout}}>
            {props.children}
        </LoginProviderContext.Provider>
    )
}

export default LoginProvider;
