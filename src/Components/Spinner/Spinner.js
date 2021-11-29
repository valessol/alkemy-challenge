import React from 'react'
import Lottie from 'react-lottie'
import spinner from './spinner.json'

const Spinner = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: spinner
    }

    return (
        <div className="container" style={{height: '80vh'}}>
            <div style={{width: '10rem', margin: '10rem auto'}} className="d-flex justify-content-center align-items-center">

            <span className="visually-hidden">Cargando...</span>
                
            <Lottie options={defaultOptions} />

            </div>
        </div>
    )
}

export default Spinner
