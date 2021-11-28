import React, { useContext, useState } from 'react'
import { Card as BsCard, Button, Badge, ToastBody } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { TeamContext } from '../../Context/TeamContext';
import OpenAnimation from '../Animation/OpenAnimation';
import PowerstatsProgressBar from '../PowerstatsProgressBar/PowerstatsProgressBar';
import { Toast } from '../Toast/Toast';


const Card = ({ id, name, powerstats, image, biography, appearance }) => {
    const { addToTeam, removeFromTeam, isOnTeam, complete } = useContext(TeamContext);
    const [ toast, setToast ] = useState(false)
    const { alignment } = biography;
   

    const item = {
        id: id,
            name: name !== 'null' ? name : 'Desconocido', 
            powerstats: {
                intelligence: (powerstats.intelligence !== 'null' ? Number(powerstats.intelligence) : 0 ),
                strength: (powerstats.strength !== 'null' ? Number(powerstats.strength) : 0 ),
                speed: (powerstats.speed !== 'null' ? Number(powerstats.speed) : 0 ),
                durability: (powerstats.durability !== 'null' ? Number(powerstats.durability) : 0 ),
                power: (powerstats.power !== 'null' ? Number(powerstats.power) : 0 ),
                combat: (powerstats.combat !== 'null' ? Number(powerstats.combat) : 0 )
            },
            image: image, 
            height: appearance.height,
            weight: appearance.weight,
            alignment: biography.alignment === '-' ? 'neutral' : biography.alignment
    }

    const colorBadge = () => {
        let colorName;
        switch (alignment) {
            case 'good': 
                colorName = 'success';
                break;
            case 'neutral': 
                colorName = 'info';
                break;
            case 'bad': 
                colorName = 'danger';
                break;
            default: 
                break;
        }
        return colorName
    }
    
    const handleAddToTeam = () => {
        if (!complete) {
            addToTeam(item)
            setToast(false)
        } else {
            setToast(true)
        }
    }

    return (
        <>
            <BsCard className='cardContainer my-2'>
                <BsCard.Img variant="top" src={image?.url} className='cardImage'/>

                <Badge bg={colorBadge()} className='cardBadge'>{alignment}</Badge>

                <BsCard.Body>

                    <BsCard.Title className="title3 cardTitle text-center">{name}</BsCard.Title>

                    <OpenAnimation>
                        <PowerstatsProgressBar { ...powerstats} />
                    </OpenAnimation>

                    <Link exact to={`/heros/${id}`}>
                        <Button className="button" >Ver Detalle</Button>{' '}
                    </Link>
                    {
                        isOnTeam(id)
                            ? <Button 
                                className="button button--secondary"  
                                onClick={() => removeFromTeam(id)}
                            >
                                Eliminar del equipo
                            </Button>

                            : 
                                <>
                                    <Button 
                                        className="button button--secondary"  
                                        onClick={handleAddToTeam}
                                        disabled={complete}
                                    >
                                        Añadir al equipo
                                    </Button>
                                </>
                    }
                </BsCard.Body>
            </BsCard>

            <Toast show={toast}/>
        </>
    )
}

export default Card
