import React, { createContext } from 'react';
import { Container } from '../../globalStyles';
import styled from 'styled-components';
import ServicesElement from '../../components/ServicesElement/ServicesElement';
// import cloud from '../../images/cloud.jpg';
// import hero from '../../images/hero.png';

// import service1 from '../../images/hero.png';    // test images public
// import service2 from '../../images/hero.png';
// import service3 from '../../images/hero.png';
// import codingFlow from '../../images/coding-flow1.jpg';
// import software from '../../images/software.jpg';
// import development from '../../images/development.jpg';
// import recruitment from '../../images/recruitment.jpg';


export const ObjectArrayContext = createContext([]);


const InfoSec = styled.div`
    color: #fff;
    /* padding: 70px 0; */
    background: ${({lightBg}) => (lightBg ? '#fff' : '#10152')};
`;

const InfoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: ${({imgStart}) => (imgStart ? 'row-reverse' : 'row')};
`;

// const Subtitle = styled.p`
//     max-width: 440px;
//     margin-bottom: 35px;
//     font-size: 18px;
//     line-height: 24px;
//     /* color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : '#1c2237')}; */
//     color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : 'rgb(140, 146, 151)')};
// `;

const TeamInfo = styled.div`
  padding: 50px 0px;
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

const TeamWrapper = styled.div`
  max-width: 100%;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {

  }
`;

const TeamHeading = styled.h1`
  margin-bottom: 40px;
  /* display: inline-block; */
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  font-size: 48px;
  line-height: 1.1;
  color: ${({lightText}) => (lightText ? '#f7f8fa' : '#1c2237')};    
`;

// const Img1 = styled.img`
//     position: fixed;
//     top: 0;
//     left: -8rem;
//     z-index: -1;
//     opacity: 0.2;
// `;

// const Img2 = styled.img`
//     position: fixed;
//     bottom: -2rem;
//     right: -3rem;
//     z-index: -1;
//     width: 9.375rem;
//     opacity: 0.2;
// `;


export const serDetailObj = [
  {
    id: 1,
    serviceName: 'Software Outsourcing',
    image: require('../../images/software-outsourcing.jpg'),
    description: 'We are proud to be a reliable and professional partner in the field of Software Outsourcing. With a team of dedicated and passionate software experts, we are committed to delivering top-notch solutions and meeting all your software development needs.',
    shortDescription: 'Chúng tôi không chỉ cung cấp dịch vụ phần mềm, mà còn là đối tác chiến lược đồng hành trong hành trình số hóa của bạn. Chúng tôi tập trung vào việc mang đến giải pháp đột phá, giúp doanh nghiệp tiết kiệm chi phí và tăng cường sức mạnh cạnh tranh.',
    step: [
      {
        id: 1,
        step: 'Đánh giá nhu cầu và yêu cầu',
        description: 'Gặp gỡ khách hàng để hiểu rõ nhu cầu và yêu cầu cụ thể của dự án. Xác định kỹ thuật, ngôn ngữ lập trình, và các yếu tố kỹ thuật khác.',
        image: require('../../images/software-outsourcing-talk-with-customer.jpg')
      },
      {
        id: 2,
        step: 'thương lượng và hợp đồng',
        description: 'Lên hợp đồng chi tiết với khách hàng. Thương lượng về giá cả, thời gian hoàn thành, và các điều kiện khác.',
        image: require('../../images/software-outsourcing-contract.jpg')
      },
      {
        id: 3,
        step: 'Phát triển và báo cáo',
        description: 'Bắt đầu quá trình phát triển theo yêu cầu của khách hàng. Thực hiện kiểm thử đầy đủ để đảm bảo chất lượng sản phẩm. Họp báo cáo tiến độ định kỳ với khách hàng.',
        image: require('../../images/software-outsourcing-develop.jpg')
      },
      {
        id: 4,
        step: 'Hỗ trợ và bảo dưỡng',
        description: 'Cung cấp hỗ trợ kỹ thuật sau triển khai. Đảm bảo sự ổn định và bảo dưỡng cho sản phẩm.',
        image: require('../../images/software-outsourcing-support.jpg')
      },
    ],
  },
  {
    id: 2,
    serviceName: 'Business Agency Agreement',
    image: require('../../images/business-partnership.jpg'),
    description: 'We have a legal entity in Tokyo, we can cooperate with you when you do not have enough conditions to establish a legal entity in Japan, at this time you can still do business, receive letters and documents... from customers and partners through our office address. This helps you access the labor market faster and find employment in Japan with the least amount of difficulty.',
    shortDescription: 'Chúng tôi mang đến không chỉ là một hợp đồng, mà là khả năng tối ưu hoá quy trình kinh doanh. Chúng tôi tạo ra một môi trường thuận lợi, giúp doanh nghiệp tập trung vào lõi nghiệp vụ, chính sự linh hoạt này giúp doanh nghiệp của bạn tận dụng được mọi cơ hội kinh doanh. Chúng tôi không chỉ là đối tác, mà là đồng đội cùng nhau hướng tới mục tiêu chung, tạo ra sự hiệu quả cao nhất.',
    step: [
      {
        id: 1,
        step: 'mục tiêu và phạm vi',
        description: 'Xác định mục tiêu cụ thể của khách hàng. Rõ ràng về phạm vi và quyền lợi của hai bên.',
        image: require('../../images/business-partnership-scope.jpg')
      },
      {
        id: 2,
        step: 'Thảo luận và đàm phán',
        description: 'Thảo luận về điều kiện cụ thể của hợp đồng. Đàm phán về chính sách hoa hồng, trách nhiệm, điều kiện thanh toán và các điều khoản khác.',
        image: require('../../images/business-partnership-negotiate.jpg')
      }
    ],
  },
  {
    id: 3,
    serviceName: 'Recruitment',
    image: require('../../images/recruitment.jpg'),
    description: 'Chúng tôi có nhiều đối tác và khách hàng đáng tin cậy dựa trên những liên kết chặt chẽ từ khi mới thành lập. Việc tuyển dụng diễn ra nhanh chóng với tỷ lệ thành công cao. Chúng tôi mong muốn không chỉ mang đến cơ hội cho các kỹ sư mà còn mong muốn được gắn kết với họ trong suốt con đường sự nghiệp.',
    shortDescription: 'Từ khi thành lập cho tới nay chúng tôi luôn xây dựng và duy trì các mối quan hệ tốt đẹp với các đối tác, khách hàng. Bởi vậy mà, việc tuyển dụng không chỉ là tìm kiếm nhân sự mà còn là sự lắng nghe mong muốn của khách hàng, đối tác cũng như các kỹ sư với mục tiêu kết nối nhanh nhất với tỷ lệ thành công cao nhất.',
    step: [
      {
        id: 1,
        step: 'Open vacancy',
        description: 'Nhận thông tin yêu cầu tuyển dụng từ các đối tác, khách hàng, thông báo về cơ hội nghề nghiệp đang mở cho một vị trí trên website của chúng tôi.',
        image: require('../../images/recruitment-open-vacancy.jpg')
      },
      {
        id: 2,
        step: 'Hiring Process',
        description: 'Đánh giá hồ sơ, mời ứng viên tham gia một cuộc trao đổi với nhóm tuyển dụng của chúng tôi. Đây là cơ hội để chúng tôi hiểu rõ về kinh nghiệm, kỹ năng, và tầm quan trọng của ứng viên nhằm tìm ra cơ hội phù hợp nhất.',
        image: require('../../images/recruitment-profile-review.jpg')
      },
      {
        id: 3,
        step: 'Interview',
        description: 'Phỏng vấn trực tiếp với khách hàng (online/offline) sẽ tập trung vào khám phá thêm về kỹ năng cá nhân, đánh giá sự phù hợp với văn hóa công ty, và trả lời mọi thắc mắc bạn có về vị trí và công ty.',
        image: require('../../images/recruitment-interview.jpg')
      },
      {
        id: 4,
        step: 'Ready to work',
        description: 'Chào mừng. Chúng tôi chuẩn bị sẵn sàng các thủ tục để bạn có thể sớm làm việc tại Việt Nam hoặc Nhật Bản tuỳ vào vị trí/yêu cầu công việc mà không phát sinh chi phí.',
        image: require('../../images/recruitment-ready-to-work.jpg')
      },
    ],
  }
];



const Services = () => {
  return (
    <>
      <InfoSec>
        <Container>
          <InfoRow>

            <TeamInfo>
              <TeamWrapper>
                <TeamHeading>Main Services</TeamHeading>

                <ObjectArrayContext.Provider value={serDetailObj}>
                  <ServicesElement />
                </ObjectArrayContext.Provider>

              </TeamWrapper>
            </TeamInfo>

          </InfoRow>
        </Container>
        {/* <Img1 src={cloud} alt="bg" />
        <Img2 src={hero} alt="bg" /> */}
      </InfoSec>
    </>
  )
}

export default Services