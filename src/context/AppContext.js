import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const AppContext=createContext();
const AppProvider=({children})=>{
    const navigate=useNavigate();
    const [isLogin, setIsLogin] = useState(localStorage.getItem("authToken"));
    const [role, setRole] = useState("student")
    const [loginUser, setLoginUser] = useState([])
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        setIsLogin(false)
        setLoginUser([])
        navigate("/")
      }
}

export default AppContext