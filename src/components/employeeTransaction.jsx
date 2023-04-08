import React, { useEffect, useState } from 'react';

const EmployeeTransaction = () => {
    let [employeeId, setEmployeeId] = useState('');
    let [machineId, setMachineId] = useState('');
    const [slotName, setSlotName] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');

    let userDetail = JSON.parse(localStorage.getItem('user'))
    console.log(userDetail.token);
    let Authtoken = userDetail.token;
    // setEmployeeId(userDetail.id);
    // setMachineId(userDetail.machineId);

    useEffect(()=> {
        setEmployeeId(userDetail.id);
        setMachineId(userDetail.machineId);
    },[])

    const handleVendRequest = async () => {
        try {
            if(!userDetail){
                console.log("please enter valid token");
            }

            const response = await fetch("http://localhost:4000/api/v1/employee/buy", {
                method: "POST",
                body: JSON.stringify({ employeeId, machineId, slotName }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Authtoken}`
                },
            })
            if (response.data.success) {
                setTransactionStatus('Transaction Successful');
            } else {
                setTransactionStatus('Transaction Failed');
            }
        } catch (error) {
            console.error(error);
            setTransactionStatus('Transaction Failed');
        }
    };

    return (
        <div className="App">
            <h1>Vending Machine</h1>
            <label>
                Employee ID :
                {/* <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} /> */}
                {employeeId}
            </label>
            <br />
            <label>
                Machine ID :
                {/* <input type="text" value={machineId} onChange={(e) => setMachineId(e.target.value)} /> */}
                {machineId}
            </label>
            <br />
            <label>
                Slot Name:
                <input type="text" value={slotName} onChange={(e) => setSlotName(e.target.value)} />
            </label>
            <button onClick={handleVendRequest}>Buy</button>
            <p>{transactionStatus}</p>
        </div>
    );
}

export default EmployeeTransaction;
