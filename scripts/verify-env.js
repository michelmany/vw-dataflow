#!/usr/bin/env node

/**
 * Environment Variables Verification Checklist
 * Run: node scripts/verify-env.js
 */

console.log('🔍 Environment Variables Verification Checklist');
console.log('');

console.log('📋 Check these in your Vercel Dashboard:');
console.log('─'.repeat(50));
console.log('Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables');
console.log('');

console.log('✅ Required Variables:');
console.log('1. UPSTASH_REDIS_REST_URL');
console.log('   Value: https://game-hare-35167.upstash.io');
console.log('   ❗ Make sure there\'s no trailing slash');
console.log('');

console.log('2. UPSTASH_REDIS_REST_TOKEN');
console.log('   Value: [Your token from Upstash dashboard]');
console.log('   ❗ This should be a long string starting with "A..."');
console.log('');

console.log('🔧 How to get the token (if missing):');
console.log('─'.repeat(50));
console.log('1. Go to: https://console.upstash.com/redis');
console.log('2. Click on "w-dataflow0users" database');
console.log('3. Scroll to "REST API" section');
console.log('4. Copy "UPSTASH_REDIS_REST_TOKEN"');
console.log('');

console.log('⚙️ Environment Settings:');
console.log('─'.repeat(50));
console.log('Make sure both variables are set for:');
console.log('• Production');
console.log('• Preview');
console.log('• Development');
console.log('');

console.log('🚀 After adding variables:');
console.log('─'.repeat(50));
console.log('1. Redeploy your project (or push new commit)');
console.log('2. Check function logs in Vercel dashboard');
console.log('3. Look for "Redis config check" in logs');
console.log('');

console.log('🆘 If still failing:');
console.log('─'.repeat(50));
console.log('• Check Vercel function logs for detailed error info');
console.log('• Verify Redis URL is exactly: https://game-hare-35167.upstash.io');
console.log('• Make sure token doesn\'t have extra spaces/characters');
console.log('• Try creating a new deployment after env var changes');
console.log('');

console.log('The API now has fallback mode - it will work with default data even if Redis fails!');
