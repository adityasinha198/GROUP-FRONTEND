function login(event){
    event.preventDefault();
    
    const emailid=event.target.emailid.value;
    const password=event.target.password.value;
    console.log(emailid)
    const obj = {
        emailid,
        password
    }
   
   axios.post("http://localhost:8000/login",obj)
    .then(res => {
        console.log(res.data.token)
        const token = res.data.token
        //const ispremiumuser = res.data.ispremiumuser
        
        localStorage.setItem("token",token)
        //localStorage.setItem('ispremiumuser',ispremiumuser)
        
        alert("Logged in successfully")
        location.replace('/chatapp.html')
    })
    .catch(err=>{
        if(err.response.status==404){
            alert("User not found")
        }
        if(err.response.status==401){
            alert("Unauthorised access")
        }
        
    })
}

