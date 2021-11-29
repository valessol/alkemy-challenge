import React, { useContext, useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { useHistory } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { TeamContext } from '../../Context/TeamContext'
import { getSearchResults } from '../../data/getData'
import Search from '../Search/Search'
import CardList from './CardList'
import Spinner from '../Spinner/Spinner'

//NOTE: Limpiar filtros no anda
const CardListContainer = () => {
    
    const { team } = useContext(TeamContext)
    const { currentUser } = useContext(AuthContext)
    const [heros, setHeros] = useState (null);
    const [filterHeros, setFilterHeros] = useState (null);
    const [loader, setLoader] = useState (false);
    const [ err, setErr] = useState(false)
    const { push } = useHistory();


    const searchHeros = (search) => {
        setLoader(true)
        getSearchResults(search)
            .then(res =>{
                console.log(res.results)
                if (res.results) {
                    setHeros(res.results)
                    setErr(false)
                } else {
                    console.log('error en los datos')
                    setErr(true)
                }
            })
            .catch(error=>{
                console.log(error)
                setErr(true)
            })
            .finally(()=>setLoader(false))
            

    }
    const filter = (alignmentState) => {
        const newFilter = [...heros]
        const filterResult = newFilter.filter((hero)=>hero.biography.alignment === alignmentState)
        setFilterHeros(filterResult)
    }

    useEffect(() => {
        if (!currentUser) {
            push('/login')
        } else {
            searchHeros('m')
        }
        
    }, [currentUser])

    return (
        <div>
            {
                (team.length === 0)
                    && 
                        <>
                            <h2 className="text-center mt-4">¡Aún no hay miembros en tu equipo!</h2>
                            <h3 className="text-center mb-4">Comienza buscando por nombre y elige a tus favoritos</h3>
                        </>
            }
            {
                loader && (heros && heros.length===0)
                    ?   <Spinner />
                    : <>
                        {
                            team.length !== 0 && <h2 className="text-center mt-4">¡Busca tu superhéroe favorito!</h2>
                        }
                        
                        <Search searchResults={searchHeros}/>
                        <div className="container my-2" >Filtrar por: 
                            <Badge 
                                bg="success" 
                                className='cardBadge m-2 cardBadge--filter'
                                onClick={()=>filter('good')}
                            >
                                Good
                            </Badge>

                            <Badge 
                                bg="info" 
                                className='cardBadge m-2 cardBadge--filter'
                                onClick={()=>filter('neutral')}
                            >
                                Neutral
                            </Badge>

                            <Badge 
                                bg="danger" 
                                className='cardBadge m-2 cardBadge--filter'
                                onClick={()=>filter('bad')}
                            >
                                Bad
                            </Badge>

                        </div>

                        {
                            err 
                                ? <div className="container" >No hay resultados para tu búsqueda</div>
                                : <CardList 
                                    heros={
                                        filterHeros 
                                            ? filterHeros
                                            : heros
                                    } />
                        }
                        
                    </>
            }
        </div>
    )
}

export default CardListContainer
