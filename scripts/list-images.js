import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const dir = '/vercel/share/v0-project/public/images';
try {
  const files = readdirSync(dir);
  files.forEach(f => {
    const stat = statSync(join(dir, f));
    console.log(`${f} - ${(stat.size / 1024).toFixed(1)} KB`);
  });
  console.log(`\nTotal: ${files.length} files`);
} catch (e) {
  console.log('Error:', e.message);
}
