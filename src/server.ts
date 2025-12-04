import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

// Resolve the absolute path to the "public" directory
const publicPath = path.join(__dirname, "..", "public");

// Serve static files from "public"
app.use(express.static(publicPath));

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Fallback route to serve index.html for the root
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
