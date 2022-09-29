function groups(event){
    event.preventDefault()
    console.log("In it")

    const group  = event.target.group.value
    console.log(group)
    const obj = {
        group
    }
    
const token = localStorage.getItem("token")

    axios.post("http://localhost:8000/creategroup",obj,{headers :{"Authorisation": token}})
    .then( res =>{
        console.log(res.data.groupId)
        const groupid = res.data.groupId
        localStorage.setItem("groupid",groupid)
        //location.replace("./chatapp.html")
    })
    .catch(err => console.log(err))

    axios.get("http://localhost:8000/addmember")
    .then(members => {
        console.log(members.data)
        let info = members.data
         addmemberonscreen(info)

    })
    .catch(err => console.log(err) 
    )
}


function addmemberonscreen(info){
    const addmember = document.getElementById("addmember")
    for(let i=0;i<info.length;i++){
        const userid = info[i].id
        const username = info[i].username
        const user = document.createElement("li")
        const btn = document.createElement("button")
        btn.id = `${userid}`
        btn.setAttribute("onclick",`add(${userid})`)
        btn.innerHTML = `${userid} - ${username}`
        user.appendChild(btn)
        addmember.appendChild(user)

    }
    const startchat = document.getElementById("startchat")
    const btn = document.createElement("button")
    const link = document.createElement("a")
    link.setAttribute("href","./chatapp.html")
    link.setAttribute("style","text-decoration:none")
    link.innerHTML = `Start Chating`
    btn.appendChild(link)
    startchat.appendChild(btn)


    
   
}
function add(userid){
    const groupid = localStorage.getItem("groupid")
    console.log(groupid,"H bhai")
    console.log(userid,"nabhai")
    let obj = {
        userid,
        groupid
    }

    axios.post("http://localhost:8000/addgroupmember",obj)
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))

}
