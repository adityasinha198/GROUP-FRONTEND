window.addEventListener("DOMContentLoaded",async () =>{

    const groupid  = localStorage.getItem("groupid")
    const token = localStorage.getItem("token")
    try {

    const res = await axios.get(`http://localhost:8000/makeadmin/${groupid}`,{headers :{"Authorisation": token}})

    if(res.data =="You are not premium user"){
        alert("Not allowed , you are not admin")
    }
    else{
    //console.log(res.data.members)
    const addmembers = res.data.members
    showmembers(addmembers)
    }
    
}

    catch(err ){
        console.log(err)

    }


})

function showmembers(addmembers){

    const groupmembers = document.getElementById("groupmembers")
    for(let i=0;i<addmembers.length;i++){

    const userid = addmembers[i].id
    const username = addmembers[i].username
    const list = document.createElement("li")
    list.setAttribute("style","list-style-type:none")
    const btn = document.createElement("button")
    btn.setAttribute("onclick",`deleteuser(${userid})`)
    btn.innerHTML = `${username}`
    list.appendChild(btn)
    groupmembers.appendChild(list)
    }
}

async function deleteuser(userid){
    const groupid = localStorage.getItem("groupid")

    console.log(userid,groupid)

   
    try{

    const res = await axios.delete("http://localhost:8000/deleteuser",{headers:{ groupid:groupid ,userid:userid}})

    console.log(res)
    }
    
    catch(err){

        console.log(err)
        
    }
    

    
}