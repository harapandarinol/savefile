const API = "https://script.google.com/macros/s/AKfycbxjduRD07IdyXwZ5yCDzBpOb4MckngYhvZz0R6Kfg1J1tx9KJnGzckv82RFtVm-7Po/exec";
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
