# Cafe Aronno

Official Bengali and English cafe website, with menu, spaces, gallery, celebrations and visit information.

## Local development

Use Node.js 22 or later. Run `npm ci`, then `npm run dev -- --port 3000`.

## Production

`npm run build` exports all public pages to `dist/client`. Vercel uses the included configuration to serve these pages and assets. Set `SITE_URL` to the production domain before building for correct canonical URLs.

Facebook videos and Google Maps require the visitor to reach those external services. Direct links remain available when embeds cannot load.

Official photographs and branding belong to Cafe Aronno.
