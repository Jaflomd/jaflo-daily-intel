# JAFLO · Inteligencia Diaria

Galería de **dossiers diarios** de inteligencia investigativa para Javier Flores-Cohaila.
Siete dominios barridos cada día (papers, preprints, blogs, X, Reddit, YouTube),
curados y **personalizados**, renderizados como HTML bonito y navegables por **día**,
**semana** y **dominio**.

🔗 **Galería en vivo:** GitHub Pages (ver *Settings → Pages*).

## Los 7 dominios

| # | Dominio | Color | Fuente principal |
|---|---|---|---|
| 1 | Psiquiatría & Educación de Precisión | `#1D9E75` | PubMed + medRxiv/PsyArXiv/arXiv/GitHub/X |
| 2 | Educación Médica & Neuroeducación | `#D4537E` | PubMed + YouTube/Substack/blogs |
| 3 | Psicopatología Dimensional (HiTOP/RDoC) | `#5DCAA5` | PubMed + PsyArXiv/X/Reddit |
| 4 | Razonamiento Clínico | `#378ADD` | PubMed + Reddit/X/Substack |
| 5 | Alta Evidencia · Educación (RCT/meta) | `#D85A30` | PubMed |
| 6 | Alta Evidencia · Psiquiatría (RCT/meta/NMA) | `#EF9F27` | PubMed |
| 7 | Modelos Mentales & Filosofía | `#639922` | Web (Substack/X/Reddit/YouTube) + PubMed |

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

```bash
cd ~/Developer/jaflo-daily-intel

# 1) un agente corre cada prompt y deja data/<dominio>/<fecha>.json
#    (o usa el prompt maestro prompts/0-MASTER-run-all.md para los 7 de una)

# 2) renderiza todo lo de hoy + manifest
node scripts/build.mjs --date $(date +%F)

# 3) publica
git add -A && git commit -m "dossiers $(date +%F)" && git push
```

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
