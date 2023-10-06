import React from 'react';
import bgdonut1 from './image/bg-donut-1.png';
import bgdonut2 from './image/bg-donut-2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import './Carousel.css';
import styled from 'styled-components';
import { useTypingText } from '../TypingText/useTypingText';
// import '../TypingText/styles.css';


const CarouselContainer = styled.div`
    position: relative;
    width: calc(min(90rem, 90%));
    margin: 0 auto;
    min-height: 100vh;
    column-gap: 3rem;
    padding-block: min(20vh, 3rem);
    @media screen and (min-width: 48rem) {
        display: flex;
        align-items: center;
    }
`;

const CarouselContent = styled.div``;

const CarouselContentSpan = styled.span`
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-size: 1rem;
    color: #717171;
`;

const CarouselContentH1 = styled.h1`
    text-transform: capitalize;
    letter-spacing: 0.8px;
    font-size: 4rem;
    line-height: 1.1;
    background-color: #00a4aa;
    background-image: linear-gradient(45deg, #00a4aa, #000);
    background-size: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    & .word span {
    color: #ff5252;
    position: relative;
    }

    & .word span::after {
        content: "";
        width: 8px;
        height: 100%;
        background: #ff5252;
        display: block;
        position: absolute;
        right: -10px;
        top: 0;
        animation: blink 0.5s ease infinite alternate-reverse;
    }
    
    @keyframes blink {
        from {
            opacity: 100%;
        }

        to {
            opacity: 0%;
        }
    }

    & .word.empty {
        visibility: hidden;
    }

    & .word.empty span::after {
        visibility: visible;
        right: 0;
    }
`;

const CarouselContentHr = styled.hr`
    display: block;
    background: #00a4aa;
    height: 0.25rem;
    width: 6.25rem;
    border: none;
    margin: 1.125rem 0 1.875rem 0;
`;

const CarouselContenP = styled.p`
    line-height: 1.6;    
`;

const StyledSwiper = styled(Swiper)`
    width: 100%;
    padding-top: 3.125rem;    
`;

const StyledSwiperSlideContainer = styled(SwiperSlide)`
    width: 18.75rem;
    height: 28.125rem;
    background-size: cover;
    background-position: center;
`;

// const StyledSwiperSlide = styled.div`
//     display: none;
//     opacity: 0.3;
//     padding-bottom: 0.625rem;    
// `;

const StyledSwiperSlideActive = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    opacity: 1;
    background-color: rgba(108, 108, 108, 0.5);
    height: 100%;
`;

const StyledSwiperSlideH2 = styled.h2`
    color: #ffffff;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.4;
    margin-bottom: 3.625rem;
    padding: 0 0 0 1.563rem;
    text-transform: uppercase;
`;

const StyledSwiperSlideP = styled.p`
    color: #dadada;
    padding: 0 1.563rem 3rem 1.563rem;
    line-height: 1.6;
    font-size: 0.75rem;
`;

const StyledSwiperSlideA = styled.a`
    margin: 1.25rem 1.5rem 3.5rem;
    display: inline-block;
    color: #686868;
    background: #fff;
    padding: 0.625rem 1.875rem;
    margin-top: 2.125rem;
    text-decoration: none;
    text-transform: uppercase;
    border: 2px solid #d2d2d2;
    border-radius: 3.125rem;
    transition: 0.3s ease-in-out;
    &:hover{
        border: 0.125rem solid #00a4aa;
        color: #00a4aa;
        background-color: rgba(84, 132, 169, 0.5);
    }
    /* &:hover{
        color: #00a4aa;
    } */
`;

// const StyledSlideBtn = styled.div`
//     display: inline-block;
//     color: #717171;
//     background: #fff;
//     padding: 0.625rem 1.875rem;
//     /* margin-top: 2.125rem; */
//     text-decoration: none;
//     text-transform: uppercase;
//     border: 2px solid #c2c2c2;
//     border-radius: 3.125rem;
//     transition: 0.3s ease-in-out;
//     &:hover{
//         border: 0.125rem solid #00a4aa;
//         color: #00a4aa;
//     }
// `;

const Img1 = styled.img`
    position: fixed;
    top: 0;
    left: -8rem;
    z-index: -1;
    opacity: 0.2;
`;

const Img2 = styled.img`
    position: fixed;
    bottom: -2rem;
    right: -3rem;
    z-index: -1;
    width: 9.375rem;
    opacity: 0.2;
`;

const slider = [
    {
    title: "Image 1",
    description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
    url: "https://images.pexels.com/photos/57007/pexels-photo-57007.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },

    {
    title: "Image 2",
    description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
    url: "https://images.pexels.com/photos/785418/pexels-photo-785418.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
    title: "Image 3",
    description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
    url: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
    title: "Image 4",
    description: "Test image",
    url: "https://images.pexels.com/photos/113850/pexels-photo-113850.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
]

const Carousel = () => {
  const { word } = useTypingText(['fast', 'reliable', 'affordable'], 130, 20);

  return (
    <CarouselContainer>
        <CarouselContent>
            <CarouselContentSpan>discover</CarouselContentSpan>
            <CarouselContentH1>Something like {word}</CarouselContentH1>
            <CarouselContentHr />
            <CarouselContenP>Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.</CarouselContenP>
        </CarouselContent>

        <StyledSwiper
            modules={[Pagination, EffectCoverflow, Autoplay]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 3,
                slideShadows: true
            }}
            loop={true}
            pagination={{clickable: true}}

            autoplay={{
                delay: 5000,
                disableOnInteraction: false
            }}
            breakpoints={{
                640: {
                    slidesPerView: 2
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
                slider.map(data => (
                    <StyledSwiperSlideContainer style={{ backgroundImage: `url(${data.url})` }}>
                        <StyledSwiperSlideActive>
                            <StyledSwiperSlideH2>{data.title}</StyledSwiperSlideH2>
                            <StyledSwiperSlideP>{data.description}</StyledSwiperSlideP>
                            <StyledSwiperSlideA href={`${data.url}`} target="_blank" rel="noreferrer">explore</StyledSwiperSlideA>
                        </StyledSwiperSlideActive>
                    </StyledSwiperSlideContainer>
                ))
            }
        </StyledSwiper>
        <Img1 src={bgdonut1} alt="bg" />
        <Img2 src={bgdonut2} alt="bg" />
    </CarouselContainer>
  )
}

export default Carousel