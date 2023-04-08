import React, { Fragment, useEffect, useState } from "react";
import classes from './UserTransaction.module.css'

const UserTransaction = () => {

    const [transactions, setTransactions] = useState([]);

    const gettransactionHandler = async () => {
        try {
            let token = JSON.parse(localStorage.getItem('user'))
            console.log(token.token);
            token = token.token
            if(!token){
                console.log("please enter valid token");
            }

            const headers = { 'Authorization': `Bearer ${token}` };
            const response = await fetch('http://localhost:4000/api/v1/employee/gettransaction',{headers})
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
                    transactionsStatus: items.transactionStatus,
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
                TransactionId:
                <ul>{items.id}</ul>
                EmployeeID:
                <ul>{items.employeeId}</ul>
                EmployeeName:
                <ul>{items.employeeName}</ul>
                CompanyName:
                <ul>{items.companyName}</ul>
                CardNo:
                <ul>{items.cardNo}</ul>
                email:
                <ul>{items.email}</ul>
                MachineID:
                <ul>{items.machineId}</ul>
                description:
                <ul>{items.description}</ul>
                location:
                <ul>{items.location}</ul>
                SlotName:
                <ul>{items.slotName}</ul>
                TransactionStatus:
                <ul>{items.transactionsStatus}</ul>
                CreatedAt:
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

export default UserTransaction;