import React, {useState} from "react";
import DateFnsUtils from '@date-io/date-fns';
import trLocale from "date-fns/locale/tr";
import { TimePicker } from 'antd';
import moment from "moment";
import 'antd/dist/antd.css';

const format = 'HH:mm';

function NewTimeInput({onChange, label, name}){

    const [selectedTime, setSelectedTime] = React.useState(
        new Date(),
    );

    const [value, setValue] = useState('12:00');


    const handleTimeChange = (data) => {
        console.log(data, 'data');
        setValue(data);
    };

    const handleDisableDates = (value) => {
        console.log(value, 'valeee');

    }

    return (
        <div className="mb-2">
            <TimePicker
                defaultValue={moment('12:08', format)}
                format={format}
                minuteStep={10}
            />
        </div>
    )
}

export default NewTimeInput
