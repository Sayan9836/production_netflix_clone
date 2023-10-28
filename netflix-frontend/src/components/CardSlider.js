import React from 'react'
import Card from './Card'
import styled from 'styled-components';

export default React.memo(function CardSlider({ data, title }) {


    const Container = styled.div`
     width:100%;
     gap:1rem;
     position: relative;
     padding: 2rem 0.7rem;
     @media (max-width:55em){
        h1{
            text-align:center;
        }
     }
     .wrapper {
        .slider{
            display:grid;
            width: 100%;
            gap:1rem;
            border-radius: 6px;
            background: #000;
            box-shadow: 0 0 1.5rem #000 inset;

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
        <Container
            className='flex column'
        >
            <h1>{title}</h1>
            <div className='wrapper'>
                <div className=' slider '>
                    {
                        data?.map((movie, index) => {
                            return <Card movieData={movie} index={index} key={movie.id} />
                        })
                    }
                </div>

            </div>
        </Container>
    )
});

