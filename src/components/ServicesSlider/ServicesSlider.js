import React, { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import './ServicesSlider.css';
import styled from 'styled-components';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

// const CarouselContainer = styled.div`
//     position: relative;
//     width: calc(min(90rem, 90%));
//     margin: 0 auto;
//     /* min-height: 100vh; */
//     column-gap: 3rem;
//     padding-block: min(20vh, 3rem);
//     display: flex;
//     flex-direction: column;
//     @media screen and (min-width: 48rem) {
//         display: flex;
//         align-items: center;
//     }
// `;

const CarouselContainer = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;

const StyledSwiper = styled(Swiper)`
    width: 100%;
`;

const StyledSwiperSlideContainer = styled(SwiperSlide)`
    width: 18.75rem;    // 300px
    height: 18.75rem;
    background-size: cover;
    background-position: center;
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
    font-size: 1.4rem;
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

const StyledSwiperSlideP = styled.p`
    color: #dadada;
    padding: 0 1.563rem 3rem 1.563rem;
    line-height: 1.6;
    font-size: 0.75rem;
    margin-top: 25px;
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
    &:hover{
        cursor: pointer;
        border: 0.125rem solid rgb(0, 94, 141);
        color: white;
        background-color: rgb(0, 94, 141);
    }
`;


const slider = [
    {
        id: 1,
        title: "ReactJS",
        description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
        url: "https://images.pexels.com/photos/57007/pexels-photo-57007.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
        id: 2,
        title: "Python",
        description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
        url: "https://images.pexels.com/photos/785418/pexels-photo-785418.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
        id: 3,
        title: "AWS Cloud",
        description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
        url: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
        id: 4,
        title: "Image 4",
        description: "Test image",
        url: "https://images.pexels.com/photos/113850/pexels-photo-113850.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
];

const ServicesSlider = () => {
    const navigate = useNavigate();
    const [selectedJobID, setSelectedJobID] = useState('');
    const [selectedJobTitle, setSelectedJobTitle] = useState('');

    const handleExplore = useCallback((job) => {
        setSelectedJobID(job.id);
        setSelectedJobTitle(job.title);
        // navigate({
        //     pathname: '/recruitment',
        //     search: createSearchParams({
        //         jobTitle: job.title
        //     }).toString()
        // });
        navigate(`/recruitment/${job.title}`, { state: { selectedJobID: job.id, selectedJobTitle: job.title } });
    },[navigate]);

    // có API sẽ sửa lại chỗ này
    useEffect(() => {
        console.log(`Selected Job ID: ${selectedJobID}, Selected Job Title: ${selectedJobTitle}`);
    }, [selectedJobID, selectedJobTitle]);

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
            centeredSlides={true}
            direction='horizontal'
            effect={'spring'}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            breakpoints={{
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
                    slidesPerView: 2
                },
                1560: {
                    slidesPerView: 3
                },
            }}
        >
            {
                slider.map((job, index) => (
                    <StyledSwiperSlideContainer style={{ backgroundImage: `url(${job.url})` }} key={index}>
                        <StyledSwiperSlideActive>
                            <StyledSwiperSlideH2>{job.title}</StyledSwiperSlideH2>
                            <StyledSwiperSlideP>{job.description}</StyledSwiperSlideP>                            
                            <StyledButton key={job.id} onClick={() => handleExplore(job)}>EXPLORE</StyledButton>                                                   
                        </StyledSwiperSlideActive>
                    </StyledSwiperSlideContainer>
                ))
            }
        </StyledSwiper>
    </CarouselContainer>
  )
}

export default ServicesSlider