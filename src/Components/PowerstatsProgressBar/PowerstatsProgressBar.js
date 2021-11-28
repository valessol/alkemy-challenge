import React, { useEffect } from 'react'
import {ProgressBar} from 'react-bootstrap';

const PowerstatsProgressBar = ({ intelligence, strength, speed, durability, power, combat }) => {
   

    const handleLevelColor = (level) => {
        let levelColor;
        if (level >= 75) levelColor = 'success';
        if (50 <= level && level < 75 ) levelColor = 'info';
        if (25 <= level && level < 50 ) levelColor = 'warning';
        if (0 <= level && level < 25) levelColor = 'danger';

        return levelColor;
    }
    
    return (
        <div className='progressBarContainer'>
            <div>
                <label className='progressLabel'>Inteligencia: {intelligence !== 'null' ? `${intelligence}%` : 'Sin datos'}</label>

                

                    <ProgressBar 
                        now={intelligence !== 'null' ? intelligence : 0}
                        variant={handleLevelColor(intelligence)}
                        striped
                        animated
                        className='progressBar'
                    />
                   
            </div>

            <div>
            <div>
                <label className='progressLabel'>Fuerza: {strength !== 'null' ? `${strength}%` : 'Sin datos'}</label>
                
                <ProgressBar 
                    now={strength !== 'null' ? strength : 0}
                    variant={handleLevelColor(strength)}
                    striped
                    animated
                    className='progressBar'
                />
            </div>
                <label className='progressLabel'>Velocidad: {speed !== 'null' ? `${speed}%` : 'Sin datos'}</label>
               
                <ProgressBar 
                    now={speed !== 'null' ? speed : 0}
                    variant={handleLevelColor(speed)}
                    striped
                    animated
                    className='progressBar'
                />
            </div>
            <div>
                <label className='progressLabel'>Durabilidad: {durability !== 'null' ? `${durability}%` : 'Sin datos'}</label>
               
                <ProgressBar 
                    now={durability !== 'null' ? durability : 0}
                    variant={handleLevelColor(durability)}
                    striped
                    animated
                    className='progressBar'
                />
            </div>
            <div>
                <label className='progressLabel'>poder: {power !== 'null' ? `${power}%` : 'Sin datos'}</label>
                
                <ProgressBar 
                    now={power !== 'null' ? power : 0}
                    variant={handleLevelColor(power)}
                    striped
                    animated
                    className='progressBar'
                />
            </div>
            <div>
                <label className='progressLabel'>Combate: {combat !== 'null' ? `${combat}%` : 'Sin datos'}</label>
                
                <ProgressBar 
                    now={combat !== 'null' ? combat : 0}
                    variant={handleLevelColor(combat)}
                    striped
                    animated
                    className='progressBar'
                />
            </div>
        </div>
    )
}

export default PowerstatsProgressBar
