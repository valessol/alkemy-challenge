import React from 'react'
import Lottie from 'react-lottie'
import { Link } from 'react-router-dom'
import hero from './hero.json'
import { Button } from 'react-bootstrap'

const ErrorPage = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: hero
    }

    return (
        <div className="container">
            <div className="error">

                <h2 className='text-center my-4'>Lo sentimos... ha ocurrido un error inesperado</h2>

                <Link to="/" >
                    <Button 
                        className='button my-4'
                    >
                            Volver al inicio
                    </Button>
                </Link>
                
                <Lottie options={defaultOptions} />
            </div>
        </div>
    )
}

export default ErrorPage
