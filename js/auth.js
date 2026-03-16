
async function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const res=await api({
action:"login",
email,
password
})

if(res.status==="success"){

localStorage.token=res.token
window.location="dashboard.html"

}else{

alert("Login gagal")

}

}
