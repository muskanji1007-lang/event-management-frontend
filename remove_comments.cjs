const fs = require('fs');
const path = require('path');

function removeComments(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regular expression to match block comments and line comments safely.
    // It avoids matching URLs by checking that // isn't preceded by :
    const commentRegex = /\/\*[\s\S]*?\*\/|(?<!:)\/\/.*|^\/\/.*/gm;
    
    const newContent = content.replace(commentRegex, '').replace(/\n\s*\n\s*\n/g, '\n\n');
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Cleaned: ${filePath}`);
    }
}

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            walk(filePath);
        } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
            removeComments(filePath);
        }
    });
}

walk(path.join(__dirname, 'src'));
console.log('Done removing comments from src directory.');
