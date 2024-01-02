import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../globalStyles';
import { JobsContext } from '../../api/api';
import { useTranslation } from 'react-i18next';


const InfoSec = styled.div`
    color: #fff;
    /* padding: 160px 0; */
    padding: 70px 0;
    background: ${({lightBg}) => (lightBg ? '#fff' : '#10152')};
`;

const InfoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* align-items: center; */
    align-items: flex-start;
    flex-direction: row;

    @media screen and (max-width: 768px) {
      flex-direction:  column;
      margin-bottom: 30px;
    }
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
    /* padding-left: 15px; */
    order: 1;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
        order: 2;
        margin-top: 0px;
    }
`;

const InfoColumnJob = styled.div`
    margin-bottom: 15px;
    padding-left: 15px;
    flex: 1;
    max-width: 70%;
    flex-basis: 50%;
    order: 2;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
        order: 1;
        padding-left: 0px;
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
  /* border: 3px solid #bdbdbd; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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

const OpenningContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin: 30px 0px; */
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
  margin: 5px 0px;
`;

const JobsOpeningList = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 24px;
  color: white;
  margin-right: 10px;
  width: 100%;
  background-color: rgb(0, 94, 141);
  padding: 10px 50px;
  margin: 5px 0px;
  cursor: pointer;
  clip-path: polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%);
  transition: all 0.5s ease-out;
  &:hover{
    background-color: rgb(28 150 212);
  }
`;

const JobListContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  height: auto;
  color: #707070;
  /* border: 3px solid #bdbdbd; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  border-radius: 10px;
  padding: 20px;
  /* margin-bottom: 30px; */

  input {
    display: none;
  }

  @media screen and (max-width: 768px) {
    min-width: 350px;
  }
`;

const JobListHeading = styled.h2`
    /* margin-bottom: 24px; */
    margin-bottom: 39px;
    font-size: 20px;
    line-height: 1.1;
    color: rgb(0, 94, 141);
    font-style: italic;    

    @media screen and (max-width: 768px) {
      margin-bottom: 20px;
    }
`;


const JobDetail = () => {
  const { t } = useTranslation('Recruitment');

  const navigate = useNavigate();
  const location = useLocation();
  const jobDetailObj = useContext(JobsContext);

  // selectedJobTitle match with Route path in App.js
  const { selectedJobTitle: jobTitleParam } = useParams();
  const jobTitleFromUrl = decodeURIComponent(jobTitleParam);
  const [selectedJob, setSelectedJob] = useState(null);

  // const jobTitleFromUrl = decodeURIComponent(jobTitleParam.toLowerCase().replace('-', ' ')).charAt(0).toUpperCase() + jobTitleParam.slice(1);  
  // const [selectedJob, setSelectedJob] = useState(() => {
  //   if (location.state) {
  //     return location.state.selectedJob;
  //   }
  //   const jobFromUrl = jobDetailObj.find(job => job.jobTitle === jobTitleFromUrl);
  //   console.log(jobFromUrl);
  //   return jobFromUrl || jobDetailObj[0];
  // });



  useEffect(() => {
    if (jobDetailObj.length > 0) {
      if (location.state) {
        setSelectedJob(location.state.selectedJob);
      } else {
        const jobFromUrl = jobDetailObj.find(job => job.jobTitle === jobTitleFromUrl);
        setSelectedJob(jobFromUrl || jobDetailObj[0]);
      }
    }
  }, [jobDetailObj, location.state, jobTitleFromUrl]);
  
  // const [selectedJob, setSelectedJob] = useState();
  // const { id } = useParams();
  // useEffect(() => {
  //   if(id) {
  //     const jobFromUrl = jobDetailObj.find(job => job.id === Number(id));
  //     setSelectedJob(jobFromUrl);
  //   }
  // },[id, jobDetailObj]);



  const handleSelectJob = useCallback((id) => {
    const job = jobDetailObj.find(job => job.id === id);
    setSelectedJob(job);
    // navigate(`/recruitment/${job.jobTitle.toLowerCase().replace(' ', '-')}`, { state: { selectedJob: job } });
    navigate(`/recruitment/${job.jobTitle}`, { state: { selectedJob: job } });
  },[jobDetailObj, navigate]);


  return (
    <>
        <InfoSec>
          <Container>            
            <InfoRow>
              <InfoColumnImg>
                <TextWrapper>
                  <JobListHeading>{t('Jobs Opening List')}</JobListHeading>
                  <JobListContainer>
                    {jobDetailObj.map((job, id) => (
                      <OpenningContainer key={id}>
                        <JobsOpeningList onClick={() => handleSelectJob(job.id)}>{t(`${job.jobTitle}`)}</JobsOpeningList>
                      </OpenningContainer>
                    ))}
                  </JobListContainer>
                </TextWrapper>
              </InfoColumnImg>

              {selectedJob ?
                <InfoColumnJob>
                  <TextWrapper>
                    <TopLine>{t('Job Detail')}</TopLine>
                    <Heading>{t(`${selectedJob.jobTitle}`)}</Heading>

                    <JDContainer>
                      <JDSubtitle>{t('Job Description')}</JDSubtitle>
                      <JDText>
                        <JobTitleContainer>
                          <JobTitleElement>{t('Job Title')}:</JobTitleElement>
                          <JobTitleContent>{t(`${selectedJob.jobTitle}`)}</JobTitleContent>
                        </JobTitleContainer>

                        <JobTitleContainer>
                          <JobTitleElement>{t('Salary')}:</JobTitleElement>
                          <JobTitleContent>{t(`${selectedJob.salary}`)}</JobTitleContent>
                        </JobTitleContainer>

                        <JobTitleContainer>
                          <JobTitleElement>{t('Location')}:</JobTitleElement>
                          <JobTitleContent>{t(`${selectedJob.location}`)}</JobTitleContent>
                        </JobTitleContainer>

                        <DetailContainer>
                          <JobTitleElementDetail>{t('General Description')}</JobTitleElementDetail>
                          <JobTitleContent>{t(`${selectedJob.description}`)}</JobTitleContent>
                        </DetailContainer>

                        <DetailContainer>
                          <JobTitleElementDetail>{t('Experience Requirement')}</JobTitleElementDetail>
                          <JobTitleContent>
                            {selectedJob.experience.split('. ').map((sentence, index) => (
                              <div key={index}>
                                • {t(`${sentence}`)}
                              </div>
                            ))}
                          </JobTitleContent>
                        </DetailContainer>

                        <DetailContainer>
                          <JobTitleElementDetail>{t('Nice to have')}</JobTitleElementDetail>
                          <JobTitleContent>
                            {selectedJob.expPlus.split('. ').map((sentence, index) => (
                              <div key={index}>
                                • {t(`${sentence}`)}
                              </div>
                            ))}
                          </JobTitleContent>
                        </DetailContainer>

                        <DetailContainer>
                          <JobTitleElementDetail>{t('Benefit')}</JobTitleElementDetail>
                          <JobTitleContent>
                            {selectedJob.treatment.split('. ').map((sentence, index) => (
                              <div key={index}>
                                • {t(`${sentence}`)}
                              </div>
                            ))}
                          </JobTitleContent>
                        </DetailContainer>

                      </JDText>
                    </JDContainer>
                  </TextWrapper>
                </InfoColumnJob>
              : ''
              }

            </InfoRow>
          </Container>
        </InfoSec>
    </>
  )
}

export default JobDetail