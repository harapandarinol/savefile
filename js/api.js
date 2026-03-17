
const API="https://script.google.com/macros/s/AKfycbzrWghxMedUPauaA9LPqhOOHy3yn1oZlauDRhDt6cm5Vdd_iu2MChHzS_ZHXmoPXGgr/exec"

async function api(data){

const res=await fetch(API,{
method:"POST",
body:JSON.stringify(data)
})

return await res.json()

}
