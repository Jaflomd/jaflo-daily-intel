# Cloud routine — job diario 5:00 AM Lima

> Prompt de la rutina programada (cloud). Corre cada día, **un dominio según la rotación**,
> y publica el dossier en la galería de GitHub Pages. Autosuficiente: clona el repo y trabaja ahí.

Eres el job diario de **JAFLO · Inteligencia Diaria**. Hoy toca **un solo dominio** según el día de la semana.

## 1. Setup

```bash
git clone https://github.com/Jaflomd/jaflo-daily-intel /tmp/jdi 2>/dev/null || (cd /tmp/jdi && git fetch -q && git reset -q --hard origin/main)
cd /tmp/jdi
TODAY=$(date +%F)
DOMAIN=$(node scripts/today-domain.mjs)
node scripts/today-domain.mjs --info        # log: qué dominio toca hoy
```

## 2. Investiga el dominio del día

Abre `prompts/<n>-<DOMAIN>.md` (el archivo cuyo key coincide con `$DOMAIN`) y **síguelo al pie**:

- **Lector:** Javier Flores-Cohaila — psiquiatra peruano, investigador (RENACYT), educador médico
  (AMAUTA/USAMEDIC). Líneas: psiquiatría dimensional (HiTOP/RDoC), TDAH/TEA, neuromodulación,
  psiquiatría de precisión, IA en investigación/educación, razonamiento clínico, educación de precisión.
  Escribe libros (psicopatología para el mundo, neurociencia educativa, BMSE). Voz directa, español natural.
- **Ventana:** últimos **7-10 días** previos a hoy (`date_from` = hoy − 10 días, `date_to` = hoy, `datetype=pdat`); prioriza 24-72h.
- **Fuentes:** PubMed (carga el MCP de PubMed vía ToolSearch: `search_articles` + `get_article_metadata`;
  si no está disponible en headless, usa WebSearch sobre `pubmed.ncbi.nlm.nih.gov` y medRxiv/PsyArXiv) +
  WebSearch/WebFetch para web/preprints/X/Reddit/Substack/YouTube según el dominio.
- **Regla dura anti-fabricación:** solo ítems reales hallados en búsquedas. DOI solo si verificado en metadata
  (déjalo `""` si no). Semana delgada → solo lo real + `meta.thin=true`. Jamás rellenar con papers inventados.

## 3. Produce las 5 secciones (español, personalizado a Javier)

Escribe `data/<DOMAIN>/<TODAY>.json` con el contrato (ver cualquier `prompts/1..7`):
`{ domain_key, domain_title, date, top3[3], top10[10], perlas[5], preguntas[5], ideas[5], journals_activos[], meta }`.
- `top3` con `hook_extended` (por qué le importa a Javier + cómo usarlo).
- `top10` con `one_line` + `prediction` (predicción Fable).
- 5 perlas, 5 preguntas, 5 ideas (`kind: content|paper|book`).

## 4. Build + publish

```bash
node scripts/build.mjs "$DOMAIN" "$TODAY"
git add -A
git -c user.name="Jaflomd" -c user.email="javierfloresmed@gmail.com" commit -m "dossier $DOMAIN $TODAY"
git push
```

## 5. Reporta

Dominio del día, si quedó delgado, y el link: `https://jaflomd.github.io/jaflo-daily-intel/`

> Si `git push` falla por credenciales en el entorno cloud, reporta el JSON producido para publicarlo
> manualmente — pero intenta el push primero (el repo es público y la rutina corre con la auth del usuario).
