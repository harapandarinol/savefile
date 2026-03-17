async function loadWorkspace() {
  const el = document.getElementById("workspaces");
  el.innerHTML = `<div class="col-span-full text-center py-10 text-slate-500"><i class='bx bx-loader-alt bx-spin text-3xl'></i><p class="mt-2">Memuat workspace...</p></div>`;

  const res = await api({
    action: "listWorkspace",
    token: localStorage.token
  });

  el.innerHTML = ""; 

  if (res && res.status === "success") {
    if (res.data.length === 0) {
      el.innerHTML = `
        <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
          <i class='bx bx-folder-open text-5xl text-slate-300 mb-3'></i>
          <p class="text-slate-500">Belum ada workspace.</p>
        </div>`;
      return;
    }

    res.data.forEach(ws => {
      // Desain Card Modern menggunakan Tailwind
      el.innerHTML += `
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onclick="openWorkspace('${ws.id}', '${ws.name}')">
        <div class="flex justify-between items-start mb-4">
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <i class='bx bx-folder text-2xl'></i>
          </div>
          <button class="text-slate-400 hover:text-slate-600" onclick="event.stopPropagation(); alert('ID: ${ws.id}')">
            <i class='bx bx-info-circle text-xl'></i>
          </button>
        </div>
        <h3 class="text-lg font-bold text-slate-800 truncate">${ws.name}</h3>
        <p class="text-xs text-slate-400 mt-1 truncate">ID: ${ws.id}</p>
      </div>
      `;
    });
  } else {
    el.innerHTML = `<p class="col-span-full text-red-500 text-center py-5">Gagal memuat workspace.</p>`;
  }
}

function openWorkspace(id, name) {
  localStorage.workspace = id;
  localStorage.workspaceName = name; 
  window.location = "workspace.html";
}

async function createWorkspace() {
  const name = prompt("Masukkan nama Workspace baru:");
  if(!name) return;

  const res = await api({
    action: "createWorkspace",
    token: localStorage.token,
    name: name,
    email: localStorage.email || "unknown" 
  });

  if(res && res.status === "success") {
    loadWorkspace();
  } else {
    alert(res ? res.message : "Gagal membuat workspace");
  }
}

// Cek login saat halaman dimuat
if(!localStorage.token) window.location = "index.html";
loadWorkspace();
