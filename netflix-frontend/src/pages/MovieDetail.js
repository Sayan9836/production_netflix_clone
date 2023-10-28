import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MovieDetail.css";
import { API_KEY} from "../utils/constant";
import axios from "axios";

const MovieDetail = () => {
  const navigate=useNavigate();
  const { type, id } = useParams();
  const [currentMovieDetail, setCurrentMovieDetail] = useState([]);


  const fetchMovieDetail = async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`
    );
    setCurrentMovieDetail(data);
   console.log(data.production_companies);
  };
  useEffect(()=>{
    const user=localStorage.getItem('user');
    if (!user) {
      navigate("/login")
    }
  },[])
                                           
  useEffect(() => {
    fetchMovieDetail(id);
  }, [id]);
                                           
  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : "https://image.tmdb.org/t/p/original/xmFmlYj7tmUrkI3lztP6Zxh3u9G.jpg"
            }`}
          alt="WASD"
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : "https://image.tmdb.org/t/p/original/tjLKe0QCGgSrvEd41Z4q2QpSoJF.jpg"
                }`}
              alt="KK"
            />
          </div>
        </div>
        <div className="movie_detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i class="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail &&
                currentMovieDetail.genres &&
                currentMovieDetail.genres.map((genre) => (
                  <>
                    <span className="movie__genre" id={genre.id}>
                      {genre.name}
                    </span>
                  </>
                ))}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        <div className="buttons_links">
        {currentMovieDetail && currentMovieDetail.homepage && (
          <a
            href={currentMovieDetail.homepage}
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        </div>
      </div>
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail &&
          currentMovieDetail.production_companies &&
          currentMovieDetail.production_companies.map((company) => (
            
            <>
            
              {company.logo_path ? (
                <span className="productionCompanyImage">
                  <img
                    className="movie__productionComapany"
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                    alt="production_image"
                  />
                  <span>{company.name}</span>
                </span>
                
              ) : (
                <span className="productionCompanyImage">
                <img
                  className="movie__productionComapany"
                  src={
                    "https://image.tmdb.org/t/p/original" + "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png"
                  }
                  alt="marvel"
                />
                <span>{'Frankestein Production House'}</span>
              </span>
              )
            }
            </>
            
          ))}
      </div>
    </div>
  );
};

export default MovieDetail;
