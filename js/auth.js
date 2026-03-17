async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("error");

  errorEl.innerText = ""; // Reset pesan error

  // Gunakan wrapper api() dari js/api.js
  const data = await api({
    action: "login",
    email,
    password
  });

  if (data && data.status === "success") {
    localStorage.token = data.token;
    localStorage.email = data.email;
    window.location = "dashboard.html";
  } else {
    // Tampilkan error di UI
    errorEl.innerText = data ? data.message || "Login gagal" : "Terjadi kesalahan jaringan";
  }
}
