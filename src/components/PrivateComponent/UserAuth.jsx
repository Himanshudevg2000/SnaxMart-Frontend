import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserAuth = ()=> {
    const userauth = localStorage.getItem('user');
    return userauth? <Outlet/> : <Navigate to={"/machines"} />
    
};

export default UserAuth;