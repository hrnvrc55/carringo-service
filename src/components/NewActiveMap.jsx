import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowCt from "./InfoWindowCt";
import Button from "@material-ui/core/Button";

const style = {
    height: "400px",
    width: "100%"
};

class NewActiveMap extends Component {
    constructor() {
        super();
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapLoaded: false,
            clickedService: null
        };
        this.handleMapIdle = this.handleMapIdle.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props, 'props click')
        console.log(marker, 'marker click');

        this.setState(prevState => ({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            clickedService: props.service
        }));
    };

    onClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    onMarkerMounted = element => {
        if(element){
            if(element?.marker && element?.props){
                this.onMarkerClick(element?.props, element?.marker, element);
            }
        }
    };

    handleMapIdle = () => {
        this.setState({
            mapLoaded: true
        });
    };

    render() {
        return (
            <Map
                google={this.props.google}
                style={style}
                initialCenter={this.props.center}
                zoom={5}
                onIdle={this.handleMapIdle}
            >
                {this.props.allGarages?.map((service, idx) => (
                    <Marker
                        key={"active-marker-list-" + idx}
                        onClick={() => {}}
                        //ref={onMarkerMounted}
                        position={{lat: service.lat, lng: service.lng}}
                        service={service}
                    />
                ))}

                {this.state.mapLoaded && (
                    <Marker
                        ref={this.onMarkerMounted}
                        onClick={this.onMarkerClick}
                        service={this.props.activeService}
                    />
                )}
                {this.state.activeMarker && (
                    <InfoWindowCt marker={this.state.activeMarker} visible={true} onClose={() => console.log('close')} >
                        <>
                            <div>
                                <h5>{this.state.clickedService?.name}</h5>
                                <p>{this.state.clickedService?.address}</p>
                            </div>
                            {this.state.clickedService?.id !== this.props.activeService?.id && (
                                <div className="d-flex justify-content-end">
                                    <Button
                                        onClick={() => {}}
                                        variant={"outlined"} color={"primary"}
                                    >
                                        Servisi Seç
                                    </Button>
                                </div>
                            )}

                        </>
                    </InfoWindowCt>
                )}


            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBoLwOKgI7cHr-uVnNuAZRuQvnaVkElZpo"
})(NewActiveMap);
