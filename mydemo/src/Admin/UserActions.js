import {Box ,IconButton,Tooltip} from '@mui/material';
import {Block,Delete} from '@mui/icons-material';

import React from 'react'

const UserActions = () => {

    // const deletebudget=async(id)=>
    // {
    //   const delbudget=await fetch(`/deletebudgetapi/${id}`,
    //   {
    //     method:"DELETE",
    //     headers:{
    //       "Content-Type":"application/JSON"
    //     }
    //   });
    //   const deletebudgetdata=await delbudget.json();
      
  
    //   if(delbudget.status===422 || !deletebudgetdata){
    //     console.log("error");
    //   }
    //   else{
    //     alert("Budget Deleted")
    //     console.log("User deleted");
    //     viewbudget();
    //   }
    // }

  return (
    <Box>
        <Tooltip title="Block the User">
            <IconButton onClick={()=>{}}>
                <Block/>
            </IconButton>
        </Tooltip>
        &nbsp;&nbsp;&nbsp;
        <Tooltip title="Delete the User">
            <IconButton onClick={()=>{}}>
                <Delete/>
            </IconButton>
        </Tooltip>
    </Box>
  )
}

export default UserActions