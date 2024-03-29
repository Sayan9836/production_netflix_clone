import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../store";
import { toast } from "react-toastify";
import "./MovieDetail.css";

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    form {
      gap: 2rem;
      .form {
        width: 60%;
        input {
          color: black;
          border: none;
          font-size: 1.2rem;
          border: 1px solid black;
          padding: 1rem 1.2rem;
          &:focus {
            outline: none;
          }
          width: 100%;
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          border-radius: 0.2rem;
          font-weight: bolder;
          font-size: 1.05rem;
          width: 100%;
        }
      }
      button[type="submit"] {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
        text-align: center;
      }
    }
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(initialState);
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.netflix.error);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      navigate("/");
    }
  }, []);

  const FormHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formValues;
      if (!email || !password) {
      } else {
        dispatch(RegisterUser(formValues));
      }

      //     let result = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
      //       method: 'post',
      //       body: JSON.stringify({ email, password }),
      //       headers: {
      //         'content-Type': 'application/json'
      //       }
      //     });
      //     result = await result.json();

      //     if (result) {
      //       localStorage.setItem('user', JSON.stringify(result.result));
      //       navigate("/");
      //     } else {
      //       alert("please enter correct details")
      //     }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="notice">
        <h3>NOTE:--</h3>

        <marquee width="98%" hspace="100px" vspace="100px">
          <p>
            {`This application is Deployed on render and Render spins down a Free web service 
                         that goes 15 minutes without receiving inbound traffic. Render spins the service back up
                         whenever it next receives a request to process. so,it will take 45 sec(approx)  to login/signup if you 
                         are the first user to spin up the service from inactivity. this is the default Behavior 
                         of render for free instance types Be patient!`}
          </p>
        </marquee>
      </div>

      <div className="content">
        <Header login />
        <form
          onSubmit={handleSignIn}
          className="body flex column a-center j-center"
        >
          <div className="headers_signup">
            <h1>Unlimited movies,TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>
          <div className="form">
            <input
              required
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={FormHandler}
            />
            {showPassword && (
              <input
                required
                type="password"
                placeholder="Password"
                value={formValues.password}
                name="password"
                onChange={FormHandler}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
