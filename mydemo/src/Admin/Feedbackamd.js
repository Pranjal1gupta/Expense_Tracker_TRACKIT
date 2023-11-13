import React, { useState ,useEffect} from 'react'
import adminicon from '../Home/media/adminicon.gif'
import AdmSidenav from './AdmSidenav';

const Feedbackamd = () => {


    const[getfeedbackview,setfeedbackview] = useState([]);
    console.log(getfeedbackview)


    const viewfeedback = async(e)=>
     {
    const fetchfeedback=await fetch("/getfeedbackapi",{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });

    const getfeedbackdata=await fetchfeedback.json();

      console.log(getfeedbackdata);
      if(!getfeedbackdata || fetchfeedback.status===404){
        alert("Error");
        console.log("error");
      }
      else{
        setfeedbackview(getfeedbackdata)
        console.log("Data fetched ");

      }
  };



  const deletefeedback = async (id)=>
  {
    const delfeedback  = await fetch(`/deletefeedbackapi/${id}`,
    {
      method:"DELETE",
      headers:{
        "Content-Type":"application/JSON"
      }
    });

   const  deletefeedbackdata = await delfeedback.json();
   console.log(deletefeedbackdata)

   if(delfeedback.status === 422 || !deletefeedbackdata)
   {
    console.log("error");
   }else{
    alert("FEEDBACK DELETE");
    console.log("User deleted");
 viewfeedback();
   }

  };




  
  useEffect(()=>{
    viewfeedback();
  },[]);




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
        <h5 style={{"color":"#5870c7"}}>These are the Feedbacks. Feedbacks given by the users.</h5>
        </div>
        </div>
    
        {
            getfeedbackview.map((element)=>
            {
                return(

                <div class="container">
                <div style={{"border":"1px solid black","paddingTop":"10px","paddingBottom":"10px","paddingLeft":"25px"}} class=" w3-round-xlarge w3-panel w3-card-2 w3-hover-shadow">
                <span> 
                  
                   <h5 style={{"textTransform":"uppercase","fontSize":"29px","letterSpacing":"1px","paddingLeft":"7px","color":"#a16fbf"}}>
                  <b> {element.uname} </b>
                   <i  onClick={()=>deletefeedback(element._id)} style={{"font-size":"23px","float":"right","marginRight":"10px","backgroundColor":"#F44531","color":"white","borderRadius":"10px","padding":"6px","marginTop":"0px"}} class="fa">&#xf014;
                   </i>
                  </h5>

                <hr class="hrstylecard"></hr> 
                </span>
               <h5 style={{"marginTop":"-13px","color":"gray","fontSize":"15px","fontWeight":"600"}}>{element.date}</h5> 

               <div style={{"padding":"10px","borderLeft":"5px solid #a16fbf","borderRight":"5px solid #a16fbf","borderRadius":"25px","minHeight":"100px","letterSpacing":"1.5px"}}>
                 <h5 style={{"fontSize":"21px"}}>"{element.features}"</h5>
               </div>

               <h5 style={{"color":"grey","fontSize":"18px","fontWeight":"600","float":"right"}}>- {element.feedemail}
               </h5> 

                </div>
                </div>
                )
            })
}
    </div>
    </>
  )
}

export default Feedbackamd