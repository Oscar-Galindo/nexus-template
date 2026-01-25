#!/usr/bin/env node

/**
 * Build Protected
 * 
 * Builds the project but removes sensitive files from the output
 * Useful for deploying to untrusted environments or creating demos
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔒 Building Protected Version...\n');

// Files/folders to remove from dist
const sensitivePatterns = [
  'dist/**/*.env*',
  'dist/**/config.json',
  'dist/**/secrets/**',
];

// Build the project
console.log('1️⃣ Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build complete\n');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Remove sensitive files
console.log('2️⃣ Removing sensitive files...');

const distPath = path.join(process.cwd(), 'dist');

function removeSensitiveFiles(dir) {
  if (!fs.existsSync(dir)) return;

  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recurse into subdirectories
      removeSensitiveFiles(fullPath);
      
      // Remove empty directories
      if (fs.readdirSync(fullPath).length === 0) {
        fs.rmdirSync(fullPath);
      }
    } else {
      // Check if file should be removed
      if (
        item.includes('.env') ||
        item.includes('secret') ||
        item.includes('private') ||
        item === 'config.json'
      ) {
        console.log(`   🗑️  Removing: ${path.relative(process.cwd(), fullPath)}`);
        fs.unlinkSync(fullPath);
      }
    }
  });
}

removeSensitiveFiles(distPath);
console.log('✅ Sensitive files removed\n');

// Create build info
console.log('3️⃣ Creating build info...');
const buildInfo = {
  buildDate: new Date().toISOString(),
  protected: true,
  nexusVersion: '1.0.0',
};

fs.writeFileSync(
  path.join(distPath, 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
);
console.log('✅ Build info created\n');

console.log('='.repeat(50));
console.log('✅ PROTECTED BUILD COMPLETE!');
console.log('='.repeat(50));
console.log('\nSafe to deploy: ./dist/');
console.log('All sensitive files have been removed.\n');
