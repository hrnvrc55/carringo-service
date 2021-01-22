import React, {useEffect} from 'react';
import {ThemeProvider} from "@material-ui/styles";
import AppProvider, {AppProviderContext} from "./providers/AppProvider";
import {BrowserRouter, Route, Switch, useHistory, withRouter, Redirect} from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Garages from "./pages/Garages";
import Appointment from "./pages/Appointment";
import SuccessPage from "./pages/SuccessPage";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {LoginProviderContext} from "./providers/LoginProvider";
import NotFoundPage from "./components/NotFoundPage";
import MyAppointments from "./components/account/MyAppointments";
import Profile from "./components/account/Profile";
function App() {

  const loginProvider = React.useContext(LoginProviderContext);

  return (
        <AppProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/services" component={Services} />
              <Route exact path="/garages" component={Garages} />
              <Route exact path="/appointment" component={Appointment} />
              <Route exact path="/success" component={SuccessPage} />
              {loginProvider?.isLogin === false && (
                  <>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                  </>
              )}
              {loginProvider?.isLogin === true && (
                  <>
                    <Route exact path="/account" >
                      <Redirect to="/my-appointments"/>
                    </Route>
                    <Route exact path="/my-appointments" component={MyAppointments} />
                    <Route exact path="/profile" component={Profile} />
                  </>
              )}

            </Switch>
          </BrowserRouter>
        </AppProvider>
  );
}



export default App;
