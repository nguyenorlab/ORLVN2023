import styled from "styled-components";
import { Link } from 'react-router-dom';
// import { FaMagento } from "react-icons/fa";


export const FooterContainer = styled.div`
    background-color: hsla(0,0%,99.6%,1.000);
    box-shadow: rgb(11 140 234 / 10%) -20px -2px 20px 20px;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 991px) {
        padding-top: 15px;
    }
`;


export const FooterSubscription = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 24px;
    padding: 24px;
    color: #fff;
`;

export const FooterSubHeading = styled.p`
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', sans-serif;
    margin-bottom: 24px;
    font-size: 24px;
`;

export const FooterSubText = styled.p`
    margin-bottom: 24px;
    font-size: 20px;
`;


export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 820px) {
        flex-direction: column;
        width: 80%;
    }
`;


export const FormInput = styled.input`
    padding: 10px 20px;
    border-radius: 2px;
    margin-right: 10px;
    outline: none;
    border: none;
    font-size: 16px;
    border: 1px solid #fff;

    &::placeholder {
        color: #242424;
    }

    @media screen and (max-width: 820px) {
        width: 100%;
        margin: 0 0 16px 0;
    }
`;


export const FooterLinksContainer = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    /* padding-right: 28px; */
    /* padding-left: 28px; */
    padding-right: 30px;
    padding-left: 30px;
    /* original */
    display: flex;
    justify-content: center;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
        column-gap: 10px;
    }

    @media screen and (max-width: 820px) {
        padding-top: 32px;
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        & > div {
            width: 100%;
            margin-bottom: 20px;
        }
    }
`;

export const FooterLinksWrapper = styled.div`
    width: 33%;
    display: flex;
   
    @media screen and (max-width: 820px) {
        flex-direction: column;
    }
`;

export const FooterLinkItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* margin: 16px; */
    text-align: left;
    /* width: 160px; */
    width: 100%;
    box-sizing: border-box;
    color: #fff;

    @media screen and (max-width: 420px) {
        margin: 0;
        /* padding: 10px; */
        width: 100%;
    }
`;

export const FooterLinkTitle = styled.h2`
    margin-bottom: 16px;
    /* color: hsl(207,5%,57%); */
    color: rgb(0 94 141);
    font-weight: 500;
    font-size: 23px;
`;

export const FooterLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    margin-bottom: 0.5rem;

    &:hover {
        color: #0467fb;
        transition: 0.3s ease-out;
    }
`;


export const SocialMedia = styled.section`
    max-width: 1300px;
    width: 100%;
`;

export const SocialMediaWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1300px;
    margin: 40px auto 20px auto;
    padding-right: 30px;
    padding-left: 30px;

    @media screen and (max-width: 820px) {
        flex-direction: row;
    }
`;

export const SocialLogo = styled(Link)`
    color: #fff;
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

export const SocialIcon = styled.div`
    /* margin-right: 10px; */
`;

export const WebsiteRights = styled.small`
    /* color: #fff; */
    color: hsl(207,5%,57%);
    font-size: 16px;
    /* margin-bottom: 16px; */
`;

export const SocialIcons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* width: 240px; */
`;

export const SocialIconLink = styled.a`
    /* color: #fff; */
    /* color: hsl(207,5%,57%); */
    color: rgb(0 94 141);
    font-size: 24px;
    padding: 0px 5px 0px 5px;
`;

export const NavLogoImgFooter = styled.img`
    height: 60px;
    width: 60px;
    margin-bottom: -10px;
    border-radius: 5px;
`;