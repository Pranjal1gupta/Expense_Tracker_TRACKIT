import React, { useEffect, useState } from 'react'
import AdmSidenav from './AdmSidenav'
import adminicon from '../Home/media/adminicon.gif'
import { DataGrid } from '@mui/x-data-grid';
import CsvDownloader from 'react-csv-downloader';

const Adminuserdata = () => {

  const[getuexp,setuexp] = useState([])

  const[getubudg,setubudg] = useState([]);
     
  const[getuemail,setuemail] = useState({
   email:""
  });


    const budgetcolumns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'month', headerName: 'Month', width: 140 },
        { field: 'bugetcategory', headerName: 'Budget Category', width: 240 },
        { field: 'budgetamount', headerName: 'Budget Amount', width: 240 },
        { field: 'budgetdesc', headerName: 'Budget Description', width: 270 },
      ];
    
      const expcolumns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'month', headerName: 'Month', width: 130 },
        {field:"date",headerName:'Date',width:130},
        { field: 'expcategory', headerName: 'Expense Category', width: 230 },
        { field: 'expamount', headerName: 'Expemse Amount', width: 230 },
        { field: 'expdesc', headerName: 'Expense Description', width: 260 },
      ];

      const exprows=getuexp.map((row,id)=>({
        id:id+1,
        month:row.month,
        date:row.date,
        expcategory:row.expcategory,
        expamount:row.expamt,
        expdesc:row.expdesc
      }));
     
     
     const budgetrows = getubudg.map((brow,id)=>({
      id:id+1,
      month:brow.month,
      bugetcategory:brow.bcategory,
      budgetamount:brow.amt,
      budgetdesc:brow.description

     }));


     const uemail=(e)=>{
      console.log(e.target.value);
      const {name,value}=e.target;
      setuemail((preval)=>{
        return{
          ...preval,
          [name]:value
        }
      })
    };

  const userexpense = async () => {
    const userdataexp = await fetch(`/adminuserexpenseapi/${getuemail.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const uexpresp = await userdataexp.json();
    if (!uexpresp || userdataexp.status === 404) {
      alert("Error");
      console.log("error")
    }
    else {
      setuexp(uexpresp);
      console.log(uexpresp)
      console.log("Data has been retrive");
     }
  }


  const userbudget = async () => {
    const userdatabudg = await fetch(`/adminuserbudgetapi/${getuemail.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const ubudgresp = await userdatabudg.json();
    if (!ubudgresp || userdatabudg.status === 404) {
      alert("Error");
      console.log("error")
    }
    else {
      setubudg(ubudgresp);
      console.log(ubudgresp)
      console.log("Data has been retrive");
     }
  }

  const userdataexpbudg = ()=>
  {
    userexpense();
    userbudget();
  }


  return (
    <>
    <div style={{"marginLeft":"15%"}}><AdmSidenav/></div>
    <div style={{"margin-left":"16%","marginTop":"-10px"}} class="report">
    
    <div class="container">
        <div class="row"></div>
        <div class="col-sm-1">
        <img src={adminicon} style={{"height":"85px","width":"85px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back Admin </h1>
        <h5 style={{"color":"#5870c7"}}>This is the users data. It will give you details of the users.</h5>
        </div>
        </div>


            <div class="container">
             <div classs="row" >
              <div class="col-sm-12">
              <div class="" style={{"marginTop":"25px","marginBottom":"-5px"}}> 
              <label style={{"marginBottom":"0px"}}>Search user email</label><br/>
                  <input value={getuemail.email} onChange={uemail} name="email" style={{ "width": "20%","padding":"5px","borderRadius":"5px","border":"1px solid black"}} type="text" />&nbsp;&nbsp;
                  <button onClick={userdataexpbudg} class="w3-btn w3-blue w3-border w3-round-large w3-hover-green " style={{"margin-bottom":"10px","marginTop":"5px"}} ><i style={{"font-size":"20px"}} class="fa">&#xf002;</i></button>
                </div>
              </div>
            </div>
            </div>


            <div class="container">
<div class="w3-hover-shadow w3-round-xlarge w3-panel w3-card-2 ">
  <div style={{"textAlign":"center","padding":"5px"}}>
    
  <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px","marginTop":"20px","marginBottom":"0px"}}></hr>

<h3 style={{"fontSize":"27px","letterSpacing":"2px","color":"#a16fbf"}}><b>USERS EXPENSES </b></h3>

<hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px"}}></hr>
  </div>
  <div class="row">
  <div style={{ height: 400, width: '100%',"padding":"15px" }}>
    
      <DataGrid
        rows={exprows}
        columns={expcolumns}
        pageSize={5}
        rowsPerPageOptions={[5,10,15]}
        sx={{
          boxShadow: 3,
          fontSize:14
        }}
      />
    </div>
    <div style={{"margin":"10px"}}>
          <CsvDownloader
            datas={getuexp}
            text="Export to CSV"
            filename={`expensedata_`+new Date().toLocaleString()}
            extension=".csv"
            className="w3-btn w3-green w3-hover-shadow w3-round-large"
            />
    </div> 
  </div>
</div>
</div>


<div class="container">
<div class="w3-hover-shadow w3-round-xlarge w3-panel w3-card-2 ">
  <div style={{"textAlign":"center","padding":"5px"}}>
    
    <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px","marginTop":"20px","marginBottom":"0px"}}></hr>

    <h3 style={{"fontSize":"27px","letterSpacing":"2px","color":"#a16fbf"}}><b>USERS BUDGET </b></h3>

    <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px"}}></hr>

  </div>
  <div class="row">
  <div style={{ height: 400, width: '100%',"padding":"15px" }}>
      <DataGrid
        rows={budgetrows}
        columns={budgetcolumns}
        pageSize={5}
        rowsPerPageOptions={[5,10,15]}
        sx={{
          boxShadow: 3,
          fontSize:14
        }}
      />
    </div>
    <div style={{"margin":"10px"}}>
          <CsvDownloader
            datas={getubudg}
            text="Export to CSV"
            filename={`Budget_`+new Date().toLocaleString()}
            extension=".csv"
            className="w3-btn w3-green w3-hover-shadow w3-round-large"
            />
    </div> 
  </div>
</div>
</div>


    </div>
    </>
  )
}

export default Adminuserdata