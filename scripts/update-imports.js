const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const webSrcDir = path.join(rootDir, 'apps/web/src');

// Update import paths in all JS/JSX/TS/TSX files
function updateFileImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update relative imports to use the @/ alias
    content = content.replace(
      /from ['"](?:\.\.?\/)+src\/([^'"]+)['"]/g, 
      'from "@/$1"'
    );
    
    // Update relative imports from components
    content = content.replace(
      /from ['"](?:\.\.?\/)+components\/([^'"]+)['"]/g, 
      'from "@/components/$1"'
    );
    
    // Update other common relative paths
    content = content.replace(
      /from ['"](?:\.\.?\/)+context\/([^'"]+)['"]/g, 
      'from "@/context/$1"'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    console.error(`Error updating imports in ${filePath}:`, error);
  }
}

// Recursively process all files in a directory
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.match(/\.(js|jsx|ts|tsx)$/)) {
      updateFileImports(filePath);
    }
  });
}

console.log('Updating import paths...');
processDirectory(webSrcDir);
console.log('Import paths updated successfully!');

// Update tsconfig.json in web app
const webTsConfigPath = path.join(rootDir, 'apps/web/tsconfig.json');
if (!fs.existsSync(webTsConfigPath)) {
  fs.writeFileSync(
    webTsConfigPath,
    JSON.stringify({
      "extends": "../../tsconfig.json",
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "@/*": ["./src/*"]
        }
      },
      "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
      "exclude": ["node_modules"]
    }, null, 2),
    'utf8'
  );
  console.log('Created web app tsconfig.json');
}
