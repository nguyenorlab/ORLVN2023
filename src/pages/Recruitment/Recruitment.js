import React, { useCallback } from 'react';
import styled from 'styled-components';
import { allRecruitData } from './Data';


const Container = styled.div`
    z-index: 1;
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

const InfoColumn = styled.div`
    margin-bottom: 15px;
    padding-right: 15px;
    padding-left: 15px;
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


const Subtitle = styled.p`
    max-width: 440px;
    margin-bottom: 35px;
    font-size: 18px;
    line-height: 24px;
    /* color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : '#1c2237')}; */
    color: ${({lightTextDesc}) => (lightTextDesc ? '#a9b3c1' : 'rgb(140, 146, 151)')};
`;


const ImgWrapper = styled.div`
    max-width: 555px;
    display: flex;
    justify-content: ${({start}) => (start ? 'flex-start' : 'flex-end')};
`;


const Img = styled.img`
    padding-right: 0;
    border: 0;
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
    max-height: 500px;
`;

const StyledButton = styled.button`
    align-self: flex-end;
    font-size: 16px;
    border-radius: 5px;
    padding: 10px;
    background: rgb(0, 94, 141);
    color: white;
    text-decoration: none;
    text-transform: capitalize;
    border: none;
    width: 150px;
    transition: all 0.5s ease-out;
    &:hover{
        cursor: pointer;
        background-color: rgb(28 150 212);
    }
`;


const Recruitment = () => {

  const handleSelectedJob = useCallback((rec) => {

  },[]);


  return (
    <>
      {allRecruitData.map((rec, id) => (
        <InfoSec lightBg={true} key={id}>
          <Container>
            <InfoRow imgStart={rec.imgStart}>
              <InfoColumn>
                <TextWrapper>
                  <TopLine>{rec.topLine}</TopLine>
                  <Heading>{rec.headline}</Heading>
                  <Subtitle>{rec.description}</Subtitle>
                  <StyledButton onClick={() => handleSelectedJob(rec)}>{rec.buttonLabel}</StyledButton>
                </TextWrapper>
              </InfoColumn>

              <InfoColumn>
                <ImgWrapper start={true}>
                  <Img src={rec.img} alt={rec.alt} />
                </ImgWrapper>
              </InfoColumn>

            </InfoRow>
          </Container>
        </InfoSec>
      ))}
    </>
  )
}

export default Recruitment