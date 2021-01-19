import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Customer from "./pages/Customer";
import './style/index.scss';
import Services from "./pages/Services";
import Garages from "./pages/Garages";
import Appointment from "./pages/Appointment";
import AppProvider from "./providers/AppProvider";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {themeData} from './utils/theme';
import { trTR } from '@material-ui/core/locale';
import App from "./App";


const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: themeData.primary,
        },
        secondary: {
            // This is green.A700 as hex.
            main: themeData.secondary,
        },
    },

}, trTR);

const routing = (
    <ThemeProvider theme={theme}>
       <App/>
    </ThemeProvider>

)

ReactDOM.render(routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
