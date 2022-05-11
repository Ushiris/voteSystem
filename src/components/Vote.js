/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Container, Box } from '@mui/material';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { jsx, css } from '@emotion/react'

function valuetext(value) {
    console.log(value);
    return `${value}°C`;
}

const dateStyle = css`
        textAlign: "right",
        `

export default props => {

    return (
        <Grid item sx={{ width: 0.6, marginTop: 2 }} className="slider">
            <Box textAlign="center">
                <div css={dateStyle}>作成日：{props.createday}</div>
                <div css={dateStyle}>締切：{props.closeday}</div>
                <div><b><font size="6">{props.title}</font></b></div>
            </Box>
            <Box textAlign="center" sx={{ margin: 2, }}>
                <Slider
                    getAriaLabel={() => 'Temperature'}
                    orientation="vertical"
                    getAriaValueText={valuetext}
                    defaultValue={20}
                    size="large"
                    sx={{ height: 300 }}
                />
            </Box>
            <Box textAlign="center">
                <Button
                    variant="contained"
                    sx={{ marginBottom: 2, }}
                >決定！</Button>
            </Box>
        </Grid>
    );
};

