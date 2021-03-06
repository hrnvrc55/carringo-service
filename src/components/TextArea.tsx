import TextField from "@material-ui/core/TextField";
import React, {useEffect, useState} from "react";

type InputProps = {
    label: string,
    onChange: (key: string, value: any) => void,
    name: string,
    defaultValue?: any | undefined,
    errors?: any
}

function TextArea({label, name, onChange, defaultValue, errors} : InputProps){
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
            multiline={true}
            rows={4}
            style={{ width: "100%", backgroundColor: "white"}}
            label={label}
            variant="outlined"
            name={name}
            onChange={onChangeComponent}
            defaultValue={defaultValue}
            error={error.status}
            helperText={error.message}
            onFocus={() => setError({message: "", status: false})}
        />

    )
}
export default TextArea;
