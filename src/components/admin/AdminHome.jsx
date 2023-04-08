import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const AdminHome = ()=> {

    return (
        <Fragment>
            <Link to='/usersignup' >User Signup</Link>
            <Link to='/allemployee' >All Employees</Link>
            <Link to='/createmachine' >Create Machine</Link>
            <Link to='/transactionslist' >All transactions</Link>
            <Link to='/AllMachine' >All Machine</Link>
        </Fragment>
    )   
}

export default AdminHome;