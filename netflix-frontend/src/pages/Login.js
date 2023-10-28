import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogInUser } from '../store';
import { toast } from "react-toastify";


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


  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      navigate("/");
    }
  }, [])

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

        toast.error("Email or password both are required")

      } else {

        dispatch(LogInUser(formValues));

      }

    } catch (error) {
      console.log(error, "error from frontend");
    }

  };


  return (
    <Container>
      <BackgroundImage />

      <div className='notice'>

        <h3>NOTE:--</h3>

        <marquee width='98%' hspace='100px' vspace='100px'>

          <p>{`This application is Deployed on render and Render spins down a Free web service 
               that goes 15 minutes without receiving inbound traffic. Render spins the service back up
               whenever it next receives a request to process. so,it may take time to login/signup if you 
               are the first user to spin up the service from inactivity. this is the default Behavior 
               of render for free instance types Be patient!`}
          </p>

        </marquee>

      </div>

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
              <button type='submit'>Log In</button>
            </form>

          </div>
        </div>

      </div>
    </Container>
  )
}

export default Login
