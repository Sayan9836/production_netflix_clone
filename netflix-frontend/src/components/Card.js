import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbDownFill, RiThumbUpLine } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { GiArmoredBoomerang } from "react-icons/gi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFromLikedMovies } from "../store";
import { toast } from "react-toastify";
const Container = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    position: absolute;
    z-index: 200;
    height: max-content;
    width: 100%;
    top: -18vh;
    left: 0;
    right: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding: 0.7rem;
          list-style: none;
        }
      }
    }
  }

  @media (max-width: 40em) {
    width: 80vw;
    margin-inline: auto;
  }
`;

export default React.memo(function Card({ movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(movieData);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setEmail(user.email);
    }
  }, [email]);

  const addToList = async () => {
    toast.success("Item Added successfully");
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/add`,
        {
          email,
          data: movieData,
        },
        {
          headers: {
            "content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        },
      );
    } catch (error) {
      console.log({ msg: "frontend-error in adding to List" });
    }
  };

  const handleDelete = (id) => {
    dispatch(removeFromLikedMovies({ email, movieId: id }));
    isLiked = false;
  };

  const HandleLikeMovie = async (id) => {};

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
        loading="lazy"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="indivitual-card"
            />
            <p>{process.env.REACT_APP_LIKE_URL}</p>
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp title="play" />
                <RiThumbUpLine
                  title="Like"
                  onClick={() => HandleLikeMovie(movieData.id)}
                />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove From List"
                    onClick={() => handleDelete(movieData.id)}
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <Link to={`/detail/${movieData.media_type}/${movieData.id}`}>
                  <GiArmoredBoomerang title="More info" />
                </Link>
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});
