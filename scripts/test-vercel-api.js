#!/usr/bin/env node

/**
 * Test script for the Vercel API function
 * This simulates how the API will work in production
 */

// Mock Vercel request/response for testing
function createMockRequest(method = 'GET', query = {}, body = null) {
  return {
    method,
    query,
    body,
    headers: { 'content-type': 'application/json' },
  };
}

function createMockResponse() {
  let statusCode = 200;
  let headers = {};
  let responseData = null;

  return {
    status: code => {
      statusCode = code;
      return mockResponse;
    },
    setHeader: (key, value) => {
      headers[key] = value;
      return mockResponse;
    },
    json: data => {
      responseData = data;
      console.log(
        `📤 Response [${statusCode}]:`,
        JSON.stringify(data, null, 2)
      );
      return mockResponse;
    },
    getStatus: () => statusCode,
    getData: () => responseData,
  };
}

async function testVercelAPI() {
  console.log('🚀 Testing Vercel API function locally...\n');

  try {
    // Import the API handler
    const handler = require('../api/users.ts').default;

    // Test 1: GET all users
    console.log('1. Testing GET /api/users');
    const mockResponse1 = createMockResponse();
    await handler(createMockRequest('GET'), mockResponse1);
    console.log('');

    // Test 2: GET single user
    console.log('2. Testing GET /api/users/1');
    const mockResponse2 = createMockResponse();
    await handler(createMockRequest('GET', { id: '1' }), mockResponse2);
    console.log('');

    // Test 3: POST new user
    console.log('3. Testing POST /api/users');
    const mockResponse3 = createMockResponse();
    const newUser = {
      name: 'API Test User',
      email: 'api-test@example.com',
      role: 'editor',
      status: 'active',
      team: 'development',
    };
    await handler(createMockRequest('POST', {}, newUser), mockResponse3);
    console.log('');

    // Test 4: Invalid method
    console.log('4. Testing invalid method PUT');
    const mockResponse4 = createMockResponse();
    await handler(createMockRequest('PUT'), mockResponse4);
    console.log('');

    console.log('🎉 Vercel API function tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the API function is properly built');
    process.exit(1);
  }
}

// Run the test
testVercelAPI();
