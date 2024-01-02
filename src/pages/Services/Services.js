import React, { useEffect, createContext } from 'react';
import { Container } from '../../globalStyles';
import styled from 'styled-components';
import ServicesElement from '../../components/ServicesElement/ServicesElement';
import { useTranslation } from 'react-i18next';

// import cloud from '../../images/cloud.jpg';
// import hero from '../../images/hero.png';

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
    /* padding: 70px 0; */
    background: ${({lightBg}) => (lightBg ? '#fff' : '#10152')};
`;

const InfoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: ${({imgStart}) => (imgStart ? 'row-reverse' : 'row')};
`;

// const Subtitle = styled.p`
//     max-width: 440px;
//     margin-bottom: 35px;
//     font-size: 18px;
//     line-height: 24px;
//     /* color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : '#1c2237')}; */
//     color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : 'rgb(140, 146, 151)')};
// `;

const TeamInfo = styled.div`
  padding: 50px 0px;
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
  margin-bottom: 40px;
  /* display: inline-block; */
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  font-size: 46px;
  line-height: 1.1;
  color: ${({lightText}) => (lightText ? '#f7f8fa' : '#1c2237')};    
`;

// const Img1 = styled.img`
//     position: fixed;
//     top: 0;
//     left: -8rem;
//     z-index: -1;
//     opacity: 0.2;
// `;

// const Img2 = styled.img`
//     position: fixed;
//     bottom: -2rem;
//     right: -3rem;
//     z-index: -1;
//     width: 9.375rem;
//     opacity: 0.2;
// `;


export const serDetailObj = [
  {
    id: 1,
    serviceName: 'Software Outsourcing',
    image: require('../../images/software-outsourcing.jpg'),
    description: 'We are proud to be a reliable and professional partner in the field of Software Outsourcing. With a team of dedicated and passionate software experts, we are committed to delivering top-notch solutions and meeting all your software development needs.',
    shortDescription: 'We not only provide software services, but also are a strategic partner in your digitalization journey. We focus on providing breakthrough solutions, helping businesses save costs and enhance their competitive strength.',
    step: [
      {
        id: 1,
        step: 'Assess needs and requirements',
        description: 'Meet with customers to understand the specific needs and requirements of the project. Identify techniques, programming languages, and other technical elements.',
        image: require('../../images/software-outsourcing-talk-with-customer.jpg')
      },
      {
        id: 2,
        step: 'Negotiations and contracts',
        description: 'Make detailed contracts with customers. Negotiate price, completion time, and other conditions.',
        image: require('../../images/software-outsourcing-contract.jpg')
      },
      {
        id: 3,
        step: 'Development and reporting',
        description: 'Start the development process according to customer requirements. Perform complete testing to ensure product quality. Regular progress reporting meetings with customers.',
        image: require('../../images/software-outsourcing-develop.jpg')
      },
      {
        id: 4,
        step: 'Support and maintenance',
        description: 'Provide post-deployment technical support. Ensure product stability and maintenance.',
        image: require('../../images/software-outsourcing-support.jpg')
      },
    ],
  },
  {
    id: 2,
    serviceName: 'Business Agency Agreement',
    image: require('../../images/business-partnership.jpg'),
    description: 'We have a legal entity in Tokyo, we can cooperate with you when you do not have enough conditions to establish a legal entity in Japan, at this time you can still do business, receive letters and documents... from customers and partners through our office address. This helps you access the labor market faster and find employment in Japan with the least amount of difficulty.',
    shortDescription: 'We offer more than just a contract, but the ability to optimize business processes. We create a favorable environment, helping businesses focus on their core business. This flexibility helps your business take advantage of all business opportunities. We are not just partners, but teammates working together towards a common goal, creating the highest efficiency.',
    step: [
      {
        id: 1,
        step: 'Objectives and scope',
        description: 'Identify specific customer goals. Be clear about the scope and interests of both sides.',
        image: require('../../images/business-partnership-scope.jpg')
      },
      {
        id: 2,
        step: 'Discuss and negotiate',
        description: 'Discuss specific conditions of the contract. Negotiate commission policies, responsibilities, payment conditions and other terms.',
        image: require('../../images/business-partnership-negotiate.jpg')
      }
    ],
  },
  {
    id: 3,
    serviceName: 'Recruitment',
    image: require('../../images/recruitment.jpg'),
    description: 'We have many trusted partners and customers based on close links since our inception. Recruitment takes place quickly with a high success rate. We want to not only provide opportunities for engineers but also engage with them throughout their career path.',
    shortDescription: 'Since our establishment until now, we have always built and maintained good relationships with partners and customers. Therefore, recruitment is not only about finding personnel but also about listening to the wishes of customers, partners as well as engineers with the goal of connecting the fastest with the highest success rate.',
    step: [
      {
        id: 1,
        step: 'Open vacancy',
        description: 'Receive recruitment request information from partners and customers, and notify about open career opportunities for a position on our website.',
        image: require('../../images/recruitment-open-vacancy.jpg')
      },
      {
        id: 2,
        step: 'Hiring Process',
        description: "Evaluate the profile, invite the candidate to a conversation with our recruitment team. This is an opportunity for us to clearly understand the candidate's experience, skills, and importance to find the most suitable opportunity.",
        image: require('../../images/recruitment-profile-review.jpg')
      },
      {
        id: 3,
        step: 'Interview',
        description: 'Face-to-face interviews with customers (online/offline) will focus on discovering more about personal skills, assessing fit with company culture, and answering any questions you have about the position and company.',
        image: require('../../images/recruitment-interview.jpg')
      },
      {
        id: 4,
        step: 'Ready to work',
        description: 'Welcome. We have prepared the procedures so you can soon work in Vietnam or Japan depending on the position/job requirements without incurring costs.',
        image: require('../../images/recruitment-ready-to-work.jpg')
      },
    ],
  }
];



const Services = () => {
  const { i18n, t } = useTranslation('Services');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <>
      <InfoSec>
        <Container>
          <InfoRow>

            <TeamInfo>
              <TeamWrapper>
                <TeamHeading>{t('Main Services')}</TeamHeading>

                <ObjectArrayContext.Provider value={serDetailObj}>
                  <ServicesElement />
                </ObjectArrayContext.Provider>

              </TeamWrapper>
            </TeamInfo>

          </InfoRow>
        </Container>
        {/* <Img1 src={cloud} alt="bg" />
        <Img2 src={hero} alt="bg" /> */}
      </InfoSec>
    </>
  )
}

export default Services