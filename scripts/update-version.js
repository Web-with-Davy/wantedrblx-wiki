#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const versionJsonPath = path.join(projectRoot, 'version.json');
const indexHtmlPath = path.join(projectRoot, 'index.html');

function generateVersion() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const y = now.getFullYear();
  const m = pad(now.getMonth() + 1);
  const d = pad(now.getDate());
  const h = pad(now.getHours());
  const min = pad(now.getMinutes());
  const s = pad(now.getSeconds());
  return `${y}${m}${d}-${h}${min}${s}`;
}

function getRequestedVersion() {
  const arg = process.argv.slice(2).find(a => a.startsWith('--version='));
  if (arg) {
    return arg.split('=')[1].trim();
  }
  return generateVersion();
}

function updateVersion() {
  const version = getRequestedVersion();
  const now = new Date();

  // 1. Write version.json
  const versionData = {
    version,
    builtAt: now.toISOString(),
    timestamp: now.getTime()
  };
  fs.writeFileSync(versionJsonPath, JSON.stringify(versionData, null, 2) + '\n', 'utf8');
  console.log(`Updated version.json -> ${version}`);

  // 2. Update index.html
  if (fs.existsSync(indexHtmlPath)) {
    let html = fs.readFileSync(indexHtmlPath, 'utf8');

    // Ensure meta[name="app-version"]
    if (html.includes('meta name="app-version"')) {
      html = html.replace(
        /<meta name="app-version" content="[^"]*">/,
        `<meta name="app-version" content="${version}">`
      );
    } else {
      // Place right after viewport meta
      html = html.replace(
        /(<meta name="viewport"[^>]*>)/i,
        `$1\n    <meta name="app-version" content="${version}">`
      );
    }

    // Ensure inline window.__WANTED_VERSION in head
    if (html.includes('window.__WANTED_VERSION')) {
      html = html.replace(
        /window\.__WANTED_VERSION\s*=\s*['"][^'"]*['"]/,
        `window.__WANTED_VERSION = '${version}'`
      );
    } else {
      html = html.replace(
        /(<meta name="app-version"[^>]*>)/i,
        `$1\n    <script>window.__WANTED_VERSION = '${version}';</script>`
      );
    }

    // Update local CSS links (href="css/...")
    html = html.replace(
      /(<link\s+[^>]*?href=["'])(css\/[^"'>?]+)(?:\?v=[^"'>]*)?(["'][^>]*>)/gi,
      `$1$2?v=${version}$3`
    );

    // Update local JS script tags (src="js/...")
    html = html.replace(
      /(<script\s+[^>]*?src=["'])(js\/[^"'>?]+)(?:\?v=[^"'>]*)?(["'][^>]*><\/script>)/gi,
      `$1$2?v=${version}$3`
    );

    fs.writeFileSync(indexHtmlPath, html, 'utf8');
    console.log(`Updated index.html asset tags with ?v=${version}`);
  }

  return version;
}

if (require.main === module) {
  updateVersion();
}

module.exports = { updateVersion };
