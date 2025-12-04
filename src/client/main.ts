console.log("Hello from frontend TypeScript!");

const el = document.getElementById("app");
if (el) {
  el.textContent = "Hello from Frontend TypeScript + esbuild!";
}

// Example of calling the backend API
async function fetchMessage() {
  try {
    const res = await fetch("/api/hello");
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    const data = await res.json();
    console.log("Backend says:", data.message);
  } catch (err) {
    console.error("Error fetching message:", err);
  }
}

fetchMessage();
