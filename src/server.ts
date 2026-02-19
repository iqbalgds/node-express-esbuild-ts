import express from "express";
import nunjucks from 'nunjucks';
import path from "path";

const app = express();
const PORT = 3000;

const TEMPLATE_DIR = path.join(__dirname, 'views');

// --- Configure Nunjucks ---
const env = nunjucks.configure(
  [
    "node_modules/govuk-frontend/dist",
    TEMPLATE_DIR
  ],
  {
    autoescape: true, // Recommended for security (prevents XSS)
    express: app,     // Important: links the Nunjucks environment to Express
    watch: true,      // Automatically reloads templates when they change (Development only)
    noCache: true,    // Disables template caching (Development only)
  }
);

app.set('views', TEMPLATE_DIR);

app.set('view engine', 'njk');



// Resolve the absolute path to the "public" directory
const publicPath = path.join(__dirname, "..", "public");


// Serve static files from "public"
app.use(express.static(publicPath));

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

interface PageContext {
  title: string;
  username: string;
  productCount: number;
}

// Fallback route to serve index.html for the root
app.get("/", (req, res) => {
  const data: PageContext = {
    title: 'Welcome to the App',
    username: 'TypeScript User',
    productCount: 42
  };

  console.log('== Root')

  res.render('layout.njk', data)
});



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
