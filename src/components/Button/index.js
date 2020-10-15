import React from 'react';
import './style.css'

export default function Button({label, ...rest}){
  return(
    <button className='buttonMain' {...rest}>
      {label}
      </button>
  );
}