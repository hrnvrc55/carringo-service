import React, {useEffect} from 'react';
import AppProvider, {AppProviderContext} from "./providers/AppProvider";
import {BrowserRouter, Route, Switch, useHistory, withRouter, Redirect} from "react-router-dom";
import Services from "./pages/Services";
import Appointment from "./pages/Appointment";
import SuccessPage from "./pages/SuccessPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {ApiProviderContext} from "./providers/ApiProvider";
import MyAppointments from "./components/account/MyAppointments";
import Profile from "./components/account/Profile";
import CheckAppointment from "./pages/CheckAppointment";
import MyServicesRouter from "./custom_routes/MyServicesRouter";
import MyGaragesRouter from "./custom_routes/MyGaragesRouter";
import MyAppointmentRouter from "./custom_routes/MyAppointmentRouter";
import Home from "./pages/Home";
import MapArea from "./components/MapArea";

function App() {

    const loginProvider = React.useContext(ApiProviderContext);

  return (
        <AppProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <MyGaragesRouter path="/garages" exact={true}/>
              <MyServicesRouter path={"/services"} exact={true}/>
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
                       <Route exact path="/map-area" component={MapArea} />

                   </>
               )}
            </Switch>
          </BrowserRouter>

        </AppProvider>
  );
}



export default App;
