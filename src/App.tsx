import React, {useEffect} from 'react';
import AppProvider, {AppProviderContext} from "./providers/AppProvider";
import {BrowserRouter, Route, Switch, useHistory, withRouter, Redirect} from "react-router-dom";
import Services from "./pages/Services";
import Appointment from "./pages/Appointment";
import SuccessPage from "./pages/SuccessPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {LoginProviderContext} from "./providers/LoginProvider";
import MyAppointments from "./components/account/MyAppointments";
import Profile from "./components/account/Profile";
import CheckAppointment from "./pages/CheckAppointment";
import MyVehicleRouter from "./custom_routes/MyVehicleRouter";
import MyGaragesRouter from "./custom_routes/MyGaragesRouter";
import MyAppointmentRouter from "./custom_routes/MyAppointmentRouter";

function App() {

    const loginProvider = React.useContext(LoginProviderContext);

  return (
        <AppProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Services} />
              <MyVehicleRouter path={"/my-vehicle"} exact={true}/>
              <MyGaragesRouter path="/garages" exact={true}/>
              <MyAppointmentRouter path="/appointment" exact={true}/>
              <Route exact path="/success" component={SuccessPage} />

               {loginProvider?.isLogin === true ? (
                  <>
                    <Route exact path="/account" >
                      <Redirect to="/my-appointments"/>
                    </Route>
                    <Route exact path="/my-appointments" component={MyAppointments} />
                    <Route exact path="/profile" component={Profile} />
                  </>
                ) : (
                   <>
                       <Route exact path="/login" component={Login} />
                       <Route exact path="/register" component={Register} />
                       <Route exact path="/check-appointment" component={CheckAppointment} />
                   </>
               )}
            </Switch>
          </BrowserRouter>

        </AppProvider>
  );
}



export default App;
