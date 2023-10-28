import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserLikedMovies } from '../store';

import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Spinner from '../components/Spinner';

const UserLiked = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movies = useSelector((state) => state.netflix.movies)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setEmail(user.email);
            } else {
                navigate("/login");
            }
        }, 2000);

    }, [])

    useEffect(() => {
        console.log("from user liked", email);
        if (email) {
            dispatch(getUserLikedMovies(email))
        }
    }, [email])

    // if (loading) {

    //     return <Spinner />
    // }

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    const Container = styled.div`
    display : flex;
    flex-direction: column;
    gap: 8rem;
     .content {
        gap: 3rem;
        h1 {
           margin-left: 3rem; 
        }
        .grid {
            display:grid;
            width: 100%;
            gap:1rem;
            border-radius: 6px;
            background: #000;
            box-shadow: 0 0 1.5rem #000 inset;
            padding : 0 1rem 0 0.7rem;
            @media (min-width:85em) {
                grid-template-columns: repeat(5,1fr);
            }
             @media (max-width:84.999em) {
                 grid-template-columns: repeat(4,1fr);
             }
             @media (max-width:69em) {
                 grid-template-columns: repeat(3,1fr);
             }
             @media (max-width: 55em) {
                 grid-template-columns: repeat(2,1fr);
             }
             @media (max-width: 39em) {
                 grid-template-columns: 1fr;
             }
        }
     }
  `;
    return (


        <Container>
            {/* <div className='navbar'> */}
                <Navbar isScrolled={isScrolled} />
            {/* </div> */}
            <div className='content flex column'>
                <h1>My list</h1>

                <div className='grid'>
                    {
                        movies?.map((movie, index) => {
                            return <Card index={index} movieData={movie} key={movie.id} isLiked={true} />
                        })
                    }
                </div>

            </div>
        </Container>

    )
}



export default UserLiked
