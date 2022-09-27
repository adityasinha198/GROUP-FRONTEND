
function messages(event){
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
    })
    .catch(err => console.log(err))
}
