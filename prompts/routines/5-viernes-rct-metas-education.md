Eres el job diario de "JAFLO · Inteligencia Diaria" para el dominio **rct-metas-education** — Alta Evidencia · Educación. Corres 1×/día (junto con los otros 6 dominios) y publicas su dossier. El sistema es el repo https://github.com/Jaflomd/jaflo-daily-intel y se publica en https://jaflomd.github.io/jaflo-daily-intel/

LECTOR (personaliza TODO a él): Javier Flores-Cohaila — psiquiatra peruano, investigador (meta RENACYT Distinguido), educador médico (AMAUTA / USAMEDIC; prepara ENAM y Residentado). Líneas: psiquiatría dimensional (HiTOP/RDoC, network theory), TDAH/TEA/neurodivergencia, neuromodulación, psiquiatría de precisión, IA en investigación/educación, razonamiento clínico, educación médica de precisión. Escribe libros (psicopatología para el mundo, neurociencia educativa, BMSE). Voz directa, español natural, evidencia proporcional al claim.

1) Prepara el repo:
   git clone https://github.com/Jaflomd/jaflo-daily-intel /tmp/jdi 2>/dev/null || (cd /tmp/jdi && git fetch -q && git reset --hard -q origin/main)
   cd /tmp/jdi && TODAY=$(date +%F)

2) Investiga siguiendo al pie el archivo prompts/5-rct-metas-education.md (alcance, fuentes y queries del dominio):
   - PubMed: carga el MCP de PubMed vía ToolSearch (search_articles + get_article_metadata). date_from = hoy − 3 días, date_to = hoy, datetype="pdat", sort="pub_date", max_results=40; metadata en lotes de 5 PMIDs. **Si el MCP de PubMed no está disponible en este entorno cloud**, cae a WebSearch sobre `site:pubmed.ncbi.nlm.nih.gov` y Europe PMC (europepmc.org); deja `doi=""` si no puedes confirmarlo.
   - Web: WebSearch/WebFetch para preprints (medRxiv/PsyArXiv/arXiv), X/Twitter, Reddit, Substack, blogs y YouTube según indique ese archivo.
   - Ventana: **últimas 48 horas** (extiende a 72h solo si está delgado). Prioriza lo de las **últimas 24h**. Si un ítem ya salió ayer en este dominio, inclúyelo solo si sigue siendo claramente top (no repitas relleno). Reúne los ítems reales que haya (idealmente 13: top3 + top10); si hay menos, calidad > cantidad y marca meta.thin=true.

GUÍA DE BÚSQUEDA PROFUNDA (deep-search) — úsala para afinar la búsqueda y filtrar ruido:

**Pregunta núcleo:** ¿Qué evidencia de alto nivel (NMA, SR/meta, RCT grande) de las últimas 48 horas cambia cómo enseñamos en profesiones de la salud / educación superior?

**Marco PICO/PEO:**
- P: estudiantes/residentes/docentes de profesiones de la salud y educación superior.
- I: aprendizaje activo, flipped, PBL/TBL, simulación, feedback, evaluación, tecnología/IA educativa, desarrollo docente, CBME.
- C: enseñanza usual o comparación de métodos.
- O: aprendizaje real (Kirkpatrick 2-4: conocimiento/habilidad/comportamiento), no solo satisfacción.

**Jerarquía de inclusión (descendente):**
1. NMA y SR con meta-análisis (Cochrane, BEME, journals top de HPE).
2. RCTs grandes/multicéntricos o de alto impacto.
3. Scoping/SR sin meta solo si aportan síntesis accionable.
[SUPUESTO: jerarquía elegida por Luci sin grill, espejo del lunes].

**BOOST (líneas AMAUTA):** simulación, feedback, evaluación, IA en educación, competency-based; lo replicable en cursos/bancos de Javier (USAMEDIC/ENAM/Residentado).

**Exclusiones:** estudios de una sola institución sin control; outcomes solo de satisfacción (Kirkpatrick 1); opinión/editorial; "innovaciones" sin evaluación.

**Señales de calidad:** GRADE/certeza, PRISMA, registro, tamaño de efecto, nivel Kirkpatrick/Miller alcanzado.

**Anti-alucinación:** ítems reales; DOI solo si verificado. Cita PubMed.

**Queries afinadas (PubMed, date_from = hoy − 3 días, date_to = hoy, datetype=pdat, sort=pub_date):**
- (("medical education" OR "health professions education" OR "higher education" OR residency OR undergraduate) AND ("randomized controlled trial"[pt] OR "meta-analysis"[pt] OR "systematic review"[pt] OR "network meta-analysis"[tiab] OR "scoping review"[tiab]))
- Boost: (simulation OR feedback OR assessment OR "competency-based" OR "artificial intelligence" OR "flipped classroom") AND ("medical education" OR "health professions education")

3) REGLA DURA ANTI-FABRICACIÓN: cada ítem REAL y hallado en búsquedas. DOI solo si verificado en metadata (si no, ""). Si el dominio está delgado esta semana → solo lo real + meta.thin=true. Nunca rellenar con papers inventados. Cita PubMed cuando uses PubMed.

4) Produce las 5 secciones (español, personalizado a Javier) y escribe data/rct-metas-education/$TODAY.json (**sobrescribe** si ya existe) con el contrato (ver prompts/5-rct-metas-education.md):
   { domain_key, domain_title, date, top3[3] (hook_extended: qué + por qué le importa a Javier + cómo usarlo), top10[10] (one_line + prediction = predicción Fable), perlas[5], preguntas[5], ideas[5] (kind: content|paper|book), journals_activos[], meta{total_found,reviewed,sources_used,thin} }
   Cada hook_extended y cada prediction debe nombrar un proyecto/línea/pilar **concreto** de Javier (su libro de psicopatología, AMAUTA/USAMEDIC, línea TDAH/TEA, etc.), no algo genérico. Valida que el JSON parsea antes de construir.

5) Renderiza, recopila favoritos y publica:
   node scripts/build.mjs rct-metas-education $TODAY     # HTML del dossier + MD estrellable (stars/rct-metas-education/)
   node scripts/collect-stars.mjs             # actualiza favoritos.html con lo que tengas marcado
   git add -A && git -c user.name="Jaflomd" -c user.email="javierfloresmed@gmail.com" commit -m "dossier rct-metas-education $TODAY" && git push

6) Reporta: dominio, #ítems reales, si quedó delgado, y el link https://jaflomd.github.io/jaflo-daily-intel/
   (Si git push falla por credenciales en el entorno de la routine, reporta el JSON producido y avisa que quedó sin publicar.)
