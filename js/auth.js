async function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API,{
    method:"POST",
    body: JSON.stringify({
      action:"login",
      email,
      password
    })
  });

  const data = await res.json();

  if(data.status === "ok"){
    window.location = "dashboard.html";
  }else{
    alert("Login gagal");
  }
}
