const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'components');

const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/bg-zinc-\d+\/\d+/g, 'bg-surface-100');
    content = content.replace(/bg-zinc-950/g, 'bg-surface-100');
    content = content.replace(/bg-zinc-900/g, 'bg-surface-50');
    content = content.replace(/bg-zinc-800/g, 'bg-surface-200');
    
    content = content.replace(/text-zinc-400/g, 'text-content-secondary');
    content = content.replace(/text-zinc-300/g, 'text-content-primary');
    content = content.replace(/text-zinc-500/g, 'text-content-muted');
    
    // borders
    content = content.replace(/border-white\/\[0\.\d+\]/g, 'border-border-subtle');
    content = content.replace(/hover:border-white\/\[0\.\d+\]/g, 'hover:border-border-focus');

    // headings to serif
    content = content.replace(/<h2([^>]*)className="([^"]*)font-bold([^"]*)"/g, '<h2$1className="$2font-serif font-medium$3"');
    content = content.replace(/<h3([^>]*)className="([^"]*)font-bold([^"]*)"/g, '<h3$1className="$2font-serif font-medium$3"');
    content = content.replace(/<h2([^>]*)className="([^"]*)font-semibold([^"]*)"/g, '<h2$1className="$2font-serif font-medium$3"');
    content = content.replace(/<h3([^>]*)className="([^"]*)font-semibold([^"]*)"/g, '<h3$1className="$2font-serif font-medium$3"');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated:', filePath);
    }
};

const walkSync = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkSync(filePath);
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            replaceInFile(filePath);
        }
    }
};

walkSync(dirPath);
