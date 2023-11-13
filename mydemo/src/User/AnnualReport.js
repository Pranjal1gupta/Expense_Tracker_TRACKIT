import React, { useEffect, useState } from 'react'
import useric from '../Home/media/useric.gif';
import Sidenav from './Sidenav';
import { DataGrid } from '@mui/x-data-grid';
import Chart from 'react-apexcharts';
import CsvDownloader from 'react-csv-downloader';

const AnnualReport = () => {

    const [getloginemail,setloginemail]=useState();

    const email=localStorage.getItem("email");

    const [getuserdata, setuserdata] = useState([]);

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

  const [getbudget,setbudget] = useState([]);

const [gettotalbug,settotalbug] = useState(null)

const annualbudget =async(e)=>{

  const fetchbudsheet=await fetch(`/annualbudget/${email}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/JSON"
    },
  });
  const getbudgetdata=await fetchbudsheet.json();
  const sumbug = getbudgetdata.reduce((prev,curr)=>{
    return prev + +curr.amt;
  },0);
  settotalbug(sumbug);
  console.log(sumbug);

  if(!getbudgetdata || fetchbudsheet.status===404){
    alert("error");
    console.log("error");
  }
  else{
    setbudget(getbudgetdata)
    console.log(getbudgetdata);
    console.log("Data fetched")
  }
};

const[getexpense,setexpense]= useState([]);

const[totalexp,settotalexp] = useState(null);

const annualexpense = async(e)=>
  {
    const fetchexpense=await fetch(`/annualexpense/${email}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });

    const getexpensedata=await fetchexpense.json();
    const sumexp = getexpensedata.reduce((prev,curr)=>{
      return prev + +curr.expamt;
    },0);
    settotalexp(sumexp);
    console.log(totalexp);

      // console.log(getexpensedata);
      if(!getexpensedata || fetchexpense.status===404){
        alert("Error");
        console.log("error");
      }
      else{
       setexpense(getexpensedata)
       console.log(getexpensedata)
        console.log("Data fetched ");
      }
  };

    useEffect(()=>{
      var logindata=sessionStorage.getItem("logindata");
      setloginemail(logindata);
      getsignup();
      annualbudget();
      annualexpense();
    },[]);


    const budcolumns = [
      { field: 'id', headerName: 'ID', width: 90 },
    { field: 'month', headerName: 'Month', width: 140 },
    { field: 'bugetcategory', headerName: 'Budget Category', width: 240 },
    { field: 'budgetamount', headerName: 'Budget Amount', width: 240 },
    { field: 'budgetdesc', headerName: 'Budget Description', width: 270 },
    ];
    
    const budrows = getbudget.map((brow,id)=>({
     id:id+1,
     month:brow.month,
     bugetcategory:brow.bcategory,
     budgetamount:brow.amt,
     budgetdesc:brow.description
    }));

    const expcolumns = [
      { field: 'id', headerName: 'ID', width: 80 },
      { field: 'month', headerName: 'Month', width: 120 },
      {field:"date",headerName:'Date',width:120},
      { field: 'expcategory', headerName: 'Expense Category', width: 230 },
      { field: 'expamount', headerName: 'Expemse Amount', width: 210 },
      { field: 'expdesc', headerName: 'Expense Description', width: 260 },
    ];
    
    const exprows = getexpense.map((exprow,id)=>({
      id:id+1,
      month:exprow.month,
      date:exprow.date,
      expcategory:exprow.expcategory,
      expamount:exprow.expamt,
      expdesc:exprow.expdesc
    }))

  return (
    <>
    <div style={{"marginLeft":"15%"}}><Sidenav/></div>
    <div style={{"marginLeft":"17%","marginTop":"0px"}}>
        
    <div class="container">
        <div class="row"></div>
        <div class="col-sm-1">
        <img src={useric} style={{"height":"82px","width":"86px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span></h1>
        <h5 style={{"color":"#5870c7"}}>This is your annual report. It will give you details of everything.</h5>
        </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
          <div class="w3-round-xlarge w3-display-container w3-panel w3-card-2" style={{"height":"auto"}}>
          <div style={{"padding":"5px"}}>
              <h3 style={{"fontSize":"28px","letterSpacing":"2px","color":"#5870c7"}}><center><b>ANNUAL REPORT</b>
              </center></h3>
            </div>
            <div class="row">
              <div class="col-sm-4">
              <div class=" w3-round-large w3-display-container w3-panel w3-card-2 w3-hover-shadow monthlyrep1" style={{"height":"auto","paddingBottom":"10px"}}>
              <h3 style={{"fontWeight":"600"}}>BUDGET<span style={{"float":"right"}}> &nbsp;&nbsp;
              <i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid #bf42fd","backgroundColor":"#bf42fd","color":"white","borderRadius":"20px","marginTop":"-2px"}}  class='fas'>&#xf200;</i></span></h3>
            <hr class="hrstylecard"></hr>
            <div class="row">
              <div class="col-sm-6">
            <h6 style={{"fontWeight":"600"}}><center>Your annual budegt was : </center></h6>
            </div>
            <div classs="col-sm-6">             
            <h3 style={{"textAlign":"center","font-weight":"400"}}><b>₹ {gettotalbug}</b></h3>
          </div>
          </div>
              </div>
              </div>

              <div class="col-sm-4">
              <div class=" w3-round-large w3-display-container w3-panel w3-card-2 w3-hover-shadow monthlyrep2" style={{"height":"auto","paddingBottom":"10px"}}>
              <h3 style={{"fontWeight":"600"}}>EXPENSES<span style={{"float":"right"}}> &nbsp;&nbsp;
              <i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid #4c529b","backgroundColor":"#4c529b","color":"white","borderRadius":"20px","marginTop":"-2px"}} class='fas'>&#xf651;</i></span></h3>
            <hr class="hrstylecard"></hr>
            <div class="row">
              <div class="col-sm-6">
            <h6 style={{"fontWeight":"600"}}><center>Your annual expense was :  </center></h6>
            </div>
            <div classs="col-sm-6">             
            <h3 style={{"textAlign":"center","font-weight":"400"}}><b>₹ {totalexp}</b></h3>
          </div>
          </div>
                </div>
              </div>

              <div class="col-sm-4">
                <div class=" w3-round-large w3-display-container w3-panel w3-card-2 w3-hover-shadow monthlyrep1" style={{"height":"auto","paddingBottom":"10px"}}>
                <h3 style={{"fontWeight":"600"}}>SAVINGS<span style={{"float":"right"}}> &nbsp;&nbsp;
                <i style={{"font-size":"21px","float":"right","padding":"7px","border":"1px solid #bf42fd","backgroundColor":"#bf42fd","color":"white","borderRadius":"20px","marginTop":"-2px"}}  class='fas'>&#xf4c0;</i></span></h3>
            <hr class="hrstylecard"></hr>
            <div class="row">
              <div class="col-sm-6">
            <h6 style={{"fontWeight":"600"}}><center>Your annual saving was :  </center></h6>
            </div>
            <div classs="col-sm-6">             
            <h3 style={{"textAlign":"center","font-weight":"400"}}><b>₹ {gettotalbug-totalexp}</b></h3>
          </div>
          </div>
              </div>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col-sm-12">
              <div class="w3-round-large w3-display-container">
              <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px","marginBottom":"0px"}}></hr>
                <h3 style={{"fontSize":"22px","letterSpacing":"2px","color":"#a16fbf","fontWeight":"650"}}>
                  <center>ANNUAL BUDGET</center>
              </h3>
              <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px"}}></hr>
                <div style={{ height: 400, width: '100%',"padding":"15px" }}>
                <DataGrid
        rows={budrows}
        columns={budcolumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{
          boxShadow: 3,
          fontSize:14
        }}
      />
                </div>
                <div style={{"marginLeft":"20px"}}>
                  <CsvDownloader
                    datas={getbudget}
                    text="Export to CSV"
                    filename={`Budgetdata_`+new Date().toLocaleString()}
                    extension=".csv"
                    className="w3-btn w3-green w3-hover-shadow w3-round-large"
                  />
                </div>
                </div>
              </div>
              
            </div>

            <div class="row">
              <div class="col-sm-12">
              <div class="w3-round-large w3-display-container"><br/>
              <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px","marginBottom":"0px"}}></hr>
                <h3 style={{"fontSize":"22px","letterSpacing":"2px","color":"#a16fbf","fontWeight":"650"}}>
                  <center>ANNUAL EXPENSES</center>
              </h3>
              <hr class="hrstylecard" style={{"marginLeft":"100px","marginRight":"100px"}}></hr>
                <div style={{ height: 400, width: '100%',"padding":"15px" }}>
                <DataGrid
        rows={exprows}
        columns={expcolumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{
          boxShadow: 3,
          fontSize:14
        }}
      />
                </div>
                <div style={{"marginLeft":"20px"}}>
                  <CsvDownloader
                    datas={getexpense}
                    text="Export to CSV"
                    filename={`Budgetdata_`+new Date().toLocaleString()}
                    extension=".csv"
                    className="w3-btn w3-green w3-hover-shadow w3-round-large"
                  />
                </div>
                </div>
              </div>
              
            </div>


            <div class="row">
              <div class="col-sm-12">
              <div  style={{"padding":"20px"}} >
            <Chart type='bar'
            width={1000}
            height={400}
            series={[{name:"budget",data:[243,422,654,434,345,987,456,678,345,876,363,843]},
            {name:"expense",data:[211,390,680,400,295,797,466,634,312,843,312,823]}]}
            options={{title:{text:"Budget VS Expense"},
            xaxis:{title:{text:"budget and expenses"},
            categories:["january","january","january","january","january","january","january","january","january","january","january"]}}}></Chart>
          </div>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default AnnualReport