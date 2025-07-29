#!/usr/bin/env node

/**
 * Helper script to get Vercel project information
 * Run: node scripts/get-vercel-info.js
 *
 * You'll need to:
 * 1. Install Vercel CLI: npm install -g vercel
 * 2. Login to Vercel: vercel login
 * 3. Link your project: vercel link
 */

const fs = require('fs');
const path = require('path');

try {
  console.log('🔍 Getting Vercel project information...\n');

  // Check if .vercel directory exists
  const vercelDir = path.join(process.cwd(), '.vercel');
  const projectJsonPath = path.join(vercelDir, 'project.json');

  if (fs.existsSync(projectJsonPath)) {
    const projectInfo = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));

    console.log('📋 Found Vercel project configuration:');
    console.log('─'.repeat(50));
    console.log(`VERCEL_PROJECT_ID: ${projectInfo.projectId}`);
    console.log(`VERCEL_ORG_ID: ${projectInfo.orgId}`);
    console.log('─'.repeat(50));
    console.log('\n🔐 You also need to create a VERCEL_TOKEN:');
    console.log('1. Go to https://vercel.com/account/tokens');
    console.log('2. Create a new token');
    console.log('3. Add it as VERCEL_TOKEN in GitHub secrets');
    console.log('\n🚀 GitHub Repository Secrets to add:');
    console.log('─'.repeat(50));
    console.log('Name: VERCEL_PROJECT_ID');
    console.log(`Value: ${projectInfo.projectId}`);
    console.log();
    console.log('Name: VERCEL_ORG_ID');
    console.log(`Value: ${projectInfo.orgId}`);
    console.log();
    console.log('Name: VERCEL_TOKEN');
    console.log('Value: [Your token from vercel.com/account/tokens]');
    console.log('─'.repeat(50));
  } else {
    console.log('❌ No Vercel project configuration found.');
    console.log('\n📝 To set up Vercel:');
    console.log('1. Install Vercel CLI: npm install -g vercel');
    console.log('2. Login: vercel login');
    console.log('3. Link project: vercel link');
    console.log('4. Run this script again: node scripts/get-vercel-info.js');
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n📝 Make sure you have:');
  console.log('1. Installed Vercel CLI: npm install -g vercel');
  console.log('2. Logged in: vercel login');
  console.log('3. Linked project: vercel link');
}
