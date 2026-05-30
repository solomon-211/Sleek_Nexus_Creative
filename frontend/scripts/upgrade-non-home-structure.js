const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '..', 'html');
const files = fs.readdirSync(htmlDir).filter((f) => f.endsWith('.html') && f !== 'index.html');

for (const file of files) {
  const filePath = path.join(htmlDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('../css/world-class.css')) {
    content = content.replace(
      /(<link[^\n]*consistency\.css[^\n]*>\r?\n)/i,
      `$1    <link rel="stylesheet" href="../css/world-class.css?v=2">\n`
    );
  }

  if (!content.includes('../js/world-class.js')) {
    content = content.replace(
      /<\/body>/i,
      '    <script src="../js/world-class.js?v=2" defer></script>\n</body>'
    );
  }

  if (!/class="[^"]*page-shell[^"]*"/i.test(content)) {
    content = content.replace(/<body(\s[^>]*)?>/i, (m, attrs = '') => {
      if (/class=/i.test(attrs)) {
        return `<body${attrs.replace(/class="([^"]*)"/i, 'class="$1 page-shell"')}>`;
      }
      return `<body${attrs} class="page-shell">`;
    });
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log(`upgraded-non-home-pages=${files.length}`);
