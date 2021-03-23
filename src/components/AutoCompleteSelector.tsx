import React, {useEffect, useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

type SelectorProps = {
    options: {id: number, name: string}[],
    name: string,
    onChange: (key: string, value: any) => void
    label: string,
    defaultValue?: any |undefined
    errors?: any
}


function AutoCompleteSelector({options, name, defaultValue, onChange, label, errors} : SelectorProps){

    let [error, setError] = useState<any>({message: "", status: false});


    const onChangeSelector = (e: object, value: any) => {
       onChange(name, value);
    }

    useEffect(() => {
        if(errors.length > 0){
            let found = errors.find((x: any) => x.name === name + "-error");
            if(Boolean(found)){
                setError({message: found.message, status: true});
            }
        }
    },[errors])

    return (
        <div className="mb-3">
        <Autocomplete
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => option.name}
            onChange={onChangeSelector}
            style={{ width: "100%"}}
            onFocus={() => setError({message: "", status: false})}
            defaultValue={defaultValue}
            renderInput={(params) => <TextField helperText={error.message} error={error.status} style={{ backgroundColor: "white"}} {...params} label={label} variant="outlined" />}
        />
        </div>
    )
}

export default AutoCompleteSelector;
