
export default function getStepsData(){
    return [
        {label: 'Araç Bilgileri', route: '/', sort: 1, prev: '/', next: '/garages', code: 'my-vehicle'},
        {label: 'Servis Noktası', route: '/garages', sort: 2, prev: '/', next: '/services', code: 'garages'},
        {label: 'Hizmet Talebi', route: '/services', sort: 3, prev: '/garages', next: '/appointmnet', code: 'services'},
        {label: 'Randevu ve Kişisel Bilgiler',  route: '/appointment', sort: 4, prev: '/services', next: '#', code: 'appointment'},

    ]

}
