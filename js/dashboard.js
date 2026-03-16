
async function loadWorkspace(){

const res=await api({
action:"listWorkspace",
token:localStorage.token
})

const el=document.getElementById("workspaces")
el.innerHTML=""

res.data.forEach(id=>{

el.innerHTML+=`
<div class="card">
<h3>${id}</h3>
<button onclick="openWorkspace('${id}')">Open</button>
</div>
`

})

}

function openWorkspace(id){

localStorage.workspace=id
location="workspace.html"

}

async function createWorkspace(){

const name=prompt("Workspace name")

await api({
action:"createWorkspace",
token:localStorage.token,
name
})

loadWorkspace()

}

loadWorkspace()
