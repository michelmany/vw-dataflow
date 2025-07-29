#!/usr/bin/env node

/**
 * Test script to verify the API endpoints work correctly
 * Run this while the development server is running (npm run dev)
 */

const BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');
  console.log(`Using API URL: ${BASE_URL}\n`);

  try {
    // Test GET all users
    console.log('1. Testing GET /users');
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const users = await response.json();
    console.log(`✅ Found ${users.length} users`);
    console.log(`   First user: ${users[0]?.name} (${users[0]?.email})\n`);

    // Test GET single user
    console.log('2. Testing GET /users/1');
    const userResponse = await fetch(`${BASE_URL}/users/1`);

    if (userResponse.ok) {
      const user = await userResponse.json();
      console.log(`✅ Found user: ${user.name} (${user.email})\n`);
    } else {
      console.log(`❌ Failed to get user: ${userResponse.status}\n`);
    }

    // Test POST new user (mock)
    console.log('3. Testing POST /users (simulation)');
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'viewer',
      status: 'active',
      team: 'testing',
    };

    const createResponse = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (createResponse.ok) {
      const created = await createResponse.json();
      console.log(`✅ Created user: ${created.name} with ID ${created.id}\n`);
    } else {
      console.log(`❌ Failed to create user: ${createResponse.status}\n`);
    }

    console.log('🎉 API tests completed successfully!');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n💡 Make sure the development server is running:');
    console.log('   npm run dev');
    process.exit(1);
  }
}

// Run the test
testAPI();
