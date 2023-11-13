import './App.css';
import './Home/navbarstyle.css';
import {Routes, Route, Router } from 'react-router-dom';
import { BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Signup from './Home/Signup';
import Forgetpassword from './Home/Forgetpassword';
import Homepage from './Home/Homepage';
import Footer from './Home/Footer';
import About from './Home/About'
import Imgslider from './Home/Imgeslider';
import Contact from './Home/Contact'

import Sidebaradmin from './Admin/Sidebaradmin';
import AdminAccoutnupdate from './Admin/AdminAccoutnupdate'
import Feedbackamd from './Admin/Feedbackamd';
import AdmReport from './Admin/AdmReport'
import Manageuser from './Admin/Manageuser'
import Viewprofile from './Admin/Viewprofile';
import BlockedUser from './Admin/BlockedUser'
import Dashboard from './Admin/Dashboard'
import AdmLogin from './Admin/AdmLogin';
import Admprofile from './Admin/Admprofile';
import AdmForgetpassword from './Admin/AdmForgetpassword';

import InvestmentTips from './User/InvestmentTips'
import Sidebar from './User/Sidebar';
import Login from './Home/Login'
import Accoutnupdate from './User/Accoutnupdate'
import Budget from './User/Budget'
import Expenses from './User/Expenses'
import Expenseshet from './User/Expenseshet'
import Mainpage from './User/Mainpage'
import Reminder from './User/Reminder'
import Feedback from './User/Feedback'
import Balancesheet from './User/Balancesheet'
import MonthlyReports from './User/MonthlyReports';
import AnnualReport from './User/AnnualReport';
import Navbar from './Home/Navbar';
import Profile from './User/Profile';
import Email from './User/Email';
import Adminuserdata from './Admin/Adminuserdata';
import BudgetUpdate from './User/BudgetUpdate';
import ExpenseUpdate from './User/ExpenseUpdate';
import ReminderUpdate from './User/ReminderUpdate';


function App() {
  return (  
    <>


{/* -----------------------------user------------------------- */}

        <Routes> 
          <Route path="/" element= {[<Homepage/>]} />
          <Route path="/about" element= {[<About/>]} />
          <Route path="/about/contact" element= {[<Contact/>]}/>
          <Route path="/contact" element= {[<Contact/>]}/>
          <Route path="/signup" element={[<Signup/>]}/>
          <Route path="/login" element={[<Login/>]}/>

          <Route path="/signup/login" element={[<Login/>]}/>
          <Route path="/login/forgetpassword" element={[<Forgetpassword/>]}/>
          <Route path="/forgetpassword" element={[<Forgetpassword/>]}/>
          
        </Routes>

        <Sidebar/>
        <Routes>
          <Route path="/mainpage" element={[<Mainpage/>]}/>
          <Route path="/account" element={[<Profile/>]}/>
          <Route path="/expenses" element={[<Expenses/>]}/>
          <Route path="/account" element={[<Profile/>]}/>
          <Route path="/expensesheet" element={[<Expenseshet/>]}/>
          <Route path="/balancesheet" element={[<Balancesheet/>]}/>
          <Route path="/budget" element={[<Budget/>]}/>
          <Route path="/budgetupdate/:id" element={[<BudgetUpdate/>]}/>
          <Route path="/expenseupdate/:id" element={[<ExpenseUpdate/>]}/>
          <Route path="/reminderupdate/:id" element={[<ReminderUpdate/>]}/>
          <Route path="/reminder" element={[<Reminder/>]}/>
          <Route path="/investmenttips" element={[<InvestmentTips/>]}/>
          <Route path="/feedback" element={[<Feedback/>]}/>
          <Route path="/monthlyreports" element={[<MonthlyReports/>]}/>
          <Route path="/annualreports" element={[<AnnualReport/>]}/>

          <Route path="/mainpage/budget" element={[<Budget/>]}/>
          <Route path="/mainpage/expenses" element={[<Expenses/>]}/>
          <Route path="/mainpage/monthlyreports" element={[<MonthlyReports/>]}/>

          <Route path="/balancesheet/expenses" element={[<Expenses/>]}/>
          <Route path="/expensesheet/expenses" element={[<Expenses/>]}/>

          <Route path="/expenses/budget" element={[<Budget/>]}/>
          <Route path="/expensesheet/expenses/budget" element={[<Budget/>]}/>
          <Route path="/balancesheet/expenses/budget" element={[<Budget/>]}/>

          <Route path="/profile" element={[<Accoutnupdate/>]}/>

        </Routes>


{/* ---------------------------User end--------------------------- */}



{/* ----------------------------Admin-------------------------- */}

        {/* <Routes>
        <Route path="/" element={<AdmLogin/>}/>
        <Route path="/admforgetpassword" element={<AdmForgetpassword/>}/>
        </Routes>
        
        <Sidebaradmin/>
        <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/report" element={<AdmReport/>}/>
        <Route path="/manageuser" element={<Manageuser/>}/>
        <Route path="/blockuser" element={<BlockedUser/>}/>
        <Route path="/accountadm" element={<Admprofile/>}/>
        <Route path="/admfeedback" element={<Feedbackamd/>}/>
        <Route path="/manageuser/userprofile/:id" element={<Viewprofile/>}/>
        <Route path="/blockuser/userprofile/:id" element={<Viewprofile/>}/>
        <Route path="/userdata" element={<Adminuserdata/>}/>
        <Route path="/admprofile" element={<AdminAccoutnupdate/>}/>
        
        </Routes> */}

{/* ---------------------------Admin end---------------------------- */}

   </>

  );
}

export default App;