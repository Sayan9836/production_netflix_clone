import React from 'react'
import styled from 'styled-components'
import Background from '../assests/login.jpg'
const Container=styled.div`
 height:100vh;
 width:100vw;
 img {
    height:100vh;
    width:100%;
 }
`;

const BackgroundImage = () => {
  return (
    <Container>
      <img srcSet={Background} alt="background" />
    </Container>
  )
}

export default BackgroundImage
