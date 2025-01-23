import { createContext, useState } from "react";


export const CaptainContext = createContext();

const CaptainContextProvider = ({children}) => {

    const [ captain, setCaptain ] = useState(null)
    const [ error, setError ] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    }
    const value = {
        captain,
        setCaptain,
        error,
        setError,
        updateCaptain,
    }

    return (
        <CaptainContext.Provider value={value}>
            {children}
        </CaptainContext.Provider>
    )
}

export default CaptainContextProvider