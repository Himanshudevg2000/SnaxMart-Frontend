import React, { Fragment, useEffect, useState } from "react";
import classes from './Machine.module.css'
import { useNavigate } from "react-router-dom";

const Machine = () => {

    const [machines, setMachines] = useState([]);
    const navigate = useNavigate();

    const getMachinesHandler = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/machine/allMachine')

            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()

            // console.log(data)

            const transformData = data.data.map((items) => {
                return {
                    id: items._id,
                    companyName: items.companyName,
                    description: items.description,
                    location: items.location
                }
            });
            setMachines(transformData);
            // console.log(transformData)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMachinesHandler()
    }, [])

    const userAcces = ()=> {
        navigate('/userlogin')
    }

    const machineList = machines.map((items)=> {
        return(
            <div className={classes.headdiv}>
                <label htmlFor="machineid">Machine Id: </label>
                <ul>{items.id}</ul>
                <label htmlFor="companyname">Company Name: </label>
                <ul>{items.companyName}</ul>
                <label htmlFor="description">Description: </label>
                <ul>{items.description}</ul>
                <label htmlFor="location">Location: </label>
                <ul>{items.location}</ul>
                <button onClick={userAcces} className={classes.btnaccess}>Access</button>
            </div>
        )
    })

    return (
        <Fragment>
            <h1 className={classes.heading}>All Machines</h1>
            <div>
                {machineList}
            </div>
        </Fragment>
    )
}

export default Machine;