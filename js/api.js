
const API="https://script.google.com/macros/s/AKfycbzsCc-PaMe0ySylcJS8iCwJCqGvQawxA36cLBgPSFEenI62jaUaSTcn4evR8klzK_KE/exec"

async function api(data){

const res=await fetch(API,{
method:"POST",
body:JSON.stringify(data)
})

return await res.json()

}
