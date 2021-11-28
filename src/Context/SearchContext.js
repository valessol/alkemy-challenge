// import {createContext, useState} from 'react';

// export const SearchContext = createContext();

// const init = JSON.parse(localStorage.getItem('team')) || [];

// export const SearchProvider = ({children}) => {
//     const [search, setSearch] = useState ('');

//     const addToTeam = (item) => {
//         setTeam([...team, item])
//     }

//     const removeFromTeam = (itemId) => {
//         const items = team.filter((el)=>el.id !== itemId)
//         setTeam(items)
//     }

//     useEffect(()=>{
//         localStorage.setItem('team', JSON.stringify(team))
//     }, [team])

//     return (
//         <SearchContext.Provider value={{
//             search, setSearch
//         }}>
//             {children}
//         </SearchContext.Provider>
//     )

// }