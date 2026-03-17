async function loadWorkspace() {
  const el = document.getElementById("workspaces");
  el.innerHTML = `<div class="col-span-full text-center py-10 text-slate-500"><i class='bx bx-loader-alt bx-spin text-3xl'></i><p class="mt-2">Memuat workspace...</p></div>`;

  const res = await api({
    action: "listWorkspace",
    token: localStorage.token,
    email: localStorage.email
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
      // Tombol Info diubah menjadi Tombol Copy
      el.innerHTML += `
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onclick="openWorkspace('${ws.id}', '${ws.name}')">
        <div class="flex justify-between items-start mb-4">
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <i class='bx bx-folder text-2xl'></i>
          </div>
          <button class="text-slate-400 hover:text-indigo-600 transition-colors p-1" onclick="event.stopPropagation(); copyId('${ws.id}')" title="Salin ID">
            <i class='bx bx-copy text-xl'></i>
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
    showToast("Workspace berhasil dibuat!");
    loadWorkspace();
  } else {
    showToast(res ? res.message : "Gagal membuat workspace", true);
  }
}

// === FITUR BARU: COPY ID ===
function copyId(id) {
  navigator.clipboard.writeText(id).then(() => {
    showToast("ID Workspace disalin ke clipboard!");
  }).catch(err => {
    showToast("Gagal menyalin ID", true);
    console.error('Error copy:', err);
  });
}

// === FITUR BARU: TOAST NOTIFICATION ===
let toastTimeout; // Variabel untuk mereset timer jika tombol diklik berkali-kali
function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-msg");
  const icon = toast.querySelector("i");

  if (!toast) {
    alert(message); // Fallback jika HTML toast belum ditambahkan
    return;
  }

  // Set Pesan
  toastMsg.innerText = message;

  // Ganti warna & ikon jika error
  if (isError) {
    icon.className = "bx bx-x-circle text-red-400 text-xl";
  } else {
    icon.className = "bx bx-check-circle text-green-400 text-xl";
  }

  // Munculkan Toast (Hapus class transparan dan geser bawah)
  toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  // Reset timer sebelumnya agar tidak bentrok
  clearTimeout(toastTimeout);

  // Sembunyikan otomatis setelah 3 detik
  toastTimeout = setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
  }, 3000);
}

// Cek login saat halaman dimuat
if(!localStorage.token) window.location = "index.html";
loadWorkspace();
