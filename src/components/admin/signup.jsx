import React, { Fragment, useState } from "react";
import classes from './signup.module.css';
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const collectData= async ()=> {
        console.log(email,password);
        let result = await fetch("http://localhost:4000/api/v1/admin/signup", {
            method: "post",
            body: JSON.stringify({email,password}),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
        navigate('/login')
        console.log(result);
    }

    return (
        <Fragment>
            <h1 className={classes.h1}>Admin Signup Page</h1>
            <div>
                <input className={classes.inputBox} type="email" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input className={classes.inputBox} type="password" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <button onClick={collectData} className={classes.btnSubmit} type="button" >SignUp</button>
            </div>
        </Fragment>
    )
}

export default AdminSignup;