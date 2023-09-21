import React from 'react';
import { newsObj } from './Data';
import { InfoSection } from '../../components';

const News = () => {
  return (
    <>
        <InfoSection {...newsObj} />
    </>
  )
}

export default News