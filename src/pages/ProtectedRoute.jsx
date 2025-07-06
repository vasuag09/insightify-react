import { Navigate } from "react-router-dom"

export default function ProtectedRoute({children}){
    const token = JSON.parse(localStorage.getItem("token"))
    if (!token){
        return <Navigate to="/login" replace />
    }
    return (
        children
    )
}