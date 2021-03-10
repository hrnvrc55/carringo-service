import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import React, {useState} from "react";
import {garages} from "../utils/static-datas";
import InfoWindowCt from "./InfoWindowCt";
import Button from "@material-ui/core/Button";

function ActiveMap(props) {

    let [activeMarker, setActiveMarker] = useState(null);
    let [clickedService, setClickedService] = useState(null);
    let [mapLoad, setMapLoad] = useState(false)


    const onMarkerClick = (props, marker, e) => {
        setActiveMarker(marker);
        setClickedService(props.service);
    };

    const onActiveClick = (props, marker, e) => {
        setActiveMarker(marker);
        setClickedService(props.service);
    };

    const onSelectButton = (selectedService) => {
        props.onSelectButton(selectedService);
    }

    function onMarkerMounted(element){
        if(element){
            onMarkerClick(element.props, element.marker, element);
        }
    }

    const handleMapIdle = () => {
       setMapLoad(true);
    };


    return(
        <div>
            <Map
                style={props.style}
                google={props.google}
                zoom={5}
                initialCenter={{lat: props.lat, lng: props.lng}}
                onIdle={handleMapIdle}
            >
                {props.allGarages?.map((service, idx) => (
                    <Marker
                        key={"active-marker-list-" + idx}
                        onClick={onMarkerClick}
                        //ref={onMarkerMounted}
                        position={{lat: service.lat, lng: service.lng}}
                        service={service}
                    />
                ))}
                {mapLoad && (
                    <Marker
                        style={{backgroundColor: 'green'}}
                        position={{lat: props.lat, lng: props.lng}}
                        service={props.activeService}
                        ref={onMarkerMounted}
                        onClick={onActiveClick}/>
                )}


                <InfoWindowCt marker={activeMarker} visible={true} onClose={() => console.log('close')} >
                    <>
                        <div>
                            <h5>{clickedService?.name}</h5>
                            <p>{clickedService?.address}</p>
                        </div>
                        {clickedService?.id !== props.activeService?.id && (
                            <div className="d-flex justify-content-end">
                                <Button
                                    onClick={() => {onSelectButton(clickedService)}}
                                    variant={"outlined"} color={"primary"}
                                >
                                    Servisi Seç
                                </Button>
                            </div>
                        )}

                    </>
                </InfoWindowCt>

            </Map>
        </div>
    )
}





export default GoogleApiWrapper({
    apiKey: 'AIzaSyBoLwOKgI7cHr-uVnNuAZRuQvnaVkElZpo'
})(ActiveMap);
