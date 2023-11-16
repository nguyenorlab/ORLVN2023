import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { Container, Button } from '../../globalStyles';


// import service1 from '../../images/hero.png';    // test images public
// import service3 from '../../images/hero.png';
// import codingFlow from '../../images/coding-flow1.jpg';


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
    font-size: 48px;
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
    max-width: 600px;
    margin-bottom: 35px;
    font-size: 18px;
    line-height: 24px;
    /* color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : '#1c2237')}; */
    color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : 'rgb(140, 146, 151)')};
    position: relative;
    z-index: 2;
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
    border-radius: 10px;
`;

const ProcedureHeading = styled.h1`
  margin: 30px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  font-size: 48px;
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
  border: 3px solid #bdbdbd;
  border-radius: 10px;
  width: 600px;
  height: 600px;
  margin-top: 30px;
  margin-bottom: 10px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 700px;
  color: rgba(140, 146, 151, 0.1);
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
    margin-top: 30px;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 640px) {
    width: 500px;
    height: 500px;
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const StepId = styled.div`
  position: absolute;
  z-index: 1;
`;

const Row = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;

  @media screen and (max-width: 1300px) {
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
// -- end keyframes -- //



// sau thay = API
const serDetailObj = [
  {
    id: 1,
    serviceName: 'Software Outsourcing',
    image: require('../../images/software.jpg'),
    description: 'Software Outsourcing --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic qui excepturi alias vel sunt necessitatibus incidunt reiciendis voluptatibus eaque quos molestiae dolorem perferendis, nisi nostrum consequuntur accusantium optio. Error, magni.',
    step: [],
  },
  {
    id: 2,
    serviceName: 'Software Development',
    image: require('../../images/coding-flow1.jpg'),
    description: 'Software Development --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic qui excepturi alias vel sunt necessitatibus incidunt reiciendis voluptatibus eaque quos molestiae dolorem perferendis, nisi nostrum consequuntur accusantium optio. Error, magni.',
    step: [],
  },
  {
    id: 3,
    serviceName: 'Recruitment',
    image: require('../../images/recruitment-flow.jpg'),
    description: 'Recruitment --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic qui excepturi alias vel sunt necessitatibus incidunt reiciendis voluptatibus eaque quos molestiae dolorem perferendis, nisi nostrum consequuntur accusantium optio. Error, magni.',
    step: [
      {
        id: 1,
        step1: 'Open vacancy',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sequi, debitis hic molestias, ullam voluptatem nisi fugit sunt cum porro repudiandae itaque neque, eaque vitae quasi. Ea asperiores illum vel?',
      },
      {
        id: 2,
        step2: 'Hiring Process',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sequi, debitis hic molestias, ullam voluptatem nisi fugit sunt cum porro repudiandae itaque neque, eaque vitae quasi. Ea asperiores illum vel?',
      },
      {
        id: 3,
        step3: 'Interview',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sequi, debitis hic molestias, ullam voluptatem nisi fugit sunt cum porro repudiandae itaque neque, eaque vitae quasi. Ea asperiores illum vel?',
      },
      {
        id: 4,
        step4: 'Ready to work',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sequi, debitis hic molestias, ullam voluptatem nisi fugit sunt cum porro repudiandae itaque neque, eaque vitae quasi. Ea asperiores illum vel?',
      },
    ],
  }
];

const ServiceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  for (let i = 0; i < selectedServiceName.step.length; i += 2) {
    rows.push(selectedServiceName.step.slice(i, i + 2));
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
          <StepId>{step.id}</StepId>
          <Subtitle>{step.description}</Subtitle>        
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
                  <TopLine>Service Detail</TopLine>
                  <Heading>{selectedServiceName.serviceName}</Heading>
                  <Subtitle>{selectedServiceName.description}</Subtitle>
                </TextWrapper>
              </InfoColumn>

              <InfoColumn data-start={false.toString()}>
                <ImgWrapper>
                  <Img src={selectedServiceName.image} alt='image' />
                </ImgWrapper>
              </InfoColumn>

              <InfoColumnJob>
                <TextWrapper>
                  <ProcedureHeading>Our Procedure</ProcedureHeading>
                  {rows.map((row, rowIndex) => (
                    <Row key={rowIndex}>
                      {row.map((step, index) => (
                        <StepComponent key={step.id} step={step} index={rowIndex * 2 + index} />
                      ))}
                    </Row>
                  ))}
                  <StyledButton onClick={handleBack}>Back to Main Services</StyledButton>
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