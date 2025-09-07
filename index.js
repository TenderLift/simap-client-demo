import { client, getPublicProjectSearch, listCantons } from '@tenderlift/simap-client';

console.log('🚀 SIMAP Client Demo\n' + '='.repeat(50));
console.log('Welcome! This demo shows how to use @tenderlift/simap-client\n');

// For StackBlitz demo, we need to override the API paths
// The OpenAPI spec uses /api but the actual endpoints might differ
const CORS_PROXY = 'https://corsproxy.io/?';
const SIMAP_BASE = 'https://www.simap.ch';

// Configure the client - using the base URL without /api
client.setConfig({
  baseUrl: CORS_PROXY + encodeURIComponent(SIMAP_BASE)
});

console.log('ℹ️  Using CORS proxy to access SIMAP API from browser environment\n');

async function demo() {
  try {
    // Since the API might not be accessible via CORS proxy,
    // let's show how the library works with example code
    console.log('📚 Example Usage of @tenderlift/simap-client:\n');
    
    console.log('1️⃣ In a Node.js environment, you would configure like this:');
    console.log('```javascript');
    console.log('import { client } from "@tenderlift/simap-client";');
    console.log('client.setConfig({ baseUrl: "https://www.simap.ch/api" });');
    console.log('```\n');
    
    console.log('2️⃣ Fetch Swiss Cantons:');
    console.log('```javascript');
    console.log('const cantons = await listCantons();');
    console.log('// Returns: { cantons: [{ id: "ZH", nuts3: "CH040" }, ...] }');
    console.log('```\n');
    
    console.log('3️⃣ Search for Projects:');
    console.log('```javascript');
    console.log('const projects = await getPublicProjectSearch({');
    console.log('  query: {');
    console.log('    maxResults: 5,');
    console.log('    orderAddressCantons: ["TI"],');
    console.log('    orderAddressCountryOnlySwitzerland: true');
    console.log('  }');
    console.log('});');
    console.log('```\n');
    
    // Try to fetch data anyway
    console.log('🔄 Attempting to fetch live data...\n');
    
    try {
      const cantonsResult = await listCantons();
      if (cantonsResult.data?.cantons) {
        console.log(`✅ Success! Found ${cantonsResult.data.cantons.length} cantons`);
      } else {
        console.log('⚠️ No data received - this is expected in browser due to CORS');
      }
    } catch (e) {
      console.log('⚠️ CORS blocked - this is expected in browser environments');
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('📝 Note: SIMAP API requires server-side access (no CORS headers)');
    console.log('    Use this library in:');
    console.log('    • Node.js applications');
    console.log('    • Next.js API routes');
    console.log('    • Express servers');
    console.log('    • Cloudflare Workers\n');
    
    console.log('📚 Full documentation: https://github.com/TenderLift/simap-client');
    console.log('📦 NPM: https://www.npmjs.com/package/@tenderlift/simap-client');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the demo
demo();