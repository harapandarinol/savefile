
async function loadFiles(){

const res=await api({
action:"listFiles",
workspace:localStorage.workspace
})

const el=document.getElementById("files")
el.innerHTML=""

res.data.forEach(f=>{

el.innerHTML+=`
<div class="file">
<a href="${f.url}" target="_blank">${f.name}</a>
</div>
`

})

}

async function upload(){

const file=document.getElementById("file").files[0]

const reader=new FileReader()

reader.onload=async function(){

const base64=reader.result.split(",")[1]

await api({
action:"uploadFile",
workspace:localStorage.workspace,
name:file.name,
type:file.type,
file:base64
})

loadFiles()

}

reader.readAsDataURL(file)

}

loadFiles()
