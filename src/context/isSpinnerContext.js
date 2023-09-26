"use client"
import { createContext, useState } from "react";

export const IsSpinnerContext = createContext();

const IsSpinnerState = ({ children }) => {
    const [isSpinner, setIsSpinner] = useState(true);

    return (
        <IsSpinnerContext.Provider value={{ isSpinner, setIsSpinner }}>
            {children}
        </IsSpinnerContext.Provider>
    );
}

export default IsSpinnerState;