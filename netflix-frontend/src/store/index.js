import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";


const initialState = {

    movies: [],
    generesLoaded: false,
    genres: [],
    user:null,
    token:"",
    error:false,
};

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach(movie => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) {
                movieGenres.push(name.name)
            }
        });
        if (movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
                media_type: movie.media_type,
            })
        }
    });
    return moviesArray;
}

const getRawData = async (api, genres, pagging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const { data: { results } } = await axios.get(`${api}${pagging ? `&page=${i}` : ""}`)
        createArrayFromRawData(results, moviesArray, genres);

    }
    return moviesArray;    
}

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const { data: { genres } } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    return genres;
})

export const getMovies = createAsyncThunk("netflix/trending", async ({ type }, thunkApi) => {
    const { netflix: { genres } } = thunkApi.getState();
    return getRawData(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
        genres,
        true
    )

})

export const fetchDataByGenre = createAsyncThunk("netflix/moviesByGenres", async ({ genre, type }, thunkApi) => {
    const { netflix: { genres } } = thunkApi.getState();
    return getRawData(
        `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
        genres
    )

})


const BaseUrl=process.env.REACT_APP_BASE_URL

export const RegisterUser = createAsyncThunk("netflix/register", async (formValues) => {
    const data = await axios.post(`${BaseUrl}/register`,{
        ...formValues
    },{
        headers: {
            "Content-Type":"application/json",
        }
    })
    
    if (data) {
        return data;
    }
})

export const LogInUser = createAsyncThunk("netflix/login", async (formValues) => {
    const data = await axios.post(`${BaseUrl}/login`,{
        ...formValues
    },{
        headers: {
            "Content-Type":"application/json",
        }
    })

    return data;
})

export const getUserLikedMovies = createAsyncThunk("netflix/getLiked", async (email) => {
    const { data: { movies } } = await axios.get(`${BaseUrl}/liked/${email}`,{
        headers:{
             authorization: JSON.parse(localStorage.getItem('token'))
        },
    });
    return movies;
})


export const removeFromLikedMovies = createAsyncThunk("netflix/removeLiked", async ({ email, movieId }) => {
    const { data: { movies } } = await axios.put(`${BaseUrl}/remove`, {
        email, movieId
    },{
        headers:{
            'content-Type':'application/json',
             authorization: JSON.parse(localStorage.getItem('token'))
          },
    });
    return movies;
})


const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload
            state.generesLoaded = true;
        });
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.movies = action.payload
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload
        });
        builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload
        });
        builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload
        });
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.user=action.payload.data.new_user
            state.token = action.payload.data.token 
            localStorage.setItem('user',JSON.stringify(state.user)); 
            localStorage.setItem('token',JSON.stringify(state.token)); 
            window.location.href = '/';
        });
        builder.addCase(RegisterUser.rejected,(state,action) => {
            state.error=true;
            toast.error('Email is already in use ,Please Login')
            state.error = false;
        });
        builder.addCase(LogInUser.fulfilled,(state,action)=>{
            state.user = action.payload.data.user
            state.token = action.payload.data.token 
            localStorage.setItem('user',JSON.stringify(state.user)); 
            localStorage.setItem('token',JSON.stringify(state.token)); 
            window.location.href = '/';
        });
        builder.addCase(LogInUser.rejected,(state,action) => {
            state.error = true;
            toast.error('Email or Password is incorrect');
            state.error = false;            
        });

    },
});



export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },


})

                  

