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


// const slider = [
//     {
//         id: 1,
//         title: "ReactJS",
//         description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
//         url: "https://images.pexels.com/photos/57007/pexels-photo-57007.jpeg?auto=compress&cs=tinysrgb&w=1600"
//     },
//     {
//         id: 2,
//         title: "Python",
//         description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
//         url: "https://images.pexels.com/photos/785418/pexels-photo-785418.jpeg?auto=compress&cs=tinysrgb&w=1600"
//     },
//     {
//         id: 3,
//         title: "AWS Cloud",
//         description: "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
//         url: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600"
//     },
//     {
//         id: 4,
//         title: "Image 4",
//         description: "Test image",
//         url: "https://images.pexels.com/photos/113850/pexels-photo-113850.jpeg?auto=compress&cs=tinysrgb&w=1600"
//     },
// ];


const jobDetailObj = [
    {
      id: 1,
      lightText: false,
      jobTitle: 'Front-End Developer',
      location: 'Ha Noi',
      shortDescription: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
      salary: 'Upto 40M',
      description: 'We are looking for a qualified Front-end developer to join our IT team. You will be responsible for building the client-side of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re interested in creating a user-friendly environment by writing code and moving forward in your career, then this job is for you. We expect you to be a tech-savvy professional, who is curious about new digital technologies and aspires to combine usability with visual design. Ultimately, you should be able to create a functional and attractive digital environment for our company, ensuring great user experience.',
      experience: ['Proven work experience as a ReactJS developer.', 'Hands on experience with markup languages.', 'Experience with JavaScript, CSS and jQuery.', 'Familiarity with browser testing and debugging. In-depth understanding of the entire web development process (design, development and deployment).'],
      expPlus: ['Experience with performance optimization, data caching is a plus.', 'Experience working with CDN like Akamai to deliver the best experience (optimization, caching, edge computing…)', 'Good knowledge of end-to-end design language using token.', 'Experience with customer facing roles is a plus.', 'Experience with large-scale e-commerce projects is a plus.', 'Experience with Azure cloud native deployment is a plus.'],
      img: require('../../images/about.png'),
      url: "https://images.pexels.com/photos/57007/pexels-photo-57007.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: 'Image',
      start: '',
      treatment: ['Thử việc hưởng 100% lương', 'Ký hợp đồng lao động chính thức sau 02 tháng thử việc.', 'Nghỉ phép 12 ngày/năm, Golden Week, Tết dương lịch, âm lịch 6 ngày, kỷ niệm thành lập công ty', 'Du lịch hè cùng công ty hoặc nghỉ hè 3 ngày tự chọn.', 'Làm việc: 9h-18h từ T2-T6, nghỉ T7 và CN hàng tuần.', 'Xét tăng lương định kỳ 1 năm/lần, thưởng 2 lần/năm (tháng lương thứ 13 và 14)', 'Hỗ trợ thi chứng chỉ quốc tế.', 'Chế độ BHXH, BHYT, BHTN', 'Môi trường trẻ trung năng động, thoải mái, tạo điều kiện để cá nhân phát triển năng lực nhất có thể.', 'Free trà, cà phê, chỗ gửi xe.'],
    },
    {
      id: 2,
      lightText: false,
      jobTitle: 'Back-End Developer',
      location: 'Tokyo',
      shortDescription: ['Python', 'NodeJS', 'MySQL'],
      salary: 'Upto 40M',
      description: 'We are looking for a qualified Front-end developer to join our IT team. You will be responsible for building the client-side of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re interested in creating a user-friendly environment by writing code and moving forward in your career, then this job is for you. We expect you to be a tech-savvy professional, who is curious about new digital technologies and aspires to combine usability with visual design. Ultimately, you should be able to create a functional and attractive digital environment for our company, ensuring great user experience.',
      experience: ['Proven work experience as a Python developer.', 'Hands on experience with markup languages.', 'Experience with Python.', 'Familiarity with browser testing and debugging. In-depth understanding of the entire web development process (design, development and deployment).'],
      expPlus: ['Experience with performance optimization, data caching is a plus.', 'Experience working with CDN like Akamai to deliver the best experience (optimization, caching, edge computing…)', 'Good knowledge of end-to-end design language using token.', 'Experience with customer facing roles is a plus.', 'Experience with large-scale e-commerce projects is a plus.', 'Experience with Azure cloud native deployment is a plus.'],
      img: require('../../images/about.png'),
      url: "https://images.pexels.com/photos/785418/pexels-photo-785418.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: 'Image',
      start: '',
      treatment: ['Thử việc hưởng 100% lương', 'Ký hợp đồng lao động chính thức sau 02 tháng thử việc.', 'Nghỉ phép 12 ngày/năm, Golden Week, Tết dương lịch, âm lịch 6 ngày, kỷ niệm thành lập công ty', 'Du lịch hè cùng công ty hoặc nghỉ hè 3 ngày tự chọn.', 'Làm việc: 9h-18h từ T2-T6, nghỉ T7 và CN hàng tuần.', 'Xét tăng lương định kỳ 1 năm/lần, thưởng 2 lần/năm (tháng lương thứ 13 và 14)', 'Hỗ trợ thi chứng chỉ quốc tế.', 'Chế độ BHXH, BHYT, BHTN', 'Môi trường trẻ trung năng động, thoải mái, tạo điều kiện để cá nhân phát triển năng lực nhất có thể.', 'Free trà, cà phê, chỗ gửi xe.'],
    },
    {
      id: 3,
      lightText: false,
      jobTitle: 'Cloud Engineer',
      location: 'Tokyo',
      shortDescription: ['AWS', 'Azure', 'Alibaba'],
      salary: 'Upto 40M',
      description: 'We are looking for a qualified Front-end developer to join our IT team. You will be responsible for building the client-side of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re interested in creating a user-friendly environment by writing code and moving forward in your career, then this job is for you. We expect you to be a tech-savvy professional, who is curious about new digital technologies and aspires to combine usability with visual design. Ultimately, you should be able to create a functional and attractive digital environment for our company, ensuring great user experience.',
      experience: ['Proven work experience as a Cloud Professional.', 'Hands on experience with markup languages.', 'Experience with Python.', 'Familiarity with browser testing and debugging. In-depth understanding of the entire web development process (design, development and deployment).'],
      expPlus: ['Experience with performance optimization, data caching is a plus.', 'Experience working with CDN like Akamai to deliver the best experience (optimization, caching, edge computing…)', 'Good knowledge of end-to-end design language using token.', 'Experience with customer facing roles is a plus.', 'Experience with large-scale e-commerce projects is a plus.', 'Experience with Azure cloud native deployment is a plus.'],
      img: require('../../images/about.png'),
      url: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: 'Image',
      start: '',
      treatment: ['Thử việc hưởng 100% lương', 'Ký hợp đồng lao động chính thức sau 02 tháng thử việc.', 'Nghỉ phép 12 ngày/năm, Golden Week, Tết dương lịch, âm lịch 6 ngày, kỷ niệm thành lập công ty', 'Du lịch hè cùng công ty hoặc nghỉ hè 3 ngày tự chọn.', 'Làm việc: 9h-18h từ T2-T6, nghỉ T7 và CN hàng tuần.', 'Xét tăng lương định kỳ 1 năm/lần, thưởng 2 lần/năm (tháng lương thứ 13 và 14)', 'Hỗ trợ thi chứng chỉ quốc tế.', 'Chế độ BHXH, BHYT, BHTN', 'Môi trường trẻ trung năng động, thoải mái, tạo điều kiện để cá nhân phát triển năng lực nhất có thể.', 'Free trà, cà phê, chỗ gửi xe.'],
    },
    {
      id: 4,
      lightText: false,
      jobTitle: 'Devops Engineer',
      location: 'Tokyo',
      shortDescription: ['Docker', 'Rancher', 'Kubernetes'],
      salary: 'Upto 40M',
      description: 'We are looking for a qualified Front-end developer to join our IT team. You will be responsible for building the client-side of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications. If you’re interested in creating a user-friendly environment by writing code and moving forward in your career, then this job is for you. We expect you to be a tech-savvy professional, who is curious about new digital technologies and aspires to combine usability with visual design. Ultimately, you should be able to create a functional and attractive digital environment for our company, ensuring great user experience.',
      experience: ['Proven work experience as a Cloud Professional.', 'Hands on experience with markup languages.', 'Experience with Python.', 'Familiarity with browser testing and debugging. In-depth understanding of the entire web development process (design, development and deployment).'],
      expPlus: ['Experience with performance optimization, data caching is a plus.', 'Experience working with CDN like Akamai to deliver the best experience (optimization, caching, edge computing…)', 'Good knowledge of end-to-end design language using token.', 'Experience with customer facing roles is a plus.', 'Experience with large-scale e-commerce projects is a plus.', 'Experience with Azure cloud native deployment is a plus.'],
      img: require('../../images/about.png'),
      url: "https://images.pexels.com/photos/113850/pexels-photo-113850.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: 'Image',
      start: '',
      treatment: ['Thử việc hưởng 100% lương', 'Ký hợp đồng lao động chính thức sau 02 tháng thử việc.', 'Nghỉ phép 12 ngày/năm, Golden Week, Tết dương lịch, âm lịch 6 ngày, kỷ niệm thành lập công ty', 'Du lịch hè cùng công ty hoặc nghỉ hè 3 ngày tự chọn.', 'Làm việc: 9h-18h từ T2-T6, nghỉ T7 và CN hàng tuần.', 'Xét tăng lương định kỳ 1 năm/lần, thưởng 2 lần/năm (tháng lương thứ 13 và 14)', 'Hỗ trợ thi chứng chỉ quốc tế.', 'Chế độ BHXH, BHYT, BHTN', 'Môi trường trẻ trung năng động, thoải mái, tạo điều kiện để cá nhân phát triển năng lực nhất có thể.', 'Free trà, cà phê, chỗ gửi xe.'],
    },    
  ];


const ServicesSlider = () => {
    const navigate = useNavigate();
    const [selectedJobID, setSelectedJobID] = useState('');
    const [selectedJobTitle, setSelectedJobTitle] = useState('');

    const handleExplore = useCallback((job) => {
        setSelectedJobID(job.id);
        setSelectedJobTitle(job.jobTitle);
        // navigate({
        //     pathname: '/recruitment',
        //     search: createSearchParams({
        //         jobTitle: job.jobTitle
        //     }).toString()
        // });
        navigate(`/recruitment/${job.jobTitle}`, { state: { selectedJob: job } });
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
                jobDetailObj.map((job, index) => (
                    <StyledSwiperSlideContainer style={{ backgroundImage: `url(${job.url})` }} key={index}>
                        <StyledSwiperSlideActive>
                            <StyledSwiperSlideH2>{job.jobTitle}</StyledSwiperSlideH2>
                            <StyledSwiperSlideP>
                                {job.shortDescription.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                                {job.location}
                                {job.salary}
                            </StyledSwiperSlideP>                            
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