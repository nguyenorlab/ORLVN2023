import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button } from '../../globalStyles';


// import service1 from '../../images/hero.png';    // test images public
import service3 from '../../images/hero.png';
import codingFlow from '../../images/coding-flow1.jpg';


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
    padding-bottom: 60px;

    @media screen and (max-width: 768px) {
        padding-bottom: 65px;
    }
`;

const TopLine = styled.div`
    color: white;
    font-size: 18px;
    line-height: 16px;
    letter-spacing: 1.4px;
    margin-bottom: 16px;
    text-shadow: 5px -5px 4px rgba(0, 0, 0, 0.5);
`;

const Heading = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    color: rgb(0, 94, 141);
    text-shadow: 5px -5px 3px rgba(0, 0, 0, 0.5);    
`;

const JDContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  height: auto;
  color: #707070;
  border: 3px solid #bdbdbd;
  font-size: 14px;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;

  input {
    display: none;
  }
`;

const JDSubtitle = styled.p`
  margin-bottom: 30px;
  font-size: 20px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  font-weight: bold;
  text-decoration: underline;
  text-transform: uppercase;
`;

const JDText = styled.div`
  font-size: 18px;
  line-height: 24px;
  color: rgb(140, 146, 151);
  /* display: flex;
  flex-direction: column; */
`;

const JobTitleContent = styled.p`
  /* width: 68%; */
  width: 100%;
  text-align: justify;
`;

// const JobTitleContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   padding-top: 5px;
//   padding-bottom: 5px;
// `;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px 0px;
`;

// const JobTitleElement = styled.p`
//   display: flex;
//   flex-direction: row;
//   font-size: 18px;
//   line-height: 24px;
//   color: rgb(0, 94, 141);
//   margin-right: 10px;
//   width: 32%;
//   /* background-color: rgb(0, 94, 141); */
// `;

const JobTitleElementDetail = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 24px;
  color: white;
  margin-right: 10px;
  width: 100%;
  background-color: rgb(0, 94, 141);
  padding: 10px;
  margin: 5px 0px;
`;

const StyledButton = styled(Button)`
  width: 150px;
  margin: auto;
`;

const HeaderContainer = styled.div`
  background-image: url(${props => props.background});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	text-align: center;
  height: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
  }
`;

// sau thay = API
const serDetailObj = [
  {
    id: 1,
    serviceName: 'Software Outsourcing',
    image: '/images/hero.png',
    about: 'Software Outsourcing --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic qui excepturi alias vel sunt necessitatibus incidunt reiciendis voluptatibus eaque quos molestiae dolorem perferendis, nisi nostrum consequuntur accusantium optio. Error, magni.'
  },
  {
    id: 2,
    serviceName: 'Software Development',
    image: codingFlow,
    about: 'Software Development --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic qui excepturi alias vel sunt necessitatibus incidunt reiciendis voluptatibus eaque quos molestiae dolorem perferendis, nisi nostrum consequuntur accusantium optio. Error, magni.'
  },
  {
    id: 3,
    serviceName: 'Recruitment',
    image: service3,
    about: 'Recruitment --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic qui excepturi alias vel sunt necessitatibus incidunt reiciendis voluptatibus eaque quos molestiae dolorem perferendis, nisi nostrum consequuntur accusantium optio. Error, magni.'
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
    const jobFromUrl = serDetailObj.find(job => job.jobTitle === serviceNameFromUrl);
    return jobFromUrl || serDetailObj[0];
  });


  const handleBack = useCallback(() => {
    navigate(`/services`);
  },[navigate]);



  return (
    <>
        <InfoSec>
          <Container>            
            <InfoRow>

              {selectedServiceName ?
                <InfoColumnJob>
                  <TextWrapper>
                    <HeaderContainer background={selectedServiceName.image}>
                      <TopLine>Service Detail</TopLine>
                      <Heading>{selectedServiceName.serviceName}</Heading>
                    </HeaderContainer>

                    <JDContainer>
                      <JDSubtitle>Service Description</JDSubtitle>
                      <JDText>                       

                        <DetailContainer>
                          <JobTitleElementDetail>General Description</JobTitleElementDetail>
                          <JobTitleContent>{selectedServiceName.about}</JobTitleContent>
                        </DetailContainer>                        

                      </JDText>
                    </JDContainer>
                    <StyledButton onClick={handleBack}>Back</StyledButton>
                  </TextWrapper>
                </InfoColumnJob>
              : 
                <div>No data found</div>
              }

            </InfoRow>
          </Container>
        </InfoSec>
    </>
  )
}

export default ServiceDetail