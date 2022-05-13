/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, TextField } from '@mui/material';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { jsx } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material/'
import Modal from "./Modal";

const { useState } = React;

function valuetext(value) {
    return `${value}°C`;
}

export default props => {

    const [show, setShow] = useState(false);
    const [isAnswered, setisAnswered] = useState(false);
    const [value, setValue] = useState(20);
    const [isDeleted, setDelete] = useState(false);


    React.useEffect(() => {
        return () => {
            props.deleteQuestion(props.date_key);
        }
    }, [isDeleted])



    return (
        <Grid item
            sx={{
                width: 0.6
                , marginTop: 2
                , backgroundColor: isAnswered == true ? "gray" : "white"
            }}
            className="slider"
        >
            <IconButton onClick={() => setShow(true)}><CloseIcon sx={{ fontSize: "40px", width: "40px" }} /></IconButton>
            <Box textAlign="center">
                <div sx={{ width: "2px" }}>作成日：{props.createday}</div>
                <div sx={{}}>締切：{props.closeday}</div>
                <div><b><font size="6">{props.key}{props.title}</font></b></div>
            </Box>
            <Box textAlign="center" sx={{ margin: 2, }}>
                <Slider
                    getAriaLabel={() => 'Temperature'}
                    orientation="vertical"
                    getAriaValueText={valuetext}
                    value={value}
                    size="large"
                    sx={{ height: 300 }}
                    disabled={isAnswered}
                    onChange={(e) => { setValue(e.target.value) }}
                />
            </Box>
            <Box textAlign="center">
                <Button
                    variant="contained"
                    sx={{ marginBottom: 2, }}
                    onClick={() => {
                        setisAnswered(true)
                        setValue(props.average)
                    }}
                >決定！</Button>
            </Box>
            <Modal
                show={show}
                setShow={setShow}
                pass={props.pass}
                setDelete={setDelete} />
        </Grid>
    );

};