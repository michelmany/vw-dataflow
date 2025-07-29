#!/usr/bin/env node

/**
 * Upstash Redis Setup Helper
 * Run: node scripts/setup-upstash.js
 */

console.log('🚀 Setting up Upstash Redis for User Management');
console.log('');

console.log('📋 Your Database Info:');
console.log('─'.repeat(50));
console.log('Database Name: w-dataflow0users');
console.log('Redis URL: https://game-hare-35167.upstash.io');
console.log('');

console.log('🔧 Required Environment Variables:');
console.log('─'.repeat(50));
console.log('You need to add these to your Vercel project:');
console.log('');
console.log('1. UPSTASH_REDIS_REST_URL');
console.log('   Value: https://game-hare-35167.upstash.io');
console.log('');
console.log('2. UPSTASH_REDIS_REST_TOKEN');
console.log('   Value: [Get this from your Upstash dashboard]');
console.log('');

console.log('📍 How to get the token:');
console.log('─'.repeat(50));
console.log('1. Go to your Upstash dashboard');
console.log('2. Click on your "w-dataflow0users" database');
console.log('3. Scroll down to "REST API" section');
console.log('4. Copy the "UPSTASH_REDIS_REST_TOKEN" value');
console.log('');

console.log('🔧 Add to Vercel:');
console.log('─'.repeat(50));
console.log('1. Go to your Vercel project dashboard');
console.log('2. Settings → Environment Variables');
console.log('3. Add both variables (for all environments)');
console.log('');

console.log('🧪 Local Development:');
console.log('─'.repeat(50));
console.log('Create .env.local file with:');
console.log('UPSTASH_REDIS_REST_URL=https://game-hare-35167.upstash.io');
console.log('UPSTASH_REDIS_REST_TOKEN=your_token_here');
console.log('');

console.log('✅ Once set up, your API will:');
console.log('• Store user data persistently in Redis');
console.log('• Maintain state across deployments');
console.log('• Scale automatically with your app');
console.log('• Handle CRUD operations reliably');
console.log('');

console.log('🔗 Next: Deploy and test your API! 🚀');
