import HealingIcon from "@material-ui/icons/Healing";
import BrushIcon from "@material-ui/icons/Brush";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import LocalCarWashIcon from "@material-ui/icons/LocalCarWash";
import React from "react";

const services = [
    {
        id: 6,
        name: "Bakım ve Onarım",
        icon: <HealingIcon className="icon"/>,
        selected: false,
        details: [
            {
                id:1,
                name: "Bakım",
                code: ""
            },
            {
                id:2,
                name: "Mekanik Onarımlar",
                code: ""
            },
            {
                id:3,
                name: "Klima",
                code: ""
            },
            {
                id:4,
                name: "Akü",
                code: ""
            },
            {
                id:5,
                name: "Fren",
                code: ""
            },
            {
                id:6,
                name: "Egzoz",
                code: ""
            },
            {
                id:7,
                name: "Elektronik Sistemler",
                code: ""
            },
            {
                id:8,
                name: "Yol Görüş Elemanları",
                code: ""
            },
            {
                id:9,
                name: "Aksesuar Hizmetleri",
                code: ""
            },
        ]
    },
    {
        id: 2,
        name: "Kaporta ve Boya",
        icon: <BrushIcon className="icon"/>,
        selected: false,
        details: [
            {
                id:1,
                name: "Kaporta",
                code: ""
            },
            {
                id:2,
                name: "Boya",
                code: ""
            },
            {
                id:3,
                name: "Göçük Tamiri",
                code: ""
            },
        ]
    },
    {
        id: 4,
        name: "Lastik Hizmetleri",
        icon: <ViewAgendaIcon className="icon"/>,
        selected: false,
        details: [
            {
                id:1,
                name: "Lastik Satış",
                code: ""
            },
            {
                id:2,
                name: "Lastik Tamir",
                code: ""
            },
            {
                id:3,
                name: "Lastik Değişim",
                code: ""
            },
            {
                id:4,
                name: "Ön Düzen Ayarı",
                code: ""
            },
            {
                id:5,
                name: "Balans",
                code: ""
            },
            {
                id:6,
                name: "Jant Düzeltme",
                code: ""
            },
            {
                id:7,
                name: "Lastik Oteli",
                code: ""
            },
        ]
    },
    {
        id: 3,
        name: "Oto Kuaförlük",
        icon: <LocalCarWashIcon className="icon"/>,
        selected: false,
        details: [
            {
                id:1,
                name: "Oto Yıkama",
                code: ""
            },
            {
                id:2,
                name: "İç Detaylı Temizlik",
                code: ""
            },
            {
                id:3,
                name: "Pasta Koruma Cilası",
                code: ""
            },
            {
                id:4,
                name: "Motor Temizliği",
                code: ""
            },
            {
                id:5,
                name: "Cam Filmi",
                code: ""
            },
            {
                id:6,
                name: "Kaput Filmi",
                code: ""
            },
            {
                id:7,
                name: "Seramik Kaplama",
                code: ""
            },
        ]
    },
    {
        id: 1,
        name: "Yedek Parça",
        icon: <GroupWorkIcon className="icon"/>,
        selected: false,
        details: []
    },
]

export const garages = [
    {
        id: 16,
        name: "Reis Oto",
        address: "Söğütözü, Dumlupınar Blv. No:100/B, 06510 Çankaya/Ankara",
        selected: false,
        lat: 39.909863,
        lng: 32.7950126,
        services: services
    },
    {
        id: 10,
        name: "Mastercar Servis",
        address: "Girne, Madenci Sk. no.2A, 34854 Maltepe/İstanbul",
        selected: false,
        lat: 40.940406,
        lng: 29.142482,
        services: services
    },

    {
        id: 1,
        name: "Tekşen Servis",
        address: "Teksen Otomotiv, Yenimahalle, 55080 Canik/Samsun",
        selected: false,
        lat: 41.2965075,
        lng: 36.2389533,
        services: services
    },
    {
        id: 2,
        name: "ÖZDERE Service",
        address: "Çankırı Sanayi No: 5 Çankırı/Çerkeş",
        selected: false,
        lat: 40.912348,
        lng: 32.806211,
        services: services
    },
]

