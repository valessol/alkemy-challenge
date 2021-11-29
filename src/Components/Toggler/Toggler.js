import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap';

const Toggler = ({children, labeltrue, labelfalse}) => {
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
                    ? labeltrue
                    : labelfalse
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

export default Toggler
