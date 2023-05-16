
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGenres, getMovies } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';

const TVShows = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netflix.movies)
  const generesLoaded = useSelector((state) => state.netflix.generesLoaded);
  const genres = useSelector((state) => state.netflix.genres);



  useEffect(() => {
    const user=localStorage.getItem('user');
    if (!user) {
      navigate("/login")
    }
    dispatch(getGenres())
  }, [])

  useEffect(() => {
    if (generesLoaded) {
      dispatch(getMovies({ type: "tv" }));
    }
  }, [generesLoaded])

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  onAuthStateChanged(auth,(Cuser)=>{
    // if (Cuser) {
    //   navigate('/')
    // }
  })
  const Container= styled.div`
   .data {
    margin-top:8rem;
    .not-available {
      text-align:center;
      color:white;
      margin-top: 4rem;
    }
   }
  `;
  return (
    <Container>
      <div className='navbar'>
      <Navbar isScrolled={isScrolled} />
      </div>
      <div className='data'>
      <SelectGenre genres={genres} type="tv"/>
        {
          movies.length>0? <Slider movies={movies} isTvSeries/>:  <NotAvailable/>
        }
      </div>
    </Container>
  )
}

export default TVShows
