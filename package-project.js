const fs = require('fs');
const path = require('path');

// Create a simple tar-like archive by concatenating files with headers
function createArchive() {
  const files = [];
  
  // Recursively collect files
  function collectFiles(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      
      // Skip excluded directories and files
      if (item === 'node_modules' || item === '.git' || item === 'dist' || 
          item.endsWith('.log') || item === '.DS_Store' || item === 'package-project.js') {
        continue;
      }
      
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        collectFiles(fullPath, relativePath);
      } else {
        files.push({
          path: relativePath,
          content: fs.readFileSync(fullPath, 'utf8')
        });
      }
    }
  }
  
  collectFiles('.');
  
  // Create archive content
  let archiveContent = '# Customer Portal Project Archive\n\n';
  archiveContent += `Generated: ${new Date().toISOString()}\n`;
  archiveContent += `Total files: ${files.length}\n\n`;
  archiveContent += '=' .repeat(80) + '\n\n';
  
  for (const file of files) {
    archiveContent += `FILE: ${file.path}\n`;
    archiveContent += '-'.repeat(40) + '\n';
    archiveContent += file.content;
    archiveContent += '\n\n' + '='.repeat(80) + '\n\n';
  }
  
  fs.writeFileSync('customer-portal-project.txt', archiveContent);
  console.log('Project packaged successfully as customer-portal-project.txt');
  console.log(`Packaged ${files.length} files`);
}

createArchive();