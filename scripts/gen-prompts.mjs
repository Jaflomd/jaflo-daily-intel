#!/usr/bin/env node
// Genera los 7 prompts agénticos (uno por dominio) como archivos .md autocontenidos.
// Fuente única de verdad: este config + el contrato compartido. Corre: node scripts/gen-prompts.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DOMAINS as CAT } from './build.mjs'
import { DEEPSEARCH } from './deepsearch.mjs'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'prompts')

const PROFILE = `**Lector (personaliza TODO a él):** Javier Flores-Cohaila — psiquiatra peruano, investigador (meta RENACYT Distinguido), educador médico (marca AMAUTA / USAMEDIC; prepara médicos para ENAM y Residentado). Líneas vivas: psiquiatría dimensional (HiTOP, RDoC, network theory), TDAH/TEA/neurodivergencia, neuromodulación, psiquiatría de precisión, IA aplicada a investigación y educación, razonamiento clínico, educación médica de precisión. Escribe libros (psicopatología para el mundo, neurociencia educativa, BMSE/razonamiento dimensional), corre comités de ética (HVLH), crea contenido (Instagram/YouTube). Pilares P&A: research, ai-enhancement, precision-psychiatry, amauta-education, kinobody-selfcare, content-documentation. Valora ROI/leverage/monetización, evidencia proporcional al claim, voz directa sin moralina, español natural.`

const RULE = `**Regla dura anti-fabricación:** cada ítem debe ser REAL y haber aparecido en tus búsquedas. DOI solo si lo confirmaste en metadata; si no, \`doi:""\`. Si la semana está delgada en este dominio, devuelve solo los hallazgos reales y marca \`meta.thin=true\`; jamás rellenes con papers inventados. Cita PubMed cuando uses PubMed (atribución + DOIs por sus términos de uso).`

const CONTRACT = (key) => `## Salida — contrato JSON (5 secciones)

Escribe el resultado en \`data/${key}/<YYYY-MM-DD>.json\` con exactamente esta forma:

\`\`\`json
{
  "domain_key": "${key}",
  "domain_title": "<título del dominio>",
  "date": "<YYYY-MM-DD>",
  "top3": [
    { "title": "", "source": "journal/medio + fecha", "type": "paper|review|meta-analysis|rct|preprint|blog|thread|podcast|editorial", "date": "", "url": "", "doi": "", "hook_extended": "Párrafo extenso (3-5 oraciones): qué encontró, por qué le importa A JAVIER (conecta con su libro/línea/pilar concreto), y cómo usarlo." }
  ],
  "top10": [
    { "title": "", "source": "", "type": "", "date": "", "url": "", "doi": "", "one_line": "Una oración: qué halló + relevancia para Javier.", "prediction": "Predicción Fable (1 oración): hacia dónde va o cómo capitalizarlo." }
  ],
  "perlas": ["5 perlas del día: insight contraintuitivo o dato accionable, anclado en lo hallado."],
  "preguntas": ["5 preguntas del día (clínicas o de investigación) que disparan el contenido de hoy."],
  "ideas": [{ "idea": "", "kind": "content|paper|book" }],
  "journals_activos": ["medios/journals activos esta semana"],
  "meta": { "total_found": 0, "reviewed": 0, "sources_used": [], "thin": false }
}
\`\`\`

- \`top3\` = 3 ítems. \`top10\` = 10 ítems. \`perlas\` / \`preguntas\` = 5 c/u. \`ideas\` = 5 (etiqueta \`kind\`).
- Todo el texto en **español**, personalizado a Javier.

## Construir y publicar

\`\`\`bash
cd ~/Developer/jaflo-daily-intel
node scripts/build.mjs ${key} <YYYY-MM-DD>      # renderiza el dossier + actualiza manifest.json
git add -A && git commit -m "dossier ${key} <YYYY-MM-DD>" && git push
\`\`\`

El dossier queda en \`dossiers/${key}/<fecha>.html\` y aparece solo en la galería (\`index.html\`).`

const DOMAINS = [
  { n: 1, key: 'precision-psych', title: 'Psiquiatría & Educación de Precisión', color: '#1D9E75',
    scope: 'Psiquiatría de precisión, personalizada, estratificada; biomarcadores; multi-ómica; psiquiatría computacional; predicción de respuesta a tratamiento; farmacogenómica; fenotipado digital. **Y** educación de precisión: aprendizaje personalizado/adaptativo, learning analytics, currículos con IA, feedback de precisión en formación médica.',
    sources: `1. **PubMed** (carga vía ToolSearch \`mcp__6edc0969-...__search_articles\` y \`get_article_metadata\`). Dos queries:
   - \`("precision psychiatry" OR "personalized psychiatry" OR "stratified psychiatry" OR "computational psychiatry" OR "biomarkers" OR "pharmacogenomics" OR "digital phenotyping" OR "treatment response prediction") AND ("psychiatry" OR "mental health") AND "last 7 days"[dp]\`
   - \`("precision education" OR "personalized learning" OR "adaptive learning" OR "learning analytics" OR "competency-based" OR "precision feedback" OR "AI-assisted learning") AND ("medical education" OR "health professions education" OR "higher education") AND "last 7 days"[dp]\`
2. **Web** (WebSearch/WebFetch): medRxiv, PsyArXiv, arXiv (cs.LG, q-bio), GitHub trending (precision-medicine, computational-psychiatry, adaptive-learning), X/Twitter, Reddit (r/psychiatry, r/MachineLearning, r/medicaleducation), Substack — últimos 7 días.
3. **Filtra** hype de IA sin datos clínicos o educativos. Exige grounding empírico, novedad metodológica o relevancia translacional.` },
  { n: 2, key: 'neuroscience-educ', title: 'Educación Médica & Neuroeducación', color: '#D4537E',
    scope: 'Educación médica basada en evidencia, neuroeducación, neurociencia educativa, educación en profesiones de la salud, simulación, educación basada en competencias, estrategias de aprendizaje activo, evaluación, IA en educación.',
    sources: `1. **PubMed**: \`("evidence-based education" OR "medical education" OR "health professions education" OR "neuroeducation" OR "educational neuroscience" OR "simulation" OR "competency-based medical education") AND "last 7 days"[dp]\`
2. **Web** (WebSearch/WebFetch): YouTube transcripts, Substack, blogs académicos de educación médica y neurociencia educativa, X/Twitter (\`min_faves:3\`) — últimos 7 días.
3. **Prioriza** evidencia empírica sobre opinión.` },
  { n: 3, key: 'dimensional-psych', title: 'Psicopatología Dimensional', color: '#5DCAA5',
    scope: 'Psicopatología dimensional, HiTOP, RDoC, network psychopathology, modelos transdiagnósticos, factor p, modelos bifactor, espectros de psicopatología, nuevos modelos de clasificación en psiquiatría.',
    sources: `1. **PubMed**: \`("dimensional psychopathology" OR "HiTOP" OR "Hierarchical Taxonomy of Psychopathology" OR "RDoC" OR "Research Domain Criteria" OR "network psychopathology" OR "transdiagnostic") AND "last 7 days"[dp]\`
2. **Web**: PsyArXiv, medRxiv, X/Twitter (\`("HiTOP" OR "RDoC" OR "dimensional psychopathology" OR "psychopathology network") within_time:7d min_faves:2\`), Reddit (r/psychiatry, r/clinicalpsychology, r/cogsci), blogs académicos — últimos 7 días.
3. **Variedad de formato bienvenida**: papers, preprints, blogs, hilos, editoriales, podcasts.` },
  { n: 4, key: 'clinical-reasoning', title: 'Razonamiento Clínico', color: '#378ADD',
    scope: 'Razonamiento clínico, diagnóstico, terapéutico; toma de decisiones clínicas; error diagnóstico; sesgo cognitivo en medicina; teoría de doble proceso (Sistema 1/2); cierre prematuro; debiasing; impacto de la IA en el razonamiento clínico.',
    sources: `1. **PubMed**: \`("clinical reasoning" OR "diagnostic reasoning" OR "therapeutic reasoning" OR "clinical decision-making" OR "diagnostic error" OR "cognitive bias") AND "last 7 days"[dp]\`
2. **Web**: medRxiv, PsyArXiv, ERIC, Reddit (r/medicine, r/medicaleducation, r/residency), X/Twitter (\`("clinical reasoning" OR "diagnostic reasoning" OR "diagnostic error") within_time:7d min_faves:3\`), Substack, blogs académicos — últimos 7 días.` },
  { n: 5, key: 'rct-metas-education', title: 'Alta Evidencia · Educación', color: '#D85A30',
    scope: 'RCTs, ensayos clínicos controlados, systematic reviews, meta-análisis, network meta-análisis y scoping reviews en educación médica y superior: aprendizaje activo, flipped classroom, PBL, TBL, simulación, feedback, evaluación, tecnología educativa, desarrollo docente, IA en educación.',
    sources: `1. **PubMed** (fuente principal, \`sort=pub_date\`, \`max_results=30\`): \`(("medical education" OR "health professions education" OR "higher education" OR "undergraduate" OR "postgraduate" OR "residency training") AND ("randomized controlled trial"[pt] OR "controlled clinical trial"[pt] OR "meta-analysis"[pt] OR "systematic review"[pt] OR "network meta-analysis"[tiab] OR "scoping review"[tiab])) AND "last 7 days"[dp]\`
2. Trae metadata de los top 25 PMIDs en lotes de 5; identifica los 13 más relevantes a educación médica/superior.` },
  { n: 6, key: 'rct-metas-psychiatry', title: 'Alta Evidencia · Psiquiatría', color: '#EF9F27',
    scope: 'RCTs, systematic reviews, meta-análisis y network meta-análisis en psiquiatría — poblaciones infanto-juvenil y adulta. Farmacológico y psicoterapéutico para depresión, bipolar, esquizofrenia, ansiedad, TDAH, autismo, TOC, TEPT, trastornos de personalidad.',
    sources: `1. **PubMed** (fuente principal, \`sort=pub_date\`, \`max_results=40\`, metadata en lotes de 5): \`(("psychiatry" OR "mental disorders" OR "depression" OR "anxiety" OR "bipolar disorder" OR "schizophrenia" OR "ADHD" OR "autism" OR "OCD" OR "PTSD") AND ("child" OR "adolescent" OR "adult") AND ("randomized controlled trial"[pt] OR "meta-analysis"[pt] OR "systematic review"[pt] OR "network meta-analysis"[tiab] OR "cochrane database syst rev"[ta])) AND "last 7 days"[dp]\`
2. **Resalta journals top** (van en \`journals_activos\` y deben marcarse): Lancet Psychiatry, NEJM, AJP, BJPsych, JAMA Psychiatry, Nature Medicine, World Psychiatry, Molecular Psychiatry, Cochrane.` },
  { n: 7, key: 'philosophy', title: 'Modelos Mentales & Filosofía', color: '#639922',
    scope: 'Modelos mentales, frameworks cognitivos, filosofía práctica, estoicismo, toma de decisiones, metacognición, systems thinking, comunicación de liderazgo, soft/social skills, humildad epistémica, second-order thinking, debiasing.',
    sources: `1. **Web (fuente principal)** (WebSearch/WebFetch): Substack, blogs (Farnam Street, etc.), X/Twitter (\`min_faves:10\`), Reddit (r/mentalmodels, r/LessWrong, r/philosophy, r/socialskills, r/leadership), YouTube transcripts — últimos 7 días.
2. **PubMed** (solo para los papers peer-reviewed): \`("decision making" OR "metacognition" OR "cognitive bias" OR "reasoning" OR "epistemic") AND "last 7 days"[dp]\`
3. **Filtra** hustle culture, hacks de productividad y motivación vacía. Exige insight a nivel de **mecanismo**, no consejo genérico. Para \`top3\` prefiere artículos peer-reviewed o ensayos con framework estructural.` },
]

function prompt(d) {
  const day = (CAT[d.key] && CAT[d.key].day) || ''
  const sources = d.sources.replace(/\s*AND "last 7 days"\[dp\]/g, '')
  const deepBlock = DEEPSEARCH[d.key] ? `\n## Guía de búsqueda profunda (deep-search)\n\n${DEEPSEARCH[d.key]}\n` : ''
  return `# Prompt ${d.n}/7 — ${d.title}

> Dominio \`${d.key}\` · color \`${d.color}\` · sistema **JAFLO · Inteligencia Diaria**
> Cadencia: **corre los ${day}** (rotación: 1 dominio por día de la semana).
> Ventana de búsqueda: **últimos 7-10 días previos**, priorizando lo más reciente. Salida: dossier HTML en la galería de GitHub.

Eres un agente de inteligencia investigativa. Hoy es \`<YYYY-MM-DD>\` (${day}). Construye el **dossier del día** del dominio **${d.title}** y publícalo en la galería.

${PROFILE}

## Alcance

${d.scope}

## Ventana temporal

Revisa **prioritariamente los últimos 7-10 días previos a hoy**. En \`search_articles\` usa \`date_from\` = hoy − 10 días, \`date_to\` = hoy, \`datetype="pdat"\`, \`sort="pub_date"\`. Prioriza lo de las últimas 24-72h; usa el resto de la ventana para completar. En web, filtra a publicaciones de los últimos 7-10 días.

## Fuentes y queries (ejecuta de verdad — no inventes)

${sources}
${deepBlock}
Reúne **13+ ítems reales**, descarta ruido, y selecciona los **3 más impactantes/novedosos/accionables** para Javier (\`top3\`) + **10 sólidos** (\`top10\`).

${RULE}

## Las 5 secciones (todo en español, personalizado a Javier)

1. **Top 3 — resumen extenso.** Por cada uno, un \`hook_extended\` que diga qué encontró, **por qué le importa a Javier** (conecta con su libro / línea / pilar concreto) y cómo usarlo.
2. **Radar — 10 siguientes (resumen corto + predicción).** \`one_line\` (qué halló + relevancia) y \`prediction\` (tu predicción como Fable: hacia dónde va o cómo capitalizarlo).
3. **5 perlas del día** — insight contraintuitivo o dato accionable, anclado en lo hallado.
4. **5 preguntas del día** — clínicas o de investigación, que disparan el contenido de hoy.
5. **5 ideas del día** — para contenido (IG/YT), paper o capítulo de libro; etiqueta \`kind = content|paper|book\`.

${CONTRACT(d.key)}

---
*Generado por \`scripts/gen-prompts.mjs\`. No editar a mano: edita el generador y re-corre.*
`
}

fs.mkdirSync(OUT, { recursive: true })
for (const d of DOMAINS) {
  fs.writeFileSync(path.join(OUT, `${d.n}-${d.key}.md`), prompt(d))
  console.log(`✓ prompts/${d.n}-${d.key}.md`)
}
console.log('listo: 7 prompts generados')
