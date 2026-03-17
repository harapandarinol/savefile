const API = "https://script.google.com/macros/s/AKfycbxdRznNS6s4VneF2kPLl7J7fBRAcHzAj66D5bRIA4TdONgA4_gek8SU-aGzLn9CMYM3/exec";
let isLoading = false;
async function api(data) {
    if (isLoading) {
        console.warn("Request already in progress");
        return null;
    }
    isLoading = true;
    try {
        const res = await fetch(API, { method: "POST", body: JSON.stringify(data) });
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("API Error:", error);
        return { status: "error", message: error.message };
    } finally {
        isLoading = false;
    }
}
