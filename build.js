#!/usr/bin/env node

import esbuild from 'esbuild'

esbuild.build({
  logLevel: "info",
  entryPoints: ["src/index.jsx"],
  bundle: true,
  minify: true,
  outfile: "public/bundle.js",
  jsx: "automatic",
})
.catch(() => process.exit(1));

