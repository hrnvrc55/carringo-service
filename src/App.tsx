import React, {useEffect} from 'react';
import {ThemeProvider} from "@material-ui/styles";
import AppProvider from "./providers/AppProvider";
import {BrowserRouter, Route, Switch, useHistory, withRouter} from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Garages from "./pages/Garages";
import Appointment from "./pages/Appointment";
import SuccessPage from "./pages/SuccessPage";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {


  return (
        <AppProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/services" component={Services} />
              <Route exact path="/garages" component={Garages} />
              <Route exact path="/appointment" component={Appointment} />
              <Route exact path="/success" component={SuccessPage} />
              <Route exact path="/iletisim" component={Contact} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

            </Switch>
          </BrowserRouter>
        </AppProvider>
  );
}

export default App;
