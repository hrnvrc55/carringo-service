import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import trLocale from "date-fns/locale/tr";

import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';

const localeMap = {
    tr: trLocale,
};

type DateInputProps = {
    onChange: (key: string, value: any) => void,
    label: string,
    name: string

}

function DateInput({onChange, label, name} : DateInputProps){
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date(),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        onChange(name, date);

    };

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
                //minDate={moment().add(this.props.cargoDeliveryDay, 'days')}
                //maxDate={moment().add(this.props.cargoDeliveryDay, 'days').add(1, 'months').subtract(1, 'days')}
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                //shouldDisableDate={this.disableDates}
                //onMonthChange={this.monthChange}
            />

        </MuiPickersUtilsProvider>
        </div>
    )
}

export default DateInput
