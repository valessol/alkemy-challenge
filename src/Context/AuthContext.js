import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [ currentUser, setCurrentUser ] = useState(true)

    const logOut = () => {
        setCurrentUser(false)
    }



    return (
        <AuthContext.Provider value={{
            currentUser,
            setCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}