const fs = require('fs');
const src = fs.readFileSync('src/components/RagPillarHeroDiagram.tsx', 'utf8');
const match = src.match(/<svg[\s\S]*?<\/svg>/);
let svg = match[0].replace('className="w-full h-auto"', '');
svg = '<?xml version="1.0" encoding="UTF-8"?>' + svg;
fs.writeFileSync('/tmp/rag-hero.svg', svg);
console.log('done');
