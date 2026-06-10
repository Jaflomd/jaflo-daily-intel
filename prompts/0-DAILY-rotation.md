# Prompt DIARIO — corre el dominio que toca hoy (rotación semanal)

> Éste es el prompt del **job diario** (cron / cloud routine). Cada día corre **un solo
> dominio**, según la rotación. Para sembrar o hacer backfill de los 7, usa `0-MASTER-run-all.md`.

Eres el runner diario de **JAFLO · Inteligencia Diaria**. Hoy es `<YYYY-MM-DD>`.

## Rotación (1 dominio por día de la semana)

| Día | Dominio |
|---|---|
| Lunes | `rct-metas-psychiatry` — Alta Evidencia · Psiquiatría |
| Martes | `dimensional-psych` — Psicopatología Dimensional |
| Miércoles | `precision-psych` — Psiquiatría & Educación de Precisión |
| Jueves | `clinical-reasoning` — Razonamiento Clínico |
| Viernes | `rct-metas-education` — Alta Evidencia · Educación |
| Sábado | `neuroscience-educ` — Educación Médica & Neuroeducación |
| Domingo | `philosophy` — Modelos Mentales & Filosofía |

## Procedimiento

1. **Resuelve el dominio de hoy:**
   ```bash
   cd ~/Developer/jaflo-daily-intel
   node scripts/today-domain.mjs --info     # ej: 2026-06-11 (Jueves) → clinical-reasoning
   DOMAIN=$(node scripts/today-domain.mjs)   # solo la key
   ```
2. **Sigue el prompt de ese dominio** en `prompts/<n>-<DOMAIN>.md`. Ejecuta las búsquedas de
   verdad (PubMed vía MCP + WebSearch/WebFetch). **Ventana: últimos 7-10 días previos a hoy**
   (`date_from` = hoy − 10 días, `date_to` = hoy, `datetype=pdat`), priorizando 24-72h.
3. **Produce las 5 secciones** personalizadas a Javier (top3 extenso, radar 10 + predicción Fable,
   5 perlas, 5 preguntas, 5 ideas) y guarda en `data/<DOMAIN>/<YYYY-MM-DD>.json`.
4. **Regla dura anti-fabricación:** solo ítems reales hallados en búsquedas; DOI solo si verificado;
   semana delgada → solo lo real + `meta.thin=true`. Nunca rellenar.
5. **Build + publish:**
   ```bash
   node scripts/build.mjs "$DOMAIN" <YYYY-MM-DD>
   git add -A && git commit -m "dossier $DOMAIN <YYYY-MM-DD>" && git push
   ```
6. Reporta el dominio del día, si quedó delgado, y el link al dossier en la galería:
   `https://jaflomd.github.io/jaflo-daily-intel/`

> Eficiencia: como hoy es un solo dominio, no necesitas fan-out. Un agente basta. (El fan-out de
> los 7 se reserva para `0-MASTER-run-all.md`, p. ej. para sembrar la galería o recuperar días.)
