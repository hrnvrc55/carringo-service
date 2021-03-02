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



function DateInput({onChange, label, name} ){
    const [selectedDate, setSelectedDate] = React.useState(
        moment().add(3, 'days')
    );

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onChange(name, date);

    };

    const handleDisableDates = (value) => {
        console.log(moment(value).format('DD-MM-YY'), 'disableee');
        let converted = moment(value).format('DD-MM-YY');

        if(converted === "15-03-21"){
            return true;
        }else{
            return false;
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
                    minDate={moment().add(3, 'days')}
                    maxDate={moment().add(3, 'days').add(1, 'months').subtract(1, 'days')}
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    shouldDisableDate={handleDisableDates}
                    //onMonthChange={this.monthChange}
                />

            </MuiPickersUtilsProvider>
        </div>
    )
}

export default DateInput
