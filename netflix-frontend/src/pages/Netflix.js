import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import backgroundImg from '../assests/home.jpg';
import MovieLogo from "../assests/homeTitle.webp";
import { FaPlay } from "react-icons/fa"
import { AiOutlineCiCircle } from "react-icons/ai"
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getMovies } from '../store';
import Slider from '../components/Slider';
import "./MovieDetail.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [popularMovies,setpopularMovies]=useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netflix.movies)
  const generesLoaded = useSelector((state) => state.netflix.generesLoaded);



  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate("/login");
    }
    dispatch(getGenres())
  }, [])

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
        .then(res => res.json())
        .then(data => setpopularMovies(data.results))
}, [])

  useEffect(() => {
    if (generesLoaded) {
      dispatch(getMovies({ type: "all" }));
    }
  }, [generesLoaded])

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  const Container = styled.div`
   background-color:black;
   .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container{
      position:absolute;
      bottom: 5rem;
      .logo{
        img{
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border:none;
          cursor: pointer;
          &:hover{
            opacity:0.8;
          }
          &:nth-of-type(2) {
            background-color:rgba(109,109,110,0.7);
            color: white;
            svg {
              font-size: 1.8rem

            }   
          }
        }
      }      
    }       
   }        
  `;
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="poster">

        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}

        >
          {
            popularMovies.map((movie) => (
              <div style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`}>
                <div className="posterImage">
                  <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt="abc" />
                </div>
                <div className="posterImage__overlay">
                  <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                  <div className="posterImage__runtime">
                    {movie ? movie.release_date : ""}
                    <span className="posterImage__rating">
                      {movie ? movie.vote_average : ""}
                      <i className="fa-solid fa-star" />{" "}
                    </span>
                  </div>
                  <div className="posterImage__description">{movie ? movie.overview.slice(0,200) : ""}</div>
                </div>
              </div>
            ))
          }
        </Carousel>

      </div>

      <Slider movies={movies} />

    </Container>
  )
}

export default Netflix
