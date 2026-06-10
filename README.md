# JAFLO · Inteligencia Diaria

Galería de **dossiers diarios** de inteligencia investigativa para Javier Flores-Cohaila.
Siete dominios barridos cada día (papers, preprints, blogs, X, Reddit, YouTube),
curados y **personalizados**, renderizados como HTML bonito y navegables por **día**,
**semana** y **dominio**.

🔗 **Galería en vivo:** GitHub Pages (ver *Settings → Pages*).

## Rotación semanal — 1 dominio por día

Cada día de la semana corre **un solo agente/dominio**, que revisa prioritariamente los
**últimos 7-10 días previos**. Así cada día produce un dossier enfocado en vez de saturar.

| Día | Dominio | Color | Fuente principal |
|---|---|---|---|
| **Lunes** | Alta Evidencia · Psiquiatría (RCT/meta/NMA) | `#EF9F27` | PubMed |
| **Martes** | Psicopatología Dimensional (HiTOP/RDoC) | `#5DCAA5` | PubMed + PsyArXiv/X/Reddit |
| **Miércoles** | Psiquiatría & Educación de Precisión | `#1D9E75` | PubMed + medRxiv/PsyArXiv/arXiv/GitHub/X |
| **Jueves** | Razonamiento Clínico | `#378ADD` | PubMed + Reddit/X/Substack |
| **Viernes** | Alta Evidencia · Educación (RCT/meta) | `#D85A30` | PubMed |
| **Sábado** | Educación Médica & Neuroeducación | `#D4537E` | PubMed + YouTube/Substack/blogs |
| **Domingo** | Modelos Mentales & Filosofía | `#639922` | Web (Substack/X/Reddit/YouTube) + PubMed |

El mapeo día→dominio vive en `scripts/build.mjs` (objeto `DOMAINS`, campo `weekday`).
`node scripts/today-domain.mjs --info` dice qué toca hoy.

## Estructura de cada dossier (5 secciones)

1. **Top 3 — resumen extenso**: por qué te importa, anclado a tus proyectos/pilares.
2. **Radar — 10 siguientes**: resumen corto + **predicción Fable**.
3. **5 perlas del día**.
4. **5 preguntas del día**.
5. **5 ideas del día** (contenido · paper · libro).

## Cómo funciona

```
prompts/<n>-<dominio>.md   →  agente investiga (PubMed + web)  →  data/<dominio>/<fecha>.json
                              node scripts/build.mjs           →  dossiers/<dominio>/<fecha>.html + manifest.json
                              git push                         →  GitHub Pages publica  →  index.html (galería)
```

- **`prompts/`** — los 7 prompts agénticos, autocontenidos. Fuente: `scripts/gen-prompts.mjs`.
- **`data/`** — JSON estructurado por dominio/fecha (lo produce el agente; cero fabricación).
- **`scripts/build.mjs`** — renderizador determinista JSON → HTML + manifest.
- **`index.html`** — galería: filtra por dominio, alterna vista día/semana/dominio, busca.
- **`manifest.json`** — registro de todos los dossiers (lo regenera `build.mjs`).

## Correr el día de hoy

El **job diario** corre el prompt `prompts/0-DAILY-rotation.md`: detecta el dominio que toca
hoy y lo ejecuta. Manual:

```bash
cd ~/Developer/jaflo-daily-intel
DOMAIN=$(node scripts/today-domain.mjs)        # dominio de hoy según la rotación

# 1) un agente sigue prompts/<n>-<DOMAIN>.md (PubMed + web, ventana 7-10 días)
#    y deja data/<DOMAIN>/<fecha>.json

# 2) renderiza + manifest
node scripts/build.mjs "$DOMAIN" $(date +%F)

# 3) publica
git add -A && git commit -m "dossier $DOMAIN $(date +%F)" && git push
```

Para sembrar la galería o recuperar varios días de una, usa `prompts/0-MASTER-run-all.md`
(corre los 7 dominios) y luego `node scripts/build.mjs --date <fecha>`.

Comandos útiles de `build.mjs`:

```bash
node scripts/build.mjs <dominio> <fecha>   # un dossier
node scripts/build.mjs --date <fecha>      # todos los dominios de esa fecha
node scripts/build.mjs --all               # reconstruye todo
node scripts/build.mjs --manifest          # solo el manifest
```

## Regla anti-fabricación

Nunca se inventan citas, DOIs, autores, fechas ni métricas. Si una semana está
delgada en un dominio, el dossier muestra **solo hallazgos reales** y se marca
como *delgado*. Atribución a PubMed y DOIs incluidos por sus términos de uso.

---
*Parte del Jaflo Lab. Voz: Luci/Fable.*
