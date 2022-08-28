import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { isLoggedIn } from "../Auth"

function AuthProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(true)

    useEffect(()=> {
        setLoggedIn(isLoggedIn())
    }, [])

    return loggedIn ? <div>{children}</div>: <Navigate to={'/dashboard/login'} />
}

export default AuthProvider