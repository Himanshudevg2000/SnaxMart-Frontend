import React, { Fragment, useState } from "react";
import classes from '../admin/signup.module.css';
import { useNavigate } from "react-router-dom";

const UserLogin = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const [companyName,setCompanyName] = useState("");
    const [machineId,setMachineId] = useState("");
    const navigate = useNavigate();

    const collectData= async ()=> {
        console.log(email,password,companyName,machineId);
        let result = await fetch("http://localhost:4000/api/v1/employee/login", {
            method: "post",
            body: JSON.stringify({email,password,companyName,machineId}),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
        // console.log(result);
        if (result.data) {
            localStorage.setItem("user", JSON.stringify(result.data));
            alert("login successfully")
            // navigate("/")
        }
        else {
            alert("please fill correct details");
        }
    }

    return (
        <Fragment>
            <h1 className={classes.h1}>User login Page</h1>
            <div>
            <input className={classes.inputBox} type="email" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input className={classes.inputBox} type="password" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <input className={classes.inputBox} type="text" placeholder="Enter Company Name" value={companyName} onChange={(e)=> setCompanyName(e.target.value)} />
                <input className={classes.inputBox} type="text" placeholder="Enter Machine Id" value={machineId} onChange={(e)=> setMachineId(e.target.value)} />
                <button onClick={collectData} className={classes.btnSubmit} type="button" >Login</button>
            </div>
        </Fragment>
    )
}

export default UserLogin;