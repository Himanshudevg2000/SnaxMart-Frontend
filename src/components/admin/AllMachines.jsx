import React, { Fragment, useEffect, useState } from "react";
import classes from '../machine/Machine.module.css';

const AllMachine = () => {

    const [machines, setMachines] = useState([]);
    const [edit,setedit] = useState(false);
    const [editid,seteditid] = useState('')
    const [companyName,setCompanyName] = useState('')
    const [description,setDescription] = useState('')
    const [location,setLocation] = useState('')

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

    const deleteMachineHandler = async (id) => {
        console.log(id)
        try {
            let result = await fetch(`http://localhost:4000/api/v1/machine/deleteMachine?id=${id}`, {
                method: "Put",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (!result.ok) {
                throw new Error('Something went wrong')
            }
            result = await result.json();
            console.log(result);
            alert("Machine deleted")
        }
        catch (error) {
            alert("something went wrong")
        }
    }


    const editMachinesHandler = (id,companyName,description,location)=> {
        console.log(id,companyName,description,location);
        setCompanyName(companyName);
        setDescription(description);
        setLocation(location);
        seteditid(id)
        setedit(true);
    }

    const editMachineDetail = async()=> {
        console.log(editid)
        try {
            let result = await fetch(`http://localhost:4000/api/v1/machine/editMachine?id=${editid}`, {
                method: "Put",
                body: JSON.stringify({companyName,description,location}),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (!result.ok) {
                throw new Error('Something went wrong')
            }
            result = await result.json();
            console.log(result);
            alert("Machine Details updated")
        }
        catch (error) {
            alert("something went wrong")
        }
    }

    useEffect(() => {
        getMachinesHandler()
    }, [])

    const machineList = machines.map((items)=> {
        return(
            <div className={classes.headdiv}>
                <label htmlFor="companyname">Company Name: </label>
                <ul>{items.companyName}</ul>
                <label htmlFor="description">Description: </label>
                <ul>{items.description}</ul>
                <label htmlFor="location">Location: </label>
                <ul>{items.location}</ul>
                <button className={classes.btnaccess} onClick={()=> editMachinesHandler(items.id,items.companyName,items.description,items.location)} >edit</button>
                <button className={classes.btnaccess} onClick={()=> deleteMachineHandler(items.id)} >delete</button>
            </div>
        )
    })

    return (
        <Fragment>
            <h1 className={classes.heading}>All Machines</h1>
            <div>
                {machineList}
                {edit &&
                 <div>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <button onClick={editMachineDetail} >edit</button>
                 </div>
                }
            </div>
        </Fragment>
    )
}

export default AllMachine;