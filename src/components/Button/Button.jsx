/* eslint-disable prettier/prettier */
import {} from 'react';
import cls from './Button.module.css';

const isPrimary = true;

export const Button = ({onClick, children}) => {
  return (
    <button
      className={`${cls.btn} ${isPrimary ? cls.primary : ''}`}
      onClick={onClick}
    > {children} </button>
  );
};
