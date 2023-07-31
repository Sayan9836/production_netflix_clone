import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogInUser } from '../store';


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
          width: max(20rem,25vw);
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
  const isError = useSelector((state)=>state.netflix.error);
  
  useEffect(()=>{
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
        navigate("/");
    }
},[])

  const FormHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }


  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formValues;
      if (!email || !password) {
      }else{
        dispatch(LogInUser(formValues));
      }
    //   let result = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
    //     method: 'post',
    //     body: JSON.stringify({ email, password }),
    //     headers: {
    //       'content-Type': 'application/json'
    //     }
    //   });
    //   result = await result.json();
    //   console.log(result);

    //   if (result) {
    //     localStorage.setItem('user', JSON.stringify(result.user));
    //     navigate("/");
    //   } else {
    //     alert("please enter correct details")
    //   }

    } catch (error) {
      console.log(error, "error from frontend");
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
              <form onSubmit={handleLogIn} className='container flex column'>
                <input required type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={FormHandler} />
                <input required type='password' placeholder='Password' value={formValues.password} name='password' onChange={FormHandler} />
                {isError && <span style={{color:"red", fontSize:"15px"}}>Email or Password is invalid</span>}
                <button type='submit'>Log In</button>
              </form>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Login
