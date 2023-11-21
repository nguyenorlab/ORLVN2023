import React from 'react';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import { InfoSection } from '../../components';
import Carousel from '../../components/Carousel/Carousel';
import JobsSlider from '../../components/JobsSlider/JobsSlider';
// import { JobsProvider } from '../../api/api';





const Home = () => {


  return (
    <>
      <Carousel />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjThree} />
      
      {/* <JobsProvider> */}
        <JobsSlider />        
      {/* </JobsProvider> */}

      <InfoSection {...homeObjFour} />
    </>
  )
}

export default Home