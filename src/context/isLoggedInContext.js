"use client"
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const IsLoggedInContext = createContext();

const IsLoggedInState = ({ children }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isWriterLoggedIn, setIsWriterLoggedIn] = useState(false);

    const checkLogin = async () => {
        const response = await fetch("/api/verifyAccessToken", {
            method: "POST",
            headers: {
                "Access-Token": localStorage.getItem("token")
            },
            body: ""
        });
        const res = await response.json();

        if (res.success && res.data.verified) {
            if (res.data.role === "User") {
                setIsLoggedIn(true);
                // router.push("/");
            } else if (res.data.role === "Writer") {
                setIsWriterLoggedIn(true);
                router.push("/admin");
            } else {
                setIsLoggedIn(false);
                setIsWriterLoggedIn(false);
                // router.push("/login");
            }
        } else {
            setIsLoggedIn(false);
            setIsWriterLoggedIn(false);
            // router.push("/login");
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);


    return (
        <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn, isWriterLoggedIn, setIsWriterLoggedIn, checkLogin }}>
            {children}
        </IsLoggedInContext.Provider>
    );
}

export default IsLoggedInState;