window.addEventListener("DOMContentLoaded",async () =>{
    const token = localStorage.getItem("token")

    const groupid  = localStorage.getItem("groupid")
    try {

    const res = await axios.get(`http://localhost:8000/makeadmin/${groupid}`,{headers :{"Authorisation": token}})
    console.log(res)
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
    btn.setAttribute("onclick",`makeadmin(${userid})`)
    btn.innerHTML = `${username}`
    list.appendChild(btn)
    groupmembers.appendChild(list)
    }
}

async function makeadmin(userid){
    const groupid = localStorage.getItem("groupid")

    console.log(userid,groupid)

    const obj = {
        groupid,
        userid
    }

    try{

    const res = await axios.post("http://localhost:8000/makeadmin",obj)

    console.log(res)
    }
    
    catch(err){

        console.log(err)
        
    }
    

    
}