import React, { createContext } from 'react';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import { InfoSection } from '../../components';
// import HeroImg from '../../images/carousel-1.jpg';
// import styled from 'styled-components';
// import ImageSlider from '../../components/ImageSlider/ImageSlider';
import Carousel from '../../components/Carousel/Carousel';
import ServicesSlider from '../../components/ServicesSlider/ServicesSlider';
// import image1 from '../../assets/carousel-1.jpg';
// import image2 from '../../assets/carousel-2.jpg';

// const HeroContainer = styled.div`
//   background: #fff;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0 30px;
//   height: 100vh; /* Set height to viewport height */
//   position: relative;
//   z-index: 1;
// `;

// const HeroBg = styled.div`
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
// `;

// const ImgBg = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover; /* Scale the image to cover the entire screen */
// `;


export const ObjectArrayContext = createContext([]);


const Home = () => {
  const jobDetailObj = [
    {
      id: 1,
      lightText: false,
      jobTitle: 'Front-End Developer',
      location: 'Ha Noi',
      project: ['Web Development'],
      shortDescription: ['ReactJS', 'TypeScript', 'JavaScript'],
      salary: 'Upto 100M',
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
      project: ['Images Analyze'],
      shortDescription: ['Python', 'NodeJS', 'MySQL'],
      salary: 'Upto 100M',
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
      project: ['Life Keeper'],
      shortDescription: ['AWS', 'Azure', 'Alibaba'],
      salary: 'Upto 100M',
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
      project: ['Microservices Operator'],
      shortDescription: ['Docker', 'K8s', 'CICD'],
      salary: 'Upto 100M',
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

  return (
    <>
      <Carousel />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjThree} />
      
      <ObjectArrayContext.Provider value={jobDetailObj}>
        <ServicesSlider />        
      </ObjectArrayContext.Provider>

      <InfoSection {...homeObjFour} />
    </>
  )
}

export default Home