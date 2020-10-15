import React from "react";
import "./style.css";
import logo_img from './logoF.png';
import Button from '../../../components/Button/index.js'


export default function GameStart({ setScreen }) {
  return (
    <div className='container'>
      <div className='frame1'>
          <img className='logoHand'
              src={logo_img}
              alt="big finger logo"/>
      </div>
      <div className='frame2'>
        <span className="headLine">Who wants to be a millionaire?</span>
          <Button onClick={setScreen} label='Statr'/>
          
      </div>
    </div>
  );
}
