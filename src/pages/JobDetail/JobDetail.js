import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../globalStyles';
import UploadFile from '../../components/UploadFile/UploadFile';
import { JobsContext } from '../../api/api';


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
    /* padding-left: 15px; */

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
`;

const InfoColumnJob = styled.div`
    margin-bottom: 15px;
    /* padding-right: 15px; */
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
  padding: 10px;
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
  border: 3px solid #bdbdbd;
  font-size: 14px;
  border-radius: 10px;
  padding: 20px;
  /* margin-bottom: 30px; */

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

// sau thay = API
// const jobDetailObj = [
//   {
//     id: 1,
//     lightText: false,
//     jobTitle: 'Front-End Developer',
//     location: 'Ha Noi',
//     shortDescription: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
//     salary: 'Upto 40M',
//     description: 'FRONTEND-DEV --- We are looking for a qualified Front-end developer to join our IT team. You will be responsible for building the client-side of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re interested in creating a user-friendly environment by writing code and moving forward in your career, then this job is for you. We expect you to be a tech-savvy professional, who is curious about new digital technologies and aspires to combine usability with visual design. Ultimately, you should be able to create a functional and attractive digital environment for our company, ensuring great user experience.',
//     experience: ['FRONTEND-DEV --- Proven work experience as a ReactJS developer.', 'Hands on experience with markup languages.', 'Experience with JavaScript, CSS and jQuery.', 'Familiarity with browser testing and debugging. In-depth understanding of the entire web development process (design, development and deployment).'],
//     expPlus: ['FRONTEND-DEV --- Experience with performance optimization, data caching is a plus.', 'Experience working with CDN like Akamai to deliver the best experience (optimization, caching, edge computing…)', 'Good knowledge of end-to-end design language using token.', 'Experience with customer facing roles is a plus.', 'Experience with large-scale e-commerce projects is a plus.', 'Experience with Azure cloud native deployment is a plus.'],
//     img: require('../../images/about.png'),
//     url: "https://images.pexels.com/photos/57007/pexels-photo-57007.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     alt: 'Image',
//     start: '',
//     treatment: ['FRONTEND-DEV --- Thử việc hưởng 100% lương', 'Ký hợp đồng lao động chính thức sau 02 tháng thử việc.', 'Nghỉ phép 12 ngày/năm, Golden Week, Tết dương lịch, âm lịch 6 ngày, kỷ niệm thành lập công ty', 'Du lịch hè cùng công ty hoặc nghỉ hè 3 ngày tự chọn.', 'Làm việc: 9h-18h từ T2-T6, nghỉ T7 và CN hàng tuần.', 'Xét tăng lương định kỳ 1 năm/lần, thưởng 2 lần/năm (tháng lương thứ 13 và 14)', 'Hỗ trợ thi chứng chỉ quốc tế.', 'Chế độ BHXH, BHYT, BHTN', 'Môi trường trẻ trung năng động, thoải mái, tạo điều kiện để cá nhân phát triển năng lực nhất có thể.', 'Free trà, cà phê, chỗ gửi xe.'],
//   },
//   {
//     id: 2,
//     lightText: false,
//     jobTitle: 'Back-End Developer',
//     location: 'Tokyo',
//     shortDescription: ['Python', 'NodeJS', 'MySQL'],
//     salary: 'Upto 40M',
//     description: 'BACKEND-DEV --- We are looking for a qualified Back-end developer to join our IT team. You will be responsible for building the client-side of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re interested in creating a user-friendly environment by writing code and moving forward in your career, then this job is for you. We expect you to be a tech-savvy professional, who is curious about new digital technologies and aspires to combine usability with visual design. Ultimately, you should be able to create a functional and attractive digital environment for our company, ensuring great user experience.',
//     experience: ['BACKEND-DEV --- Proven work experience as a Python developer.', 'Hands on experience with markup languages.', 'Experience with Python.', 'Familiarity with browser testing and debugging. In-depth understanding of the entire web development process (design, development and deployment).'],
//     expPlus: ['BACKEND-DEV --- Experience with performance optimization, data caching is a plus.', 'Experience working with CDN like Akamai to deliver the best experience (optimization, caching, edge computing…)', 'Good knowledge of end-to-end design language using token.', 'Experience with customer facing roles is a plus.', 'Experience with large-scale e-commerce projects is a plus.', 'Experience with Azure cloud native deployment is a plus.'],
//     img: require('../../images/about.png'),
//     url: "https://images.pexels.com/photos/785418/pexels-photo-785418.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     alt: 'Image',
//     start: '',
//     treatment: ['BACKEND-DEV --- Thử việc hưởng 100% lương', 'Ký hợp đồng lao động chính thức sau 02 tháng thử việc.', 'Nghỉ phép 12 ngày/năm, Golden Week, Tết dương lịch, âm lịch 6 ngày, kỷ niệm thành lập công ty', 'Du lịch hè cùng công ty hoặc nghỉ hè 3 ngày tự chọn.', 'Làm việc: 9h-18h từ T2-T6, nghỉ T7 và CN hàng tuần.', 'Xét tăng lương định kỳ 1 năm/lần, thưởng 2 lần/năm (tháng lương thứ 13 và 14)', 'Hỗ trợ thi chứng chỉ quốc tế.', 'Chế độ BHXH, BHYT, BHTN', 'Môi trường trẻ trung năng động, thoải mái, tạo điều kiện để cá nhân phát triển năng lực nhất có thể.', 'Free trà, cà phê, chỗ gửi xe.'],
//   },
//   {
//     id: 3,
//     lightText: false,
//     jobTitle: 'Cloud Engineer',
//     location: 'Tokyo',
//     shortDescription: ['AWS', 'Azure', 'Alibaba'],
//     salary: 'Upto 40M',
//     description: 'CLOUD --- We are looking for a qualified CLOUD developer to join our IT team. You will be responsible for building the client-side of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re interested in creating a user-friendly environment by writing code and moving forward in your career, then this job is for you. We expect you to be a tech-savvy professional, who is curious about new digital technologies and aspires to combine usability with visual design. Ultimately, you should be able to create a functional and attractive digital environment for our company, ensuring great user experience.',
//     experience: ['CLOUD --- Proven work experience as a Cloud Professional.', 'Hands on experience with markup languages.', 'Experience with Python.', 'Familiarity with browser testing and debugging. In-depth understanding of the entire web development process (design, development and deployment).'],
//     expPlus: ['CLOUD --- Experience with performance optimization, data caching is a plus.', 'Experience working with CDN like Akamai to deliver the best experience (optimization, caching, edge computing…)', 'Good knowledge of end-to-end design language using token.', 'Experience with customer facing roles is a plus.', 'Experience with large-scale e-commerce projects is a plus.', 'Experience with Azure cloud native deployment is a plus.'],
//     img: require('../../images/about.png'),
//     url: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     alt: 'Image',
//     start: '',
//     treatment: ['CLOUD --- Thử việc hưởng 100% lương', 'Ký hợp đồng lao động chính thức sau 02 tháng thử việc.', 'Nghỉ phép 12 ngày/năm, Golden Week, Tết dương lịch, âm lịch 6 ngày, kỷ niệm thành lập công ty', 'Du lịch hè cùng công ty hoặc nghỉ hè 3 ngày tự chọn.', 'Làm việc: 9h-18h từ T2-T6, nghỉ T7 và CN hàng tuần.', 'Xét tăng lương định kỳ 1 năm/lần, thưởng 2 lần/năm (tháng lương thứ 13 và 14)', 'Hỗ trợ thi chứng chỉ quốc tế.', 'Chế độ BHXH, BHYT, BHTN', 'Môi trường trẻ trung năng động, thoải mái, tạo điều kiện để cá nhân phát triển năng lực nhất có thể.', 'Free trà, cà phê, chỗ gửi xe.'],
//   },
//   {
//     id: 4,
//     lightText: false,
//     jobTitle: 'Devops Engineer',
//     location: 'Tokyo',
//     shortDescription: ['Docker', 'Rancher', 'Kubernetes'],
//     salary: 'Upto 40M',
//     description: 'DEVOPS --- We are looking for a qualified Front-end developer to join our IT team. You will be responsible for building the client-side of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re interested in creating a user-friendly environment by writing code and moving forward in your career, then this job is for you. We expect you to be a tech-savvy professional, who is curious about new digital technologies and aspires to combine usability with visual design. Ultimately, you should be able to create a functional and attractive digital environment for our company, ensuring great user experience.',
//     experience: ['DEVOPS --- Proven work experience as a Cloud Professional.', 'Hands on experience with markup languages.', 'Experience with Python.', 'Familiarity with browser testing and debugging. In-depth understanding of the entire web development process (design, development and deployment).'],
//     expPlus: ['DEVOPS --- Experience with performance optimization, data caching is a plus.', 'Experience working with CDN like Akamai to deliver the best experience (optimization, caching, edge computing…)', 'Good knowledge of end-to-end design language using token.', 'Experience with customer facing roles is a plus.', 'Experience with large-scale e-commerce projects is a plus.', 'Experience with Azure cloud native deployment is a plus.'],
//     img: require('../../images/about.png'),
//     url: "https://images.pexels.com/photos/113850/pexels-photo-113850.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     alt: 'Image',
//     start: '',
//     treatment: ['DEVOPS --- Thử việc hưởng 100% lương', 'Ký hợp đồng lao động chính thức sau 02 tháng thử việc.', 'Nghỉ phép 12 ngày/năm, Golden Week, Tết dương lịch, âm lịch 6 ngày, kỷ niệm thành lập công ty', 'Du lịch hè cùng công ty hoặc nghỉ hè 3 ngày tự chọn.', 'Làm việc: 9h-18h từ T2-T6, nghỉ T7 và CN hàng tuần.', 'Xét tăng lương định kỳ 1 năm/lần, thưởng 2 lần/năm (tháng lương thứ 13 và 14)', 'Hỗ trợ thi chứng chỉ quốc tế.', 'Chế độ BHXH, BHYT, BHTN', 'Môi trường trẻ trung năng động, thoải mái, tạo điều kiện để cá nhân phát triển năng lực nhất có thể.', 'Free trà, cà phê, chỗ gửi xe.'],
//   },    
// ];

const JobDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobDetailObj = useContext(JobsContext);
  console.log(jobDetailObj);
  // selectedJobTitle match with Route path in App.js
  const { selectedJobTitle: jobTitleParam } = useParams();
  console.log(jobTitleParam);
  // const jobTitleFromUrl = decodeURIComponent(jobTitleParam.toLowerCase().replace('-', ' ')).charAt(0).toUpperCase() + jobTitleParam.slice(1);
  const jobTitleFromUrl = decodeURIComponent(jobTitleParam);
  console.log(jobTitleFromUrl);
  
  // const [selectedJob, setSelectedJob] = useState(() => {
  //   if (location.state) {
  //     return location.state.selectedJob;
  //   }
  //   const jobFromUrl = jobDetailObj.find(job => job.jobTitle === jobTitleFromUrl);
  //   console.log(jobFromUrl);
  //   return jobFromUrl || jobDetailObj[0];
  // });


  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (jobDetailObj.length > 0) {
      if (location.state) {
        setSelectedJob(location.state.selectedJob);
      } else {
        const jobFromUrl = jobDetailObj.find(job => job.jobTitle === jobTitleFromUrl);
        console.log(jobFromUrl);
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
                  <JobListHeading>Jobs Opening List</JobListHeading>
                  <JobListContainer>
                    {jobDetailObj.map((job, id) => (
                      <OpenningContainer key={id}>
                        <JobsOpeningList onClick={() => handleSelectJob(job.id)}>{job.jobTitle}</JobsOpeningList>
                      </OpenningContainer>
                    ))}
                  </JobListContainer>
                </TextWrapper>
              </InfoColumnImg>

              {selectedJob ?
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
              : ''
              }

            </InfoRow>
          </Container>
        </InfoSec>
    </>
  )
}

export default JobDetail