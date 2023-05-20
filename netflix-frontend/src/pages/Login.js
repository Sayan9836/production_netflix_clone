import React, { useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Container = styled.div`
  position:relative;
  .content {
    position:absolute;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.5);
    height:100vh;
    width:100vw;
    display:grid;
    grid-template-rows:15vh 85vh;
    .form-container {
      gap:2rem
      height:85vh;
      .form{
          padding: 2rem;
          background-color:#000000b0;
          width: 25vw;
          gap: 2rem;
          color: white;
          .container {
            gap: 2rem;
            input{
              padding: 0.5rem 1rem;
              width: 15rem;
              &:focus{
                outline:none;
              }
            }
            button {
              padding: 0.5rem 1rem;
              background-color:#e50914;
              border:none;
              cursor:pointer;
              color:white;
              border-radius: 0.2rem;
              font-weight: bolder;
              font-size:1.05rem;
            }
          }
        }
      }
    }
  }
`;


const Login = () => {

  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  }
  const [formValues, setFormValues] = useState(initialState);
  const dispatch = useDispatch();

  const FormHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogIn = async (e) => {
    try {
      const { email, password } = formValues;

      let result = await fetch('https://neflix-backend.onrender.com/api/user/login', {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
          'content-Type': 'application/json'
        }
      });
      result = await result.json();
      console.log(result);
      if (!result) {
        navigate("/");
      }

      if (result) {
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate("/");
      } else {
        alert("please enter correct details")
      }

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Container>
      <BackgroundImage />
      <div className='content'>
        <Header />
        <div className='form-container flex column a-center j-center'>
          <div className='form flex column a-center j-center'>
            <div className='title'>
              <h3>Login</h3>
            </div>
            <div className='container flex column'>
              <input type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={FormHandler} />
              <input type='password' placeholder='Password' value={formValues.password} name='password' onChange={FormHandler} />
              <button onClick={handleLogIn}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Login
