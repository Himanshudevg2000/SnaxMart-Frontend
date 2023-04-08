import React, { Fragment, useState } from "react";
import classes from './signup.module.css';

const UserSignup = () => {

    let adminDetail = JSON.parse(localStorage.getItem('admin'))
    let Authtoken = adminDetail.token;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [cardNo, setCardNo] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [department, setDepartment] = useState("");

    const collectData = async () => {
        console.log(email, password, employeeName, companyName, cardNo, contactNo, department);
        let result = await fetch("http://localhost:4000/api/v1/admin/usersignup", {
            method: "post",
            body: JSON.stringify({email,password,employeeName,companyName,cardNo,contactNo,department}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Authtoken}`

            },
        });
        result = await result.json();
        console.log(result);
        alert("employee created")
    }

    return (
        <Fragment>
            <h1 className={classes.h1}>User Sign Page</h1>
            <div>
                <input className={classes.inputBox} type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className={classes.inputBox} type="text" placeholder="Enter employeeName" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                <input className={classes.inputBox} type="text" placeholder="Enter companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                <input className={classes.inputBox} type="text" placeholder="Enter cardNo" value={cardNo} onChange={(e) => setCardNo(e.target.value)} />
                <input className={classes.inputBox} type="text" placeholder="Enter contactNo" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                <input className={classes.inputBox} type="text" placeholder="Enter department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                <input className={classes.inputBox} type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={collectData} className={classes.btnSubmit} type="button" >User SignUp</button>
            </div>
        </Fragment>
    )
}

export default UserSignup;