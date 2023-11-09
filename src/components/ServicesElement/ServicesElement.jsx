import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ObjectArrayContext } from '../../pages/Services/Services';


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
  width: 100%;
  height: 600px;
  background-color: white;
  margin-right: 30px;
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
  /* background-image: url(${props => props.background}); */
  background-color: rgb(0, 94, 141);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	text-align: center;
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
  height: 115px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
  }
`;



const SocialContainer = styled.div`
	text-align: center;
  padding: 10px;
  position: absolute;
  bottom: 2px;
  width: 80%;
`;

const SocialItems = styled.div``;



const StyledP = styled.p`
  color: rgb(140, 146, 151);
  font-size: 18px;
  line-height: 22px;
  padding: 30px 30px;
  text-align: justify;
`;

const HeaderContainer = styled.div``;


const StyledButton = styled.button`
    font-size: 16px;
    border-radius: 5px;
    margin: 20px 24px 130px;
    padding: 10px;
    background: #fff;
    color: #686868;
    text-decoration: none;
    text-transform: uppercase;
    border: 2px solid #d2d2d2;
    width: 150px;
    transition: all 0.5s ease-out;
    &:hover{
        cursor: pointer;
        border: 0.125rem solid rgb(0, 94, 141);
        color: white;
        background-color: rgb(0, 94, 141);
    }
`;



const ServicesElement = () => {
  const serDetailObj = useContext(ObjectArrayContext);

  const navigate = useNavigate();

  const handleSelectedService = useCallback((id) => {
    const ser = serDetailObj.find(ser => ser.id === id);
    // setSelectedService(ser);
    navigate(`/services/${ser.serviceName}`, { state: { selectedService: ser } });
  },[navigate, serDetailObj]);



  return (
    <>
      <Container>
        {serDetailObj.map((data, index) => (
            <CardContainer key={index}>
              <HeaderContainer>
                <Header /*background={data.image}*/>
                  <h2>{data.serviceName}</h2>
                </Header>

                <StyledP>{data.description}</StyledP>
              </HeaderContainer>

              <SocialContainer>
                <SocialItems>
                  <StyledButton onClick={() => handleSelectedService(data.id)}>Detail here</StyledButton>
                </SocialItems>
              </SocialContainer>
            </CardContainer>
        ))}
      </Container>
    </>
	);
}

export default ServicesElement;