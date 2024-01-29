import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsFillArrowUpSquareFill } from "react-icons/bs";

const ScrollButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  opacity: 0;
  transition: opacity 0.4s;
  cursor: pointer;

  &.visible {
    opacity: 1;
  }
`;

const StyledTopArrow = styled(BsFillArrowUpSquareFill)`
  color: rgb(0 94 141);
  width: 30px;
  height: 30px;
`;


const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <ScrollButtonContainer className={isVisible ? 'visible' : ''} onClick={scrollToTop}>
      <StyledTopArrow />
    </ScrollButtonContainer>
  );
};


export default ScrollToTop;
