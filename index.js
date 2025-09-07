import { client, getPublicProjectSearch, listCantons } from '@tenderlift/simap-client';

// Configure the client
client.setConfig({
  baseUrl: 'https://www.simap.ch/api'
});

console.log('🚀 SIMAP Client Demo\n' + '='.repeat(50));
console.log('Welcome! This demo shows how to use @tenderlift/simap-client\n');

async function demo() {
  try {
    // 1. Fetch Swiss Cantons
    console.log('📍 Fetching Swiss Cantons...');
    const cantonsResult = await listCantons();
    
    if (cantonsResult.data?.cantons) {
      console.log(`✅ Found ${cantonsResult.data.cantons.length} cantons:`);
      cantonsResult.data.cantons.slice(0, 3).forEach(canton => {
        console.log(`   - ${canton.id}`);
      });
      console.log('   ...\n');
    }

    // 2. Search for recent projects
    console.log('🔍 Searching for recent projects in Zurich...');
    const projectsResult = await getPublicProjectSearch({
      query: {
        maxResults: 3,
        orderAddressCantons: ['ZH']
      }
    });

    if (projectsResult.data?.projects && projectsResult.data.projects.length > 0) {
      console.log(`✅ Found ${projectsResult.data.projects.length} projects:\n`);
      
      projectsResult.data.projects.forEach((project, i) => {
        console.log(`📋 Project ${i + 1}:`);
        console.log(`   Title: ${project.title || 'Untitled'}`);
        console.log(`   ID: ${project.id}`);
        console.log(`   Status: ${project.status || 'Unknown'}`);
        console.log('');
      });
    } else {
      console.log('No projects found.\n');
    }

    console.log('='.repeat(50));
    console.log('✨ Demo complete! Edit this code to explore more.');
    console.log('\n📚 Docs: https://github.com/TenderLift/simap-client');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nNote: SIMAP API might have CORS restrictions.');
    console.log('This demo works best in Node.js environments.');
  }
}

// Run the demo
console.log('Starting demo...\n');
demo();