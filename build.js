#!/usr/bin/env node

const esbuild = require("esbuild")

esbuild.build({
  logLevel: "info",
  entryPoints: ["src/index.jsx"],
  bundle: true,
  minify: true,
  outfile: "public/bundle.js",
  jsx: "automatic",
})
.catch(() => process.exit(1));

