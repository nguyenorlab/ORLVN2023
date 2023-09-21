import React from 'react';
import { galleryObj } from './Data';
import { InfoSection } from '../../components';


// https://nazifbara.com/blog/how-to-make-a-slideshow-gallery-with-reactjs-and-styled-components


const Gallery = () => {
  return (
    <>
        <InfoSection {...galleryObj} />
    </>
  )
}

export default Gallery