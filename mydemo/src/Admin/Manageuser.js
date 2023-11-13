import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import adminicon from '../Home/media/adminicon.gif'
import AdmSidenav from './AdmSidenav';

const Manageuser = () => {

  const [getusermanage,setusermanage] = useState([]);

  const[getstatus,setstatus] = useState(
    {
      status:1
    }
  );

  // console.log(getbudgetview);

const {id} = useParams("");
console.log(id);


   const viewusermanage = async(e)=>
  {
    const fetchusermang=await fetch("/getublockeduser",{
      method:"GET",
      headers:{
        "Content-Type":"application/JSON"
      },
    });
    const usermangedata=await fetchusermang.json();
      if(!usermangedata || fetchusermang.status===404){
        alert("errror")
        console.log("error");
      }
      else{
        setusermanage(usermangedata)
        
        console.log("Data fetched ");
      }
  };

  const deleteusermanage=async(id)=>
  {
    const delusermanage=await fetch(`/deletemanageuserapi/${id}`,
    {
      method:"DELETE",
      headers:{
        "Content-Type":"application/JSON"
      }
    });
    const deleteuserdata=await delusermanage.json();
    if(delusermanage.status===422 || !deleteuserdata){
      console.log("error");
    }
    else{
      alert("Use data Deleted")
      console.log("User data deleted");
    }
  };

  const blockusers = async(id)=>
  {
   const{status} = getstatus;
   console.log(id)
    const fetchblockuser=await fetch( `/blockuserapi/${id}`,
    {
      method:"PATCH",
      headers:{
        "Content-Type":"application/JSON"
      },
      body:JSON.stringify({
        status
      })
    });
    const blockuserdata=await fetchblockuser.json();

      if(blockuserdata.status=== 422 || !status===0){
        console.log("User already blocked");
      }
      else{
       alert("User Blocked")
        console.log("User Blocked");
      }
  };


  useEffect(()=>
  {
    viewusermanage();
  })


  return(
    <>
    <div style={{"marginLeft":"15%"}}><AdmSidenav/></div>
    <div style={{"marginLeft":"17%"}}>
      <div class="container">

      <div class="container">
        <div class="row"></div>
        <div class="col-sm-1">
        <img src={adminicon} style={{"height":"85px","width":"85px","marginTop":"10px"}}/>
        </div>
      <div class="col-sm-11" style={{"paddingLeft":"30px"}}>
        <h1 style={{"fontWeight":"bold","color":"#5870c7"}}>Welcome back Admin </h1>
        <h5 style={{"color":"#5870c7"}}>These are the registered users. You can view , delete and block the registered user.</h5>
        </div>
        </div>

        <div class="container">
          <div class="row">
          <div class="col-sm-12">
            <div class="w3-round-xlarge w3-panel w3-card-2  w3-hover-shadow" style={{"padding":"20px"}}>
            <div style={{"textAlign":"center"}}>
    
            <hr class="hrstylecard" style={{"marginLeft":"200px","marginRight":"200px","marginBottom":"0px"}}></hr>
                <h3 style={{"fontSize":"25px","letterSpacing":"2px","color":"#a16fbf","fontWeight":"650"}}>
                  <center>Manage Registered Users</center>
              </h3>
              <hr class="hrstylecard" style={{"marginLeft":"200px","marginRight":"200px"}}></hr>
  </div>
      <table class="table table-striped" >
  <thead >
    <tr>
    <th scope="col">Id</th>
      <th scope="col">User Name</th>
      <th scope="col">Email</th>
      <th scope="col">Date of joining</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {
      getusermanage.map((element,id)=>{
        return(
          <>
              <tr>
      <th scope="row">{id+1}</th>
      <td>{element.uname}</td>
      <td>{element.email}</td>
      <td>{element.date.substring(0,10)}</td>

      <td>
      <i style={{"fontSize":"23px","backgroundColor":"#fc486f","color":"white","borderRadius":"10px","padding":"9px"}} onClick={ ()=>blockusers(element._id)} class="fa " data-toggle="tooltip"  title="Block">&#xf023;</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <i style={{"fontSize":"23px","backgroundColor":"#F44531","color":"white","borderRadius":"10px","padding":"8px"}}  onClick={ ()=>deleteusermanage(element._id)} class="fa" data-toggle="tooltip" title="Delete">&#xf014;</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={`userprofile/${element._id}`}><i style={{"fontSize":"20px","backgroundColor":"#359535","color":"white","borderRadius":"10px","padding":"8px"}}  class='far' data-toggle="tooltip"  title="View"  data-target="#exampleModal" >&#xf06e;</i></Link>
      </td>
   </tr>
          </>
        )
      })
    }
     </tbody>
</table>
</div>
</div>
</div>
</div>
      </div>
    </div>

    </>
  );
};
export default Manageuser



 