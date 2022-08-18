import React from 'react';
import loading from '../../assets/loader.gif';

export const Loading = ({ className }) => {
  return (
    <img src={ loading } className={ className } />
  )
};
