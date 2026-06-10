#!/usr/bin/env node
// Imprime el dominio que toca para una fecha (rotación 1 dominio/día de la semana).
// Uso:
//   node scripts/today-domain.mjs            # dominio de hoy (key)
//   node scripts/today-domain.mjs 2026-06-12 # dominio de esa fecha
//   node scripts/today-domain.mjs --info     # key + título + día, legible
import { DOMAINS, domainForDate } from './build.mjs'

const args = process.argv.slice(2)
const info = args.includes('--info')
const dateArg = args.find(a => /^\d{4}-\d{2}-\d{2}$/.test(a))
const date = dateArg || new Date().toISOString().slice(0, 10)
const key = domainForDate(date)

if (!key) { console.error(`sin dominio para ${date}`); process.exit(1) }
if (info) {
  const m = DOMAINS[key]
  console.log(`${date} (${m.day}) → ${key}  ·  ${m.title}`)
} else {
  console.log(key)
}
