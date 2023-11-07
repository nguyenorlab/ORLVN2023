import styled from 'styled-components';
import { Container } from '../../globalStyles';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 999;
    border-bottom: hsla(0,0%,93.3%,1.000) 1px solid;
    box-shadow: 5px 7px 10px 0 hsla(205,16%,77%,0.1);
    background-color: hsla(0,0%,99.6%,1.000);
`;

export const NavbarContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    height: 80px;

    ${Container}
`;

export const NavLogo = styled(Link)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
`;

export const NavIcon = styled.div`
    margin-right: 0.5rem;
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 960px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        svg {
            color: hsla(200,77.5%,68.6%,1.000) !important;
        }
    }
`;


export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;

    @media screen and (max-width: 960px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 90vh;
        position: absolute;
        top: 80px;
        left: ${({click}) => (click ? 0 : '-100%')};
        opacity: 1;
        transition: all 0.5s ease;
        background-color: hsla(0,0%,99.6%,1.000);
    }
`;

export const NavItem = styled.li`
    height: 38px;
    position: relative;
    &:hover {
        /* background-color: hsla(200,77.5%,68.6%,1.000); */
        background-color: rgb(0 94 141);
        border-radius: 4px;
        width: 96%;
    }
    
    @media screen and (max-width: 960px) {
        width: 96%;
        &:hover {
            border: none;
        }
    }
`;

export const NavLinks = styled(Link)`
    color: hsl(207,5%,57%);
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;
    font-size: 18px;
    font-weight: 400;
    &:hover {
        color: white;
    }

    @media screen and (max-width: 960px) {
        text-align: center;
        width: 100%;
        display: table;

        &:hover {
            color: white;
            transition: all 0.3s ease;
        }
    }
`;

export const NavItemBtn = styled.li`
    @media screen and (max-width: 960px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 120px;
    }
`;


export const  NavBtnLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    /* padding: 8px 16px; */
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
`;

export const NavLogoImg = styled.img`
    height: 60px;
    width: 60px;
    margin: 7px 0px 0px 0px;
    border-radius: 5px;
`;

//------- dropdown menu start-------//
export const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-top: 10px;
  background-color: #f3fcff;
  position: absolute;
  border: 1px solid grey;
  width: 150px;
`;

export const StyledLi = styled.li`
  float: left;
`;

export const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const DropDownLi = styled(StyledLi)`
  display: inline-block;
  &:hover {
    background-color: white;
  }
  &:hover ${DropDownContent} {
    display: block;
  }
`;

export const SubA = styled.a`
  color: hsl(207,5%,57%);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: rgb(0, 94, 141);
    color: white;
  }
`;
//------- dropdown menu end-------//