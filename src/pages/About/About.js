import React, { useEffect } from 'react';
import { Container } from '../../globalStyles';
import styled from 'styled-components';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { useTranslation } from 'react-i18next';


const InfoSec = styled.div`
  color: #fff;
  padding: 70px 0;
  background: ${({lightBg}) => (lightBg ? '#fff' : '#10152')};
`;

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({imgStart}) => (imgStart ? 'row-reverse' : 'row')};
`;

const InfoColumn = styled.div`
    margin-bottom: 15px;
    flex: 1;
    max-width: 50%;
    flex-basis: 50%;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
`;

const TextWrapper = styled.div`
    max-width: 540px;
    padding-top: 0;
    padding-bottom: 60px;

    @media screen and (max-width: 768px) {
        padding-bottom: 0px;
    }
`;

const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 46px;
  line-height: 1.1;
  color: ${({lightText}) => (lightText ? '#f7f8fa' : '#1c2237')};    
`;

const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  /* color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : '#1c2237')}; */
  color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : 'rgb(140, 146, 151)')};
  text-align: justify;
  hyphens: auto;
`;

const ImgWrapper = styled.div`
  max-width: 555px;
  display: flex;
  justify-content: ${({start}) => (start ? 'flex-start' : 'flex-end')};
`;


// const Img = styled.img`
//   padding-right: 0;
//   border: 0;
//   max-width: 100%;
//   vertical-align: middle;
//   display: inline-block;
//   max-height: 500px;
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
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  font-size: 46px;
  line-height: 1.1;
  color: ${({lightText}) => (lightText ? '#f7f8fa' : '#1c2237')};    
`;

const TableContainer = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px; // Tuỳ chỉnh theo ý muốn
`;

const TableRow = styled.div`
  display: table-row;
`;

const TableCell = styled.div`
  display: table-cell;
  padding: 10px;
  text-align: left;
  color: ${({ color }) => color ? 'rgb(28, 34, 55)': 'rgb(140, 146, 151)'};
  width: ${({ width }) => width ? '30%' : '70%'};
`;

const aboutData = {
  lightBg: true,
  imgStart: '',
  lightTopLine: false,
  lightTextDesc: false,
  description: 'Our parent company, ORLAB Japan, was established in 1997 in Tokyo with many business categories in the field of information technology. These include consulting on software development, server services, storage, design and construction of software, servers, design and operation of network equipment. Joining the wave of transformation and market expansion, in 2020 we gradually began to lay the foundation for building a branch office in Hanoi with the mission of bringing good job opportunities to Vietnamese engineers.',
  headline: 'About Us', 
  lightText: false,
  primary: false,
  img: require('../../images/about.png'),
  alt: 'Image',
  start: '',
  companyName: 'ORLAB Viet Nam Co.Ltd',
  address: '9F - Detech Tower 2 - 107 Nguyen Phong Sac, Dich Vong Hau, Cau Giay, Ha Noi',
  contact: 'contact.vn@orlab.co.jp',
  establishment: '2020',
  mainService: 'Software Outsourcing, Business Agency Agreement, Recruitment',
  capital: '1500万円'
}



const About = () => {
  const { i18n, t } = useTranslation('About');
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <>
        <InfoSec lightBg={aboutData.lightBg}>
          <Container>
            <InfoRow imgStart={aboutData.imgStart}>
              <InfoColumn>
                <TextWrapper>
                  <Heading>{t('About Us')}</Heading>
                  <Subtitle lightTextDesc={aboutData.lightTextDesc}>{t(`${aboutData.description}`)}</Subtitle>
                </TextWrapper>
              </InfoColumn>

              <InfoColumn>
                <ImgWrapper start={aboutData.start}>
                  <TableContainer>
                    <TableRow>
                      <TableCell width={true.toString()} color={true.toString()}>{t('Company Name')}</TableCell>
                      <TableCell>{aboutData.companyName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width={true.toString()} color={true.toString()}>{t('Address')}</TableCell>
                      <TableCell>{aboutData.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width={true.toString()} color={true.toString()}>{t('Contact')}</TableCell>
                      <TableCell>{aboutData.contact}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width={true.toString()} color={true.toString()}>{t('Establishment')}</TableCell>
                      <TableCell>{aboutData.establishment}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width={true.toString()} color={true.toString()}>{t('Main Service')}</TableCell>
                      <TableCell>{aboutData.mainService}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width={true.toString()} color={true.toString()}>{t('Capital')}</TableCell>
                      <TableCell>{aboutData.capital}</TableCell>
                    </TableRow>
                  </TableContainer>
                </ImgWrapper>
              </InfoColumn>

              <TeamInfo>
                <TeamWrapper>
                  <TeamHeading>{t('Our Team')}</TeamHeading>
                  <ProfileCard />
                </TeamWrapper>
              </TeamInfo>

            </InfoRow>
          </Container>
        </InfoSec>
    </>
  )
}

export default About