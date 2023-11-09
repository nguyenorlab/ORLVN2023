import React, { createContext } from 'react';
import { Container } from '../../globalStyles';
import styled from 'styled-components';
import ServicesElement from '../../components/ServicesElement/ServicesElement';

// import service1 from '../../images/hero.png';    // test images public
// import service2 from '../../images/hero.png';
// import service3 from '../../images/hero.png';
// import codingFlow from '../../images/coding-flow1.jpg';
// import software from '../../images/software.jpg';
// import development from '../../images/development.jpg';
// import recruitment from '../../images/recruitment.jpg';


export const ObjectArrayContext = createContext([]);


const InfoSec = styled.div`
    color: #fff;
    padding: 70px 0;
    background: ${({lightBg}) => (lightBg ? '#fff' : '#10152')};
`;

const InfoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: ${({imgStart}) => (imgStart ? 'row-reverse' : 'row')};
`;

const Subtitle = styled.p`
    max-width: 440px;
    margin-bottom: 35px;
    font-size: 18px;
    line-height: 24px;
    /* color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : '#1c2237')}; */
    color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : 'rgb(140, 146, 151)')};
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



const Services = () => {
  return (
    <>
        <InfoSec>
          <Container>
            <InfoRow>

              <TeamInfo>
                <TeamWrapper>
                  <TeamHeading>Main Services</TeamHeading>
                  <Subtitle>write something about services</Subtitle>

                  <ObjectArrayContext.Provider value={serDetailObj}>
                    <ServicesElement />
                  </ObjectArrayContext.Provider>

                </TeamWrapper>
              </TeamInfo>

            </InfoRow>
          </Container>
        </InfoSec>
    </>
  )
}

export default Services