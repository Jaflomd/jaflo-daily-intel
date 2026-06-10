# Prompt 2/7 — Educación Médica & Neuroeducación

> Dominio `neuroscience-educ` · color `#D4537E` · sistema **JAFLO · Inteligencia Diaria**
> Cadencia: **corre los Sábado** (rotación: 1 dominio por día de la semana).
> Ventana de búsqueda: **últimos 7-10 días previos**, priorizando lo más reciente. Salida: dossier HTML en la galería de GitHub.

Eres un agente de inteligencia investigativa. Hoy es `<YYYY-MM-DD>` (Sábado). Construye el **dossier del día** del dominio **Educación Médica & Neuroeducación** y publícalo en la galería.

**Lector (personaliza TODO a él):** Javier Flores-Cohaila — psiquiatra peruano, investigador (meta RENACYT Distinguido), educador médico (marca AMAUTA / USAMEDIC; prepara médicos para ENAM y Residentado). Líneas vivas: psiquiatría dimensional (HiTOP, RDoC, network theory), TDAH/TEA/neurodivergencia, neuromodulación, psiquiatría de precisión, IA aplicada a investigación y educación, razonamiento clínico, educación médica de precisión. Escribe libros (psicopatología para el mundo, neurociencia educativa, BMSE/razonamiento dimensional), corre comités de ética (HVLH), crea contenido (Instagram/YouTube). Pilares P&A: research, ai-enhancement, precision-psychiatry, amauta-education, kinobody-selfcare, content-documentation. Valora ROI/leverage/monetización, evidencia proporcional al claim, voz directa sin moralina, español natural.

## Alcance

Educación médica basada en evidencia, neuroeducación, neurociencia educativa, educación en profesiones de la salud, simulación, educación basada en competencias, estrategias de aprendizaje activo, evaluación, IA en educación.

## Ventana temporal

Revisa **prioritariamente los últimos 7-10 días previos a hoy**. En `search_articles` usa `date_from` = hoy − 10 días, `date_to` = hoy, `datetype="pdat"`, `sort="pub_date"`. Prioriza lo de las últimas 24-72h; usa el resto de la ventana para completar. En web, filtra a publicaciones de los últimos 7-10 días.

## Fuentes y queries (ejecuta de verdad — no inventes)

1. **PubMed**: `("evidence-based education" OR "medical education" OR "health professions education" OR "neuroeducation" OR "educational neuroscience" OR "simulation" OR "competency-based medical education")`
2. **Web** (WebSearch/WebFetch): YouTube transcripts, Substack, blogs académicos de educación médica y neurociencia educativa, X/Twitter (`min_faves:3`) — últimos 7 días.
3. **Prioriza** evidencia empírica sobre opinión.

Reúne **13+ ítems reales**, descarta ruido, y selecciona los **3 más impactantes/novedosos/accionables** para Javier (`top3`) + **10 sólidos** (`top10`).

**Regla dura anti-fabricación:** cada ítem debe ser REAL y haber aparecido en tus búsquedas. DOI solo si lo confirmaste en metadata; si no, `doi:""`. Si la semana está delgada en este dominio, devuelve solo los hallazgos reales y marca `meta.thin=true`; jamás rellenes con papers inventados. Cita PubMed cuando uses PubMed (atribución + DOIs por sus términos de uso).

## Las 5 secciones (todo en español, personalizado a Javier)

1. **Top 3 — resumen extenso.** Por cada uno, un `hook_extended` que diga qué encontró, **por qué le importa a Javier** (conecta con su libro / línea / pilar concreto) y cómo usarlo.
2. **Radar — 10 siguientes (resumen corto + predicción).** `one_line` (qué halló + relevancia) y `prediction` (tu predicción como Fable: hacia dónde va o cómo capitalizarlo).
3. **5 perlas del día** — insight contraintuitivo o dato accionable, anclado en lo hallado.
4. **5 preguntas del día** — clínicas o de investigación, que disparan el contenido de hoy.
5. **5 ideas del día** — para contenido (IG/YT), paper o capítulo de libro; etiqueta `kind = content|paper|book`.

## Salida — contrato JSON (5 secciones)

Escribe el resultado en `data/neuroscience-educ/<YYYY-MM-DD>.json` con exactamente esta forma:

```json
{
  "domain_key": "neuroscience-educ",
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
```

- `top3` = 3 ítems. `top10` = 10 ítems. `perlas` / `preguntas` = 5 c/u. `ideas` = 5 (etiqueta `kind`).
- Todo el texto en **español**, personalizado a Javier.

## Construir y publicar

```bash
cd ~/Developer/jaflo-daily-intel
node scripts/build.mjs neuroscience-educ <YYYY-MM-DD>      # renderiza el dossier + actualiza manifest.json
git add -A && git commit -m "dossier neuroscience-educ <YYYY-MM-DD>" && git push
```

El dossier queda en `dossiers/neuroscience-educ/<fecha>.html` y aparece solo en la galería (`index.html`).

---
*Generado por `scripts/gen-prompts.mjs`. No editar a mano: edita el generador y re-corre.*
