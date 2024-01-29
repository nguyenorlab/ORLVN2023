import React, { useCallback,  useContext } from 'react';
import { BsStack } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaFileContract } from 'react-icons/fa';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import './JobsSlider.css';
import styled from 'styled-components';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';
import { JobsContext } from '../../api/api';
import { useTranslation } from 'react-i18next';
import whitebg from '../../images/white-bg.png';


const CarouselContainer = styled.div`
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
    height: 300px;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.background});
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0.9;
    border: 2px solid #d2d2d2;
`;

const StyledSwiperSlideActive = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 1;
    background-color: white;
    height: 100%;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const StyledSwiperSlideH2 = styled.h2`
    color: rgb(0, 94, 141);
    font-weight: 400;
    font-size: 22px;
    line-height: 1.4;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 110px;
`;

const StyledSwiperSlide = styled.div`
    color: rgb(218, 218, 218);
    line-height: 1.6;
    font-size: 20px;
    margin-top: 10px;
`;

const InfoColumn = styled.div`
    padding-right: 15px;
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
    max-width: 100%;
    padding-top: 0;
    display: grid;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {

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
    width: 100%;
    font-size: 46px;
    line-height: 1.1;
    color: ${({lightText}) => (lightText ? '#f7f8fa' : '#1c2237')};    
`;

const StyledButton = styled.button`
    font-size: 16px;
    border-radius: 5px;
    /* margin: 20px 24px 56px; */
    margin: 20px 24px 130px;
    padding: 10px 20px;
    background: rgb(0, 94, 141);
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    /* border: 2px solid #d2d2d2; */
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-out;
    border: none;

    &:hover{
        cursor: pointer;
        /* border: 0.125rem solid rgb(0, 94, 141); */
        color: white;
        background-color: rgb(28 150 212);
    }
`;

const StyledSkill = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: rgb(140, 146, 151);
`;

const StyledSkillStack = styled(BsStack)`
    font-size: 25px;
    color: rgb(0, 94, 141);
    margin-right: 10px;
`;

const StyledLocation = styled(HiOutlineLocationMarker)`
    font-size: 25px;
    color: rgb(0, 94, 141);
    margin-right: 10px;
`;

const StyledSalary = styled(FaFileContract)`
    font-size: 25px;
    color: rgb(0, 94, 141);
    margin-right: 10px;
`;


const JobsSlider = () => {
    const { t } = useTranslation('Home');
    const jobDetailObj = useContext(JobsContext);
    const navigate = useNavigate();

    const handleExplore = useCallback((job) => {
        navigate(`/recruitment/${job.jobTitle}`, { state: { selectedJob: job, jobList: jobDetailObj } });
    },[jobDetailObj, navigate]);

    
  return (
    <CarouselContainer>
        <InfoColumn>
            <TextWrapper>
                <TopLine>{t('Career Chances')}</TopLine>
                <Heading>{t('Exploring Job Opportunities')}</Heading>
            </TextWrapper>
        </InfoColumn>

        <StyledSwiper
            modules={[Navigation, Autoplay]}
            slidesPerView={3}
            spaceBetween={30}
            direction='horizontal'
            effect='slide'
            loop={false}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            navigation={true}
            breakpoints={{
                360: {
                    slidesPerView: 1
                },
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
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 2
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
                    <StyledSwiperSlideContainer key={index} background={whitebg}>
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
                            <StyledButton key={job.id} onClick={() => handleExplore(job)}>{t('EXPLORE')}</StyledButton>                                                   
                        </StyledSwiperSlideActive>
                    </StyledSwiperSlideContainer>
                ))
            }
        </StyledSwiper>
    </CarouselContainer>
  )
}

export default JobsSlider