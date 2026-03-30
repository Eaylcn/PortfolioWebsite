const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./public/shikai.json', 'utf8'));

let sql = '';

for (let i = 0; i < data.artifacts.length; i++) {
  const col = data.artifacts[i];
  const colSortOrder = data.artifacts.length - i; // To keep the original reverse ordering correctly
  
  // Escape single quotes in strings
  const esc = (str) => str ? str.replace(/'/g, "''") : '';

  sql += `INSERT INTO public.shikai_collections (id, title, series, freq, lore, folder, is_new, sort_order) VALUES
  ('${col.id}', '${esc(col.title)}', '${esc(col.series)}', '${esc(col.freq)}', '${esc(col.lore)}', '${esc(col.folder)}', ${col.isNew ? 'true' : 'false'}, ${colSortOrder});\n\n`;
  
  for (let j = 0; j < col.images.length; j++) {
    const img = col.images[j];
    const imgPath = `/projects/shikai/Shikai Collection/${col.folder}/${img.file}`;
    
    // shikai_images uses gen_random_uuid(), so we omit 'id'
    sql += `INSERT INTO public.shikai_images (collection_id, file_url, prompt, sort_order) VALUES
    ('${col.id}', '${esc(imgPath)}', '${esc(img.prompt)}', ${j});\n`;
  }
  sql += '\n';
}

fs.writeFileSync('shikai-seed.sql', sql);
console.log('shikai-seed.sql generated.');
