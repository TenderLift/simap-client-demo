import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { client, listCantons, getPublicProjectSearch } from '@tenderlift/simap-client';

const app = new Hono();

// Configure SIMAP client
client.setConfig({ 
  baseUrl: 'https://www.simap.ch/api' 
});

// API route - proxy to avoid CORS
app.get('/api/cantons', async (c) => {
  try {
    const result = await listCantons();
    return c.json(result.data || { cantons: [] });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/api/projects', async (c) => {
  try {
    const result = await getPublicProjectSearch({
      query: {
        maxResults: 5,
        orderAddressCountryOnlySwitzerland: true
      }
    });
    return c.json(result.data || { projects: [] });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Minimal but nice UI
app.get('/', (c) => c.html(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SIMAP Client Demo</title>
  <style>
    body { font-family: system-ui; max-width: 1200px; margin: 40px auto; padding: 0 20px; }
    h1 { color: #333; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .panel { border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
    pre { background: #f5f5f5; padding: 15px; border-radius: 4px; overflow-x: auto; }
    .loading { color: #666; }
    .error { color: #d00; }
    button { padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background: #0056b3; }
  </style>
</head>
<body>
  <h1>🚀 SIMAP Client Demo</h1>
  <p>Live data from Swiss Public Procurement API via @tenderlift/simap-client</p>
  
  <div class="grid">
    <div class="panel">
      <h2>📍 Swiss Cantons</h2>
      <button onclick="loadCantons()">Refresh Cantons</button>
      <pre id="cantons" class="loading">Loading...</pre>
    </div>
    
    <div class="panel">
      <h2>📋 Recent Projects</h2>
      <button onclick="loadProjects()">Refresh Projects</button>
      <pre id="projects" class="loading">Loading...</pre>
    </div>
  </div>
  
  <script>
    async function loadCantons() {
      const el = document.getElementById('cantons');
      el.className = 'loading';
      el.textContent = 'Loading...';
      try {
        const res = await fetch('/api/cantons');
        const data = await res.json();
        el.className = '';
        el.textContent = JSON.stringify(data, null, 2);
      } catch (e) {
        el.className = 'error';
        el.textContent = 'Error: ' + e.message;
      }
    }
    
    async function loadProjects() {
      const el = document.getElementById('projects');
      el.className = 'loading';
      el.textContent = 'Loading...';
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        el.className = '';
        el.textContent = JSON.stringify(data, null, 2);
      } catch (e) {
        el.className = 'error';
        el.textContent = 'Error: ' + e.message;
      }
    }
    
    // Load data on page load
    loadCantons();
    loadProjects();
  </script>
</body>
</html>
`));

// Start server
serve({
  fetch: app.fetch,
  port: 3000
});

console.log('🚀 SIMAP Demo server running on http://localhost:3000');