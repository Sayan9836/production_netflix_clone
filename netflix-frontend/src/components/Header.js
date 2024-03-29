import React from 'react'
import styled from 'styled-components'
import logo from '../assests/logo.png'
import { useNavigate } from 'react-router-dom'
const Container = styled.div`
 .logo {
    img {
        height:5rem;
    }
 }
 button {
    padding: 0.5rem 1rem;
    background-color:#e50914;
    border:none;
    cursor:pointer;
    color:white;
    border-radius:0.2rem;
    font-weight:bolder;
    font-size:1.05rem;
 }
`;
const Header = (props) => {
  const navigate = useNavigate();
  return (
    <Container className='header_container'>
      <div className='logo'>
        <img srcSet={logo} alt="logo" />
      </div>
      <button onClick={() => {
        props.login ?
          navigate("/login")
          :
          navigate("/signup")
      }}>
        {props.login ? "Log In" : "Sign In"}
      </button>
    </Container>
  )
}

export default Header
