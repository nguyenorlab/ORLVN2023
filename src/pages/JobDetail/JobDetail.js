import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

// const InfoColumnImg = styled.div`
//     margin-bottom: 15px;
//     padding-right: 15px;
//     padding-left: 15px;
//     flex: 1;
//     max-width: 30%;
//     flex-basis: 50%;
//     border: 3px solid #bdbdbd;
//     display: flex;
//     flex-direction: column;
//     border-radius: 10px;
//     padding: 30px;
//     height: auto;
//     align-items: left;
//     align-self: flex-start;
//     /* margin-top: 110px; */

//     @media screen and (max-width: 768px) {
//         max-width: 100%;
//         flex-basis: 100%;
//         display: flex;
//         justify-content: center;
//     }
// `;

const InfoColumnImg = styled.div`
    margin-top: 48px;
    flex: 1;
    max-width: 30%;
    flex-basis: 50%;
    align-items: left;
    align-self: flex-start;
    height: auto;
    padding-left: 15px;

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
    max-width: 70%;
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

// const ImgWrapper = styled.div`
//     max-width: 555px;
//     display: flex;
//     justify-content: ${({start}) => (start ? 'flex-start' : 'flex-end')};
// `;

// const Img = styled.img`
//     padding-right: 0;
//     border: 0;
//     max-width: 100%;
//     vertical-align: middle;
//     display: inline-block;
//     max-height: 500px;
// `;

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

const JobTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px 0px;
`;

const JobTitleElement = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  margin-right: 10px;
  width: 32%;
  /* background-color: rgb(0, 94, 141); */
`;

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
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const JobListContainer = styled.label`
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

const JobListHeading = styled.h2`
    /* margin-bottom: 24px; */
    margin-bottom: 39px;
    font-size: 20px;
    line-height: 1.1;
    color: rgb(0, 94, 141);
    font-style: italic;    
`;



const JobDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedJob, setSelectedJob] = useState(location.state.selectedJob);
  const jobList = location.state.jobList;
  const jobTitleText = decodeURIComponent(location.pathname.split('/').pop());

  // chua duoc
  useEffect(() => {
    if(!jobTitleText) {
      navigate('/recruitment');
    } else {
      const selectedJob = jobList.find(job => job.jobTitle === jobTitleText);
      console.log(selectedJob);
      if(selectedJob) {
        setSelectedJob(selectedJob);
      } else {
        navigate('/recruitment');
      }
    }
  },[jobList, jobTitleText, navigate]);



  return (
    <>
        <InfoSec>
          <Container>            
            <InfoRow>
              <InfoColumnImg>
                <TextWrapper>
                  <JobListHeading>Jobs List Openning</JobListHeading>
                  <JobListContainer>

                  </JobListContainer>
                </TextWrapper>

              </InfoColumnImg>

              <InfoColumnJob>
                <TextWrapper>
                  <TopLine>Job Detail</TopLine>
                  <Heading>{selectedJob.jobTitle}</Heading>

                  <JDContainer>
                    <JDSubtitle>Job Description</JDSubtitle>
                    <JDText>
                      <JobTitleContainer>
                        <JobTitleElement>Job Title:</JobTitleElement>
                        <JobTitleContent>{selectedJob.jobTitle}</JobTitleContent>
                      </JobTitleContainer>

                      <JobTitleContainer>
                        <JobTitleElement>Salary:</JobTitleElement>
                        <JobTitleContent>{selectedJob.salary}</JobTitleContent>
                      </JobTitleContainer>

                      <JobTitleContainer>
                        <JobTitleElement>Location:</JobTitleElement>
                        <JobTitleContent>{selectedJob.location}</JobTitleContent>
                      </JobTitleContainer>

                      <DetailContainer>
                        <JobTitleElementDetail>General Description</JobTitleElementDetail>
                        <JobTitleContent>{selectedJob.description}</JobTitleContent>
                      </DetailContainer>

                      <DetailContainer>
                        <JobTitleElementDetail>Experience Requirement</JobTitleElementDetail>
                        <JobTitleContent>
                          {selectedJob.experience.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </JobTitleContent>
                      </DetailContainer>

                      <DetailContainer>
                        <JobTitleElementDetail>Nice to have</JobTitleElementDetail>
                        <JobTitleContent>
                          {selectedJob.expPlus.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </JobTitleContent>
                      </DetailContainer>

                      <DetailContainer>
                        <JobTitleElementDetail>Treatment</JobTitleElementDetail>
                        <JobTitleContent>
                          {selectedJob.treatment.map((item, index)  => (
                            <li key={index}>{item}</li>
                          ))}
                        </JobTitleContent>
                      </DetailContainer>

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