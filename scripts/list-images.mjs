import { readdirSync, statSync } from 'fs';
import { join } from 'path';

function listFiles(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      listFiles(full);
    } else {
      console.log(`${full} - ${stat.size} bytes`);
    }
  }
}

listFiles('public/images');
