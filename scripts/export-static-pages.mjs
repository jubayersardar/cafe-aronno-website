import fs from 'node:fs';
import path from 'node:path';

const routes = [
  { path: '/', file: 'index.html' },
  { path: '/gallery', file: 'gallery/index.html', flat: 'gallery.html' },
  { path: '/celebrate', file: 'celebrate/index.html', flat: 'celebrate.html' },
  { path: '/visit', file: 'visit/index.html', flat: 'visit.html' },
  { path: '/menu', file: 'menu/index.html', flat: 'menu.html' },
  { path: '/spaces', file: 'spaces/index.html', flat: 'spaces.html' },
  { path: '/privacy', file: 'privacy/index.html', flat: 'privacy.html' },
];

const clientDir = path.resolve('dist', 'client');
const serverEntry = path.resolve('dist', 'server', 'index.js');

async function exportPages() {
  console.log('Exporting static HTML pages using in-memory server handler...');

  const serverModule = await import(`file://${serverEntry.replace(/\\/g, '/')}`);
  const handler = serverModule.default;

  for (const route of routes) {
    const req = new Request(`http://localhost${route.path}`);
    const res = await handler.fetch(req);
    if (!res.ok) {
      throw new Error(`Failed to render ${route.path}: ${res.status}`);
    }
    const html = await res.text();

    const targetPath = path.join(clientDir, route.file);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log(`✓ Saved ${route.path} -> ${route.file} (${html.length} bytes)`);

    if (route.flat) {
      const flatPath = path.join(clientDir, route.flat);
      fs.writeFileSync(flatPath, html, 'utf8');
      console.log(`✓ Saved flat ${route.flat}`);
    }
  }

  // Render 404 page
  try {
    const req404 = new Request('http://localhost/non-existent-404');
    const res404 = await handler.fetch(req404);
    const html404 = await res404.text();
    fs.writeFileSync(path.join(clientDir, '404.html'), html404, 'utf8');
    console.log('✓ Saved 404.html');
  } catch (err) {
    console.warn('Could not save custom 404:', err);
  }

  // Create _redirects for clean URLs and client-side fallback
  const redirectsContent = `
# Netlify Clean URLs
/gallery /gallery.html 200
/celebrate /celebrate.html 200
/visit /visit.html 200
/menu /menu.html 200
/spaces /spaces.html 200
/privacy /privacy.html 200
/* /index.html 200
`.trim();
  fs.writeFileSync(path.join(clientDir, '_redirects'), redirectsContent + '\n', 'utf8');
  console.log('✓ Saved _redirects');

  // Create _headers for optimal caching and security
  const headersContent = `
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
`.trim();
  fs.writeFileSync(path.join(clientDir, '_headers'), headersContent + '\n', 'utf8');
  console.log('✓ Saved _headers');

  console.log('Static export complete and ready for Netlify publish!');
}

exportPages().catch((err) => {
  console.error('Error during static export:', err);
  process.exit(1);
});
