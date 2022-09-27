window.addEventListener("DOMContentLoaded",() => {
    
    axios.get("http://localhost:8000/message")
    .then(res => {
        console.log(res.data)
        const info = res.data
        
          showNewUserOnScreen(info)
    //     for(let i=0;i<res.data.messages.length;i++){
    //         const messagelist = document.getElementById("messagelist")
    //         const usermessage = document.createElement("li")
    //         const username = res.data.messages[i].username
    //         console.log(username)
                
    //         const message = res.data.messages[i].message
    //         console.log(message)
    //         usermessage.innerHTML = `${username} -  ${message}`
    //         messagelist.appendChild(usermessage)
    //     }
    // }
    })
.catch(err => console.log(err))

})


function messages(event){
    event.preventDefault()
    //event.preventdefault()
    console.log("Hello")
    const token = localStorage.getItem("token")
    console.log(token)

    const message = event.target.message.value
    console.log(message)
    const obj = {
        message
    }

    axios.post("http://localhost:8000/message",obj,{headers :{"Authorisation": token}})
    .then(res =>{
        console.log(res)
        const info = res
        instantshow(info)
    })
    .catch(err => console.log(err))
}


function showNewUserOnScreen(info){
    for(let i=0;i<info.messages.length;i++){
        const messagelist = document.getElementById("messagelist")
        const usermessage = document.createElement("li")
        const username = info.messages[i].username
        //console.log(username)
            
        const message = info.messages[i].message
        //console.log(message)
        usermessage.innerHTML = `${username} -  ${message}`
        messagelist.appendChild(usermessage)
    }
}

function instantshow(info)
{
    const messagelist = document.getElementById("messagelist")
    const usermessage = document.createElement("li")
    const username = info.data.username
    //console.log(username)
        
    const message = info.data.message
    //console.log(message)
    usermessage.innerHTML = `${username} -  ${message}`
    messagelist.appendChild(usermessage)
}




// function showNewUserOnScreen(user){
                
//     const parentNode = document.getElementById(`messagelist`);
//     const childHTML = `<li id=${user.id}> ${user.amount} - ${user.description}-${user.category}
//                             <button onclick=deleteUser('${user.id}','${user.description}')> Delete Expense </button>
//                             <button onclick=editUserDetails('${user.description}','${user.amount}','${user.category}','${user.id}')>Edit Expense </button>
//                          </li>`
    
    
//     parentNode.innerHTML = parentNode.innerHTML + childHTML;
//}