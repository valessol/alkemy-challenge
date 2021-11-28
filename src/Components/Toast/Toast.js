import React, { useContext, useEffect } from 'react'
import { Toast as BsToast, ToastBody } from 'react-bootstrap';
import { TeamContext } from '../../Context/TeamContext';


export const Toast = (show) => {

      
    return (
        <div className="toast">
            {/* {
                show && */}
                    <ToastBody>
                        <BsToast.Header>
                            <div>Tu equipo está completo</div>
                        </BsToast.Header>
                    </ToastBody>
            {/* }      */}
        </div>
          
    
    )
}

