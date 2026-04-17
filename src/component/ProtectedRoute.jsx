import React, { useState } from 'react'
import { useEffect, usest } from 'react'
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const [user, setUser] = useState (undefined)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u)
    })
        return () => unsubscribe()
    }, [])
    if (user ===undefined) return <h1>Loading</h1>;
    return user ? children : <Navigate to = "/register" />;
}


export default ProtectedRoute