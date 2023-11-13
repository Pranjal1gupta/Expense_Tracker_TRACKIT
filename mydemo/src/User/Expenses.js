import React, { useState ,useEffect} from 'react'
import Sidenav from "./Sidenav";
import Chart from 'react-apexcharts';
import './userstyle.css';
import { Link } from 'react-router-dom';
import useric from '../Home/media/useric.gif';

const Expenses = () => {


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

  const email=localStorage.getItem("email");

  const [inpexp,setexp]=useState({
    expcategory:"",
    expamt:"",
    expdesc:"",
    month:"",
    date:"",
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

  const [totalbug,settotalbug] = useState(null)

  const [getbudgetview,setbudgetview] = useState([]);

  const viewbudget = async(e)=>
  {
    console.log(inpexp.currmonth)
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
    console.log(totalbug);
      console.log(getbudgetdata);
      if(!getbudgetdata || fetchbudget.status===404){
        alert("Error");
        console.log("error");
      }
      else{
        setbudgetview(getbudgetdata)
        console.log("Data fetched ");
      }
  };

 const[getexpenseview,setexpenseview]= useState([]);
 console.log(getexpenseview)

 const[totalexp,settotalexp] = useState(null);

  const inputexpense=(e)=>{
    console.log(e.target.value);
    const {name,value}=e.target;
    setexp((preval)=>{
      return{
        ...preval,
        [name]:value
      }
    })
  }
  const saveexpense=async(e)=>{
    e.preventDefault();
    const{expcategory,expamt,expdesc,month,date,useremail}=inpexp;
    if(expcategory === ""){
      alert(" Ops!!Please enter your budget category")
    }
    else if(expamt === ""){
      alert("Ops!!Please emter your budget amount");
    }
    else if(date=== ""){
      alert("Ops!!Please select your month")
    }
    else{
      const exp=await fetch("/expenseapi",{
        method:"POST",
        headers:{
          "Content-Type":"application/JSON"
        },
        body: JSON.stringify({
          expcategory,expamt,expdesc,month,date,useremail
        })
      });
      const insertexp=await exp.json();
      console.log(insertexp);
      if(!insertexp || exp.status===404){
        alert("Error");
        console.log("error");
      }
      else{
        viewexpense();
        alert("EXPENSE INSERTED SUCCESSFULLY");
        console.log("Data inserted ");
      }
    }
  };

  const viewexpense = async(e)=>
  {
    console.log(inpexp.month)
    const fetchexpense=await fetch(`/getexpenseapi/${email}/${getcurrmonth.currmonth}`,{
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
       setexpenseview(getexpensedata)
        console.log("Data fetched ");

      }
  };

  const viewdata=async(e)=>{
    viewexpense();
    viewbudget();
  }

  const deleteexpenses = async (id)=>
  {
    const delexpense = await fetch(`/deleteexpenseapi/${id}`,
    {
      method:"DELETE",
      headers:{
        "Content-Type":"application/JSON"
      }
    });

   const  deleteexpensedata = await delexpense.json();
   console.log(deleteexpensedata)

   if(delexpense.status === 422 || !deleteexpensedata)
   {
    console.log("error");
   }else{
    alert("Expense deleted");
    console.log("User deleted");
    viewexpense();
   }
  }

  const rembud=totalbug-totalexp;

  const budalert=()=>{
    if (rembud<0){
      return
      <>
        <div>
          <h3>You are getting overbudget. Kindly Maintain your Budget</h3>
        </div>
        </>
    }
  }

  const [getloginemail,setloginemail]=useState();

  useEffect(()=>{
    var logindata=localStorage.getItem("email");
    setloginemail(logindata);
    getsignup();
  },[]);
  

  return (
    <>
        <div style={{"marginLeft":"15%"}}><Sidenav/></div>
    <div style={{"marginLeft":"17%","marginTop":"0px"}}>

      <div class="container">
        <div class="row"></div>
          <div class="col-sm-1">
            <img src={useric} style={{"height":"82px","width":"86px","marginTop":"10px"}}/>
          </div>
        <div class="col-sm-10" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back <span style={{"textTransform":"uppercase"}}>{getuserdata.uname}</span></h1>
        <h5 style={{"color":"#5870c7"}}>These are your expenses. Try to keep them low.</h5>
        </div>
        <div class="col-sm-1" style={{"paddingTop":"25px"}}>
            <span style={{"float":"right"}}>
              <Link to="budget">
                <button class="w3-button w3-green w3-border w3-round-large w3-hover-red">
                   Check Budget
                </button>
              </Link>
            </span>
          </div>
      </div>

    <div class="container">
      <div class="row">
        <div class="col-sm-6">
        <div class="w3-hover-shadow w3-round-xxlarge w3-panel w3-card-2 expenseform" style={{"padding":"15px"}}>
        <hr class="hrbudget"></hr>
        <h2 style={{"textAlign":"center","letterSpacing":"2px","paddingBottom":"8px","fontSize":"25px"}}><b>RECORD EXPENSES</b></h2>
        <hr class="hrbudget"></hr>
    <form>
  <div class="form-group expenseinp">
    <label for="exampleInputEmail1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Expense Category *</label>
    <br></br>
    <i style={{"fontSize":"25px"}} class="fa">&#xf07a;</i> &nbsp;&nbsp;
    <input  required  style={{ "width": "70%","padding":"3px"}} type="text" name="expcategory" onChange={inputexpense} value={inpexp.expcategory}/>
  </div>
  <div class="form-group expenseinp">
    <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Amount *</label>
    <br></br>
    <i style={{"fontSize":"25px"}} class="fa">&#xf156;</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input required  style={{ "width": "70%","padding":"3px"}} type="number" name="expamt" onChange={inputexpense} value={inpexp.expamt}/>
  </div>
  <div class="form-group expenseinp">
    <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Description &nbsp;(Optional)</label>
    <br></br>
    <i style={{"font-size":"25px"}} class="fa">&#xf0f6;</i>&nbsp;&nbsp;&nbsp;
    <textarea style={{ "width": "70%","padding":"3px"}} rows="2" type="text" name="expdesc" onChange={inputexpense} value={inpexp.expdesc}/>
  </div>
  <div class="form-group expenseinp">
    <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Month</label>
    <br></br>
    <i style={{ "font-size": "25px" }} class="fa">
      &#xf073;
    </i>
    &nbsp;&nbsp;&nbsp;
    <input style={{ "width": "70%","padding":"3px"}} type="month" name="month" onChange={inputexpense} value={inpexp.month}/>
  </div>

  <div class="form-group expenseinp">
    <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Date *</label>
    <br></br>
    <i style={{"font-size":"25px"}} class="fa">&#xf073;</i>&nbsp;&nbsp;&nbsp;
    <input  required style={{ "width": "70%","padding":"3px"}} type="date" name="date" onChange={inputexpense} value={inpexp.date}/>
  </div>

<button class="w3-button w3-green w3-border w3-round-large w3-hover-red budgetsavebtn" onClick={saveexpense}>Save</button>
{/* <button  class="w3-button w3-green w3-border w3-round-large w3-hover-red expbtn" > <i class="fa">&#xf067;</i> Add More</button> */}
</form>
</div>
        </div>
        <div class="col-sm-6">
        <div style={{"paddingTop":"120px"}}>
        <Chart style={{"margin-left":"0px"}}
         type="donut"
         strokeWidth={50}
         width={580}
        height={325}
        series={[1000,500,200,370,290,800,1200,1400]}
          options= {
            
        {labels:['fees','food','medicine','watertax','electricity bill','EMI','insurance premium','cloths'],
        
        plotOptions:{pie:{donut:{labels:{show:true,total:{show:true,fontSize:25,color:'red'}},}}},
        dataLabels:{enabled:true,fontSize:5},
        }
      }
        >
     </Chart>
            </div>
            </div>
            {/*-------------------- bottom---------------------- */}
            
            <div class="container">
            <div classs="row">
              <div class="col-sm-12">
                <h2 style={{"textAlign":"center","color":"#5870c7"}}><b>SEARCH HISTORY</b></h2>
              </div>
            </div>


            <div classs="row">
              <div class="col-sm-6">
              <div >
              <label style={{"marginBottom":"0px"}}>Month</label><br/>
                  <input style={{ "width": "40%","padding":"5px","borderRadius":"5px","border":"1px solid black"}}  type="month" name="currmonth" onChange={getmonth} value={getcurrmonth.currmonth}/>&nbsp;&nbsp;
                  <button class="w3-btn w3-green w3-border w3-round-large w3-hover-red " style={{"margin-bottom":"10px","marginTop":"5px"}} onClick={viewdata}><i style={{"font-size":"20px"}} class="fa">&#xf002;</i></button>
                </div>
              </div>
              <div class="col-sm-6">
                <br/>
              <div style={{"float":"right"}}>
                <h3 style={{"color":"red","fontWeight":"600"}}>Remaining Budget: <span style={{"color":"red","textShadow":"0.8px 0.2px black"}}>{rembud}</span></h3>
              </div>
              </div>
            </div>

              <div class="container"></div>
               <div class="row">
              <div class="col-sm-12">
            {/* <div class="w3-hover-shadow w3-panel w3-card-2 w3-round-large ">
              <h2><b>Total Transactions</b><span style={{"float":"right"}}><i style={{"font-size":"30px"}} class="fa">&#xf156;</i>&nbsp;1200</span></h2>
          </div> */}
          <div class="w3-hover-shadow w3-panel w3-card-2 w3-round-large" style={{"backgroundColor":"#5870c7"}}>
              <h2 style={{"color":"whitesmoke"}}><b>Total Expense</b><span style={{"float":"right"}} class="allamt"><i style={{"font-size":"30px"}} class="fa">&#xf156;</i>&nbsp;{totalexp}</span></h2>
          </div>
            </div>
            </div>

            {
              getexpenseview.map((element)=>
              {
                return(
                  <>

<div class="row">
              <div class="col-sm-12">
            <div class=" w3-panel w3-card-2 w3-round-xlarge scolor" >
            <h2>
              <i onClick={()=>deleteexpenses(element._id)} style={{"font-size":"30px","color":"red"}} class="fa" data-toggle="tooltip"  title="Delete">&#xf014; 
              </i>&nbsp;&nbsp;&nbsp;
              <Link to={`/expenseupdate/${element._id}`}><i style={{"font-size":"30px","color":"blue"}} class="fa" data-toggle="tooltip"  title="Update">&#xf044;
            </i></Link>&nbsp;&nbsp;&nbsp;{element.expcategory} -
            &nbsp;&nbsp;
            {element.month}
            <span style={{"float":"right","color":"#b369b3"}}>
              <i style={{"font-size":"30px"}} class="fa">&#xf156;</i>
              &nbsp;<span class="allamt">{element.expamt}</span>
              </span>
              </h2>
            </div>
            </div>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      {/* -----------------------------MODAL BODY STARTS---------------------------- */}
      <div class="modal-body">
      
      <form>
  <div class="form-group expenseinp">
    <label for="exampleInputEmail1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Expense Category *</label>
    <br></br>
    <i style={{"fontSize":"25px"}} class="fa">&#xf07a;</i> &nbsp;&nbsp;
    <input  required  style={{ "width": "70%","padding":"3px"}} type="text" name="expcategory" onChange={inputexpense} value={inpexp.expcategory}/>
  </div>
  <div class="form-group expenseinp">
    <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Amount *</label>
    <br></br>
    <i style={{"fontSize":"25px"}} class="fa">&#xf156;</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input required  style={{ "width": "70%","padding":"3px"}} type="number" name="expamt" onChange={inputexpense} value={inpexp.expamt}/>
  </div>
  <div class="form-group expenseinp">
    <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Description &nbsp;(Optional)</label>
    <br></br>
    <i style={{"font-size":"25px"}} class="fa">&#xf0f6;</i>&nbsp;&nbsp;&nbsp;
    <textarea style={{ "width": "70%","padding":"3px"}} rows="2" type="text" name="expdesc" onChange={inputexpense} value={inpexp.expdesc}/>
  </div>
  <div class="form-group expenseinp">
    <label for="exampleInputPassword1" style={{"fontSize":"17px","marginLeft":"35px","paddingBottom":"5px"}}>Date *</label>
    <br></br>
    <i style={{"font-size":"25px"}} class="fa">&#xf073;</i>&nbsp;&nbsp;&nbsp;
    <input  required style={{ "width": "70%","padding":"3px"}} type="date" name="date" onChange={inputexpense} value={inpexp.date}/>
  </div>

{/* <button class="w3-button w3-green w3-border w3-round-large w3-hover-red budgetsavebtn" onClick={saveexpense}>Save</button> */}
</form>

      </div>
  {/* -----------------------------MODAL BODY ENDS---------------------------- */}
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
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
  )
}

export default Expenses