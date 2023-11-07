import React, { useState, useEffect, useCallback } from 'react';
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
  SubA,
  DropDownLi,
  StyledUl} from './Navbar.elements';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import { logoImg } from './Data';


const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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

  const [hoverServices, setHoverService] = useState(false);

  const onMouseHover = useCallback(() => {
    setHoverService(true);
  },[]);

  const onMouseLeave = useCallback(() => {
    const timer = setTimeout(() => {
      setHoverService(false);      
    }, 3000);
    return () => clearTimeout(timer);
  },[]);


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
                    <NavLinks to='/' onClick={closeMobileMenu}>Home</NavLinks>
                  </NavItem>

                  <NavItem>
                    <NavLinks to='/about' onClick={closeMobileMenu}>About</NavLinks>
                  </NavItem>
                
                  <NavItem onMouseEnter={onMouseHover} onMouseLeave={onMouseLeave}>                    
                    <NavLinks to='/services' onClick={closeMobileMenu}>Services</NavLinks>
                    {hoverServices && (
                      <StyledUl>
                        <DropDownLi>
                          <SubA href='/'>Software Outsourcing</SubA>
                          <SubA href='/'>Software Development</SubA>
                          <SubA href='/recruitment'>Recruitment</SubA> 
                        </DropDownLi>
                      </StyledUl>
                    )}
                  </NavItem>

                  <NavItem>
                    <NavLinks to='/news' onClick={closeMobileMenu}>News</NavLinks>
                  </NavItem>

                  <NavItem>
                    <NavLinks to='/gallery' onClick={closeMobileMenu}>Gallery</NavLinks>
                  </NavItem>

                  <NavItemBtn>
                    {button ? (
                      <NavBtnLink to='/recruitment'>
                        <Button primay>Recruitment</Button>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink to='/recruitment' onClick={closeMobileMenu}>
                        <Button fontBig primary>
                          Recruitment
                        </Button>
                      </NavBtnLink>
                    )}
                  </NavItemBtn>
                </NavMenu>

            </NavbarContainer>
        </Nav>  
      </IconContext.Provider>  
    </>
  )
}

export default Navbar