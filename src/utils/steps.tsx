
export default function getStepsData(){
    return [
        {label: 'Araç Bilgileri', route: '/', sort: 1, prev: '/', next: '/services', code: 'main'},
        {label: 'Hizmetler', route: '/services', sort: 2, prev: '/', next: '/garages', code: 'services'},
        {label: 'Servis Noktası', route: '/garages', sort: 3, prev: '/services', next: '/appointment', code: 'garages'},
        {label: 'Randevu ve Kişisel Bilgiler',  route: '/appointment', sort: 4, prev: '/garages', next: '#', code: 'appointment'},

    ]

}
