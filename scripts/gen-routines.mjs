#!/usr/bin/env node
// Genera 1 prompt de ROUTINE por día de la semana (lunes→domingo).
// Cada uno es autónomo: clona el repo, investiga su dominio, arma el HTML y lo publica.
// Pensados para pegarse como cloud routines. Corre: node scripts/gen-routines.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEEPSEARCH } from './deepsearch.mjs'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'prompts', 'routines')

const REPO = 'https://github.com/Jaflomd/jaflo-daily-intel'
const PAGES = 'https://jaflomd.github.io/jaflo-daily-intel/'

// día (cron dow) → dominio
const WEEK = [
  { dow: 1, day: 'Lunes',     key: 'rct-metas-psychiatry', n: 6, title: 'Alta Evidencia · Psiquiatría' },
  { dow: 2, day: 'Martes',    key: 'dimensional-psych',    n: 3, title: 'Psicopatología Dimensional' },
  { dow: 3, day: 'Miércoles', key: 'precision-psych',      n: 1, title: 'Psiquiatría & Educación de Precisión' },
  { dow: 4, day: 'Jueves',    key: 'clinical-reasoning',   n: 4, title: 'Razonamiento Clínico' },
  { dow: 5, day: 'Viernes',   key: 'rct-metas-education',  n: 5, title: 'Alta Evidencia · Educación' },
  { dow: 6, day: 'Sábado',    key: 'neuroscience-educ',    n: 2, title: 'Educación Médica & Neuroeducación' },
  { dow: 0, day: 'Domingo',   key: 'philosophy',           n: 7, title: 'Modelos Mentales & Filosofía' },
]

function routine(w) {
  const deepBlock = DEEPSEARCH[w.key]
    ? `\nGUÍA DE BÚSQUEDA PROFUNDA (deep-search) — úsala para afinar la búsqueda y filtrar ruido:\n\n${DEEPSEARCH[w.key]}\n`
    : ''
  return `Eres el job de hoy de "JAFLO · Inteligencia Diaria". Hoy (${w.day}) publicas UN dossier: el del dominio **${w.key}** — ${w.title}. El sistema es el repo ${REPO} y se publica en ${PAGES}

LECTOR (personaliza TODO a él): Javier Flores-Cohaila — psiquiatra peruano, investigador (meta RENACYT Distinguido), educador médico (AMAUTA / USAMEDIC; prepara ENAM y Residentado). Líneas: psiquiatría dimensional (HiTOP/RDoC, network theory), TDAH/TEA/neurodivergencia, neuromodulación, psiquiatría de precisión, IA en investigación/educación, razonamiento clínico, educación médica de precisión. Escribe libros (psicopatología para el mundo, neurociencia educativa, BMSE). Voz directa, español natural, evidencia proporcional al claim.

1) Prepara el repo:
   git clone ${REPO} /tmp/jdi 2>/dev/null || (cd /tmp/jdi && git fetch -q && git reset --hard -q origin/main)
   cd /tmp/jdi && TODAY=$(date +%F)

2) Investiga siguiendo al pie el archivo prompts/${w.n}-${w.key}.md (alcance, fuentes y queries del dominio):
   - PubMed: carga el MCP de PubMed vía ToolSearch (search_articles + get_article_metadata). date_from = hoy − 10 días, date_to = hoy, datetype="pdat", sort="pub_date", max_results=40; metadata en lotes de 5 PMIDs.
   - Web: WebSearch/WebFetch para preprints (medRxiv/PsyArXiv/arXiv), X/Twitter, Reddit, Substack, blogs y YouTube según indique ese archivo.
   - Ventana: últimos 7-10 días previos a hoy; prioriza 24-72h. Reúne 13+ ítems reales, descarta ruido.
${deepBlock}
3) REGLA DURA ANTI-FABRICACIÓN: cada ítem REAL y hallado en búsquedas. DOI solo si verificado en metadata (si no, ""). Si el dominio está delgado esta semana → solo lo real + meta.thin=true. Nunca rellenar con papers inventados. Cita PubMed cuando uses PubMed.

4) Produce las 5 secciones (español, personalizado a Javier) y escribe data/${w.key}/$TODAY.json con el contrato (ver prompts/${w.n}-${w.key}.md):
   { domain_key, domain_title, date, top3[3] (hook_extended: qué + por qué le importa a Javier + cómo usarlo), top10[10] (one_line + prediction = predicción Fable), perlas[5], preguntas[5], ideas[5] (kind: content|paper|book), journals_activos[], meta{total_found,reviewed,sources_used,thin} }

5) Renderiza y publica:
   node scripts/build.mjs ${w.key} $TODAY
   git add -A && git -c user.name="Jaflomd" -c user.email="javierfloresmed@gmail.com" commit -m "dossier ${w.key} $TODAY" && git push

6) Reporta: dominio del día, #ítems reales, si quedó delgado, y el link ${PAGES}
   (Si git push falla por credenciales en el entorno de la routine, reporta el JSON producido y avisa que quedó sin publicar.)
`
}

fs.mkdirSync(OUT, { recursive: true })
const order = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
WEEK.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day))
WEEK.forEach((w, i) => {
  const fn = `${i + 1}-${w.day.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}-${w.key}.md`
  fs.writeFileSync(path.join(OUT, fn), routine(w))
  console.log(`✓ prompts/routines/${fn}  (dow=${w.dow} → cron "0 5 * * ${w.dow}")`)
})
console.log('\nlisto: 7 prompts de routine (uno por día).')
