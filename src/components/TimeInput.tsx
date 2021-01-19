import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import trLocale from "date-fns/locale/tr";

import {
    MuiPickersUtilsProvider,
    DatePicker,
    TimePicker,
} from '@material-ui/pickers';

const localeMap = {
    tr: trLocale,
};

type TimeInputProps = {
    onChange: (key: string, value: any) => void,
    label: string,
    name: string

}

function TimeInput({onChange, label, name} : TimeInputProps){

    const [selectedTime, setSelectedTime] = React.useState<Date | null>(
        new Date(),
    );

    const handleTimeChange = (date: Date | null) => {
        setSelectedTime(date);
        onChange(name, date);
    };

    return (
        <div className="">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap["tr"]}>
                <TimePicker
                    ampm={false}
                    invalidDateMessage={"Geçersiz Format"}
                    className="w-100 mb-3 bg-white"
                    inputVariant="outlined"

                    label={label}
                    value={selectedTime}
                    onChange={handleTimeChange}
                    okLabel={"Tamam"}
                    cancelLabel={"İptal"}
                />

            </MuiPickersUtilsProvider>
        </div>
    )
}

export default TimeInput
