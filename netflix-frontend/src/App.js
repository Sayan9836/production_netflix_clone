import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Netflix from './pages/Netflix';
import Player from './pages/Player';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import UserLiked from './pages/UserLiked';
import MovieDetail from './pages/MovieDetail';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
        <ToastContainer position='top-center' />
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/tv' element={<TVShows/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/player' element={<Player/>}/>
        <Route path='/mylist' element={<UserLiked/>}/>
        <Route path='detail/:type/:id' element={<MovieDetail/>}/>
        <Route path='/' element={<Netflix/>}/>
      </Routes> 
    </div>
  );
}

export default App;
