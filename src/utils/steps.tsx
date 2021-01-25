
export default function getStepsData(){
    return [
        {label: 'Hizmet Talebi', route: '/', sort: 1, prev: '/', next: '/my-vehicle', code: 'main'},
        {label: 'Araç Bilgileri', route: '/my-vehicle', sort: 2, prev: '/', next: '/garages', code: 'my-vehicle'},
        {label: 'Servis Noktası', route: '/garages', sort: 3, prev: '/my-vehicle', next: '/appointment', code: 'garages'},
        {label: 'Randevu ve Kişisel Bilgiler',  route: '/appointment', sort: 4, prev: '/garages', next: '#', code: 'appointment'},

    ]

}
