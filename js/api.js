
const API="https://script.google.com/macros/s/AKfycbzfmdi1Rwu4egLZQSjJArvncBKXk9udBxOX7sWOPIDSyD9pw7wEO34cTXAcXBFPye_r/exec"

async function api(data){

const res=await fetch(API,{
method:"POST",
body:JSON.stringify(data)
})

return await res.json()

}
