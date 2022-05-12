/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useReducer } from 'react';
import Grid from '@mui/material/Grid';
import Classes from './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from './components/Menu';
import Vote from './components/Vote';
import { jsx, css } from '@emotion/react'


const q_data = [
  { "key": "0", "createday": "2022/01/01", "order": "2022010101", "question": "寒いですか？", "closeday": "2022/01/02", "name": "寺井", "pass": "12345" },
  { "key": "1", "createday": "2022/01/01", "order": "2022010102", "question": "乾燥してますか？", "closeday": "2022/01/02", "name": "大薮", "pass": "67890" },
];
let a_data = [
  { "key": "0", "createday": "2022/01/01", "order": "2022010101", "answer1": 70, "answer2": "", "id": "KCF-1234111.111.111" },
  { "key": "0", "createday": "2022/01/01", "order": "2022010101", "answer1": 30, "answer2": "", "id": "KCF-5678111.111.115" },
  { "key": "0", "createday": "2022/01/01", "order": "2022010101", "answer1": 50, "answer2": "", "id": "KCF-0000111.111.119" },
  { "key": "1", "createday": "2022/01/01", "order": "2022010102", "answer1": 10, "answer2": "", "id": "KCF-0121111.111.120" },
  { "key": "1", "createday": "2022/01/01", "order": "2022010102", "answer1": 90, "answer2": "", "id": "KCF-9999111.111.111" },
  { "key": "1", "createday": "2022/01/01", "order": "2022010102", "answer1": 80, "answer2": "", "id": "KCF-3333111.111.113" },
  { "key": "1", "createday": "2022/01/01", "order": "2022010102", "answer1": 70, "answer2": "", "id": "KCF-8888111.111.112" },
];

const result_output = (data) => {
  let avg = 0;
  let amount = 0;
  let count = 0;
  for (var question in data) {
    for (var answer in a_data) {
      if (data[question].key == a_data[answer].key) {
        count += 1;
        amount += a_data[answer].answer1;
      }
    }
    //各種平均計算
    avg = amount / count;
    data[question].average = avg;
    avg = amount = count = 0;

  }
}

export default function App() {

  const [data, setData] = useState(q_data)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  React.useEffect(() => {
    return () => {

    }
  }, [data])

  result_output(data);
  const deleteQuestion = (key) => {
    for (var i = 0; i < q_data.length; i++) {
      if (q_data[i].key == key) {
        delete q_data[i];
      }
    }
    forceUpdate();
  }

  return (
    <Grid container direction="column" alignItems="center" >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" />
        </Toolbar>
        <Menu color="inherit" width={280} />
      </AppBar>
      <h1 /><h1 />
      {data.map(function (data) {
        return <Vote
          title={data.question}
          createday={data.createday}
          closeday={data.closeday}
          pass={data.pass}
          average={data.average}
          date_key={data.key}
          deleteQuestion={deleteQuestion}
        />
      })
      }
      <h1 /><h1 />
    </Grid>
  );
}