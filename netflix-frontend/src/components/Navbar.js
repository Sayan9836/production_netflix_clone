import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../assests/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa'
import "../pages/MovieDetail.css";
const Container = styled.div`
 .scrolled{
    background-color:black;
 }
 nav{
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content:space-between;
    position: fixed;
    z-index: 2;
    padding: 0.4rem;
    align-items:center;
    transition: 0.3s ease-in out;
    .left {
        gap:2rem;
        .brand {
            img{
                height:4rem;
            }
        }
        .links {
            list-style:none;
            gap:2rem;
            li {
                a{
                    color: white;
                    text-decoration:none;
                }
            }
        }
    }
    .right{
      position:absolute;
      right:2rem;
      button {
        background-color:transparent;
        border:none;
        cuesor:pointer;
        &:focus {
            outline:none;
        }
        svg {
            color: #f34242;
            font-size: 1.2rem;
        }
      }
 }
`;

const Navbar = ({ isScrolled }) => {
    const [isClick, setIsClick] = useState(false);

    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" },
    ]
    const navigate = useNavigate();

    const HandleLogOut = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <Container>
            <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
                <div className='left flex a-center'>
                    <div className='brand flex a-center'>
                        <img src={logo} alt="logo" />
                    </div>
                    <ul className={isClick ? `flex links active` : `flex links`}>
                        {
                            links.map(({ name, link }) => {
                                return (

                                    <li key={name}><Link to={link}>{name}</Link></li>

                                )
                            })



                        }
                        <button className='logout_mobile' onClick={HandleLogOut}>
                          Logout
                            <div className='iconButton'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                            </div>
                        </button>
                    </ul>
                </div>
                <div className='hamburger click' onClick={() => setIsClick(!isClick)}>
                    {
                        !isClick ? (
                            <i class="fa-solid fa-bars"></i>
                        ) : (
                            <i class="fa-solid fa-xmark"></i>
                        )

                    }

                </div>


                <div className='right flex a-center vanish'>
                    <button onClick={HandleLogOut}>
                        <FaPowerOff title='LogOut' />
                    </button>
                </div>




            </nav>
        </Container>
    )
}

export default Navbar
