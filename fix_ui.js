const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'components');

const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace text-white with text-content-primary
    content = content.replace(/text-white/g, 'text-content-primary');

    // Fix h3 tags to not use font-serif
    content = content.replace(/<h3([\s\S]*?)className="([^"]*?)"/g, (match, p1, p2) => {
        let newClasses = p2.replace(/font-serif\s+/g, '');
        return `<h3${p1}className="${newClasses}"`;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed:', filePath);
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
