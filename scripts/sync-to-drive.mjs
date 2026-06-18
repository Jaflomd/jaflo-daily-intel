#!/usr/bin/env node
// Sincroniza los MD estrellables del repo → tus carpetas en Google Drive.
// Corre LOCAL en tu Mac (las routines cloud no ven tu Drive). Hace git pull primero.
//
//   node scripts/sync-to-drive.mjs            # pull + copia todos los MD nuevos
//   node scripts/sync-to-drive.mjs --no-pull  # solo copia (sin git pull)
//
// El destino se puede sobreescribir con la env var JDI_DRIVE_DIR.
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const STARS = path.join(ROOT, 'stars')
const DRIVE = process.env.JDI_DRIVE_DIR ||
  '/Users/jaflomd/Library/CloudStorage/GoogleDrive-javierfloresmed@gmail.com/Mi unidad/Jaflo Lab/0-input/reading-schedule'

// dominio → carpeta numerada en Drive
const FOLDER = {
  'precision-psych': '01-precision-psych',
  'neuroscience-educ': '02-neuroscience-educ',
  'dimensional-psych': '03-dimensional-psych',
  'clinical-reasoning': '04-clinical-reasoning',
  'rct-metas-education': '05-rct-metas-education',
  'rct-metas-psychiatry': '06-rct-metas-psychiatry',
  'philosophy': '07-philosophy',
  'neuro-triple-network': '08-neuro-triple-network',
  'reviews-guidelines-nma': '09-reviews-guidelines-nma',
}

if (!process.argv.includes('--no-pull')) {
  try { execSync('git pull -q', { cwd: ROOT, stdio: 'inherit' }); console.log('✓ git pull') }
  catch { console.warn('⚠ git pull falló (sigo con lo local)') }
}

if (!fs.existsSync(DRIVE)) { console.error(`✗ no existe el destino: ${DRIVE}`); process.exit(1) }

let copied = 0, skipped = 0
for (const [domain, folder] of Object.entries(FOLDER)) {
  const srcDir = path.join(STARS, domain)
  if (!fs.existsSync(srcDir)) continue
  const dstDir = path.join(DRIVE, folder)
  fs.mkdirSync(dstDir, { recursive: true })
  for (const f of fs.readdirSync(srcDir).filter(f => f.endsWith('.md'))) {
    const src = path.join(srcDir, f), dst = path.join(dstDir, f)
    // copia solo si cambió (mtime/size) para no tocar Drive de más
    if (fs.existsSync(dst) && fs.statSync(dst).size === fs.statSync(src).size) { skipped++; continue }
    fs.copyFileSync(src, dst)
    const ok = fs.readFileSync(dst).includes(0x00) ? '⚠ NUL!' : 'ok'
    console.log(`  ✓ ${folder}/${f} (${ok})`)
    copied++
  }
}
console.log(`listo: ${copied} copiados, ${skipped} sin cambios → ${DRIVE}`)
