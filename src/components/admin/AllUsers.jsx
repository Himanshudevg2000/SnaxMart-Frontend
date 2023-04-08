import React, { Fragment, useEffect, useState } from "react";
import classes from './AllUser.module.css'

const AllEmployee = () => {

    let adminDetail = JSON.parse(localStorage.getItem('admin'))
    let Authtoken = adminDetail.token;

    const [employees, setEmployees] = useState([]);
    const [edit, setedit] = useState(false);
    const [employeeName, setEmployeeName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [cardNo, setCardNo] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [editid,seteditid] = useState('');

    const getEmployeesHandler = async () => {
        try {
            let token = JSON.parse(localStorage.getItem('admin'))
            console.log(token.token);
            token = token.token
            if (!token) {
                console.log("please enter valid token");
            }

            const headers = { 'Authorization': `Bearer ${token}` };
            const response = await fetch('http://localhost:4000/api/v1/admin/allemployee', { headers })
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            // console.log(data)

            const transformData = data.data.map((items) => {
                return {
                    id: items._id,
                    employeeName: items.employeeName,
                    companyName: items.companyName,
                    cardNo: items.cardNo,
                    email: items.email,
                    contactNo: items.contactNo,
                    department: items.department
                }
            });
            setEmployees(transformData);
            // console.log(transformData)
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteUserHandler = async (id) => {
        console.log(id)
        try {
            let result = await fetch(`http://localhost:4000/api/v1/admin/deleteemployee?id=${id}`, {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Authtoken}`
                },
            });
            if (!result.ok) {
                throw new Error('Something went wrong')
            }
            result = await result.json();
            console.log(result);
            alert("Employee deleted")
        }
        catch (error) {
            alert("something went wrong")
        }
    }

    const editUserChangesHandler = (id, employeeName, companyName, cardNo, email, contactNo, department) => {
        console.log(id, employeeName, companyName, cardNo, email, contactNo, department);
        setEmployeeName(employeeName)
        setCompanyName(companyName)
        setCardNo(cardNo)
        setEmail(email)
        setContactNo(contactNo)
        setDepartment(department)
        seteditid(id)
        setedit(true);
    }

    const editUserdetails = async () => {
        console.log(editid)
        try {
            let result = await fetch(`http://localhost:4000/api/v1/admin/updateemployee?id=${editid}`, {
                method: "Put",
                body: JSON.stringify({ employeeName, companyName, cardNo, email, contactNo, department }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Authtoken}`
                },
            });
            if (!result.ok) {
                throw new Error('Something went wrong')
            }
            result = await result.json();
            console.log(result);
            alert("Employee Details updated")
        }
        catch (error) {
            alert("something went wrong")
        }
    }

    useEffect(() => {
        getEmployeesHandler()
    }, [])

    const employeeList = employees.map((items) => {
        return (
            <div className={classes.headdiv}>
                <ul>{items.id}</ul>
                <ul>{items.employeeName}</ul>
                <ul>{items.companyName}</ul>
                <ul>{items.cardNo}</ul>
                <ul>{items.email}</ul>
                <ul>{items.contactNo}</ul>
                <ul>{items.department}</ul>
                <button onClick={() => editUserChangesHandler(items.id, items.employeeName, items.companyName, items.cardNo, items.email, items.contactNo, items.department)} >edit</button>
                <button onClick={() => deleteUserHandler(items.id)} >delete</button>
            </div>
        )
    })

    return (
        <Fragment>
            <h1 className={classes.heading}>All Employees</h1>
            <div>
                {employeeList}
                {edit &&
                    <div>
                        <input type="text" placeholder="Enter " value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                        <input type="text" placeholder="Enter " value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        <input type="text" placeholder="Enter " value={cardNo} onChange={(e) => setCardNo(e.target.value)} />
                        <input type="text" placeholder="Enter " value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                        <input type="text" placeholder="Enter " value={department} onChange={(e) => setDepartment(e.target.value)} />
                        <input type="text" placeholder="Enter " value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button onClick={editUserdetails} >edit</button>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default AllEmployee;