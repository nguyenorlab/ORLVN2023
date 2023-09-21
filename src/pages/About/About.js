import React from 'react';
import { aboutObjOne } from './Data';
import { InfoSection } from '../../components';

const About = () => {
  return (
    <>
        <InfoSection {...aboutObjOne} />
    </>
  )
}

export default About