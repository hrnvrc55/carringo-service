import React, {useEffect, useState} from 'react';
import MaskedInput from 'react-text-mask';
import TextField from '@material-ui/core/TextField';

interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(','0',/[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

type phoneInputProps = {
    label: string,
    onChange: (key: string, value: any) => void,
    name: string,
    defaultValue?: any | undefined,
    errors?: any

}

export default function FormattedInputs({name, label, onChange, defaultValue, errors} : phoneInputProps) {

    let [error, setError] = useState<any>({message: "", status: false});

    useEffect(() => {
        if(errors !== undefined && errors.length > 0){
            let found = errors.find((x: any) => x.name === name + "-error");
            if(Boolean(found)){
                setError({message: found.message, status: true});
            }
        }
    },[errors])

    function onChangeComponent(e: React.ChangeEvent<HTMLInputElement>){
        onChange(name, e.target.value);
    }

    return (
        <TextField
            className="mb-3"
            type="tel"
            style={{ width: "100%", backgroundColor: "white"}}
            variant="outlined"
            onChange={onChangeComponent}
            name={name}
            label={label}
            defaultValue={defaultValue}
            InputProps={{
                inputComponent: TextMaskCustom as any
            }}
            error={error.status}
            helperText={error.message}
            onFocus={() => setError({message: "", status: false})}

        />
    );
}
