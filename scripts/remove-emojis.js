const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const exts = new Set(['.js', '.html', '.md', '.bat', '.json', '.yml', '.yaml']);
const skipDirs = new Set(['node_modules', '.git', '.vscode']);

const replacements = new Map([
  ['[OK]', '[OK]'],
  ['[ERROR]', '[ERROR]'],
  ['[WARNING]', '[WARNING]'],
  ['[WARNING]', '[WARNING]'],
  ['[INFO]', '[INFO]'],
  ['[INFO]', '[INFO]'],
  ['[INFO]', '[INFO]'],
  ['Cookie', 'Cookie'],
  ['[SECURE]', '[SECURE]'],
  ['[SECURITY]', '[SECURITY]'],
  ['[SECURITY]', '[SECURITY]'],
  ['[SUCCESS]', '[SUCCESS]'],
]);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      walk(path.join(dir, entry.name));
      continue;
    }

    const filePath = path.join(dir, entry.name);
    if (!exts.has(path.extname(entry.name).toLowerCase())) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    let updated = content;
    for (const [from, to] of replacements.entries()) {
      updated = updated.split(from).join(to);
    }

    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`updated: ${path.relative(root, filePath)}`);
    }
  }
}

walk(root);
console.log('done');
