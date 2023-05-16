import React from 'react'
import styled from 'styled-components'
import {BsArrowLeft} from "react-icons/bs"
import video  from '../assests/video.mp4'
const Container=styled.div`
 .player {
  width:100vw;
  height:100vh;
  .back{
    position:absolute;
    padding:2rem;
    z-index:1;
    svg {
      font-size: 3rem;
      cursor:pointer;

    }
  }
  video {
    height:100%;
    width:100%;
    object-fit:cover;
  }

 }
`;


const Player = () => {
  return (
    <Container>
      <div className='player'>
        <div className='back'>
            <BsArrowLeft/>
        </div>
        <video src={video} autoPlay loop controls muted ></video>
      </div>
    </Container>
  )
}

export default Player
