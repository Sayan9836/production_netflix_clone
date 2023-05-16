import React from 'react'
import CardSlider from './CardSlider'

const Slider = ({movies,isTvSeries}) => {
    const getMoviesFromRange=(from,to)=>{
        return movies?.slice(from,to);
    }
    console.log(movies);

  return (
    <div>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)}/>
      <CardSlider title="New Releases" data={getMoviesFromRange(10,20)}/>
      <CardSlider title={isTvSeries? `BlockBuster Tv Series` : `BlockBuster Movies`} data={getMoviesFromRange(20,30)}/>
      <CardSlider title={isTvSeries?`Action Tv Series`:`Action Movies`} data={getMoviesFromRange(30,40)}/>
      <CardSlider title="Popular on Netflix" data={getMoviesFromRange(40,50)}/>
      <CardSlider title="Epics" data={getMoviesFromRange(50,60)}/>
    </div>
  )
}

export default Slider
