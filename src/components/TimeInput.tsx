import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import trLocale from "date-fns/locale/tr";

import {
    MuiPickersUtilsProvider,
    TimePicker,
} from '@material-ui/pickers';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

const localeMap = {
    tr: trLocale,
};

type TimeInputProps = {
    onChange: (key: string, value: any) => void,
    label: string,
    name: string,
    times: any,

}

// const times = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00",]

function TimeInput({onChange, label, name, times} : TimeInputProps){

    const [selectedTime, setSelectedTime] = React.useState<string | undefined>("08:00");

    const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
          setSelectedTime(event.target.value as string);
          onChange(name, event.target.value as string);
    };

    return (
        <div className="">
            <FormControl variant="outlined" className="w-100 mb-3 bg-white">
                <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={selectedTime}
                    onChange={handleTimeChange}
                >

                    {times.map((item: any, idx: number) => (
                        <MenuItem value={item}>{item}</MenuItem>
                    ))}

                </Select>
            </FormControl>
        </div>
    )
}

export default TimeInput
