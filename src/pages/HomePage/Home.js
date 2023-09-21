import React from 'react';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import { InfoSection, Pricing } from '../../components';
// import HeroImg from '../../images/carousel-1.jpg';
// import styled from 'styled-components';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import image1 from '../../assets/carousel-1.jpg';
import image2 from '../../assets/carousel-2.jpg';

// const HeroContainer = styled.div`
//   background: #fff;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0 30px;
//   height: 100vh; /* Set height to viewport height */
//   position: relative;
//   z-index: 1;
// `;

// const HeroBg = styled.div`
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
// `;

// const ImgBg = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover; /* Scale the image to cover the entire screen */
// `;


const Home = () => {
  return (
    <>
      {/* <HeroContainer> */}
        {/* <HeroBg>
          <ImgBg src={HeroImg} alt='hero' />
        </HeroBg> */}
      <ImageSlider images={[image1, image2]}>
        <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <h1>React.js Image Slider</h1>
            <p>Nulla vitae elit libero, a pharetra augue.</p>
          </div>
      </ImageSlider>
      {/* </HeroContainer> */}
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjThree} />
      <Pricing />
      <InfoSection {...homeObjFour} />
    </>
  )
}

export default Home