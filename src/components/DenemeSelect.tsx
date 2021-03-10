import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 120,
            backgroundColor: "white",
            width: "100%"
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

type TimeInputProps = {
    onChange: (key: string, value: any) => void,
    label: string,
    name: string,
    times: any,

}

export default function DenemeSelect({onChange, label, name, times} : TimeInputProps) {
    const classes = useStyles();

    const [selectedTime, setSelectedTime] = React.useState<string | undefined>(undefined);

    const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedTime(event.target.value as string);
        onChange(name, event.target.value as string);

        console.log(event.target.value, 'value');
    };

    return (
        <div className="mb-3">
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    label="Age"
                >
                    {times.map((item: any, idx: number) => (
                        <MenuItem value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>
    );
}
