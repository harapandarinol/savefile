
const API="https://script.google.com/macros/s/AKfycbyG_tCoGMZF0RSBotYSPmerdhW6MPVjrJZg1N8SOOWkYoexFBf5gjt10M6ka4RoT-So/exec"

async function api(data){

const res=await fetch(API,{
method:"POST",
body:JSON.stringify(data)
})

return await res.json()

}
