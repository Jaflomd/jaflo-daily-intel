# Prompt 7/7 — Modelos Mentales & Filosofía

> Dominio `philosophy` · color `#639922` · sistema **JAFLO · Inteligencia Diaria**
> Cadencia: **diaria** (corre 1×/día, junto con los otros 6 dominios).
> Ventana de búsqueda: **últimas 48 horas**. Salida: dossier HTML en la galería de GitHub + MD estrellable.

Eres un agente de inteligencia investigativa. Hoy es `<YYYY-MM-DD>`. Construye el **dossier del día** del dominio **Modelos Mentales & Filosofía** y publícalo en la galería.

**Lector (personaliza TODO a él):** Javier Flores-Cohaila — psiquiatra peruano, investigador (meta RENACYT Distinguido), educador médico (marca AMAUTA / USAMEDIC; prepara médicos para ENAM y Residentado). Líneas vivas: psiquiatría dimensional (HiTOP, RDoC, network theory), TDAH/TEA/neurodivergencia, neuromodulación, psiquiatría de precisión, IA aplicada a investigación y educación, razonamiento clínico, educación médica de precisión. Escribe libros (psicopatología para el mundo, neurociencia educativa, BMSE/razonamiento dimensional), corre comités de ética (HVLH), crea contenido (Instagram/YouTube). Pilares P&A: research, ai-enhancement, precision-psychiatry, amauta-education, kinobody-selfcare, content-documentation. Valora ROI/leverage/monetización, evidencia proporcional al claim, voz directa sin moralina, español natural.

## Alcance

Modelos mentales, frameworks cognitivos, filosofía práctica, estoicismo, toma de decisiones, metacognición, systems thinking, comunicación de liderazgo, soft/social skills, humildad epistémica, second-order thinking, debiasing.

## Ventana temporal

Revisa **las últimas 48 horas** (extiende a 72h solo si está delgado, por el retraso de indexación de PubMed). Prioriza lo de las **últimas 24h** y evita repetir lo del dossier de ayer salvo que siga siendo claramente top. En `search_articles` usa `date_from` = hoy − 3 días, `date_to` = hoy, `datetype="pdat"`, `sort="pub_date"`. Si el MCP de PubMed no carga en el entorno, cae a WebSearch sobre `site:pubmed.ncbi.nlm.nih.gov` y Europe PMC. En web, filtra a publicaciones de las últimas 48 horas.

## Fuentes y queries (ejecuta de verdad — no inventes)

1. **Web (fuente principal)** (WebSearch/WebFetch): Substack, blogs (Farnam Street, etc.), X/Twitter (`min_faves:10`), Reddit (r/mentalmodels, r/LessWrong, r/philosophy, r/socialskills, r/leadership), YouTube transcripts — últimos 7 días.
2. **PubMed** (solo para los papers peer-reviewed): `("decision making" OR "metacognition" OR "cognitive bias" OR "reasoning" OR "epistemic")`
3. **Filtra** hustle culture, hacks de productividad y motivación vacía. Exige insight a nivel de **mecanismo**, no consejo genérico. Para `top3` prefiere artículos peer-reviewed o ensayos con framework estructural.

Reúne los ítems reales de la ventana de 48h (idealmente 13: top3 + top10). Si hay menos, prioriza calidad sobre cantidad y marca `meta.thin=true` — nunca rellenes. Selecciona los **más impactantes/novedosos/accionables** para Javier.

**Regla dura anti-fabricación:** cada ítem debe ser REAL y haber aparecido en tus búsquedas. DOI solo si lo confirmaste en metadata; si no, `doi:""`. Si la semana está delgada en este dominio, devuelve solo los hallazgos reales y marca `meta.thin=true`; jamás rellenes con papers inventados. Cita PubMed cuando uses PubMed (atribución + DOIs por sus términos de uso).

## Las 5 secciones (todo en español, personalizado a Javier)

1. **Top 3 — resumen extenso.** Por cada uno, un `hook_extended` que diga qué encontró, **por qué le importa a Javier** (conecta con su libro / línea / pilar concreto) y cómo usarlo.
2. **Radar — 10 siguientes (resumen corto + predicción).** `one_line` (qué halló + relevancia) y `prediction` (tu predicción como Fable: hacia dónde va o cómo capitalizarlo).
3. **5 perlas del día** — insight contraintuitivo o dato accionable, anclado en lo hallado.
4. **5 preguntas del día** — clínicas o de investigación, que disparan el contenido de hoy.
5. **5 ideas del día** — para contenido (IG/YT), paper o capítulo de libro; etiqueta `kind = content|paper|book`.

## Salida — contrato JSON (5 secciones)

Escribe el resultado en `data/philosophy/<YYYY-MM-DD>.json` con exactamente esta forma:

```json
{
  "domain_key": "philosophy",
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
node scripts/build.mjs philosophy <YYYY-MM-DD>      # renderiza el dossier + actualiza manifest.json
git add -A && git commit -m "dossier philosophy <YYYY-MM-DD>" && git push
```

El dossier queda en `dossiers/philosophy/<fecha>.html` y aparece solo en la galería (`index.html`).

---
*Generado por `scripts/gen-prompts.mjs`. No editar a mano: edita el generador y re-corre.*
