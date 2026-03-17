const API = "https://script.google.com/macros/s/AKfycbxJukz7Op1fJ01P170-rou-t3nDoKKtPW_KiRDXohZlvi4B6zudE1Xhrvv6EXTG11TQ/exec";
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
