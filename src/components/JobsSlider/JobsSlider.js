import React, { useCallback,  useContext } from 'react';
import { BsStack } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaFileContract } from 'react-icons/fa';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import './JobsSlider.css';
import styled from 'styled-components';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';
import { JobsContext } from '../../api/api';



const CarouselContainer = styled.div`
    /* z-index: 1; */
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 30px;
    padding-left: 30px;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;

const StyledSwiper = styled(Swiper)`
    width: 100%;
`;

const StyledSwiperSlideContainer = styled(SwiperSlide)`
    width: 340px;    // 300px
    height: 18.75rem;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.background});
    border-radius: 10px;
`;

const StyledSwiperSlideActive = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 1;
    background-color: rgba(108, 108, 108, 0.5);
    height: 100%;
    align-items: center;
    border-radius: 10px;
`;

const StyledSwiperSlideH2 = styled.h2`
    color: #ffffff;
    font-weight: 400;
    font-size: 26px;
    line-height: 1.4;
    /* margin-bottom: 3.625rem; */
    text-transform: uppercase;
    /* add */
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-top: 25px; */
    margin-top: 110px;
`;

const StyledSwiperSlide = styled.div`
    color: rgb(218, 218, 218);
    /* padding: 0 1.563rem 3rem 1.563rem; */
    padding-bottom: 20px;
    line-height: 1.6;
    font-size: 20px;
    margin-top: 25px;
    /* display: flex; */
    /* flex-direction: column; */
`;

const InfoColumn = styled.div`
    /* margin-bottom: 15px; */
    padding-right: 15px;
    /* padding-left: 15px; */
    flex: 1;
    /* max-width: 50%; */
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
    max-width: 100%;
    padding-top: 0;
    display: grid;
    align-items: center;
    justify-content: center;
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
    display: inline-block;
    /* width: 700px; */
    width: 100%;
    font-size: 48px;
    line-height: 1.1;
    color: ${({lightText}) => (lightText ? '#f7f8fa' : '#1c2237')};    
`;

const StyledButton = styled.button`
    font-size: 16px;
    border-radius: 5px;
    /* margin: 20px 24px 56px; */
    margin: 20px 24px 130px;
    padding: 10px 30px;
    background: #fff;
    color: #686868;
    text-decoration: none;
    text-transform: uppercase;
    border: 2px solid #d2d2d2;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-out;
    &:hover{
        cursor: pointer;
        border: 0.125rem solid rgb(0, 94, 141);
        color: white;
        background-color: rgb(0, 94, 141);
    }
`;

const StyledSkill = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const StyledSkillStack = styled(BsStack)`
    font-size: 25px;
    /* color: rgb(218, 218, 218); */
    margin-right: 10px;
`;

const StyledLocation = styled(HiOutlineLocationMarker)`
    font-size: 25px;
    margin-right: 10px;
`;

const StyledSalary = styled(FaFileContract)`
    font-size: 25px;
    margin-right: 10px;
`;


const JobsSlider = () => {
    const jobDetailObj = useContext(JobsContext);

    const navigate = useNavigate();
    // const [selectedJobID, setSelectedJobID] = useState('');
    // const [selectedJobTitle, setSelectedJobTitle] = useState('');

    const handleExplore = useCallback((job) => {
        // setSelectedJobID(job.id);
        // setSelectedJobTitle(job.jobTitle);
        navigate(`/recruitment/${job.jobTitle}`, { state: { selectedJob: job, jobList: jobDetailObj } });
    },[jobDetailObj, navigate]);

    // có API sẽ sửa lại chỗ này
    // useEffect(() => {
    //     console.log(`Selected Job ID: ${selectedJobID}, Selected Job Title: ${selectedJobTitle}`);
    // }, [selectedJobID, selectedJobTitle]);


    
  return (
    <CarouselContainer>
        <InfoColumn>
            <TextWrapper>
                <TopLine>Career Chances</TopLine>
                <Heading>Exploring Job Opportunities</Heading>
            </TextWrapper>
        </InfoColumn>

        <StyledSwiper
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={3}
            spaceBetween={30}
            // centeredSlides={true}
            direction='horizontal'
            effect={'spring'}
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            breakpoints={{
                375: {
                    slidesPerView: 1
                },
                414: {
                    slidesPerView: 1
                },
                640: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 1
                },
                1024: {
                    slidesPerView: 3
                },
                1428: {
                    slidesPerView: 3
                },
                1560: {
                    slidesPerView: 3
                },
                1929: {
                    slidesPerView: 3
                },
            }}
        >
            {
                jobDetailObj.map((job, index) => (
                    <StyledSwiperSlideContainer key={index} background={job.img}>
                        <StyledSwiperSlideActive>
                            <StyledSwiperSlideH2>{job.jobTitle}</StyledSwiperSlideH2>
                            <StyledSwiperSlide>
                                <StyledSkill>
                                    <StyledSkillStack />
                                    {job.shortDescription}
                                </StyledSkill>

                                <StyledSkill>
                                    <StyledLocation />
                                    {job.location}
                                </StyledSkill>

                                <StyledSkill>
                                    <StyledSalary />
                                    {job.salary}
                                </StyledSkill>
                            </StyledSwiperSlide>                            
                            <StyledButton key={job.id} onClick={() => handleExplore(job)}>EXPLORE</StyledButton>                                                   
                        </StyledSwiperSlideActive>
                    </StyledSwiperSlideContainer>
                ))
            }
        </StyledSwiper>
    </CarouselContainer>
  )
}

export default JobsSlider