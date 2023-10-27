import React from 'react';
import { Container } from '../../globalStyles';
import styled from 'styled-components';
import ProfileCard from '../../components/ProfileCard/ProfileCard';


const InfoSec = styled.div`
    color: #fff;
    /* padding: 160px 0; */
    padding: 70px 0;
    background: ${({lightBg}) => (lightBg ? '#fff' : '#10152')};
`;

const InfoRow = styled.div`
    display: flex;
    /* margin: 0 -15px -15px -15px; */
    flex-wrap: wrap;
    align-items: center;
    flex-direction: ${({imgStart}) => (imgStart ? 'row-reverse' : 'row')};
`;

const InfoColumn = styled.div`
    margin-bottom: 15px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 1;
    max-width: 50%;
    flex-basis: 50%;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
`;

const TextWrapper = styled.div`
    max-width: 540px;
    padding-top: 0;
    padding-bottom: 60px;

    @media screen and (max-width: 768px) {
        padding-bottom: 65px;
    }
`;

const Heading = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    color: ${({lightText}) => (lightText ? '#f7f8fa' : '#1c2237')};    
`;

const Subtitle = styled.p`
    max-width: 440px;
    margin-bottom: 35px;
    font-size: 18px;
    line-height: 24px;
    /* color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : '#1c2237')}; */
    color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : 'rgb(140, 146, 151)')};
`;

const ImgWrapper = styled.div`
    max-width: 555px;
    display: flex;
    justify-content: ${({start}) => (start ? 'flex-start' : 'flex-end')};
`;


const Img = styled.img`
    padding-right: 0;
    border: 0;
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
    max-height: 500px;
`;

const TeamInfo = styled.div`
  padding: 70px 0px 70px 0px;
  flex: 1;
  max-width: 100%;
  flex-basis: 50%;

  @media screen and (max-width: 768px) {
      max-width: 100%;
      flex-basis: 100%;
      display: flex;
      justify-content: center;
  }
`;

const TeamWrapper = styled.div`
  max-width: 100%;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {

  }
`;

const TeamHeading = styled.h1`
  margin-bottom: 24px;
  /* display: inline-block; */
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  font-size: 48px;
  line-height: 1.1;
  color: ${({lightText}) => (lightText ? '#f7f8fa' : '#1c2237')};    
`;

const aboutData = {
  lightBg: true,
  imgStart: '',
  lightTopLine: false,
  lightTextDesc: false,
  description: 'ORLAB Ha Noi was founded in February 2020 as a subsidiary of ORLAB Japan. We look forward to bringing Japanese job opportunities to Vietnamese engineers.',
  headline: 'About Us', 
  lightText: false,
  primary: false,
  img: require('../../images/about.png'),
  alt: 'Image',
  start: ''
}



const About = () => {
  return (
    <>
        <InfoSec lightBg={aboutData.lightBg}>
          <Container>
            <InfoRow imgStart={aboutData.imgStart}>
              <InfoColumn>
                <TextWrapper>
                  <Heading>About Us</Heading>
                  <Subtitle lightTextDesc={aboutData.lightTextDesc}>{aboutData.description}</Subtitle>
                </TextWrapper>
              </InfoColumn>

              <InfoColumn>
                <ImgWrapper start={aboutData.start}>
                  <Img src={aboutData.img} alt={aboutData.alt} />
                </ImgWrapper>
              </InfoColumn>

              <TeamInfo>
                <TeamWrapper>
                  <TeamHeading>Our Team</TeamHeading>
                  <Subtitle>write something about team</Subtitle>
                  <ProfileCard />
                </TeamWrapper>
              </TeamInfo>

            </InfoRow>
          </Container>
        </InfoSec>
    </>
  )
}

export default About