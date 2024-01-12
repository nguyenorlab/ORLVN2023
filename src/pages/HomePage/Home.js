import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { homeData, visionData } from './Data';
import Carousel from '../../components/Carousel/Carousel';
import JobsSlider from '../../components/JobsSlider/JobsSlider';
import { Container, Button } from '../../globalStyles';
import VisibilitySensor from 'react-visibility-sensor';
import { useTranslation } from 'react-i18next';



const InfoSec = styled.div`
  color: #fff;
  padding: 50px 0;
  background: ${({lightBg}) => (lightBg ? '#fff' : '#10152')};
`;

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({imgStart}) => (imgStart ? 'row-reverse' : 'row')};
  justify-content: ${({ center }) => (center ? 'center' : 'left')};
`;

const slideFromLeft = keyframes`
  0% {
      transform: translateX(-100%);
      opacity: 0;
  }
  100% {
      transform: translateX(0);
      opacity: 1;
  }
`;

const slideFromRight = keyframes`
  0% {
      transform: translateX(100%);
      opacity: 0;
  }
  100% {
      transform: translateX(0);
      opacity: 1;
  }
`;

const InfoColumn = styled.div`
  margin-bottom: 15px;
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;

  animation: ${({ isVisible, imgStart }) => isVisible ? (imgStart ? css`${slideFromRight} 2s forwards` : css`${slideFromLeft} 2s forwards`) : 'none'};


  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;

const PartnerDiv = styled.div`
  margin-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
  max-width: 100%;
  flex-basis: 100%;

  @media screen and (max-width: 768px) {
      max-width: 100%;
      flex-basis: 100%;
      display: flex;
      justify-content: center;
      padding-left: 0px;
      padding-right: 0px;
  }
`;

const TextWrapper = styled.div`
  width: 100%;
  padding-top: 0;
  /* padding-bottom: 60px; */

  @media screen and (max-width: 768px) {
      /* padding-bottom: 65px; */
  }
`;

const TopLine = styled.div`
  color: ${({ligthTopLine}) => (ligthTopLine ? '#a9b3c1' : '#4b59f7')};
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 1.4px;
  margin-bottom: 16px;
`;

const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 46px;
  line-height: 1.1;
  color: ${({lightText}) => (lightText ? '#f7f8fa' : '#1c2237')};
  text-align: ${({ center }) => (center ? 'center' : '')};   
`;

const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : 'rgb(140, 146, 151)')};
  text-align: justify;
  hyphens: auto;
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

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;


  @media screen and (max-width: 600px) {
    max-width: 100%;
    max-width: 450px;
    margin: 0 auto;
  }
`;

const SmallImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit:  contain;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 10px;
  padding: 10px;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;


const Home = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation('Home');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleExplore = (id) => {
    if(id === 1) {
      navigate('/about');
    } else if(id === 2) {
      navigate('/services');
    }
  };

  const PartnerImage = [
    {
      id: 1,
      img: require('../../images/logo-fs.png')
    },
    {
      id: 2,
      img: require('../../images/logo-MB.png')
    },
    {
      id: 3,
      img: require('../../images/logo-t-supo1.png')
    },
    {
      id: 4,
      img: require('../../images/logo-gg.png')
    },
    {
      id: 5,
      img: require('../../images/logo-aws.png')
    },
    {
      id: 6,
      img: require('../../images/logo-azure.png')
    },
    {
      id: 7,
      img: require('../../images/logo-kse.png')
    },
    {
      id: 8,
      img: require('../../images/logo-hubspot.png')
    },
    {
      id: 9,
      img: require('../../images/logo-wawiwa.png')
    },
  ]

  return (
    <>
      <Carousel />

      {homeData.map((item, index) => (
        <InfoSec lightBg={item.lightBg} key={index}>
            <Container>
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <InfoRow imgStart={item.imgStart}>
                    <InfoColumn isVisible={isVisible} imgStart={item.imgStart}>
                      <TextWrapper>
                        <TopLine lightTopLine={item.lightTopLine}>{t(`${item.topLine}`)}</TopLine>
                        <Heading lightText={item.lightText}>{t(`${item.headline}`)}</Heading>
                        <Subtitle lightTextDesc={item.lightTextDesc}>{t(`${item.description}`)}</Subtitle>
                        <Button onClick={() => handleExplore(item.id)}>{t('EXPLORE')}</Button>
                      </TextWrapper>
                    </InfoColumn>
                    <InfoColumn isVisible={isVisible} imgStart={!item.imgStart}>
                      <ImgWrapper start={item.start}>
                        <Img src={item.img} alt={item.alt} />
                      </ImgWrapper>
                    </InfoColumn>
                  </InfoRow>
                )}
              </VisibilitySensor>
            </Container>
        </InfoSec>
      ))}

      <JobsSlider />

      <VisibilitySensor partialVisibility>
        {({ isVisible }) => (
          <InfoSec lightBg={visionData.lightBg}>
            <Container>
              <InfoRow imgStart={visionData.imgStart}>
                <InfoColumn isVisible={isVisible} imgStart={visionData.imgStart}>
                  <TextWrapper>
                    <TopLine lightTopLine={visionData.lightTopLine}>{t(`${visionData.topLine}`)}</TopLine>
                    <Heading lightText={visionData.lightText}>{t(`${visionData.headline}`)}</Heading>
                    <Subtitle lightTextDesc={visionData.lightTextDesc}>{t(`${visionData.description}`)}</Subtitle>
                  </TextWrapper>
                </InfoColumn>
                <InfoColumn isVisible={isVisible} imgStart={!visionData.imgStart}>
                  <ImgWrapper start={visionData.start}>
                    <Img src={visionData.img} alt={visionData.alt} />
                  </ImgWrapper>
                </InfoColumn>
              </InfoRow>
            </Container>
          </InfoSec>
        )}
      </VisibilitySensor>

      <InfoSec>
        <Container>
          <InfoRow center>
            <PartnerDiv>
              <TextWrapper>
                  <Heading center>{t('Customers And Partners')}</Heading>
                  <ImageContainer>
                    {PartnerImage.map((image, id) => (
                      <SmallImage key={id} src={image.img} alt={`logo ${id + 1}`} />
                    ))}
                  </ImageContainer>
              </TextWrapper>
            </PartnerDiv>
          </InfoRow>
        </Container>
      </InfoSec>
    </>
  )
}

export default Home;