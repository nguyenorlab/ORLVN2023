import React, { useEffect, useState, useCallback } from 'react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import { AiOutlinePhone } from 'react-icons/ai';
import vietnam from '../../assets/vietnam-flag-circular-17769.svg';
import japan from '../../assets/japan-flag-circular-17764.svg';
import ImageViewer from "react-simple-image-viewer";
import { useTranslation } from 'react-i18next';
import { getGallery } from '../../api/api';


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
  SocialIcons,
  SocialIconLink,
  NavLogoImgFooter
} from './Footer.elements';
import { logoImg } from '../Navbar/Data';
import styled from 'styled-components';


const StyledP = styled.p`
  color: rgb(140, 146, 151);
  font-size: 18px;
  line-height: 24px;
  text-align: justify;
  hyphens: auto;
  padding-right: 10px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const StyledVNAdd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const StyledImg = styled.img`
  max-width: 25px;
  max-height: 25px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const StyledPhone = styled.div`
  display: flex;
  flex-direction: row;
  & > svg {
    color: rgb(0 94 141);
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
`;

const StyledLocation = styled.div`
  padding-top: 3px;
  & > svg {
    color: rgb(0 94 141);
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
`;

const StyledFlag = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledGalleryContainer = styled.div`
  display: grid;
  grid-template-areas:
    'image1 image2 image3'
    'image4 image5 image6'
    'image7 image8 image9';
  grid-gap: 10px;
`;

const StyledGallery = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;



const Footer = () => {
  const { i18n, t } = useTranslation('Footer');
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [gallery, setGallery] = useState([]);
  let currentYear = new Date().getFullYear();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);


  const getGalleryData = async () => {
    try {
      const data = await getGallery();
      console.log(data);
      setGallery(data);      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    getGalleryData();
  }, []);


  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };


  return (
    <FooterContainer>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>{t('About Us')}</FooterLinkTitle>
              <StyledP>{t('ORLAB Hanoi was established in 2020 as a subsidiary of ORLAB Japan. We look forward to bringing Japanese job opportunities to Vietnamese engineers.')}</StyledP>
            </FooterLinkItems>
          </FooterLinksWrapper>

          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>{t('Contact Us')}</FooterLinkTitle>
              {/* VN */}
              <StyledFlag>
                <StyledImg alt='vn' src={vietnam} />
                <StyledP>Viet Nam</StyledP>
              </StyledFlag>

              <StyledVNAdd>
                <StyledLocation>
                  <HiOutlineLocationMarker />
                </StyledLocation>
                <StyledP>9F - Detech Tower 2 - 107 Nguyen Phong Sac, Dich Vong Hau, Cau Giay, Ha Noi</StyledP>
              </StyledVNAdd>

              <StyledVNAdd>
                <StyledLocation>
                  <HiOutlineMail />
                </StyledLocation>
                <StyledP>contact.vn@orlab.co.jp</StyledP>
              </StyledVNAdd>

              {/* JP */}
              <StyledFlag>
                <StyledImg alt='jp' src={japan} />
                <StyledP>Japan</StyledP>
              </StyledFlag>

              <StyledVNAdd>
                <StyledLocation>
                  <HiOutlineLocationMarker />
                </StyledLocation>
                <StyledP>〒141-0031 東京都品川区西五反田 7-22-17 TOCビル 11F</StyledP>
              </StyledVNAdd>

              <StyledPhone>
                <AiOutlinePhone />
                <StyledP>+81 03-3779-8996</StyledP>
              </StyledPhone>

            </FooterLinkItems>
          </FooterLinksWrapper>

          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>{t('Our Activities')}</FooterLinkTitle>
              <StyledGalleryContainer>
              {
                gallery.map((image, index) => (
                  <div key={`${'image_' + index}`}>
                    {!isViewerOpen ? (
                      <StyledGallery 
                        key={index} 
                        src={image.pathImg} 
                        style={{ gridArea: `image${index + 1}` }}
                        onClick={() => openImageViewer(index)} 
                      />
                    ) : (
                      <ImageViewer
                      src={gallery.map(img => img.pathImg)}
                      currentIndex={currentImage}
                      onClose={closeImageViewer}
                      disableScroll={false}
                      backgroundStyle={{
                        backgroundColor: 'rgba(0,0,0,0.9)'
                      }}
                      closeOnClickOutside={true}
                    />
                    )}                  
                  </div>
                ))
              }              
              </StyledGalleryContainer>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>

        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to='/'>
              <NavLogoImgFooter src={logoImg.img} alt='logo' />
            </SocialLogo>
            <WebsiteRights>ORLVN © {currentYear}</WebsiteRights>
            <SocialIcons>
              <SocialIconLink href='https://www.facebook.com/profile.php?id=100035319918183' target='_blank' aria-label='Facebook'><FaFacebook /></SocialIconLink>
              <SocialIconLink href='/' target='_blank' aria-label='Linkedin'><FaLinkedin /></SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
    </FooterContainer>
  )
}

export default Footer