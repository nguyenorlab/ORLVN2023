import React from 'react';
import styled from 'styled-components';
import { Container } from '../../globalStyles';
import { useLocation } from 'react-router-dom';
import UploadFile from '../../components/UploadFile/UploadFile';

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

const InfoColumnImg = styled.div`
    margin-bottom: 15px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 1;
    max-width: 40%;
    flex-basis: 50%;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
`;

const InfoColumnJob = styled.div`
    margin-bottom: 15px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 1;
    max-width: 60%;
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
    color: ${({ligthTopLine}) => (ligthTopLine ? '#a9b3c1' : '#4b59f7')};
    font-size: 18px;
    line-height: 16px;
    letter-spacing: 1.4px;
    margin-bottom: 16px;
`;

const Heading = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    color: ${({lightText}) => (lightText ? '#f7f8fa' : '#1c2237')};    
`;

// const Subtitle = styled.p`
//     max-width: 440px;
//     margin-bottom: 35px;
//     font-size: 18px;
//     line-height: 24px;
//     /* color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : '#1c2237')}; */
//     color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : 'rgb(140, 146, 151)')};
// `;

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
`;

const JDText = styled.div`
  font-size: 18px;
  line-height: 24px;
  color: rgb(140, 146, 151);
  /* display: flex;
  flex-direction: column; */
`;

const JobTitleContent = styled.p`
  width: 68%;
  text-align: justify;
`;

const JobTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const JobTitleElement = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  margin-right: 10px;
  width: 32%;
`;


const jobDetailObj = {
  lightBg: true,
  imgStart: '',
  lightTopLine: false,
  lightTextDesc: false,
  buttonLabel: 'Get Started',
  description: 'Jobs Description',
  headline: 'Build your future with us', 
  lightText: false, 
  topLine: 'Jobs Detail',
  primary: false,
  img: require('../../images/about.png'),
  alt: 'Image',
  start: ''
};


const JobDetail = () => {
  const location = useLocation();
  const selectedJobTitle = location.state.selectedJobTitle; 


  return (
    <>
        <InfoSec>
          <Container>
            <InfoRow>

              <InfoColumnImg>
                <ImgWrapper>
                  <Img src={jobDetailObj.img} alt={jobDetailObj.alt} />
                </ImgWrapper>
              </InfoColumnImg>

              <InfoColumnJob>
                <TextWrapper>
                  <TopLine>{jobDetailObj.topLine}</TopLine>
                  {/* <Heading>{searchParams.get('jobTitle')}</Heading> */}
                  <Heading>{selectedJobTitle}</Heading>

                  <JDContainer>
                    <JDSubtitle>{jobDetailObj.description}</JDSubtitle>
                    <JDText>
                      <JobTitleContainer>
                        <JobTitleElement>Job Title:</JobTitleElement>
                        <JobTitleContent>Front-end Developer</JobTitleContent>
                      </JobTitleContainer>

                      <JobTitleContainer>
                        <JobTitleElement>Location:</JobTitleElement>
                        <JobTitleContent>Ha Noi</JobTitleContent>
                      </JobTitleContainer>

                      <JobTitleContainer>
                        <JobTitleElement>General Description:</JobTitleElement>
                        <JobTitleContent>We are looking for a qualified Front-end developer to join our IT team. You will be responsible for building the client-side of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re interested in creating a user-friendly environment by writing code and moving forward in your career, then this job is for you. We expect you to be a tech-savvy professional, who is curious about new digital technologies and aspires to combine usability with visual design. Ultimately, you should be able to create a functional and attractive digital environment for our company, ensuring great user experience.</JobTitleContent>
                      </JobTitleContainer>

                      <JobTitleContainer>
                        <JobTitleElement>Experience Requirement:</JobTitleElement>
                        <JobTitleContent>
                          <li>Proven work experience as a Front-end developer.</li>
                          <li>Hands on experience with markup languages.</li>
                          <li>Experience with JavaScript, CSS and jQuery.</li>
                          <li>Familiarity with browser testing and debugging.</li>
                          <li>In-depth understanding of the entire web development process (design, development and deployment).</li>                        
                        </JobTitleContent>
                      </JobTitleContainer>
                    </JDText>
                  </JDContainer>
                  <UploadFile />
                </TextWrapper>
              </InfoColumnJob>

            </InfoRow>
          </Container>
        </InfoSec>
    </>
  )
}

export default JobDetail