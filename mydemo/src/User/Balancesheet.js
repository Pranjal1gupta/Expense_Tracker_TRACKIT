import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Sidenav from "./Sidenav";
import { Link } from 'react-router-dom';
import useric from '../Home/media/useric.gif';
import CsvDownloader from 'react-csv-downloader';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'year', headerName: 'Year', width: 110 },
  { field: 'month', headerName: 'Month', width: 110 },
  { field: 'totalbug',headerName: 'Total Budget', width: 190,},
  { field: 'totalexp', headerName: 'Total Expenses', width: 190 },
  { field: 'totalsave', headerName: 'Total Savings', width: 190 },
  { field: 'totalnoexp', headerName: 'Total Number of Expenses', width: 180 },
];

const rows = [
  { id: 1,year:"2023", month:"january",totalbug:2000,totalexp:1890,totalsave:110,totalnoexp:12},
  { id: 1,year:"2023", month:"january",totalbug:2000,totalexp:1890,totalsave:110,totalnoexp:12},
  { id: 1,year:"2023", month:"january",totalbug:2000,totalexp:1890,totalsave:110,totalnoexp:12},
  { id: 1,year:"2023", month:"january",totalbug:2000,totalexp:1890,totalsave:110,totalnoexp:12},
  { id: 1,year:"2023", month:"january",totalbug:2000,totalexp:1890,totalsave:110,totalnoexp:12},
  { id: 1,year:"2023", month:"january",totalbug:2000,totalexp:1890,totalsave:110,totalnoexp:12},
  { id: 1,year:"2023", month:"january",totalbug:2000,totalexp:1890,totalsave:110,totalnoexp:12},
  { id: 1,year:"2023", month:"january",totalbug:2000,totalexp:1890,totalsave:110,totalnoexp:12}
];

const Balancesheet = () => {

  const [getloginemail,setloginemail]=useState();

  useEffect(()=>{
    var logindata=sessionStorage.getItem("logindata");
    setloginemail(logindata);
    getsignup();
  },[]);

  const [getuserdata, setuserdata] = useState([]);

  const email=localStorage.getItem("email");

  const getsignup = async () => {
    const signupres = await fetch(`/signupdatamainpage/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const sdata = await signupres.json();
    if (!sdata || signupres.status === 404) {
      alert("Error");
      console.log("error")
    }
    else {
      setuserdata(sdata);
      console.log(sdata)
      console.log("Data has been retrive");
     }
  }


  return (
    <>
    {/* ///////BUTTON///////// */}
    <div style={{"marginLeft":"15%"}}><Sidenav/></div>
    <div style={{"marginLeft":"17%"}}>
      
    <div class="container">
        <div class="row"></div>
        <div class="col-sm-1">
        <img src={useric} style={{"height":"82px","width":"86px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-10" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back {getuserdata.uname}</h1>
        <h5 style={{"color":"#5870c7"}}>This is your Balance sheet.Kindly go through it.</h5>
      </div>
        <div class="col-sm-1" style={{"paddingTop":"25px"}}>
            <span style={{"float":"right"}}>
              <Link to="expenses">
                <button class="w3-button w3-green w3-border w3-round-large w3-hover-red">
                  <i class="fa">&#xf067;&nbsp;</i> Add Expense
                </button>
              </Link>
            </span>
          </div>
    </div>     
<br/>

<div class="container">
<div class="w3-hover-shadow w3-round-xlarge w3-panel w3-card-2 ">
  <div style={{"textAlign":"center","padding":"5px"}}>
    
    <h3 style={{"fontSize":"27px","letterSpacing":"2px"}}><b>OVERALL SUMMARY</b></h3>
  </div>
  <div class="row">
  <div style={{ height: 400, width: '100%',"padding":"15px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
            datas={rows}
            text="Export to CSV"
            filename={`expensedata_`+new Date().toLocaleString()}
            extension=".csv"
            className="w3-btn w3-green w3-hover-shadow w3-round-large"
            />
    </div> 
  </div>
</div>
</div>

{/* <div class="container">
  <div class="row">
  <div class="col-sm-12">
          <div style={{"padding":"30px"}} class="w3-hover-shadow w3-round-xlarge w3-display-container w3-panel w3-card-2">
            <Chart type='bar'
            width={1050}
            height={500}
            series={[{name:"budget",data:[243,422,654,434,345,987,456,678,345,876,363,843]},
            {name:"expense",data:[211,390,680,400,295,797,466,634,312,843,312,823]}]}
            options={{title:{text:"Budget VS Expense"},
            xaxis:{title:{text:"Budget and Expenses"},
            categories:["january","january","january","january","january","january","january","january","january","january","january"]}}}></Chart>
          </div>
          </div>
  </div>
</div> */}
    </div>
</>
  )
}

export default Balancesheet;