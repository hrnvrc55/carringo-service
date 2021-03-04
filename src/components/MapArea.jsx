import React, {useEffect, useState} from "react";
import InfoWindowCt from "./InfoWindowCt";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import {garages} from "../utils/static-datas";
import {AppProviderContext} from "../providers/AppProvider";
import ActiveMap from "./ActiveMap";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {apiUrl} from "../utils/config";

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    top: 0,
    right: 0
}

function MapArea(props) {

    const provider = React.useContext(AppProviderContext);

    let [activeMarker, setActiveMarker] = useState(null);
    let [activeService, setActiveService] = useState(null);
    let [clickedService, setClickedService] = useState(null);
    let [showInfoWindow, setShowInfoWindow] = useState(false);
    let [mapLoaded, setMapLoaded] = useState(false);
    let [loading, setLoading] = useState(false);

    //let [garages, setGarages] = useState([]);

    useEffect(() => {
       setLoading(true);
        setTimeout(() => {
            setActiveService(provider?.form?.garage);
            setLoading(false);
        },500)
        //load();
    },[provider?.form?.garage])

    async function load(){
        await axios({
            method: 'post',
            url: apiUrl + '/' + 'Servis/ServisleriListele' ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //"Authorization" : isLogin() ? "Bearer " + user.token : null
            },
            data: {}
        }).then(resp => {
            let respData = resp.data.servisler;

            let newRespData = respData.map((item, idx) => {
                return {
                    id: idx+1,
                    name: item.ad,
                    address: "",
                    selected: false,
                    lat: "",
                    lng: "",
                    services: []
                }
            })

            //setGarages(newRespData);
        })
    }



    const onMarkerClick = (props, marker, e) => {
         setShowInfoWindow(true);
         setActiveMarker(marker);
         setClickedService(props.service);

    };

    const onSelectButton = (service) => {
        setActiveService(service);
        provider.onChange("garage", service);
    }


    return (
        <>
            {loading ? (
                <div className={"map-loading"}>
                    <div className="icon-area">
                        <FontAwesomeIcon className="icon" icon={faCog} spin={true}/>

                    </div>
                </div>
            ) : activeService ? (
                <div>
                    <ActiveMap
                        lat={activeService.lat}
                        lng={activeService.lng}
                        allGarages={garages}
                        style={mapContainerStyle}
                        activeService={activeService}
                        onSelectButton={onSelectButton}
                    />
                </div>
            ) : (
                <Map
                    style={mapContainerStyle}
                    google={props.google}
                    zoom={5}
                    initialCenter={{lat: 40.940406, lng: 29.142482}}

                >

                    {garages?.map((service, idx) => (
                        <Marker
                            onClick={onMarkerClick}
                            //ref={onMarkerMounted}
                            position={{lat: service.lat, lng: service.lng}}
                            service={service}
                        />
                    ))}

                    <InfoWindowCt marker={activeMarker} visible={showInfoWindow} onClose={() => console.log('close')} >
                        <>
                        <div>
                            <h5>{clickedService?.name}</h5>
                            <p>{clickedService?.address}</p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button
                                onClick={() => onSelectButton(clickedService)}
                                variant={"outlined"} color={"primary"}
                            >
                                Servisi Seç
                            </Button>
                        </div>
                        </>
                    </InfoWindowCt>
                </Map>
            )}


        </>

    )
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyBoLwOKgI7cHr-uVnNuAZRuQvnaVkElZpo'
})(MapArea);

// import React, { Component } from "react";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
//
// const style = {
//     height: "400px",
//     width: "100%"
// };
//
// class MapView extends Component {
//     constructor() {
//         super();
//         this.state = {
//             showingInfoWindow: false,
//             activeMarker: {},
//             selectedPlace: {},
//             mapLoaded: false
//         };
//         this.handleMapIdle = this.handleMapIdle.bind(this);
//         this.onMarkerClick = this.onMarkerClick.bind(this);
//         this.onClose = this.onClose.bind(this);
//     }
//
//     onMarkerClick = (props, marker, e) => {
//         this.setState(prevState => ({
//             selectedPlace: props,
//             activeMarker: marker,
//             showingInfoWindow: true
//         }));
//     };
//
//     onClose = () => {
//         if (this.state.showingInfoWindow) {
//             this.setState({
//                 showingInfoWindow: false,
//                 activeMarker: null
//             });
//         }
//     };
//
//     onMarkerMounted = element => {
//         console.log(element.marker)
//         this.onMarkerClick(element.props, element.marker, element);
//     };
//
//     handleMapIdle = () => {
//         this.setState({
//             mapLoaded: true
//         });
//     };
//
//     render() {
//         return (
//             <>
//                 {this.state.showingInfoWindow}
//             <Map
//                 google={this.props.google}
//                 style={style}
//                 initialCenter={{lat: 40.940406, lng: 29.142482}}
//                 zoom={5}
//                 onIdle={this.handleMapIdle}
//             >
//                 {this.state.mapLoaded && (
//                     <Marker position={{lat: 40.940406, lng: 29.142482}} ref={this.onMarkerMounted} onClick={this.onMarkerClick} />
//                 )}
//                 <InfoWindow
//                     marker={this.state.activeMarker}
//                     visible={this.state.showingInfoWindow}
//                     onClose={this.onClose}
//                 >
//                     <div>Your Location Here!</div>
//                 </InfoWindow>
//             </Map>
//                 </>
//         );
//     }
// }
//
// export default GoogleApiWrapper({
//     apiKey: "AIzaSyBoLwOKgI7cHr-uVnNuAZRuQvnaVkElZpo"
// })(MapView);

