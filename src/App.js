/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Classes from './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from './components/Menu';
import Vote from './components/Vote';
import { jsx, css } from '@emotion/react'


const q_date = [
  { "createday": "2022/01/01", "order": "2022010101", "question": "寒いですか？", "closeday": "2022/01/02", "name": "寺井", "pass": "12345" },
  { "createday": "2022/01/01", "order": "2022010102", "question": "乾燥してますか？", "closeday": "2022/01/02", "name": "大薮", "pass": "67890" },
  { "createday": "2022/01/02", "order": "2022010201", "question": "社員旅行行きたい場所", "closeday": "2022/01/09", "name": "池野", "pass": "135790" }
];
let a_date = [
  { "createday": "2022/01/01", "order": "2022010101", "answer1": 70, "answer2": "", "id": "KCF-1234111.111.111" },
  { "createday": "2022/01/01", "order": "2022010101", "answer1": 30, "answer2": "", "id": "KCF-5678111.111.115" },
  { "createday": "2022/01/01", "order": "2022010101", "answer1": 50, "answer2": "", "id": "KCF-0000111.111.119" },
  { "createday": "2022/01/01", "order": "2022010102", "answer1": 10, "answer2": "", "id": "KCF-0121111.111.120" },
  { "createday": "2022/01/01", "order": "2022010102", "answer1": 90, "answer2": "", "id": "KCF-9999111.111.111" },
  { "createday": "2022/01/01", "order": "2022010102", "answer1": 80, "answer2": "", "id": "KCF-3333111.111.113" },
  { "createday": "2022/01/01", "order": "2022010102", "answer1": 70, "answer2": "", "id": "KCF-8888111.111.112" },
  { "createday": "2022/01/02", "order": "2022010201", "answer1": 0, "answer2": "軽井沢", "id": "KCF-1234111.111.121" },
];


let dates = q_date.map(function (date) {
  return <Vote title={date.question} createday={date.createday} closeday={date.closeday} />
});

export default function VerticalSlider() {
  return (

    <Grid container direction="column" alignItems="center" >
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">

          </IconButton>
        </Toolbar>
        <Menu color="inherit" width={300} />
      </AppBar>
      {dates}
    </Grid>
  );
}