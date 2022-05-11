import * as React from 'react';
import { slide as Menu } from "react-burger-menu";
import '../style.css';

export default props => {
  return (
    <Menu {...props}>
      <a href="/">テスト</a>
      <a href="/">Menu1</a>
      <a href="/">Menu2</a>
      <a href="/">Menu3</a>
    </Menu>
  );
};