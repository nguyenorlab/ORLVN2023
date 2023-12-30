import React, { useState, useEffect/*, useCallback*/ } from 'react';
import { 
  Nav, 
  NavbarContainer, 
  NavLogo, 
  NavIcon, 
  MobileIcon, 
  NavMenu, 
  NavItem, 
  NavLinks, 
  NavItemBtn, 
  NavBtnLink,
  NavLogoImg,
  StyledFlag, FlagContainer 
  } from './Navbar.elements';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import { logoImg } from './Data';
import { useTranslation } from 'react-i18next';
import vnflag from '../../assets/vnflag.svg';
import jpflag from '../../assets/jpflag.svg';
import ukflag from '../../assets/ukflag.svg';


const Navbar = () => {
  const { i18n, t } = useTranslation('Nav');
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false); 

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton();
  },[]);

  window.addEventListener('resize', showButton);


  return (
    <>
      <IconContext.Provider value={{ color: '#fff'}}>
        <Nav>
            <NavbarContainer>
                <NavLogo to='/' onClick={closeMobileMenu}>
                  <NavIcon>
                    <NavLogoImg src={logoImg.img} alt='logo'/>
                  </NavIcon>                  
                </NavLogo>

                <MobileIcon onClick={handleClick}>
                  {click ? <FaTimes /> : <FaBars />}
                </MobileIcon>

                <NavMenu onClick={handleClick} click={click}>
                  <NavItem>
                    <NavLinks to='/' onClick={closeMobileMenu}>{t('Home')}</NavLinks>
                  </NavItem>

                  <NavItem>
                    <NavLinks to='/about' onClick={closeMobileMenu}>{t('About')}</NavLinks>
                  </NavItem>
                
                  <NavItem>                    
                    <NavLinks to='/services' onClick={closeMobileMenu}>{t('Services')}</NavLinks>                    
                  </NavItem>                  

                  <NavItem>
                    <NavLinks to='/news' onClick={closeMobileMenu}>{t('News')}</NavLinks>
                  </NavItem>                  

                  <NavItemBtn>
                    {button ? (
                      <NavBtnLink to='/recruitment'>
                        <Button primay>{t('Recruitment')}</Button>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink to='/recruitment' onClick={closeMobileMenu}>
                        <Button fontBig primary>
                          {t('Recruitment')}
                        </Button>
                      </NavBtnLink>
                    )}
                  </NavItemBtn>

                  <NavItem hover>
                    <FlagContainer>
                      <StyledFlag src={vnflag} onClick={() => changeLanguage('vi')} />
                      <StyledFlag src={jpflag} onClick={() => changeLanguage('jp')} />
                      <StyledFlag src={ukflag} onClick={() => changeLanguage('en')} />
                    </FlagContainer>
                  </NavItem>
                </NavMenu>

            </NavbarContainer>
        </Nav>  
      </IconContext.Provider>  
    </>
  )
}

export default Navbar