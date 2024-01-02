import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { Container, Button } from '../../globalStyles';
import { serDetailObj } from '../Services/Services'
import { useTranslation } from 'react-i18next';


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

const InfoColumnJob = styled.div`
    margin-bottom: 15px;
    /* padding-right: 15px;
    padding-left: 15px; */
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

const TextWrapper = styled.div`
    /* max-width: 540px; */
    padding-top: 0;
    /* padding-bottom: 60px; */

    @media screen and (max-width: 768px) {
        /* padding-bottom: 65px; */
    }
`;

const TopLine = styled.div`
    color: rgb(0, 94, 141);
    font-size: 18px;
    line-height: 16px;
    letter-spacing: 1.4px;
    margin-bottom: 16px;
    /* text-shadow: 5px -5px 4px rgba(0, 0, 0, 0.5); */
`;

const Heading = styled.h1`
    margin-bottom: 24px;
    font-size: ${({ heading }) => heading ? '48px' : '20px'};
    line-height: 1.1;
    color: rgb(0, 94, 141);
    /* text-shadow: 5px -5px 3px rgba(0, 0, 0, 0.5);     */
`;

const StyledButton = styled(Button)`
  width: 200px;
  margin: 30px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoColumn = styled.div`
    margin-bottom: 15px;
    /* padding-right: 15px; */
    /* padding-left: 15px; */
    flex: 1;
    max-width: 50%;
    flex-basis: 50%;
    display: flex;
    justify-content: ${({start}) => (start ? 'flex-start' : 'flex-end')};

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
`;

const Subtitle = styled.p`
  position: ${({ absolute }) => absolute ? 'absolute' : 'unset'};
  top: 65px;
  margin-top: ${({ top }) => top ? '10px' : '0px'};
  max-width: 600px;
  margin-bottom: ${({ subTitle }) => subTitle ? '35px' : '10px'};
  font-size: 17px;
  line-height: 24px;
  color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : 'rgb(140, 146, 151)')};
  /* position: relative; */
  text-align: justify;
  padding: ${({ left }) => left ? '0px 20px' : '0px'};
`;

const ImgWrapper = styled.div`
    max-width: 555px;
    display: flex;
    justify-content: ${({start}) => (start ? 'flex-start' : 'flex-end')};
`;

const Img = styled.img`
    padding: 30px;
    border: 0;
    width: 500px;
    height: 500px;
    object-fit: contain;
    vertical-align: middle;
    display: inline-block;
    border-radius: 10px;

    @media screen and (max-width: 768px) {
      width: 400px;
      height: 400px;
    }
`;

const ProcedureHeading = styled.h1`
  margin: 30px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 46px;
  line-height: 1.1;
  color: rgb(0, 94, 141);    
`;


// keyframes for bottom animation
const moveRight = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
`;

const moveUp = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
`;

const moveLeft = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(0); }
`;

const Square = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  /* border: 3px solid #bdbdbd; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 350px;
  height: 450px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(140, 146, 151, 0.2);
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.5s ease-out;
  animation: ${props => {
    switch (props.animation) {
      case 'right':
        return css`${moveRight} 1s ease-out forwards`;
      case 'up':
        return css`${moveUp} 1s ease-out forwards`;
      case 'left':
        return css`${moveLeft} 1s ease-out forwards`;
      default:
        return 'none';
    }
  }};

  &:hover {
    box-shadow: rgb(0, 94, 141) 10px 18px 15px 0px;
    transform: translateY(-20px);
  }

  @media screen and (max-width: 1300px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media screen and (max-width: 640px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const SubHeading = styled.h4`
  text-align: center;
  color: rgb(0, 94, 141);
  position: absolute;
  top: 30px;
  text-transform: uppercase;
`;

const StepId = styled.div`
  position: absolute;
  bottom: 0px;
  text-align: center;
  font-size: 30px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  /* max-height: calc(100% - 50px); */
  object-fit: cover;
  position: absolute;
  bottom: 40px;
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  /* flex-direction: row; */
  /* justify-content: space-between; */
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 1300px) {
    display: flex;
    /* justify-content: space-between; */
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
`;
// -- end keyframes -- //



const ServiceDetail = () => {
  const { i18n, t } = useTranslation('Services');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);


  // selectedService match with Route path in App.js
  const { selectedService: serviceNameParam } = useParams();
  const serviceNameFromUrl = decodeURIComponent(serviceNameParam);


  const [selectedServiceName] = useState(() => {
    if (location.state) {
      return location.state.selectedService;
    }
    const serviceFromUrl = serDetailObj.find(ser => ser.serviceName === serviceNameFromUrl);
    return serviceFromUrl || serDetailObj[0];
  });


  const handleBack = useCallback(() => {
    navigate(`/services`);
  },[navigate]);


  // display only 2 square in a row
  const rows = [];
  for (let i = 0; i < selectedServiceName.step.length; i += 4) {
    rows.push(selectedServiceName.step.slice(i, i + 4));
  }

  const StepComponent = ({ step, index }) => {
    let animation;
    if (index < 2) {
      animation = 'right';
    } else if (index < 4) {
      animation = 'up';
    } else {
      animation = 'left';
    }
  
    return (
      <>
        <Square animation={animation}>
          <SubHeading>{t(`${step.step}`)}</SubHeading>
          <Subtitle absolute left>{t(`${step.description}`)}</Subtitle>
          <Image src={step.image} />
          <StepId>{step.id}</StepId>
        </Square>
      </>
    );
  };


  return (
    <>
      {selectedServiceName ?
        <InfoSec>
          <Container>            
            <InfoRow>
              <InfoColumn start={true.toString()}>
                <TextWrapper>
                  <TopLine>{t('Service Detail')}</TopLine>
                  <Heading heading>{t(`${selectedServiceName.serviceName}`)}</Heading>
                  <Subtitle subTitle>{t(`${selectedServiceName.shortDescription}`)}</Subtitle>
                  {selectedServiceName.serviceName === 'Software Outsourcing' ? 
                    <>
                      <Heading>{t('Our range of services includes:')}</Heading>
                      <Subtitle top>・{t('Web Designing')}</Subtitle>
                      <Subtitle top>・{t('Web Development')}</Subtitle>
                      <Subtitle top>・{t('Web Customization')}</Subtitle>
                    </> : ''}                 
                </TextWrapper>
              </InfoColumn>

              <InfoColumn data-start={false.toString()}>
                <ImgWrapper>
                  <Img src={selectedServiceName.image} alt='image' />
                </ImgWrapper>
              </InfoColumn>

              <InfoColumnJob>
                <TextWrapper>
                  <ProcedureHeading>{t('Our Procedure')}</ProcedureHeading>
                  {rows.map((row, rowIndex) => (
                    <Row key={rowIndex}>
                      {row.map((step, index) => (
                        <StepComponent key={step.id} step={step} index={rowIndex * 2 + index} />
                      ))}
                    </Row>
                  ))}
                  <StyledButton onClick={handleBack}>{t('Back to Main Services')}</StyledButton>
                </TextWrapper>
              </InfoColumnJob>
            </InfoRow>
          </Container>
        </InfoSec>
      : 'No data found'
      }
    </>
  )
}

export default ServiceDetail