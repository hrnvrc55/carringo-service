import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import React, {useState} from "react";
import {garages} from "../utils/static-datas";

function ActiveMap(props) {

    return(
        <div>
            <Map
                style={props.style}
                google={props.google}
                zoom={10}
                initialCenter={{lat: props.lat, lng: props.lng}}
            >
                {props.allGarages?.map((service, idx) => (
                    <Marker
                        onClick={() => {}}
                        //ref={onMarkerMounted}
                        position={{lat: service.lat, lng: service.lng}}
                        service={service}
                    />
                ))}
                <Marker position={{lat: props.lat, lng: props.lng}} onClick={(props, marker) => {

                }}/>

            </Map>
        </div>
    )
}





export default GoogleApiWrapper({
    apiKey: 'AIzaSyBoLwOKgI7cHr-uVnNuAZRuQvnaVkElZpo'
})(ActiveMap);
