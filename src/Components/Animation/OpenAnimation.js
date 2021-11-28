import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap';

const OpenAnimation = ({children}) => {
    const [open, setOpen] = useState(false);

    const handleAnimation = () => {
        setOpen(!open)
    }

    return (
        <>
            <Button
                onClick={handleAnimation}
                aria-controls="boton colapsable"
                aria-expanded={open}
                className="button"
            >
            {
                open
                    ? 'Esconder atributos'
                    : 'Ver atributos'
            }
                
            </Button>
            <Collapse in={open}>
                <div>
                    {children}
                </div>
            </Collapse>
        </>
    )
}

export default OpenAnimation
