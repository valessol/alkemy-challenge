import {createContext, useEffect, useState} from 'react';

export const TeamContext = createContext();

const init = JSON.parse(localStorage.getItem('team')) || [];

export const TeamProvider = ({children}) => {
    const [team, setTeam] = useState (init);
    const [ complete, setComplete ] = useState(false);
    const [ good, setGood ] = useState(false);
    const [ neutral, setNeutral ] = useState(false);
    const [ bad, setBad ] = useState(false);

    //Verificar orientación-----------------------------
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


    //Modificar miembros del equipo------------------------------
    const addToTeam = (item) => {
        if (team.length < 6) {

            //if (
                //((item.alignment === 'good') && !completeGoodAlignment()) 
                //|| ((item.alignment === 'neutral') && !completeNeutralAlignment())  
                //|| ((item.alignment === 'bad') && !completeBadAlignment())) {

                setTeam([...team, item]);
                if (team.length === 5) {
                    setComplete(true)
                }

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

    //Acumulativo de powerstats-----------------------------------
    const totalPowerstats = (attribute) => {

        return team.reduce((acc, item)=>acc + item.powerstats[attribute], 0);
    }

    //Promedios-----------------------------
    const promAttr = (arr) => {
        const totalAttr = arr.reduce((acc, item)=>acc + item, 0);
        return (totalAttr/arr.length)
    }


    //Extraer valor de peso y altura
    const teamWeight = () => {
        const weightInLb = team.map(item=>item.weight[0])
        const weightInKg = team.map(item=>item.weight[1])
        
        const newWeightInLb = weightInLb.map((item)=>{
            if (item.includes('-')) {
                item = '0 lb';
            }
            return Number(item.slice(0, -3))
        })
        const newWeightInKg = weightInKg.map((item)=>{
            if (item.includes('-')) {
                item = '0 lb';
            }
            return Number(item.slice(0, -3))
        })
        
        const promWeightInLb = promAttr(newWeightInLb).toFixed(2)
        const promWeightInKg = promAttr(newWeightInKg).toFixed(2)

        return `Peso promedio: ${promWeightInLb} lb / ${promWeightInKg} Kg`
    }

    const teamHeight = () => {
        const heightInCm = team.map(item=>item.height[1])
        
        const newHeightInCm = heightInCm.map((item)=>{
            if (item.includes('-')) {
                item = '0 cm';
            }
            return Number(item.slice(0, -3))
        })
        
        const promHeightInCm = promAttr(newHeightInCm).toFixed(2)


        return `Altura promedio: ${promHeightInCm} cm`
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
            teamWeight,
            teamHeight
        }}>
            {children}
        </TeamContext.Provider>
    )
    
}