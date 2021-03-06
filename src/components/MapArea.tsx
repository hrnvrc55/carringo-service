import React, {useState, useEffect} from "react";
import {AppProviderContext} from "../providers/AppProvider";
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';


type MarkerProps = {
    text: string,
    lat: number,
    lng: number,
    className: string,
    data: any,
}

type ComponentProps = {
    garages: any
}


const Marker = ({ text, lat, lng,  className, data } : MarkerProps) => {

    const provider = React.useContext(AppProviderContext);
    let [selected, setSelected] = useState<boolean>(false);

    useEffect(() => {
        if(provider?.form?.garage?.id === data.id){
            setSelected(true);
        }else{
            setSelected(false);
        }
    },[provider?.form?.garage])

    function onClick(){
        provider?.onChange("garage", data);
    }

    return (
        <div className="position-relative">
            {selected && (
                <div className="marker-active info-window" >
                    <span className="mb-1 d-flex flex-fill title">{data?.name} </span>
                    <span className="description">{data?.address} </span>
                </div>
            )}
            <RoomIcon
                className={className}
                fontSize="large"
                onClick={() =>onClick()}
            />
        </div>
    );
}


function MapArea({garages} : ComponentProps){
    const provider = React.useContext(AppProviderContext);

    useEffect(() => {
        if(provider?.form?.garage !== undefined){

        }
    },[provider?.form?.garage])

    function change({ zoom } : any){
    }

    return (
        <div className="map-area position-relative">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBoLwOKgI7cHr-uVnNuAZRuQvnaVkElZpo"}}
                defaultCenter={{lat: 38.977973, lng: 34.878986}}
                defaultZoom={5}
                onChange={change}
            >
                {garages?.map((item: any, idx: number) => (
                    <Marker
                        key={"marker" + idx}
                        className="marker text-danger"
                        lat={item.lat}
                        lng={item.lng}
                        text="My Marker"
                        data={item}
                    />
                ))}
                {provider?.form?.garage !== undefined && (
                    <Marker
                        className="marker text-success"
                        lat={provider?.form?.garage?.lat}
                        lng={provider?.form?.garage?.lng}
                        data={provider?.form?.garage}
                        text="My Marker"
                    />
                )}
            </GoogleMapReact>

        </div>
    )
}

export default MapArea;
