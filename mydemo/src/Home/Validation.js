// function Validation(getuserdata){
//     let error = {}
//     const email_pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
//     const pwd_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(a-zA-Z0-9){8,}$/
//     if(!email_pattern.test(getuserdata.email))
//     {
//         error.email = "Email should be valid"
//     }
//     else if(!pwd_pattern.test(getuserdata.pwd))
//     {
//         error.pwd =  "Password should contain special characters,both upper and lower case characters and must be atleast 8 characters long";
//     }
//     return error;
// }

// export default Validation;