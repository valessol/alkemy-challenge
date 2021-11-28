import {createContext, useState} from 'react';

export const SuperHeroContext = createContext();

//const init = JSON.parse(localStorage.getItem('team')) || [];

export const SuperHeroProvider = ({children}) => {
    const [heros, setHeros] = useState ([]);

    // const addToTeam = (item) => {
    //     setTeam([...team, item])
    // }

    // const removeFromTeam = (itemId) => {
    //     const items = team.filter((el)=>el.id !== itemId)
    //     setTeam(items)
    // }

    // useEffect(()=>{
    //     localStorage.setItem('team', JSON.stringify(team))
    // }, [team])

    return (
        <SuperHeroContext.Provider value={{
            heros, setHeros
        }}>
            {children}
        </SuperHeroContext.Provider>
    )
    
}