import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) =>
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


export default function SelectBox({value, onChange, label, name, list}){
    const classes = useStyles();

    function onChangeSelectBox(e){
        onChange(name, e.target.value);
    }

    return (
        <div className="mb-3">
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={value}
                    onChange={onChangeSelectBox}

                >
                    {list.map((item,idx) => (
                        <MenuItem key={"menu-select-"+idx} value={item}>{item.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>

    )
}
