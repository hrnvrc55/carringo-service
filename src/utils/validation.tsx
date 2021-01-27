import isEmail from 'validator/lib/isEmail';

let errors = [];
let serviceError = null;

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
        let arrayStr = replaced.split('').filter((e : any) => e.trim().length).join('');


        if(Number(arrayStr.length) < 11){

            errors.push({
                name: 'phone-error',
                message: 'Geçerli bir telefon numarası giriniz'
            })
        }
    }

    return errors;

}

export function serviceValidate(form: any) {

    serviceError = null;

    if(form?.services === undefined || form?.services?.length <= 0){
        serviceError = {
            name: "service-error",
            status: false,
            message: "Lütfen en az 1 hizmet türü seçiniz"
        }
        return serviceError;
    }else if(!form?.data_permission || !form?.share_permission || !form?.person_data_permission){
        serviceError = {
            name: "contract-error",
            status: false,
            message: "Lütfen sözleşme metinlerini okuyup onaylayınız"
        }
        return serviceError;
    }else{
        return serviceError;
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

export function registerValidate(form: any) {
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
        let arrayStr = replaced.split('').filter((e : any) => e.trim().length).join('');


        if(Number(arrayStr.length) < 11){

            errors.push({
                name: 'phone-error',
                message: 'Geçerli bir telefon numarası giriniz'
            })
        }
    }

    if(!form?.password){
        errors.push({
            name: 'password-error',
            message: 'Şifre boş geçilemez'
        })
    }else if(form?.password){
        if(!form?.password_again){
            errors.push({
                name: 'password_again-error',
                message: 'Şifrenizi onaylayınız'
            })
        }else if(form?.password_again){
            if(form?.password !== form?.password_again){
                errors.push({
                    name: 'password-error',
                    message: 'Şifreleriniz aynı olmalı'
                })
            }
        }
    }

    if(!form?.username){
        errors.push({
            name: 'username-error',
            message: 'Kullanıcı adınız boş geçilemez'
        })
    }


    return errors;
}

export function loginValidate(form: any){
    errors = [];

    if(!form?.username){
        errors.push({
            name: 'username-error',
            message: 'Kullanıcı adınız boş geçilemez'
        })
    }

    if(!form?.password){
        errors.push({
            name: 'password-error',
            message: 'Şifreniz boş geçilemez'
        })
    }

    return errors;
}
