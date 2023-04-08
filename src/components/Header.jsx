import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from './Header.module.css';

const Header = () => {

    const userAuth = localStorage.getItem('user');
    const adminAuth = localStorage.getItem('admin');

    const UserlogoutHandler = () => {
        localStorage.removeItem('user')
    }
    const AdminlogoutHandler = () => {
        localStorage.removeItem('admin')
    }

    return (
        <Fragment>
            <header className={classes.header}>

                {userAuth ?
                    <ul>
                        <Link className={classes.links} to='/machines' >Machines</Link>
                        <Link className={classes.links} to='/usertransaction' >Buy</Link>
                        <Link className={classes.links} to='/getusertransaction' >All transactions</Link>
                        <button onClick={UserlogoutHandler} >logout</button>
                    </ul>
                    :
                    <ul>
                        <Link className={classes.links} to='/signup' >SignUp</Link>
                        <Link className={classes.links} to='/login' >Login</Link>
                        <Link className={classes.links} to='/userlogin' >User login</Link>
                        <Link className={classes.links} to='/machines' >Machines</Link>
                    </ul>
                }

                {adminAuth &&
                    <ul>
                        <Link className={classes.links} to='/usersignup' >User Signup</Link>
                        <Link className={classes.links} to='/allemployee' >All Employees</Link>
                        <Link className={classes.links} to='/createmachine' >Create Machine</Link>
                        <Link className={classes.links} to='/transactionslist' >All transactions</Link>
                        <Link className={classes.links} to='/AllMachine' >All Machine</Link>
                        <button onClick={AdminlogoutHandler} >logout</button>
                    </ul>
                }
            </header>
        </Fragment>
    )
}

export default Header;