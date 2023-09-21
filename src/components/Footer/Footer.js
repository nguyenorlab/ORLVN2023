import React from 'react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

import { 
  FooterContainer,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcon,
  SocialIcons,
  SocialIconLink,
  NavLogoImgFooter
} from './Footer.elements';
import { logoImg } from '../Navbar/Data';


const Footer = () => {
  return (
    <FooterContainer>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
            </FooterLinkItems>

            <FooterLinkItems>
              <FooterLinkTitle>Contact Us</FooterLinkTitle>
              <FooterLinkTitle>Viet Nam</FooterLinkTitle>
              <FooterLinkTitle>Japan</FooterLinkTitle>
            </FooterLinkItems>
          </FooterLinksWrapper>

          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>Gallery</FooterLinkTitle>
              <FooterLinkTitle>display 9 images</FooterLinkTitle>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>

        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to='/'>
              <SocialIcon />
                <NavLogoImgFooter src={logoImg.img} alt='logo' />
            </SocialLogo>
            <WebsiteRights>ORLVN © 2023</WebsiteRights>
            <SocialIcons>
              <SocialIconLink href='/' target='_blank' aria-label='Facebook'><FaFacebook /></SocialIconLink>
              <SocialIconLink href='/' target='_blank' aria-label='Linkedin'><FaLinkedin /></SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
    </FooterContainer>
  )
}

export default Footer