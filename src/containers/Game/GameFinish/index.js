import React from "react";
import Button from "../../../components/Button";
import '../GameStart/style.css';
import './styleFinish.css'
import logo_img from '../GameStart/logoF.png';


export default function GameStart({ setScreen, reward }) {
  console.log("reward", reward);
  return (
    <div>
      <div className='container'>
      <div className='frame1'>
        <img
        className='logoHand'
          src={logo_img}
          alt="big finger logo"
        />
      </div>
      <div className='frame2'>
        <div className="frameLabel">
            <h2 className='labelTotal'>Total score:</h2>
            <div className='earned'>${reward} earned</div>
        </div>
                <Button onClick={setScreen} label='Try Again'/>
          
      </div>
    </div>
     
      
    </div>
  );
}
