import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const IndicatorWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  bottom: 15px;
  right: 15px;
  justify-content: center;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: white;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  margin: 5px;
  transition: 750ms all ease-in-out;
  position: relative;
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  position: relative;
`;

const Slide = styled.div`
  height: 100%;
  width: 100vw;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
  transition: 750ms all ease-in-out;
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Gradient = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Indicator = ({ currentSlide, amountSlides, nextSlide }) => {
  return (
    <IndicatorWrapper>
      {Array(amountSlides)
        .fill(1)
        .map((_, i) => (
          <Dot
            key={i}
            isActive={currentSlide === i}
            onClick={() => nextSlide(i)}
          />
        ))}
    </IndicatorWrapper>
  );
};



const ImageSlider = ({ images = [], text = [], autoPlay = true, autoPlayTime = 5000, children, ...props }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback((slideIndex = currentSlide + 1) => {
      const newSlideIndex = slideIndex >= images.length ? 0 : slideIndex;
      setCurrentSlide(newSlideIndex);
    },[currentSlide, images.length]);

    useEffect(() => {
      const timer = setTimeout(() => {
        nextSlide();
      }, autoPlayTime);
      return () => clearTimeout(timer);
    }, [autoPlayTime, currentSlide, nextSlide]);

    return (
      <Wrapper {...props}>
        {images.map((imageUrl, index) => (
          <Slide
            key={index}
            style={{
              backgroundImage: `url(${imageUrl})`,
              marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined,
            }}
          >
          </Slide>
        ))}
        <Gradient />
        <Indicator
          currentSlide={currentSlide}
          amountSlides={images.length}
          nextSlide={nextSlide}
        />
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Wrapper>
    );
};

export default ImageSlider;