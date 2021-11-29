import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { TeamContext } from '../../Context/TeamContext'
import { getHero } from '../../data/getData'
import { AuthContext } from "../../Context/AuthContext";
import PowerstatsProgressBar from '../PowerstatsProgressBar/PowerstatsProgressBar'
import { images } from '../../assets/images'


const CardDetail = () => {
    const [ loader, setLoader ] = useState(false)
    const [ hero, setHero ] = useState(null)
    const { isOnTeam, addToTeam, removeFromTeam } = useContext(TeamContext);
    const { currentUser } = useContext(AuthContext);
    const { push } = useHistory()
    const { itemId } = useParams()

    //Validación del array
    const isArray = (attribute) => {
        return attribute.constructor.toString().includes('Array')
    }

    const handleAddToTeam = () => {

        const item = {
            id: itemId,
            name: hero.name !== 'null' ? hero.name : 'Desconocido', 
            powerstats: {
                intelligence: (hero.powerstats.intelligence !== 'null' ? Number(hero.powerstats.intelligence) : 0 ),
                strength: (hero.powerstats.strength !== 'null' ? Number(hero.powerstats.strength) : 0 ),
                speed: (hero.powerstats.speed !== 'null' ? Number(hero.powerstats.speed) : 0 ),
                durability: (hero.powerstats.durability !== 'null' ? Number(hero.powerstats.durability) : 0 ),
                power: (hero.powerstats.power !== 'null' ? Number(hero.powerstats.power) : 0 ),
                combat: (hero.powerstats.combat !== 'null' ? Number(hero.powerstats.combat) : 0 )
            },
            image: hero.image, 
            height: hero.appearance.height,
            weight: hero.appearance.weight,
            alignment: hero.biography.alignment === '-' ? 'neutral' : hero.biography.alignment
        }
        addToTeam(item)
    }

   

    useEffect(()=> {
        if (!currentUser) {
            push('/login')
        } else {
              
            setLoader(false)
            getHero(itemId)
                .then((res)=> {
                    setHero(res)
                })
                .catch(err=>{
                    console.log(err)
                    push('/*')
                })
                .finally(()=>setLoader(false))
        }
    },[itemId, currentUser])
    
  
    return (
        <Container fluid className="detail" style={{padding: 0}}>

            {   loader 
                    ?   <Spinner animation="border" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </Spinner>
                    : hero &&
                        <>
                            <div>
                                <img 
                                    src=
                                        {
                                            hero.image?.url 
                                                ? hero.image.url 
                                                : images.defaultImage
                                        } 
                                    alt={hero.name ? hero.name : 'Desconocido'} 
                                    className="detailHero" />
                            </div>

                            <h2 className="text-center detailTitle title2" >{hero.name ? hero.name : 'Desconocido'}</h2>

                            <Container>

                                <Row>

                                    <Col md={6} className="detailData" >
                                        <div className="detailData--column mb-4">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th><h3 className="title3">Nombre: </h3></th>

                                                        <td className="detailData--info">
                                                            {
                                                                hero.biography['full-name']
                                                                    ? hero.biography['full-name']
                                                                    : 'Desconocido'
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th><h3 className="title3">Alias: </h3></th>
                                                        <td className="detailData--info" >
                                                            {
                                                                hero.biography.aliases
                                                                    ? isArray(hero.biography.aliases)
                                                                        ?
                                                                            hero.biography.aliases?.map((item, index)=>{
                                                                                return (
                                                                                    <span key={index}> {item} /</span>
                                                                                )
                                                                            })
                                                                        : hero.biography.aliases
                                                                    : 'Desconocido'
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th><h3 className="title3">Peso: </h3></th>
                                                        <td className="detailData--info" >
                                                            {
                                                                hero.appearance.weight
                                                                    ? isArray(hero.appearance.weight)
                                                                        ?
                                                                            hero.appearance.weight?.map((item, index)=>{
                                                                                return (
                                                                                    <span key={index}> {item} /</span>
                                                                                )
                                                                            })
                                                                        : hero.appearance.weight
                                                                    : 'Desconocido'
                                                                
                                                            }
                                                        </td>                                                
                                                    </tr>
                                                    <tr>
                                                        <th><h3 className="title3">Altura: </h3></th>
                                                        <td className="detailData--info" >
                                                            {
                                                                hero.appearance.height
                                                                    ? isArray(hero.appearance.height)
                                                                        ?
                                                                            hero.appearance.height?.map((item, index)=>{
                                                                                return (
                                                                                    <span key={index}> {item} /</span>
                                                                                )
                                                                            })
                                                                        : hero.appearance.height
                                                                    : 'Desconocido'
                                                                
                                                            }
                                                        </td>  
                                                    </tr>
                                                    <tr>
                                                        <th><h3 className="title3">Color de ojos: </h3></th>
                                                        <td className="detailData--info">
                                                            {
                                                                hero.appearance['eye-color']
                                                                    ? hero.appearance['eye-color']
                                                                    : 'Desconocido'
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th><h3 className="title3">Color de cabello: </h3></th>
                                                        <td className="detailData--info">
                                                            {
                                                                hero.appearance['hair-color']
                                                                    ? hero.appearance['hair-color']
                                                                    : 'Desconocido'
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th><h3 className="title3">Lugar de trabajo: </h3></th>
                                                        <td className="detailData--info">
                                                            {
                                                                hero.work.base
                                                                    ? hero.work.base
                                                                    : 'Desconocido'
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>

                                    <Col md={6} >
                                        <div className="detailData--column">
                                            <PowerstatsProgressBar {...hero.powerstats} />
                                        </div>
                                        <div className="d-flex flex justify-content-end">
                                            {
                                                isOnTeam(itemId)
                                                    ? <Button className="button" onClick={() => removeFromTeam(itemId)}>Eliminar del equipo</Button>
                                                    : <Button className="button" onClick={handleAddToTeam}>Añadir al equipo</Button>
                                            }
                                        </div>
                                    </Col>

                                </Row>
                                <Row>

                                    <Col md={12} className="d-flex flex justify-content-center" >
                                        <Button className="button button--secondary" >Volver a buscar</Button>
                                        <Button className="button button--secondary" >Ver mi equipo</Button>
                                    </Col>

                                </Row>
                    
                            </Container>
                        </>
            }
            
        </Container>
    )
}

export default CardDetail
