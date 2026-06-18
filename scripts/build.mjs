#!/usr/bin/env node
// JAFLO · Inteligencia Diaria — build engine
// Renderiza un dossier HTML autocontenido desde data/<domain>/<date>.json
// y reconstruye manifest.json escaneando data/.
//
// Uso:
//   node scripts/build.mjs <domain> <date>     # construye un dossier
//   node scripts/build.mjs --date <date>       # construye todos los JSON de esa fecha
//   node scripts/build.mjs --all               # reconstruye todo lo que haya en data/
//   node scripts/build.mjs --manifest          # solo reconstruye manifest.json
//
// El renderizado es determinista: no inventa nada. Solo pinta lo que trae el JSON.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DATA = path.join(ROOT, 'data')
const DOSSIERS = path.join(ROOT, 'dossiers')
const STARS = path.join(ROOT, 'stars')

// ---- catálogo de dominios (orden y metadatos canónicos) -------------------
// Todos los dominios corren A DIARIO como tareas programadas escalonadas
// (~/.claude/scheduled-tasks/jdi-*), cada una barriendo las últimas 48 h.
// title/color/icon alimentan la galería (index.html vía manifest.json).
// weekday/day son una pista LEGACY de la rotación 1-por-día (domainForDate /
// today-domain.mjs); los dominios nuevos diarios usan weekday:null, day:'Diario'.
export const DOMAINS = {
  'precision-psych':       { title: 'Psiquiatría & Educación de Precisión',     color: '#1D9E75', icon: '🧬', weekday: 3,    day: 'Miércoles' },
  'neuroscience-educ':     { title: 'Educación Médica & Neuroeducación',         color: '#D4537E', icon: '🧠', weekday: 6,    day: 'Sábado' },
  'dimensional-psych':     { title: 'Psicopatología Dimensional',                color: '#5DCAA5', icon: '🕸️', weekday: 2,    day: 'Martes' },
  'clinical-reasoning':    { title: 'Razonamiento Clínico',                      color: '#378ADD', icon: '🩺', weekday: 4,    day: 'Jueves' },
  'rct-metas-education':   { title: 'Alta Evidencia · Educación',                color: '#D85A30', icon: '🎓', weekday: 5,    day: 'Viernes' },
  'rct-metas-psychiatry':  { title: 'Alta Evidencia · Psiquiatría',              color: '#EF9F27', icon: '⚡', weekday: 1,    day: 'Lunes' },
  'philosophy':            { title: 'Modelos Mentales & Filosofía',              color: '#639922', icon: '♟️', weekday: 0,    day: 'Domingo' },
  'neuro-triple-network':  { title: 'Neurociencia · Triple Red & Neuropsiquiatría', color: '#7C3AED', icon: '🌐', weekday: null, day: 'Diario' },
  'reviews-guidelines-nma':{ title: 'Revisiones, Guías & NMA',                   color: '#E11D48', icon: '📋', weekday: null, day: 'Diario' },
}

// Dominio que toca para una fecha dada (según su día de la semana).
export function domainForDate(dateStr) {
  const wd = new Date(dateStr + 'T12:00:00').getDay()
  for (const [key, m] of Object.entries(DOMAINS)) if (m.weekday === wd) return key
  return null
}

const KIND = {
  content: { label: 'Contenido', color: '#60A5FA' },
  paper:   { label: 'Paper',     color: '#EF9F27' },
  book:    { label: 'Libro',     color: '#A855F7' },
}

const HIGHLIGHT_SOURCES = [
  'lancet psychiatry','nejm','new england','jama psychiatry','world psychiatry',
  'american journal of psychiatry','ajp','bjpsych','british journal of psychiatry',
  'nature medicine','nature','molecular psychiatry','cochrane','academic medicine',
  'medical education','farnam street',
]

// ---- helpers ---------------------------------------------------------------
const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;')

function hexToRgba(hex, a) {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${a})`
}

function isoWeek(dateStr) {
  const d = new Date(dateStr + 'T12:00:00Z')
  const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
  const dayNr = (target.getUTCDay() + 6) % 7
  target.setUTCDate(target.getUTCDate() - dayNr + 3)
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4))
  const fday = (firstThursday.getUTCDay() + 6) % 7
  firstThursday.setUTCDate(firstThursday.getUTCDate() - fday + 3)
  const week = 1 + Math.round((target - firstThursday) / (7 * 24 * 3600 * 1000))
  return `${target.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
function fechaLarga(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return `${d} de ${MESES[m - 1]} de ${y}`
}

function linkFor(item) {
  if (item.doi && item.doi.trim()) {
    const doi = item.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').trim()
    return { href: 'https://doi.org/' + doi, label: 'doi.org/' + doi }
  }
  if (item.url && item.url.trim()) {
    let label = item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
    if (label.length > 46) label = label.slice(0, 44) + '…'
    return { href: item.url, label }
  }
  return null
}

function sourceTag(item) {
  const bits = []
  if (item.source) bits.push(esc(item.source))
  if (item.type) bits.push(esc(item.type))
  if (item.date && !(item.source || '').includes(item.date)) bits.push(esc(item.date))
  const txt = bits.join(' · ')
  const hot = HIGHLIGHT_SOURCES.some(h => (item.source || '').toLowerCase().includes(h))
  return { txt, hot }
}

// ---- helpers for category-based layout (reviews-guidelines-nma) ------------
const RGN_CATEGORIES = [
  { key: 'top3_reviews',        icon: '🔬', title: 'Top 3 Reviews',                sub: 'sistemáticas · scoping · umbrella · narrativas' },
  { key: 'top3_nma',            icon: '🌐', title: 'Top 3 Network Meta-Analysis',   sub: 'ranking comparativo de intervenciones' },
  { key: 'top3_guidelines',     icon: '📋', title: 'Top 3 Guías & Consensos',       sub: 'guías de práctica clínica · consensus statements' },
  { key: 'top3_meta_analysis',  icon: '📊', title: 'Top 3 Meta-Analysis',           sub: 'síntesis cuantitativa de evidencia' },
]

function isRgnLayout(data) {
  return RGN_CATEGORIES.some(c => Array.isArray(data[c.key]))
}

function rgnTotalItems(data) {
  return RGN_CATEGORIES.reduce((n, c) => n + (data[c.key] || []).length, 0)
}

function renderRgnSections(data) {
  return RGN_CATEGORIES.map(cat => {
    const items = data[cat.key] || []
    const cards = items.map((it, i) => {
      const ln = linkFor(it); const st = sourceTag(it)
      return `
      <article class="r3-card">
        <div class="r3-rank">${i + 1}</div>
        <div class="r3-src ${st.hot ? 'hot' : ''}">${st.txt}</div>
        <h3 class="r3-title">${esc(it.title)}</h3>
        <p class="r3-hook">${esc(it.hook_extended)}</p>
        ${ln ? `<a class="r3-link" href="${esc(ln.href)}" target="_blank" rel="noopener">↗ ${esc(ln.label)}</a>` : ''}
      </article>`
    }).join('')
    const empty = items.length === 0
      ? `<div class="thin-note">No se encontraron ${esc(cat.title.replace('Top 3 ', ''))} en la ventana de 48 h.</div>`
      : ''
    return `
  <section>
    <div class="sec-head">
      <div class="sec-ic">${cat.icon}</div>
      <span class="sec-title">${esc(cat.title)}</span>
      <span class="sec-sub">${esc(cat.sub)}</span>
      <span class="sec-count">${items.length}</span>
    </div>
    ${empty}
    <div class="r3-grid">${cards}</div>
  </section>`
  }).join('\n')
}

// ---- dossier template ------------------------------------------------------
export function renderDossier(data) {
  const meta = DOMAINS[data.domain_key] || { title: data.domain_title, color: data.accent_color || '#EF9F27', icon: '◆' }
  const accent = data.accent_color || meta.color
  const date = data.date
  const css = `
    --accent:${accent};
    --accent-dim:${hexToRgba(accent, 0.12)};
    --accent-soft:${hexToRgba(accent, 0.07)};
    --accent-border:${hexToRgba(accent, 0.32)};`

  const useRgn = isRgnLayout(data)

  const top3 = useRgn ? '' : (data.top3 || []).map((it, i) => {
    const ln = linkFor(it); const st = sourceTag(it)
    return `
      <article class="r3-card">
        <div class="r3-rank">${i + 1}</div>
        <div class="r3-src ${st.hot ? 'hot' : ''}">${st.txt}</div>
        <h3 class="r3-title">${esc(it.title)}</h3>
        <p class="r3-hook">${esc(it.hook_extended)}</p>
        ${ln ? `<a class="r3-link" href="${esc(ln.href)}" target="_blank" rel="noopener">↗ ${esc(ln.label)}</a>` : ''}
      </article>`
  }).join('')

  const top10 = useRgn ? '' : (data.top10 || []).map((it, i) => {
    const ln = linkFor(it); const st = sourceTag(it)
    return `
      <div class="r10-item">
        <span class="r10-n">${String(i + 1).padStart(2, '0')}</span>
        <div class="r10-body">
          <div class="r10-src ${st.hot ? 'hot' : ''}">${st.txt}</div>
          <div class="r10-title">${esc(it.title)}</div>
          <div class="r10-line">${esc(it.one_line)}</div>
          ${it.prediction ? `<div class="r10-pred"><span>Predicción Fable</span>${esc(it.prediction)}</div>` : ''}
          ${ln ? `<a class="r10-link" href="${esc(ln.href)}" target="_blank" rel="noopener">↗ ${esc(ln.label)}</a>` : ''}
        </div>
      </div>`
  }).join('')

  const perlas = (data.perlas || []).map(p => `<li>${esc(p)}</li>`).join('')
  const preguntas = (data.preguntas || []).map(q => `<li>${esc(q)}</li>`).join('')
  const ideas = (data.ideas || []).map(x => {
    const k = KIND[x.kind] || { label: x.kind || 'Idea', color: '#8B90A0' }
    return `<li class="idea"><span class="idea-kind" style="--k:${k.color}">${esc(k.label)}</span><span>${esc(x.idea)}</span></li>`
  }).join('')

  const journals = (data.journals_activos || []).map(j => {
    const hot = HIGHLIGHT_SOURCES.some(h => (j || '').toLowerCase().includes(h))
    return `<span class="tag ${hot ? 'highlight' : ''}">${esc(j)}</span>`
  }).join('')

  const m = data.meta || {}
  const thin = m.thin ? `<div class="thin-note">Semana delgada en este dominio: se muestran solo hallazgos reales verificados. Sin relleno.</div>` : ''

  const itemCount = useRgn ? rgnTotalItems(data) : (data.top3 || []).length + (data.top10 || []).length

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(meta.title)} — ${date} · JAFLO Inteligencia Diaria</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
:root{
  --bg:#0D0F14;--bg2:#13161D;--bg3:#1A1E28;--text:#E8EAF0;--muted:#8B90A0;--dim:#555C70;
  --radius:14px;--radius-sm:9px;${css}
}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;-webkit-font-smoothing:antialiased;}
a{color:inherit;}
.back{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--muted);text-decoration:none;margin-bottom:14px;transition:color .15s;}
.back:hover{color:var(--accent);}
.header{background:linear-gradient(135deg,#0D0F14 0%,#161A23 55%,var(--accent-soft) 100%);border-bottom:1px solid var(--accent-border);padding:30px 48px 26px;position:relative;overflow:hidden;}
.header::before{content:'';position:absolute;top:-80px;right:-60px;width:320px;height:320px;background:radial-gradient(circle,var(--accent-dim) 0%,transparent 70%);border-radius:50%;}
.header-top{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:18px;position:relative;z-index:1;}
.badge{background:var(--accent-dim);border:1px solid var(--accent-border);color:var(--accent);font-size:10.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:4px 12px;border-radius:100px;display:inline-block;margin-bottom:12px;}
h1{font-size:27px;font-weight:800;color:#fff;line-height:1.18;display:flex;align-items:center;gap:11px;}
h1 .ic{font-size:24px;}
.sub{font-size:12.5px;color:var(--muted);margin-top:7px;}
.stats{display:flex;gap:12px;flex-wrap:wrap;}
.stat{text-align:center;background:var(--bg3);border:1px solid rgba(255,255,255,.06);border-radius:var(--radius-sm);padding:11px 17px;min-width:80px;}
.stat-n{font-size:20px;font-weight:700;color:var(--accent);}
.stat-l{font-size:10px;color:var(--muted);margin-top:2px;letter-spacing:.03em;}
.main{max-width:1080px;margin:0 auto;padding:34px 48px 64px;display:flex;flex-direction:column;gap:38px;}
.sec-head{display:flex;align-items:center;gap:11px;margin-bottom:18px;}
.sec-ic{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;background:var(--accent-dim);border:1px solid var(--accent-border);}
.sec-title{font-size:13px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--text);}
.sec-sub{font-size:11.5px;color:var(--dim);margin-left:2px;}
.sec-count{margin-left:auto;font-size:10.5px;color:var(--dim);background:var(--bg3);border:1px solid rgba(255,255,255,.05);padding:2px 9px;border-radius:100px;}
.thin-note{font-size:12px;color:var(--muted);background:var(--bg2);border:1px dashed var(--accent-border);border-radius:var(--radius-sm);padding:10px 14px;margin-bottom:16px;}
/* TOP 3 */
.r3-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;}
.r3-card{background:var(--bg2);border:1px solid rgba(255,255,255,.06);border-radius:var(--radius);padding:22px 22px 20px;position:relative;transition:border-color .2s,transform .2s;}
.r3-card:hover{border-color:var(--accent-border);transform:translateY(-2px);}
.r3-card:first-child{border-color:var(--accent-border);background:linear-gradient(150deg,var(--accent-soft),var(--bg2) 55%);}
.r3-rank{position:absolute;top:16px;right:16px;width:27px;height:27px;border-radius:50%;background:var(--accent-dim);border:1px solid var(--accent-border);color:var(--accent);font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;}
.r3-card:first-child .r3-rank{background:var(--accent);color:#08110d;border:none;}
.r3-src{font-size:9.5px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;padding-right:30px;}
.r3-src.hot{color:var(--accent);}
.r3-title{font-size:14.5px;font-weight:600;color:#fff;line-height:1.4;margin-bottom:11px;}
.r3-hook{font-size:12.5px;color:var(--muted);line-height:1.62;margin-bottom:14px;}
.r3-link{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:var(--accent);text-decoration:none;opacity:.85;word-break:break-all;}
.r3-link:hover{opacity:1;text-decoration:underline;}
/* TOP 10 */
.r10-list{display:flex;flex-direction:column;gap:10px;}
.r10-item{background:var(--bg2);border:1px solid rgba(255,255,255,.05);border-radius:var(--radius-sm);padding:15px 18px;display:grid;grid-template-columns:24px 1fr;gap:13px;align-items:start;transition:border-color .15s;}
.r10-item:hover{border-color:var(--accent-border);}
.r10-n{font-size:12px;font-weight:700;color:var(--accent);padding-top:2px;}
.r10-src{font-size:9.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--dim);margin-bottom:4px;}
.r10-src.hot{color:var(--accent);}
.r10-title{font-size:13.5px;font-weight:600;color:var(--text);margin-bottom:5px;line-height:1.4;}
.r10-line{font-size:12.5px;color:var(--muted);line-height:1.55;margin-bottom:7px;}
.r10-pred{font-size:12px;color:var(--text);line-height:1.5;background:var(--accent-soft);border-left:2px solid var(--accent);border-radius:0 6px 6px 0;padding:7px 11px;margin-bottom:8px;}
.r10-pred span{display:block;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);margin-bottom:3px;}
.r10-link{font-size:10.5px;font-weight:600;color:var(--accent);text-decoration:none;opacity:.7;word-break:break-all;}
.r10-link:hover{opacity:1;text-decoration:underline;}
/* PERLAS / PREGUNTAS / IDEAS */
.cols{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.panel{background:var(--bg2);border:1px solid rgba(255,255,255,.06);border-radius:var(--radius);padding:20px 22px;}
.panel h4{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.plist{list-style:none;display:flex;flex-direction:column;gap:11px;}
.plist li{font-size:12.8px;color:var(--text);line-height:1.55;padding-left:18px;position:relative;}
.plist li::before{content:'';position:absolute;left:0;top:8px;width:6px;height:6px;border-radius:50%;background:var(--accent);}
.qlist li::before{border-radius:1px;transform:rotate(45deg);}
.ideas-panel{background:var(--bg2);border:1px solid rgba(255,255,255,.06);border-radius:var(--radius);padding:20px 22px;}
.ideas-list{list-style:none;display:flex;flex-direction:column;gap:12px;}
.idea{display:flex;gap:11px;align-items:baseline;font-size:12.8px;color:var(--text);line-height:1.55;}
.idea-kind{flex-shrink:0;font-size:9.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--k);background:color-mix(in srgb,var(--k) 14%,transparent);border:1px solid color-mix(in srgb,var(--k) 32%,transparent);padding:2px 9px;border-radius:100px;min-width:74px;text-align:center;}
/* TAGS */
.tags{display:flex;flex-wrap:wrap;gap:8px;}
.tag{font-size:11px;font-weight:500;color:var(--muted);background:var(--bg3);border:1px solid rgba(255,255,255,.06);padding:4px 12px;border-radius:100px;}
.tag.highlight{color:var(--accent);background:var(--accent-dim);border-color:var(--accent-border);}
/* FOOTER */
.footer{border-top:1px solid rgba(255,255,255,.05);padding:20px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
.footer-brand{font-size:12px;font-weight:700;color:var(--accent);letter-spacing:.05em;}
.footer-note{font-size:10.5px;color:var(--dim);max-width:640px;text-align:right;}
@media(max-width:820px){.header,.main,.footer{padding-left:20px;padding-right:20px;}.cols{grid-template-columns:1fr;}.footer-note{text-align:left;}}
</style>
</head>
<body>
<div class="header">
  <div style="position:relative;z-index:1;">
    <a class="back" href="../../index.html">← Galería JAFLO</a>
  </div>
  <div class="header-top">
    <div>
      <div class="badge">◆ Dossier diario · automatizado</div>
      <h1><span class="ic">${meta.icon}</span>${esc(meta.title)}</h1>
      <div class="sub">${fechaLarga(date)} · ${esc(isoWeek(date))} · personalizado para Javier</div>
    </div>
    <div class="stats">
      <div class="stat"><div class="stat-n">${m.total_found ?? '—'}</div><div class="stat-l">encontrados</div></div>
      <div class="stat"><div class="stat-n">${m.reviewed ?? '—'}</div><div class="stat-l">revisados</div></div>
      <div class="stat"><div class="stat-n">${itemCount}</div><div class="stat-l">curados</div></div>
    </div>
  </div>
</div>
<div class="main">
  ${thin}
  ${useRgn ? renderRgnSections(data) : `<section>
    <div class="sec-head">
      <div class="sec-ic">🏆</div>
      <span class="sec-title">Top 3 — lectura obligatoria</span>
      <span class="sec-sub">resumen extenso · por qué te importa</span>
      <span class="sec-count">${(data.top3 || []).length}</span>
    </div>
    <div class="r3-grid">${top3}</div>
  </section>

  <section>
    <div class="sec-head">
      <div class="sec-ic">📡</div>
      <span class="sec-title">Radar — 10 lecturas siguientes</span>
      <span class="sec-sub">resumen corto + predicción Fable</span>
      <span class="sec-count">${(data.top10 || []).length}</span>
    </div>
    <div class="r10-list">${top10}</div>
  </section>`}

  <section>
    <div class="cols">
      <div class="panel">
        <h4>💎 5 perlas del día</h4>
        <ul class="plist">${perlas}</ul>
      </div>
      <div class="panel">
        <h4>❓ 5 preguntas del día</h4>
        <ul class="plist qlist">${preguntas}</ul>
      </div>
    </div>
  </section>

  <section>
    <div class="sec-head">
      <div class="sec-ic">💡</div>
      <span class="sec-title">5 ideas del día</span>
      <span class="sec-sub">contenido · paper · libro</span>
    </div>
    <div class="ideas-panel"><ul class="ideas-list">${ideas}</ul></div>
  </section>

  ${journals ? `<section>
    <div class="sec-head"><div class="sec-ic">📰</div><span class="sec-title">Activos esta semana</span></div>
    <div class="tags">${journals}</div>
  </section>` : ''}
</div>
<div class="footer">
  <div class="footer-brand">JAFLO · Inteligencia Diaria</div>
  <div class="footer-note">Fuentes: ${esc((m.sources_used || ['PubMed','Web']).join(' · '))}. Atribución a PubMed y DOIs incluidos por sus términos de uso. Generado ${fechaLarga(date)}.</div>
</div>
</body>
</html>`
}

// ---- stars markdown (estrellable: editas [x] en GitHub) --------------------
export function renderStarsMD(data) {
  const meta = DOMAINS[data.domain_key] || { title: data.domain_title, icon: '◆' }
  const date = data.date
  const dk = data.domain_key
  const clean = (s = '') => String(s).replace(/\s+/g, ' ').trim()
  const line = (it, id) => {
    const ln = linkFor(it)
    const src = [it.source, it.type].filter(Boolean).join(' · ')
    const linkmd = ln ? ` — [${clean(ln.label)}](${ln.href})` : ''
    return `- [ ] **${clean(it.title)}** — _${clean(src)}_${linkmd} <!--star:${dk}|${date}|${id}-->`
  }
  const useRgn = isRgnLayout(data)
  let mainSections
  if (useRgn) {
    mainSections = RGN_CATEGORIES.map(cat => {
      const items = (data[cat.key] || []).map((it, i) => `${line(it, cat.key + '-' + (i + 1))}\n  > ${clean(it.hook_extended)}`).join('\n')
      return `## ${cat.icon} ${cat.title}\n${items || '_(sin ítems en la ventana de 48 h)_'}`
    }).join('\n\n')
  } else {
    const top3 = (data.top3 || []).map((it, i) => `${line(it, 't3-' + (i + 1))}\n  > ${clean(it.hook_extended)}`).join('\n')
    const top10 = (data.top10 || []).map((it, i) => {
      const pred = it.prediction ? `\n  > 🔮 ${clean(it.prediction)}` : ''
      return `${line(it, 't10-' + (i + 1))}\n  > ${clean(it.one_line)}${pred}`
    }).join('\n')
    mainSections = `## 🏆 Top 3\n${top3 || '_(sin ítems)_'}\n\n## 📡 Radar (10)\n${top10 || '_(sin ítems)_'}`
  }
  const perlas = (data.perlas || []).map(p => `- ${clean(p)}`).join('\n')
  const preguntas = (data.preguntas || []).map(q => `- ${clean(q)}`).join('\n')
  const ideas = (data.ideas || []).map(x => `- (${x.kind}) ${clean(x.idea)}`).join('\n')
  const m = data.meta || {}
  return `# ⭐ ${meta.icon || ''} ${meta.title} — ${date}

> Marca con \`[x]\` los papers/unidades que quieras **estrellar**. Aparecen en la página Favoritos de la galería.
> Galería: https://jaflomd.github.io/jaflo-daily-intel/ · Favoritos: https://jaflomd.github.io/jaflo-daily-intel/favoritos.html
> Dossier: https://jaflomd.github.io/jaflo-daily-intel/dossiers/${dk}/${date}.html

${mainSections}

---

## 💎 Perlas del día
${perlas || '_(—)_'}

## ❓ Preguntas del día
${preguntas || '_(—)_'}

## 💡 Ideas del día
${ideas || '_(—)_'}

---
_Fuentes: ${(m.sources_used || ['PubMed', 'Web']).join(' · ')}. Atribución a PubMed por sus términos de uso._
`
}

// ---- build operations ------------------------------------------------------
function readJSON(p) { return JSON.parse(fs.readFileSync(p, 'utf8')) }

function buildOne(domain, date) {
  const src = path.join(DATA, domain, `${date}.json`)
  if (!fs.existsSync(src)) { console.error(`✗ no existe ${src}`); return false }
  const data = readJSON(src)
  data.domain_key = data.domain_key || domain
  data.date = data.date || date
  if (!data.accent_color && DOMAINS[domain]) data.accent_color = DOMAINS[domain].color
  const html = renderDossier(data)
  const outDir = path.join(DOSSIERS, domain)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, `${date}.html`), html)
  console.log(`✓ dossiers/${domain}/${date}.html`)
  // MD estrellable (preserva checkboxes ya marcados si el archivo existe)
  const starDir = path.join(STARS, domain)
  fs.mkdirSync(starDir, { recursive: true })
  const starPath = path.join(starDir, `${date}_${domain}.md`)
  let md = renderStarsMD(data)
  if (fs.existsSync(starPath)) md = mergeStars(fs.readFileSync(starPath, 'utf8'), md)
  fs.writeFileSync(starPath, md)
  console.log(`✓ stars/${domain}/${date}_${domain}.md`)
  return true
}

// Conserva los [x] ya marcados (por id de estrella) al regenerar el MD.
function mergeStars(oldMd, newMd) {
  const checked = new Set()
  for (const m of oldMd.matchAll(/- \[x\][^\n]*<!--star:([^>]+)-->/g)) checked.add(m[1])
  if (!checked.size) return newMd
  return newMd.replace(/- \[ \]([^\n]*<!--star:([^>]+)-->)/g, (full, rest, id) =>
    checked.has(id) ? `- [x]${rest}` : full)
}

function rebuildManifest() {
  const dossiers = []
  for (const domain of Object.keys(DOMAINS)) {
    const dir = path.join(DATA, domain)
    if (!fs.existsSync(dir)) continue
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()) {
      const date = f.replace(/\.json$/, '')
      const htmlPath = path.join(DOSSIERS, domain, `${date}.html`)
      if (!fs.existsSync(htmlPath)) continue
      let data = {}
      try { data = readJSON(path.join(dir, f)) } catch { continue }
      const counts = isRgnLayout(data)
        ? {
            top3_reviews: (data.top3_reviews || []).length,
            top3_nma: (data.top3_nma || []).length,
            top3_guidelines: (data.top3_guidelines || []).length,
            top3_meta_analysis: (data.top3_meta_analysis || []).length,
            perlas: (data.perlas || []).length,
            preguntas: (data.preguntas || []).length,
            ideas: (data.ideas || []).length,
          }
        : {
            top3: (data.top3 || []).length,
            top10: (data.top10 || []).length,
            perlas: (data.perlas || []).length,
            preguntas: (data.preguntas || []).length,
            ideas: (data.ideas || []).length,
          }
      dossiers.push({
        domain,
        title: DOMAINS[domain].title,
        color: DOMAINS[domain].color,
        icon: DOMAINS[domain].icon,
        date,
        week: isoWeek(date),
        file: `dossiers/${domain}/${date}.html`,
        md: `stars/${domain}/${date}_${domain}.md`,
        counts,
        thin: !!(data.meta && data.meta.thin),
      })
    }
  }
  dossiers.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  const manifest = {
    generated: new Date().toISOString().slice(0, 19) + 'Z',
    brand: 'JAFLO · Inteligencia Diaria',
    domains: DOMAINS,
    dossiers,
  }
  fs.writeFileSync(path.join(ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2))
  console.log(`✓ manifest.json (${dossiers.length} dossiers)`)
}

// ---- CLI (solo al ejecutar directamente, no al importar) -------------------
const isMain = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url
if (isMain) {
  const args = process.argv.slice(2)
  if (args[0] === '--manifest') {
    rebuildManifest()
  } else if (args[0] === '--all') {
    for (const domain of Object.keys(DOMAINS)) {
      const dir = path.join(DATA, domain)
      if (!fs.existsSync(dir)) continue
      for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) buildOne(domain, f.replace(/\.json$/, ''))
    }
    rebuildManifest()
  } else if (args[0] === '--date') {
    const date = args[1]
    for (const domain of Object.keys(DOMAINS)) {
      if (fs.existsSync(path.join(DATA, domain, `${date}.json`))) buildOne(domain, date)
    }
    rebuildManifest()
  } else if (args.length >= 2) {
    buildOne(args[0], args[1]); rebuildManifest()
  } else {
    console.log('uso: node scripts/build.mjs <domain> <date> | --date <date> | --all | --manifest')
    process.exit(1)
  }
}
