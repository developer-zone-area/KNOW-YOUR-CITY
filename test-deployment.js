// Test deployed API
const https = require('https');

console.log('🧪 Testing Your Deployment...\n');

// Test 1: Backend Root
console.log('1️⃣ Testing Backend Root...');
https.get('https://know-your-city.onrender.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`   Status: ${res.statusCode}`);
    console.log(`   Response: ${data}`);
    console.log('');
  });
}).on('error', (err) => {
  console.log(`   ❌ Error: ${err.message}\n`);
});

// Test 2: Backend Cities API
setTimeout(() => {
  console.log('2️⃣ Testing Backend Cities API...');
  https.get('https://know-your-city.onrender.com/api/cities', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log(`   Status: ${res.statusCode}`);
      if (res.statusCode === 200) {
        const cities = JSON.parse(data);
        console.log(`   ✅ Cities returned: ${cities.length}`);
        console.log(`   ✅ First city: ${cities[0]?.name}`);
      } else {
        console.log(`   Response: ${data}`);
      }
      console.log('');
    });
  }).on('error', (err) => {
    console.log(`   ❌ Error: ${err.message}\n`);
  });
}, 1000);

// Test 3: Backend Stats API
setTimeout(() => {
  console.log('3️⃣ Testing Backend Stats API...');
  https.get('https://know-your-city.onrender.com/api/stats', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Response: ${data}`);
      console.log('');
    });
  }).on('error', (err) => {
    console.log(`   ❌ Error: ${err.message}\n`);
  });
}, 2000);

// Test 4: Frontend
setTimeout(() => {
  console.log('4️⃣ Testing Frontend...');
  https.get('https://know-your-city-theta.vercel.app/', (res) => {
    console.log(`   Status: ${res.statusCode}`);
    console.log(`   Frontend is ${res.statusCode === 200 ? '✅ UP' : '❌ DOWN'}`);
    console.log('');
  });
}, 3000);


