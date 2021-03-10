import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import trLocale from "date-fns/locale/tr";
import moment from "moment";

import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';

const localeMap = {
    tr: trLocale,
};

type DateInputProps = {
    onChange: (key: string, value: any, times: any) => void,
    label: string,
    name: string,
    maxDate: any,
    minDate: any,
    availableDates: any,

}

function DateInput({onChange, label, name, maxDate, minDate, availableDates} : DateInputProps){
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const handleDateChange = (date: any | null) => {
        setSelectedDate(date);

        let found = availableDates?.find((x:any) => moment(x.date).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD"))

        onChange(name, date, found?.time);

    };

    function disableDates(value: any){
        if(availableDates?.find((x:any) => moment(x.date).format("YYYY-MM-DD") === moment(value).format("YYYY-MM-DD"))){
            return false;
        }else{
            return true
        }
    }

    return (
        <div className="">
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap["tr"]}>
            <DatePicker
                autoOk
                inputVariant="outlined"
                className="w-100 bg-white mb-3"
                margin="normal"
                id="date-picker-dialog"
                label={label}
                cancelLabel="İptal"
                okLabel="Tamam"
                todayLabel="Bugün"
                clearLabel="Temizle"
                minDate={minDate}
                maxDate={maxDate}
                // minDate={moment()}
                // maxDate={moment().add(3, 'days').add(1, 'months').subtract(1, 'days')}
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                shouldDisableDate={disableDates}
                //onMonthChange={this.monthChange}
            />

        </MuiPickersUtilsProvider>
        </div>
    )
}

export default DateInput
