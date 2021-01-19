import isEmail from 'validator/lib/isEmail';

let errors = [];

export function homeValidate(form: any) {
    errors = [];
    if(!form?.brand){
        errors.push({
            name: 'brand-error',
            message: 'Marka seçiniz'
        })
    }

    if(!form?.model){
        errors.push({
            name: 'model-error',
            message: 'Model seçiniz'
        })
    }

    if(!form?.gear){
        errors.push({
            name: 'gear-error',
            message: 'Şanzıman Türü seçiniz'
        })
    }

    if(!form?.engine){
        errors.push({
            name: 'engine-error',
            message: 'Motor seçiniz'
        })
    }

    if(!form?.kilometer){
        errors.push({
            name: 'kilometer-error',
            message: 'Kilometre bilgisi giriniz'
        })
    }

    return errors;
}

export function appointmentValidate(form: any){
    errors = [];

    if(!form?.first_name){
        errors.push({
            name: 'first_name-error',
            message: 'Adınız boş geçilemez'
        })
    }

    if(!form?.last_name){
        errors.push({
            name: 'last_name-error',
            message: 'Soyadınız boş geçilemez'
        })
    }

    if(!form?.email){
        errors.push({
            name: 'email-error',
            message: 'Eposta boş geçilemez'
        })
    }else if(form?.email){
       if(!isEmail(form?.email)){
           errors.push({
               name: 'email-error',
               message: 'Geçerli bir eposta giriniz'
           })
       }
    }

    if(!form?.phone || form?.phone === "(0   )         "){
        errors.push({
            name: 'phone-error',
            message: 'Telefon boş geçilemez'
        })
    }else if(form?.phone){
        let str = form?.phone;
        let replaced = str.replace("(", '').replace(")", '').replace(" ", '');
        const ch = /\s*(?:;|$)\s*/
        let last = replaced.split(ch);
        if(last[0].length < 12){
            errors.push({
                name: 'phone-error',
                message: 'Geçerli bir telefon numarası giriniz'
            })
        }
    }

    if(!form?.description){
        errors.push({
            name: 'description-error',
            message: 'Açıklama boş geçilemez'
        })
    }

    return errors;

}

export function serviceValidate(form: any) {

    if(form?.services === undefined || form?.services?.length <= 0){
        return false;
    }else{
        return true;
    }
}

export function garageValidate(form: any){
    console.log(form?.garage, 'formm');
    if(form?.garage === undefined){
        return false;
    }else{
        return true;
    }
}
