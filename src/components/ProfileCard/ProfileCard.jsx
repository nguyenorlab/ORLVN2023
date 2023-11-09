import React from 'react';
import styled from 'styled-components';
import profile1 from '../../images/profile1.png';
import profile2 from '../../images/profile2.png';
import profile3 from '../../images/profile3.png';
import logoSVG from '../../images/orl.svg';
import { FaLinkedin } from 'react-icons/fa';


const Container = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

`;

const CardContainer = styled.div`
  /* width: 350px; */
  width: 100%;
  height: 600px;
  background-color: white;
  margin-right: 30px;
	/* min-width: 350px; */
	/* max-width: 600px; */
	/* height: auto; */
	border-radius: 14px;
  box-shadow: rgb(0, 94, 141) 5px 5px 20px 0px;
  display: flex;
  justify-content: center;
  position: relative;
  transition: all 0.5s ease-out;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    box-shadow: rgb(0, 94, 141) 10px 18px 15px 0px;
    transform: translateY(-20px);
  }

  @media screen and (max-width: 1024px) {
    margin: 0px 0px 30px 0px;
  }

  @media screen and (max-width: 820px) {
    margin: 0px 0px 30px 0px;
  }

  @media screen and (max-width: 768px) {
    margin: 0px 0px 30px 0px;
  }
`;

const Header = styled.header`
  /* background-image: url(${logoSVG}); */
  background-color: rgb(0, 94, 141);
	background-position: 0px 0px;
	background-repeat: no-repeat;
	background-size: contain;
	text-align: center;
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
  height: 115px;
`;

const Img = styled.img`
	margin: 40px auto auto;
	width: 150px;
  height: 150px;
	border: 2px solid rgb(0, 94, 141);
	border-radius: 50%;
`;

const H1 = styled.h1`
	font-weight: bold;
	font-size: 30px;
	text-align: center;
	/* padding: 10px 20px 0px 20px; */
	padding: 80px 20px 10px 20px;
  color: black;
`;

const StyledPosition = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const NormalTextH2 = styled.h2`
	font-weight: normal;
	font-size: 18px;
	color: hsl(0, 0%, 50%);
	text-align: center;
	padding-bottom: 10px;
`;

const SocialContainer = styled.div`
	/* display: flex; */
	border-top: solid rgb(206, 206, 206) 1px;
	text-align: center;
  padding: 10px;
  position: absolute;
  bottom: 2px;
  width: 80%;
`;

const SocialItems = styled.div`
  /* flex: 1; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

const SocialIconLink = styled.a`
    color: rgb(0 94 141);
    font-size: 24px;
    padding: 0px 5px 0px 5px;
    margin-top: 6px;
`;

const StyledP = styled.p`
  color: rgb(140, 146, 151);
  font-size: 18px;
  line-height: 22px;
  padding: 0px 30px;
  text-align: justify;
`;

const HeaderContainer = styled.div``;




const profileData = [
  {
    name: 'Maria',
    avatar: profile1,
    position: 'CEO',
    location: 'Tokyo',
    about: 'She is a wonder woman. The role of a CEO varies from one company to another depending on the company’s size, culture, and corporate structure.',
    linkedin: '/'
  },
  {
    name: 'John',
    avatar: profile2,
    position: 'CTO',
    location: 'USA',
    about: 'He is a superman. His knowledge is awesome, he is a professional in overall software development and cloud architect.',
    linkedin: '/',
  },
  {
    name: 'Nam',
    avatar: profile3,
    position: 'Cu li',
    location: 'Viet Nam',
    about: 'Just a poor man and he don\'t know anything.',
    linkedin: '/'
  }
];


const ProfileCard = () => {
  return (
    <>
      <Container>
        {profileData.map((data, index) => (
            <CardContainer key={index}>
              <HeaderContainer>
                <Header>
                  <Img src={data.avatar} alt={data.name} />
                </Header>
                <H1>{data.name}</H1>
                <StyledPosition>                  
                  <NormalTextH2>{data.position}</NormalTextH2>
                  <NormalTextH2>{data.location}</NormalTextH2>
                </StyledPosition>
                <StyledP>{data.about}</StyledP>
              </HeaderContainer>

              <SocialContainer>
                <SocialItems>
                  <SocialIconLink href={data.linkedin} target='_blank' aria-label='Linkedin'><FaLinkedin /></SocialIconLink>
                </SocialItems>
              </SocialContainer>
            </CardContainer>
        ))}
      </Container>
    </>
	);
}

export default ProfileCard