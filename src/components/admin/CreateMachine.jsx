import React, { Fragment, useState } from "react";
import classes from './signup.module.css';

const CreateMachine = () => {

    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");


    const collectData = async () => {
        console.log(companyName,description,location);
        let result = await fetch("http://localhost:4000/api/v1/machine/install", {
            method: "post",
            body: JSON.stringify({companyName,description,location}),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
        console.log(result);
        alert("created")
    }

    return (
        <Fragment>
            <h1 className={classes.h1}>Create Machine</h1>
            <div>
                <input className={classes.inputBox} type="text" placeholder="Enter companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                <input className={classes.inputBox} type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input className={classes.inputBox} type="text" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
                <button onClick={collectData} className={classes.btnSubmit} type="button" >Create</button>
            </div>
        </Fragment>
    )
}

export default CreateMachine;