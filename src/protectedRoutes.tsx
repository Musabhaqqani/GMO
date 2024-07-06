import React from 'react'
import { Outlet , Navigate } from 'react-router-dom'

const isAuth = () : boolean =>{
    const token : string | null = localStorage.getItem("formData")
    return token !== null
}

const ProtectedRoutes: React.FC = () => {
            const Auth = isAuth()
            return Auth ? <Outlet /> : <Navigate to="/" />
}
export default ProtectedRoutes