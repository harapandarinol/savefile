async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  // Ambil elemen-elemen UI
  const btn = document.getElementById("login-btn");
  const btnText = document.getElementById("btn-text");
  const btnIcon = document.getElementById("btn-icon");
  const errorContainer = document.getElementById("error-container");
  const errorText = document.getElementById("error");

  // Reset tampilan error
  errorContainer.classList.add("hidden");
  errorText.innerText = "";

  // Validasi awal jika kosong
  if (!email || !password) {
    errorText.innerText = "Email dan password harus diisi.";
    errorContainer.classList.remove("hidden");
    return;
  }

  // --- EFEK LOADING DIMULAI ---
  btn.disabled = true;
  btn.classList.add("opacity-75", "cursor-not-allowed");
  btnText.innerText = "Mengecek data...";
  btnIcon.className = "bx bx-loader-alt bx-spin text-xl"; // Ikon berputar

  // Panggil API (memakai fungsi api() dari js/api.js)
  const data = await api({
    action: "login",
    email: email,
    password: password
  });

  // --- CEK HASIL ---
  if (data && data.status === "success") {
    // Simpan data login
    localStorage.token = data.token;
    localStorage.email = data.email; 
    
    // EFEK SUKSES: Tombol jadi hijau dan centang
    btnText.innerText = "Berhasil!";
    btnIcon.className = "bx bx-check text-2xl";
    btn.classList.remove("bg-indigo-600", "hover:bg-indigo-700", "shadow-indigo-200");
    btn.classList.add("bg-green-500", "hover:bg-green-600", "shadow-green-200");

    // Tunggu setengah detik biar user lihat efek suksesnya, baru pindah halaman
    setTimeout(() => {
      window.location = "dashboard.html";
    }, 500);

  } else {
    // EFEK GAGAL: Kembalikan tombol seperti semula
    btn.disabled = false;
    btn.classList.remove("opacity-75", "cursor-not-allowed");
    btnText.innerText = "Masuk";
    btnIcon.className = "bx bx-right-arrow-alt text-xl";
    
    // Tampilkan pesan error dari server
    errorText.innerText = data ? data.message : "Terjadi kesalahan jaringan";
    errorContainer.classList.remove("hidden");
  }
}

// Fitur tambahan: Tekan tombol 'Enter' di keyboard akan otomatis menekan tombol Login
function handleEnter(e) {
  if (e.key === 'Enter') {
    login();
  }
}
