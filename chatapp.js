window.addEventListener("DOMContentLoaded",() => {
    setInterval(() => {
        
    ; let abc = JSON.parse(localStorage.getItem("mymessages"))
    // console.log(abc)
    
     let query;
    if(!abc){
        
         query = "abc"
       }
       else{
        let local = abc.messageinfo
        let long = local.length
        //console.log(long)
        
      query = local[long-1].msgid
        //console.log(query)
    
    localmessageonscreen(local)
    

       }
    // console.log(local[0])
     
    axios.get(`http://localhost:8000/message/${query}`)
    .then(res => {
        console.log(res)
        let abc = JSON.parse(localStorage.getItem("mymessages"))
        if(abc){
            let local = abc.messageinfo
            //console.log(res)
            const newmessages = res.data.messages
            if(newmessages.length!=0){
            let newarr = []
            for(let i =0; i<newmessages.length;i++){
                

                    const obj = {
                        msgid:newmessages[i].id,
                        username:newmessages[i].username,
                        message:newmessages[i].message
                    }
                    newarr.push(obj)
                    
                }
                console.log(local)
                console.log(newarr)

            let finalarray = [...local,...newarr]
            console.log(finalarray)
            
            savetolocalstoragenew(finalarray)


                    }
                }

                    else if(!abc){
                        
                        let info = res.data.messages
                        if(info.length == 0){
                            alert("No chats found")
                        }
                        else{
                        savetolocalstorage(info)
                        }

                    }


        
        })
        
        // console.log(res.data)
        // const info = res.data
        // const messagelist = document.getElementById("messagelist")
        // if(messagelist!= null){
        //     messagelist.innerHTML=null
        // }
        
        // savetolocalstorage(info)
      
          //showNewUserOnScreen(info)
   
    
.catch(err => console.log(err))
    },1000)
   
})


function messages(event){
    event.preventDefault()
    //event.preventdefault()
    console.log("Hello")
    const token = localStorage.getItem("token")
   // console.log(token)

    const message = event.target.message.value
    //console.log(message)
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


// function showNewUserOnScreen(info){
//     for(let i=0;i<info.messages.length;i++){
//         const messagelist = document.getElementById("messagelist")
       
//         const usermessage = document.createElement("li")
//         const username = info.messages[i].username
//         //console.log(username)
            
//         const message = info.messages[i].message
//         //console.log(message)
//         usermessage.innerHTML = `${username} -  ${message}`
//         messagelist.appendChild(usermessage)
//     }
// }

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




function savetolocalstorage(info){
    const arr = []
    for(let i=0;i<info.length;i++){
        // console.log(in)

        const obj = {
            msgid:info[i].id,
            username:info[i].username,
            message:info[i].message
        }
        arr.push(obj)
    }
    console.log(arr)

    let mymessages = {
        messageinfo:arr
    }

    localStorage.setItem("mymessages",JSON.stringify(mymessages))
   
    
}

function localmessageonscreen(local){
    const messagelist = document.getElementById("messagelist")
    if(messagelist!= null){
           messagelist.innerHTML=null
        }
    for(let i=0;i<local.length;i++){
        
      
       
        const usermessage = document.createElement("li")
        const username = local[i].username
        //console.log(username)
            
        const message = local[i].message
        //console.log(message)
        usermessage.innerHTML = `${username} -  ${message}`
        messagelist.appendChild(usermessage)
    }


}

function savetolocalstoragenew(info){

    // const arr = []
    // for(let i=0;i<info.length;i++){
        

    //     const obj = {
    //         msgid:info[i].msgid,
    //         username:info[i].username,
    //         message:info[i].message
    //     }
    //     arr.push(obj)
    // }
    // console.log(arr)

    let mymessages = {
        messageinfo:info
    }

    localStorage.setItem("mymessages",JSON.stringify(mymessages))
   
    
}
