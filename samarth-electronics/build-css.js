const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const fs = require('fs');
const path = require('path');

// Tailwind v4 input — scans src automatically via @source
const inputCss = `@import "tailwindcss";
@source "./src";
`;

console.log('Building Tailwind CSS with source scanning...');

postcss([tailwind()])
  .process(inputCss, { from: path.resolve('tailwind-input.css') })
  .then(result => {
    const outPath = path.resolve('public/compiled-tailwind.css');
    fs.writeFileSync(outPath, result.css);
    const stats = fs.statSync(outPath);
    console.log('SUCCESS! Written to:', outPath);
    console.log('File size:', stats.size, 'bytes');
  })
  .catch(err => {
    console.error('ERROR:', err.message);
    process.exit(1);
  });
