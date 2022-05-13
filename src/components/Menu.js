import * as React from 'react';
import { slide as Menu } from "react-burger-menu";
import '../style.css';

export default props => {
  return (
    <Menu {...props}
      styles={styles}
    >
      <a href="#" onClick={() => { alert("新規作成") }}>新規作成</a>
    </Menu>
  );
};

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '20px'
  },

}