import React from 'react'
import Card from './Card'
import styled from 'styled-components';

export default React.memo(function CardSlider({ data, title }) {


    const Container = styled.div`
   
     width:max-content;
     margin:auto;
     gap:1rem;
     position: relative;
     padding: 2rem 0;

     @media (max-width:55em){
        h1{
            text-align:center;
        }
     }
     @media (max-width:55em){
        left:min(10%,1rem);
     }
     .wrapper {
        .slider{
            position:relative;
            width:100%;
            margin-left:30px;
            gap:1rem;
            border-radius: 6px;
            background: #eee;
            padding: 1rem;
            box-shadow: 0 0 1.5rem #000 inset;

            @media (min-width:85em) {
                background: #000;
                display:grid !important;
                grid-template-columns: repeat(5,1fr);
                gap:2rem;
                right:2rem;
            }
            @media (max-width:84.999em) {
                background: #000;
                display:grid !important;
                grid-template-columns: repeat(4,1fr);
            }

            @media (max-width:69em) {
                background: #000;
                display:grid !important;
                grid-template-columns: repeat(3,1fr);
            }
            @media (max-width: 55em) {
                background: #000;
                display:grid !important;
                grid-template-columns: repeat(2,1fr);
            }
            @media (max-width: 39em) {
                background: #000;
                display:grid !important;
                margin:auto;
                grid-template-columns:repeat(1,1fr)
            }
        }
        .slider-action {
            position:absolute;
            z-index: 99;
            height:100%;
            top:0;
            bottom: 0;
            width: 50px;
            transition: 0.3s ease-in-out;
            svg {
                font-size:2rem;
            }
        }
        .none {
            display:none;
        }
        .left {
            left:0;
        }
        .right{
            right:0;
        }
     }
    `;

    return (
        <Container
            className='flex column'
        >
            <h1>{title}</h1>
            <div className='wrapper'>
                <div className='flex slider '>
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

