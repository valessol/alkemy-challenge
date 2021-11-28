import {createContext, useEffect, useState} from 'react';

export const TeamContext = createContext();

const init = JSON.parse(localStorage.getItem('team')) || [];

export const TeamProvider = ({children}) => {
    const [team, setTeam] = useState (init);
    const [ complete, setComplete ] = useState(false);
    const [ good, setGood ] = useState(false);
    const [ neutral, setNeutral ] = useState(false);
    const [ bad, setBad ] = useState(false);

    //Verificar orientación
    const completeGoodAlignment = () => {
       const goodMembers = team.filter((members)=>members.alignment === 'good')
       const isComplete = goodMembers.length = 2
       return isComplete 
    }
    const completeNeutralAlignment = () => {
       const neutralMembers = team.filter((members)=>members.alignment === 'neutral')
       const isComplete = neutralMembers.length = 2
       return isComplete 
    }
    const completeBadAlignment = () => {
       const badMembers = team.filter((members)=>members.alignment === 'bad')
       const isComplete = badMembers.length = 2
       return isComplete 
    }


    //Modificar miembros del equipo
    const addToTeam = (item) => {
        if (team.length < 6) {

            //if (
                //((item.alignment === 'good') && !completeGoodAlignment()) 
                //|| ((item.alignment === 'neutral') && !completeNeutralAlignment())  
                //|| ((item.alignment === 'bad') && !completeBadAlignment())) {

                setTeam([...team, item]);

            //}

            //if (completeGoodAlignment()) setGood(true);  
            //if ( completeNeutralAlignment()) setNeutral(true); 
            //if ( completeBadAlignment()) setBad(true); 
            
        } else {
            setComplete(true);
        }
    }

    const removeFromTeam = (itemId) => {
        const items = team.filter((el)=>el.id !== itemId);

        setTeam(items)

        setComplete(false)

        if (!completeGoodAlignment()) setGood(false)
            
        if (!completeNeutralAlignment()) setNeutral(false)
    }

    const isOnTeam = (itemId) => {
        return team.some((item) => item.id === itemId);
    }

    const removeAll = () => {
        setTeam([])
    }

    //Acumulativo de powerstats
    const totalPowerstats = (attribute) => {

        return team.reduce((acc, powerstat)=>acc + powerstat[attribute], 0);
    }

    //Promedios
    const promAttr = (attr) => {
        const totalAttr = team.reduce((acc, item)=>acc + item.appearance[attr], 0);
        return (totalAttr/team.length)
    }

    useEffect(()=>{
        localStorage.setItem('team', JSON.stringify(team));
    }, [team])

    return (
        <TeamContext.Provider value={{
            team,
            complete, 
            good, 
            neutral,
            addToTeam,
            removeFromTeam,
            removeAll,
            isOnTeam, 
            totalPowerstats, 
            promAttr
        }}>
            {children}
        </TeamContext.Provider>
    )
    
}