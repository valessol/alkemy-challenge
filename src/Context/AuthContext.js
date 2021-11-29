import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

const init = JSON.parse(localStorage.getItem('user')) || false;

export const AuthProvider = ({children}) => {
    const [ currentUser, setCurrentUser ] = useState(init)

    const logOut = () => {
        setCurrentUser(false)
    }

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{
            currentUser,
            logOut,
            setCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}