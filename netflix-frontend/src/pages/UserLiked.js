import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import { getGenres, getMovies, getUserLikedMovies } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';
import Card from '../components/Card';
import Spinner from '../components/Spinner';

const UserLiked = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies)



    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setEmail(user.email);
            }else{
                navigate("/login");
            }
        }, 2000);

    }, [])

    useEffect(() => {
        console.log("from user liked",email);
        if (email) {
            dispatch(getUserLikedMovies(email))
        }
    }, [email])

    if (loading) {

        return <Spinner />
    }

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    const Container = styled.div`
     .content {
        margin: 2.3rem;
        margin-top: 8rem;
        gap: 3rem;
        h1 {
           margin-left: 3rem; 
        }
        .grid {
            flex-wrap:wrap;
            gap:1rem;
        }
     }
  `;
    return (


        <Container>
            <div className='navbar'>
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className='content flex column'>
                <h1>My list</h1>
                {
                    <div className='grid flex'>
                        {
                            movies?.map((movie, index) => {
                                return <Card index={index} movieData={movie} key={movie.id} isLiked={true} />
                            })
                        }
                    </div>
                }
            </div>
        </Container>

    )
}

export default UserLiked
