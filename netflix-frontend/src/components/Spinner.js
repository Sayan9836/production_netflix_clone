import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'
const Spinner = () => {
    return (
        <>
            <ThreeCircles
                height="100"
                width="100"
                color="#4fa94d"
                wrapperStyle={{ margin: '20% 40% 0 48%'}}       
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </>
    )
}

export default Spinner
