
import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import 'react-toastify/dist/ReactToastify.css';
import Sidenav from "./Sidenav";
import './userstyle.css';
import useric from '../Home/media/useric.gif';
import { Link } from 'react-router-dom'
import moment from "moment";


const Budget = () => {

  const [getloginemail,setloginemail]=useState();

  const [getbudget_category,setbudget_category]=useState();
  const [getbudget_amount,setbudget_amount]=useState();

  const budget_cat=[];
  const budget_amt=[]

  const [getcurrmonth,setcurrmonth]=useState({
    currmonth:""
  });

  const getmonth=(e)=>{
    const {name,value}=e.target;
    setcurrmonth((mon)=>{
      return{
        ...mon,
        [name]:value
      }
    })
  };

  console.log("current month",getcurrmonth.currmonth);

  const email=localStorage.getItem("email");
  // console.log(e);
  const [getbudget,setbudget]=useState({
    bcategory:"",
    amt:"",
    description:"",
    month:"",
    useremail:email
  });

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

  const [getbudgetview,setbudgetview] = useState([]);
  // console.log(getbudgetview);

const [totalbug,settotalbug] = useState(null)

  const budget=(e)=>{
    console.log(e.target.value);
    const {name,value}=e.target;
    setbudget((preval)=>{
      return{
        ...preval,
        [name]:value
      }
    })
  };
  
  // INSERT BUDGET//

  const addbudget=async(e)=>{
    e.preventDefault();
    const {bcategory,amt,description,month,useremail}=getbudget;
    
    if(bcategory === null){
      alert("Please enter your budget category")
    }
    else if(amt === ""){
      alert("Please emter your budget amount");
    }
    else if(month=== ""){
      alert("Please select your month")
    }
    else{
      const bdg=await fetch("/budget",{
        method:"POST",
        headers:{
          "Content-Type":"application/JSON"
        },
        body: JSON.stringify({
          bcategory,amt,description,month,useremail
        })
      });
      const insertbdg=await bdg.json();
      console.log(insertbdg);
      if(!insertbdg || bdg.status===404){
        alert("Error");
        console.log("error");
      }
      else{
         alert("BUDGET INSERTED SUCCESSFULLY");
        //  console.log(log_email);
        viewbudget();
        console.log("Data inserted ");
      }
    }
  };

  // FETCH BUDGET//

  const viewbudget = async(e)=>
  {
    console.log(getbudget.month);
    const fetchbudget=await fetch(`/getbudgetapi/${email}/${getcurrmonth.currmonth}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });
    const getbudgetdata=await fetchbudget.json();
    const sumbug = getbudgetdata.reduce((prev,curr)=>{
      return prev + +curr.amt;
    },0);
    settotalbug(sumbug);
    console.log(sumbug)
      console.log(getbudgetdata);
      if(!getbudgetdata || fetchbudget.status===404){
        alert("Server Busy Can't Get Your Data..");
        console.log("error");
      }
      else{
        setbudgetview(getbudgetdata)
        for(let i=0;i<getbudgetdata.length;i++)
        {
          budget_cat.push(getbudgetdata[i].bcategory);
          budget_amt.push(parseInt(getbudgetdata[i].amt));
        }
        console.log(budget_cat)
          console.log(budget_amt)
        console.log("Data fetched ");
      }
  };

  const viewdata=async(e)=>{
    viewbudget();
  }


  // USEEFFECT (page refresh) //

  useEffect(()=>{
    var logindata=localStorage.getItem("email");
    setloginemail(logindata);
    setbudget_category(budget_cat);
    setbudget_amount(budget_amt);
    viewbudget();
    getsignup();
  },[]);


  // DELETE BUDGET//

  const deletebudget=async(id)=>
  {
    const delbudget=await fetch(`/deletebudgetapi/${id}`,
    {
      method:"DELETE",
      headers:{
        "Content-Type":"application/JSON"
      }
    });
    const deletebudgetdata=await delbudget.json();
    

    if(delbudget.status===422 || !deletebudgetdata){
      console.log("error");
    }
    else{
      alert("Budget Deleted")
      console.log("User deleted");
      viewbudget();
    }
  }

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
        <h5 style={{"color":"#5870c7"}}>This is your budgeting page. Do it wisely.</h5>
        </div>
        </div>

      <div  class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="w3-hover-shadow w3-round-xxlarge w3-panel w3-card-2 budgetform" style={{"padding":"15px"}}>
            <hr class="hrbudget"></hr>
              <h2 style={{"textAlign":"center","letterSpacing":"2px","paddingBottom":"8px","fontSize":"27px"}}><b>RECORD BUDGET</b></h2>
              <hr class="hrbudget"></hr>
              <form>
                <div class="form-group  expenseinp">
                  <label for="exampleInputEmail1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Budget Category *</label>
                  <br></br>
                  <i style={{ "fontSize": "25px"}} class="fa">
                    &#xf07a;
                  </i>
                  &nbsp;&nbsp;&nbsp;
                  <input style={{ "width": "70%","padding":"3px"}} type="text" name="bcategory" onChange={budget} value={getbudget.bcategory}/>
                </div>
                <div class="form-group expenseinp">
                  <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Amount *</label>
                  <br></br>&nbsp;
                  <i style={{ "fontSize": "25px" }} class="fa">
                    &#xf156;
                  </i>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <input style={{ "width": "70%","padding":"3px"}} type="number" name="amt" onChange={budget} value={getbudget.amt}/>
                </div>
                <div class="form-group expenseinp">
                  <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Description (optional)</label>
                  <br></br>
                  <i style={{ "font-size": "25px" }} class="fa">
                    &#xf0f6;
                  </i>
                  &nbsp;&nbsp;&nbsp;
                  <textarea style={{ "width": "70%","padding":"3px"}} rows="2" type="text" name="description" onChange={budget} value={getbudget.description}/>
                </div>
                <div class="form-group expenseinp">
                  <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"34px","paddingBottom":"5px"}}>Month</label>
                  <br></br>
                  <i style={{ "font-size": "25px" }} class="fa">
                    &#xf073;
                  </i>
                  &nbsp;&nbsp;&nbsp;
                  <input style={{ "width": "70%","padding":"3px"}} type="month" name="month" onChange={budget} value={getbudget.month}/>
                </div>
                <button class="w3-button w3-green w3-border w3-round-large w3-hover-red budgetsavebtn" style={{"margin-bottom":"10px"}} onClick={addbudget}>Save</button>

              </form>
            </div>
          </div>

          <div class="col-sm-6">
            <div style={{"paddingTop":"100px"}}>
            <Chart style={{"margin-left":"0px"}}
         type="donut"
         strokeWidth={50}
         width={580}
        height={325}
        series={[2000,2800,2300,2800]}
          options= {
            
        {labels:['food','medicine','bills','education'],
        
        plotOptions:{pie:{donut:{labels:{show:true,total:{show:true,fontSize:25,color:'red'}},}}},
        dataLabels:{enabled:true,fontSize:5},
        }
      }
        >
     </Chart>
            </div>

            {/* bottom */}
          </div>
          <div class="container">

            <div classs="row">
            
              <div class="col-sm-12">
                <h2 style={{"textAlign":"center","color":"#5870c7"}}><b>SEARCH HISTORY</b></h2>
              </div>
            </div>

            <div classs="row">
              <div class="col-sm-12">
              <div class="" >
                  <label style={{"marginBottom":"0px"}}>Month</label><br/>
                  <input style={{ "width": "20%","padding":"5px","borderRadius":"5px","border":"1px solid black"}} type="month" name="currmonth" onChange={getmonth} value={getcurrmonth.currmonth}/>&nbsp;&nbsp;
                  <button class="w3-btn w3-green w3-border w3-round-large w3-hover-red " style={{"margin-bottom":"10px","marginTop":"5px"}} onClick={viewdata}><i style={{"font-size":"20px"}} class="fa">&#xf002;</i></button>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12">
            <div class="w3-hover-shadow w3-panel w3-card-2 w3-round-large " style={{"backgroundColor":"#5870c7"}}>
              <h2 style={{"color":"whitesmoke"}}><b>Total Budget</b><span style={{"float":"right"}} class="allamt"><i style={{"font-size":"30px"}} class="fa">&#xf156;</i>&nbsp;{totalbug}</span></h2>
          </div>
            </div>
            </div>

          
            {
              getbudgetview.map((element)=>
              {
                return(
                  <>
            <div class="row">
              <div class="col-sm-12">
                  <div class=" w3-panel w3-card-2 w3-round-xlarge scolor">
                  <h2>
                    <i onClick={ ()=>deletebudget(element._id)} style={{"font-size":"30px","color":"red"}} class="fa" data-toggle="tooltip"  title="Delete">&#xf014;
                      </i>&nbsp;&nbsp;&nbsp;
                    <Link to={`/budgetupdate/${element._id}`}><i style={{"font-size":"30px","color":"blue"}} class="fa" data-toggle="tooltip"  title="Update">&#xf044;
                    </i></Link>&nbsp;&nbsp;&nbsp;{element.bcategory} -
                    &nbsp;&nbsp;
                    {element.month}
                  <span style={{"float":"right","color":"#b369b3"}}>
                <i style={{"font-size":"30px"}} class="fa">&#xf156;
                </i>&nbsp;<span class="allamt">{element.amt}</span>
             </span>
            </h2>
            </div>
            </div>

            </div>
            
                  </>
                )
              })
            }



          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Budget;
