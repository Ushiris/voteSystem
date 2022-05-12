/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react'
import { jsx } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material/'
import { OptionGroupUnstyled } from '@mui/base';
import { PropaneSharp } from '@mui/icons-material';

export default function Modal({ show, setShow, pass, setDelete }) {

    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value)
    }

    if (show) {
        return (
            <div
                id="overlay"
                style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div
                    id="content"
                    style={{
                        zIndex: "2",
                        width: "50%",
                        padding: "1em",
                        backgroundColor: "#fff",
                        textAlign: "center"
                    }}>
                    <IconButton>
                        <CloseIcon
                            onClick={() => setShow(false)}
                            sx={{
                                fontSize: "20px"
                                , width: "40px"
                                , alignItems: "left"
                            }} />
                    </IconButton>
                    <a
                        style={{
                            display: "block",
                            marginBottom: "18px"
                        }}
                    >削除用パスワードを入力してください
                    </a>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        style={{
                            position: "relative",
                            top: "10px",
                            left: "5px"
                        }}
                        onClick={() => {
                            if (pass === text) {
                                setDelete(true);
                            }
                        }}
                    >
                        削除
                    </Button>
                </div>
            </div >

        )
    } else {
        return null;
    }
}