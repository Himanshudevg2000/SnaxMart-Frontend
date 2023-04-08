import AdminSignup from "./components/admin/signup";
import Adminlogin from "./components/admin/login";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Machine from "./components/machine/Machine";
import UserLogin from "./components/user/UserLogin";
import UserSignup from "./components/admin/CreateUser";
import CreateMachine from "./components/admin/CreateMachine";
import AllEmployee from "./components/admin/AllUsers";
import AllTransactions from "./components/admin/AllTransactions";
import AllMachine from "./components/admin/AllMachines";
import EmployeeTransaction from "./components/employeeTransaction";
import AdminAuth from "./components/PrivateComponent/AdminAuth";
import UserAuth from "./components/PrivateComponent/UserAuth";
import UserTransaction from "./components/user/UserTransactions";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>

        <Route element={<AdminAuth />} >
          <Route path="/usersignup" element={<UserSignup />} ></Route>
          <Route path="/createmachine" element={<CreateMachine />} ></Route>
          <Route path="/allemployee" element={<AllEmployee />} ></Route>
          <Route path="/transactionslist" element={<AllTransactions />} ></Route>
          <Route path="/AllMachine" element={<AllMachine />} ></Route>
        </Route>

        <Route element={<UserAuth />} >
          <Route path="/usertransaction" element={<EmployeeTransaction />} ></Route>
          <Route path="/getusertransaction" element={<UserTransaction />} ></Route>
        </Route>

        <Route path="/signup" element={<AdminSignup />} ></Route>
        <Route path="/login" element={<Adminlogin />} ></Route>
        <Route path="/userlogin" element={<UserLogin />} ></Route>
        <Route path="/machines" element={<Machine />} ></Route>

      </Routes>
      {/* <AdminHome /> */}
    </div>
  );
}

export default App;
