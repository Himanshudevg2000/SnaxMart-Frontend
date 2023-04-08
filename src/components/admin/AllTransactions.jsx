import React, { Fragment, useEffect, useState } from "react";
import classes from './AllTransactions.module.css'

const AllTransactions = () => {

    const [transactions, setTransactions] = useState([]);

    const gettransactionHandler = async () => {
        try {
            let token = JSON.parse(localStorage.getItem('admin'))
            console.log(token.token);
            token = token.token
            if(!token){
                console.log("please enter valid token");
            }

            const headers = { 'Authorization': `Bearer ${token}` };
            const response = await fetch('http://localhost:4000/api/v1/admin/alltransactions',{headers})
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            console.log(data)

            const transformData = data.data.map((items) => {
                return {
                    id: items._id,
                    employeeId: items.employeeId._id,
                    employeeName: items.employeeId.employeeName,
                    companyName: items.employeeId.companyName,
                    cardNo: items.employeeId.cardNo,
                    email: items.employeeId.email,
                    contactNo: items.employeeId.contactNo,
                    machineId: items.machineId._id,
                    description: items.machineId.description,
                    location: items.machineId.location,
                    slotName: items.slotName,
                    transactionsStatus: items.transactionsStatus,
                    createdAt: items.createdAt
                }
            });
            setTransactions(transformData);
            console.log(transformData)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        gettransactionHandler()
    }, [])

    const TransactionList = transactions.map((items)=> {
        return(
            <div className={classes.headdiv}>
                <ul>{items.id}</ul>
                <ul>{items.employeeId}</ul>
                <ul>{items.employeeName}</ul>
                <ul>{items.companyName}</ul>
                <ul>{items.cardNo}</ul>
                <ul>{items.email}</ul>
                <ul>{items.machineId}</ul>
                <ul>{items.description}</ul>
                <ul>{items.location}</ul>
                <ul>{items.slotName}</ul>
                <ul>{items.transactionsStatus}</ul>
                <ul>{items.createdAt}</ul>
            </div>
        )
    })

    return (
        <Fragment>
            <h1 className={classes.heading}>All Transactions</h1>
            <div>
                {TransactionList}
            </div>
        </Fragment>
    )
}

export default AllTransactions;

// moment("2013-03-10T02:00:00Z").format("YYYY-MM-DD") // "2013-03-10"