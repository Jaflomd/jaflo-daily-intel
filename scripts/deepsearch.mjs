// Guías de búsqueda profunda (estilo deep-search) por dominio.
// Destiladas de un grill + /deep-search. Se inyectan en los prompts de dominio
// (gen-prompts) y en los prompts de routine (gen-routines). Editar aquí afina la búsqueda.

export const DEEPSEARCH = {
  'rct-metas-psychiatry': `**Pregunta núcleo:** ¿Qué evidencia de alto nivel (NMA, SR con meta-análisis, RCT grande) publicada en las últimas 48 horas cambia o refuerza la conducta clínica en psiquiatría — en todo el espectro — con foco extra en las líneas de Javier?

**Marco PICO/PEO:**
- P (población): pacientes psiquiátricos de cualquier edad (niño / adolescente / adulto / anciano); todo el espectro: depresión, bipolar, esquizofrenia/psicosis, ansiedad, TDAH, autismo/TEA, TOC, TEPT, trastornos de personalidad, uso de sustancias.
- I (intervención): farmacológica; neuromodulación (TMS, tDCS, ECT, DBS); psicoterapéutica/psicosocial; y biomarcadores/estratificación que guíen tratamiento (precisión).
- C (comparador): placebo, tratamiento usual, cabeza-a-cabeza o ranking (en NMA).
- O (outcomes): eficacia (respuesta/remisión, tamaño de efecto, NNT/NNH), seguridad/tolerabilidad, y aplicabilidad clínica (¿cambia guía o práctica?).

**Jerarquía de inclusión (prioridad descendente):**
1. Network meta-analyses (NMA) y systematic reviews con meta-análisis (Cochrane y journals top).
2. RCTs grandes, registrados, multicéntricos o de alto impacto.
3. SR sin meta-análisis solo si aportan síntesis accionable.

**BOOST en la selección del top 3** (sin excluir el resto del espectro): TDAH/TEA/neurodivergencia, neuromodulación, psiquiatría dimensional/de precisión (HiTOP/RDoC, biomarcadores, predicción de respuesta).

**Exclusiones (ruido a descartar):**
- Protocolos de estudio sin resultados; registros de ensayo.
- Reviews narrativas, opinión, editoriales sin datos nuevos.
- RCTs pequeños/underpowered (piloto/feasibility, n bajo) salvo señal excepcional.
- Estudios animales/preclínicos, in vitro, modelos.
- Case reports/series; estudios de prevalencia sin intervención.

**Señales de calidad a reportar cuando existan:** tamaño de efecto (SMD/OR/RR) con IC, NNT/NNH, certeza GRADE, conformidad PRISMA, registro (PROSPERO/ClinicalTrials), heterogeneidad (I²).

**Anti-alucinación:** todo ítem debe existir en la fuente; DOI solo si verificado en metadata. Cita PubMed.

**Queries afinadas (PubMed, además de la base del dominio; aplica date_from = hoy − 3 días, date_to = hoy, datetype=pdat, sort=pub_date):**
- NMA/SR top:
    ("network meta-analysis"[tiab] OR "systematic review"[pt] OR "meta-analysis"[pt] OR "cochrane database syst rev"[ta]) AND (psychiatry OR depression OR bipolar OR schizophrenia OR anxiety OR ADHD OR autism OR OCD OR PTSD OR "personality disorder")
- Boost líneas de Javier:
    (ADHD OR autism OR "autism spectrum" OR neurodevelopment OR "transcranial magnetic stimulation" OR tDCS OR ECT OR "deep brain stimulation" OR "precision psychiatry" OR biomarker) AND ("randomized controlled trial"[pt] OR "meta-analysis"[pt] OR "systematic review"[pt])`,

  'dimensional-psych': `**Pregunta núcleo:** ¿Qué evidencia y conversación de las últimas 48 horas avanza la psicopatología dimensional (estructura, validación, traducción clínica) o reencuadra el campo — con foco en lo clínicamente traducible y en las líneas de Javier?

**Marco PEO:**
- P (población/contexto): muestras clínicas y comunitarias, cualquier edad; estructura latente de la psicopatología.
- E (exposición/fenómeno): modelos dimensionales — HiTOP, RDoC, network psychopathology, transdiagnóstico, factor p / bifactor, computational psychiatry, staging, specifiers.
- O (outcomes): validez estructural e incremental, predicción longitudinal, utilidad clínica (¿se usa en consulta?), implicaciones para clasificación.

**Prioridad del top 3 (descendente):**
1. Empírico sólido: validación de estructura, network analysis con muestra, longitudinal, genético/biomarcador que apoye la dimensionalidad.
2. Papers de posición/conceptuales que REENCUADREN el campo (figuras clave: Kotov, Krueger, Conway, Caspi/Moffitt, Hyman, Cuthbert/RDoC, Borsboom/network) — suben si alimentan el libro de Javier.
3. Aplicaciones clínicas (specifiers, staging, HiTOP en consulta).

**BOOST en la selección:** lo clínicamente traducible (uso real en consulta) y la intersección dimensional × TDAH/TEA/neurodivergencia.

**Recall amplio (decisión de Javier — él filtra al leer):** INCLUYE PsyArXiv/medRxiv y hilos/blogs/posts de X y Reddit (r/psychiatry, r/clinicalpsychology, r/cogsci) y de figuras del campo, aunque la señal sea preliminar. No descartes por ser preprint o social; tráelo si es relevante al marco dimensional. Etiqueta el tipo (paper/preprint/thread/blog) para que Javier juzgue.

**Señal mínima (evita basura pura):** que aporte mecanismo, dato o reencuadre — no opinión repetida ni divulgación 101. Excluye: crítica genérica al DSM sin propuesta, autoayuda, contenido motivacional.

**Anti-alucinación:** todo ítem real y verificable; DOI/URL solo si confirmado. Cita PubMed cuando uses PubMed.

**Queries afinadas (PubMed, además de la base del dominio; aplica date_from = hoy − 3 días, date_to = hoy, datetype=pdat, sort=pub_date):**
- Estructura/validación dimensional:
    ("HiTOP" OR "hierarchical taxonomy" OR "RDoC" OR "research domain criteria" OR "dimensional psychopathology" OR "transdiagnostic" OR "p factor" OR "general psychopathology factor" OR "bifactor") AND (validity OR structure OR "network analysis" OR longitudinal OR latent)
- Traducción clínica + líneas de Javier:
    ("dimensional" OR "transdiagnostic" OR "HiTOP" OR "RDoC") AND (ADHD OR autism OR neurodevelopment OR "clinical utility" OR staging OR specifier OR treatment)
- Web/preprint/social (recall amplio): PsyArXiv y medRxiv ("dimensional psychopathology" / HiTOP / RDoC / "psychopathology network"); X reciente ("HiTOP" OR "RDoC" OR "dimensional psychopathology" OR "psychopathology network"); Reddit r/psychiatry, r/clinicalpsychology, r/cogsci de las últimas 48 horas.`,

  'precision-psych': `**Pregunta núcleo:** ¿Qué de las últimas 48 horas hace la psiquiatría más personalizada/estratificada O la educación más adaptativa, con evidencia real (no hype de IA)?

**Marco PICO/PEO:**
- P: pacientes psiquiátricos (estratificación, predicción de respuesta) y aprendices de profesiones de la salud (personalización del aprendizaje).
- I/E: biomarcadores, multi-ómica, fenotipado digital, farmacogenómica, psiquiatría computacional; y aprendizaje adaptativo, learning analytics, feedback de precisión, IA tutora.
- O: validez predictiva real (AUC/calibración en muestra externa), utilidad clínica/educativa, reproducibilidad.

**Prioridad del top 3:** la PSIQUIATRÍA de precisión manda (línea clínica + libro + pilar precision-psychiatry), PERO garantiza al menos 1 ítem de EDUCACIÓN de precisión en el top 3 (pilar amauta-education) y varios en el radar. Que ninguno desaparezca. [SUPUESTO: balance elegido por Luci sin grill].

**BOOST (translacional/usable):** herramientas/repos que Javier pueda usar o citar; validación clínica/educativa real; fenotipado digital y predicción de respuesta aplicables; intersección con TDAH/TEA y RDoC/HiTOP.

**Exclusiones (anti-hype IA):** IA genérica sin datos clínicos/educativos; demos, marketing, benchmarks sin uso real; modelos sin validación externa; preclínico/animal. Solo entra lo que tenga validación O aporte metodológico genuino.

**Señales de calidad:** validación externa/temporal, calibración, tamaño muestral, código/datos abiertos, TRIPOD/PROBAST si es modelo predictivo.

**Anti-alucinación:** ítems reales; DOI/URL solo si verificado. Cita PubMed.

**Queries afinadas (PubMed, date_from = hoy − 3 días, date_to = hoy, datetype=pdat, sort=pub_date):**
- Psiquiatría de precisión:
    ("precision psychiatry" OR "personalized psychiatry" OR "stratified psychiatry" OR "computational psychiatry" OR "digital phenotyping" OR pharmacogenomics OR biomarker OR "treatment response prediction") AND (psychiatry OR "mental health")
- Educación de precisión:
    ("precision education" OR "personalized learning" OR "adaptive learning" OR "learning analytics" OR "precision feedback" OR "AI-assisted learning") AND ("medical education" OR "health professions education")
- Web/preprint: medRxiv, PsyArXiv, arXiv (cs.LG, q-bio), GitHub trending (precision-medicine, computational-psychiatry, adaptive-learning), X/Reddit de las últimas 48 horas.`,

  'clinical-reasoning': `**Pregunta núcleo:** ¿Qué de las últimas 48 horas mejora cómo razonamos clínicamente o reduce el error diagnóstico — con mecanismo o dato, no opinión?

**Marco PEO:**
- P: clínicos y aprendices en decisiones diagnósticas/terapéuticas.
- E: razonamiento clínico, dual-process (Sistema 1/2), error diagnóstico, sesgo cognitivo, cierre prematuro, debiasing, impacto de la IA en el razonamiento.
- O: precisión diagnóstica, calibración, reducción de error, transferencia a la práctica/enseñanza.

**Prioridad del top 3:** estudios empíricos (experimentos, RCTs educativos, estudios de error) sobre debiasing, dual-process e impacto de IA en el razonamiento. Revisiones sólidas si sintetizan mecanismo. [SUPUESTO: criterios elegidos por Luci sin grill].

**BOOST:** impacto de la IA en el razonamiento clínico (pilar ai-enhancement + tema caliente) y lo ENSEÑABLE (illness scripts, estrategias de debiasing) para el Competency Lab / AMAUTA.

**Exclusiones:** listas de sesgos sin intervención ni dato; opinión/editorial sin evidencia; "tips" genéricos; case reports anecdóticos.

**Señales de calidad:** diseño experimental, tamaño de efecto, calibración, medición de error real (no autorreporte), transferencia.

**Anti-alucinación:** ítems reales; DOI solo si verificado. Cita PubMed.

**Queries afinadas (PubMed, date_from = hoy − 3 días, date_to = hoy, datetype=pdat, sort=pub_date):**
- ("clinical reasoning" OR "diagnostic reasoning" OR "clinical decision-making" OR "diagnostic error" OR "cognitive bias" OR "dual process" OR debiasing) AND (education OR training OR accuracy OR intervention OR "artificial intelligence")
- Web: medRxiv, blogs/Substack (p. ej. ImproveDx), X, Reddit (r/medicine, r/medicaleducation, r/residency) de las últimas 48 horas; foco en IA y razonamiento.`,

  'rct-metas-education': `**Pregunta núcleo:** ¿Qué evidencia de alto nivel (NMA, SR/meta, RCT grande) de las últimas 48 horas cambia cómo enseñamos en profesiones de la salud / educación superior?

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
- Boost: (simulation OR feedback OR assessment OR "competency-based" OR "artificial intelligence" OR "flipped classroom") AND ("medical education" OR "health professions education")`,

  'neuroscience-educ': `**Pregunta núcleo:** ¿Qué de las últimas 48 horas conecta evidencia de aprendizaje/neurociencia con la práctica educativa real — sin neuromitos?

**Marco PEO:**
- P: aprendices y docentes (educación médica y superior).
- E: educación basada en evidencia, neuroeducación, neurociencia educativa, simulación, CBME, aprendizaje activo, carga cognitiva, práctica de recuperación, espaciado.
- O: aprendizaje y retención reales, transferencia, diseño instruccional informado.

**Prioridad del top 3:** evidencia empírica con TRADUCCIÓN al aula/clínica (no neurobabble). Revisiones sólidas que sinteticen principios accionables. [SUPUESTO: criterios elegidos por Luci sin grill].

**BOOST:** neurociencia educativa aplicable (alimenta el libro de neurociencia educativa de Javier); retrieval practice, espaciado, carga cognitiva, feedback; simulación.

**Exclusiones (anti-neuromito):** afirmaciones "brain-based" sin respaldo, estilos de aprendizaje, "hemisferio dominante", neuroimagen sobre-interpretada; opinión sin dato; divulgación 101.

**Señales de calidad:** diseño controlado, tamaño de efecto, replicación, distancia mecanismo→aula declarada con honestidad.

**Anti-alucinación:** ítems reales; DOI solo si verificado. Cita PubMed.

**Queries afinadas (PubMed, date_from = hoy − 3 días, date_to = hoy, datetype=pdat, sort=pub_date):**
- ("evidence-based education" OR "medical education" OR "health professions education" OR neuroeducation OR "educational neuroscience" OR simulation OR "competency-based medical education" OR "cognitive load" OR "retrieval practice")
- Web: YouTube/Substack/blogs (p. ej. The Learning Scientists), X de las últimas 48 horas; prioriza evidencia sobre opinión.`,

  'philosophy': `**Pregunta núcleo:** ¿Qué de las últimas 48 horas ofrece un modelo mental o framework con MECANISMO aplicable a decidir, pensar o comunicar mejor — no consejo genérico?

**Marco:**
- Tema: modelos mentales, filosofía práctica, estoicismo, toma de decisiones, metacognición, systems thinking, second-order thinking, humildad epistémica, debiasing, comunicación de liderazgo, soft/social skills.
- Fuente PRINCIPAL: web (Substack, blogs como Farnam Street, X con min_faves:10, Reddit r/mentalmodels, r/LessWrong, r/philosophy, YouTube). PubMed solo para los papers peer-reviewed.

**Prioridad del top 3:** papers peer-reviewed o ensayos con framework ESTRUCTURAL y mecanismo. Lo conceptual-aplicable manda sobre lo anecdótico. [SUPUESTO: criterios elegidos por Luci sin grill].

**BOOST:** frameworks aplicables a decisión, metacognición, comunicación y liderazgo (Competency Lab de Javier: razonamiento, comunicación, self-care); ideas que sirvan de contenido o capítulo.

**Exclusiones:** hustle culture, citas motivacionales, hacks de productividad, autoayuda sin estructura, threads de "10 lecciones" sin mecanismo.

**Señales de calidad:** mecanismo explícito (por qué funciona), límites declarados, ejemplos concretos, base en evidencia o filosofía rigurosa.

**Anti-alucinación:** ítems reales y verificables; DOI/URL solo si confirmado. Cita PubMed cuando uses PubMed.

**Queries afinadas:**
- PubMed (date_from = hoy − 3 días, date_to = hoy, datetype=pdat, sort=pub_date): ("decision making" OR metacognition OR "cognitive bias" OR reasoning OR epistemic OR "dual process")
- Web (últimas 48 horas): Substack/Farnam Street/blogs; X ("mental models" OR "second order thinking" OR "epistemic humility" OR stoicism min_faves:10); Reddit r/mentalmodels, r/LessWrong, r/philosophy; YouTube transcripts.`,

  'neuro-triple-network': `**Pregunta núcleo:** ¿Qué de las últimas 48 horas avanza el entendimiento de las redes cerebrales a gran escala —en especial la triple red (Salience / Default Mode / Central Executive)— y su disfunción en trastornos neuropsiquiátricos, con mecanismo y no solo correlación?

**Marco PEO:**
- P (población/contexto): muestras clínicas y comunitarias, cualquier edad; estructura y dinámica de redes cerebrales a gran escala.
- E (exposición/fenómeno): triple network model, salience/DMN/CEN, switching mediado por la ínsula, dysconnectivity transdiagnóstica, conectividad funcional/efectiva (rs-fMRI, MEG/EEG), conectómica, gradientes corticales, balance E/I.
- O (outcomes): mecanismo neurobiológico, validez/replicabilidad, biomarcadores de red, predicción de diagnóstico/respuesta, traducción a neuropsiquiatría.

**Prioridad del top 3 (descendente):**
1. Empírico sólido con mecanismo: neuroimagen con muestra adecuada y réplica/validación, estudios longitudinales, causal/efectivo (no solo correlación cruda), datos abiertos.
2. Papers de posición/teóricos que REENCUADREN el modelo de triple red o las redes a gran escala (figuras clave: Menon, Sridharan, Seeley, Uddin, Bressler, Bzdok, Margulies) — suben si conectan con psiquiatría dimensional/de precisión.
3. Aplicaciones translacionales: biomarcadores de red, neuromodulación dirigida por red (TMS/tDCS a nodos SN/CEN), fenotipado por conectividad.

**BOOST en la selección:** intersección red × TDAH/TEA/neurodivergencia, red × psicosis/depresión, y red × neuromodulación o psiquiatría de precisión (líneas de Javier).

**Exclusiones (anti-ruido):** neuroimagen sobre-interpretada (muestras minúsculas sin corrección, doble dipping), neuromitos, correlación sin mecanismo ni réplica, animal/preclínico sin puente clínico, divulgación 101 de "esta red hace X".

**Señales de calidad:** tamaño muestral y poder, corrección por comparaciones múltiples, réplica/validación externa, preregistro, datos/código abiertos, distancia mecanismo→clínica declarada con honestidad.

**Anti-alucinación:** ítems reales y verificables; DOI/URL solo si confirmado. Cita PubMed cuando uses PubMed.

**Queries afinadas (PubMed, date_from = hoy − 3 días, date_to = hoy, datetype=pdat, sort=pub_date):**
- Triple red / redes a gran escala:
    ("triple network" OR "salience network" OR "default mode network" OR "central executive network" OR "frontoparietal network" OR "large-scale brain networks" OR dysconnectivity) AND (psychiatr* OR neuropsychiatr* OR "mental disorder")
- Conectividad × trastornos (líneas de Javier):
    ("functional connectivity" OR "resting-state fMRI" OR connectome OR "anterior insula" OR "anterior cingulate") AND (schizophrenia OR psychosis OR depression OR ADHD OR autism OR anxiety OR bipolar)
- Web/preprint: bioRxiv/medRxiv (neuroscience/neurology), PsyArXiv, arXiv q-bio.NC; X de autores/labs clave (Menon/Sridharan/Seeley/Uddin/Bressler/Bzdok); Reddit r/neuro, r/cogsci de las últimas 48 horas.`,

  'reviews-guidelines-nma': `**Pregunta núcleo:** ¿Qué documento de SÍNTESIS o que DEFINE LA PRÁCTICA (review article, guía de práctica clínica, consensus o network meta-analysis) de las últimas 48 horas resume, ranquea o normatiza la conducta clínica en psiquiatría (foco principal) o neuropsiquiatría (foco secundario)?

**Marco PICO/PEO:**
- P (población): pacientes psiquiátricos de cualquier edad (foco principal) y pacientes neuropsiquiátricos en la interfaz neurología-psiquiatría (foco secundario): demencias, epilepsia, trastornos del movimiento, TCE, ictus, encefalitis autoinmune, FND, delirium.
- I/E: cualquier intervención o constructo cuya EVIDENCIA SE SINTETIZA o NORMATIZA (no el estudio primario en sí).
- C: comparadores y rankings cuando aplique (NMA).
- O: fuerza de recomendación, ranking comparativo, cambios de guía, certeza GRADE, aplicabilidad clínica.

**Jerarquía de inclusión (prioridad descendente):**
1. Guías de práctica clínica y consensus statements de bodies normativos (APA, NICE, CANMAT, WFSBP, BAP, RANZCP, Maudsley, AAN, EAN).
2. Network meta-analyses (ranking comparativo de intervenciones).
3. Systematic reviews / umbrella / scoping reviews con síntesis accionable.
4. Reviews narrativas SOLO si son autoritativas o reencuadran el campo (autor/journal de referencia).

**BOOST en la selección:** TDAH/TEA/neurodivergencia, neuromodulación, psiquiatría dimensional/de precisión; y todo lo de neuropsiquiatría (foco secundario, distintivo de este dominio). Guías nuevas o actualizadas suben al top 3.

**Diferenciación dura (evita solapamiento con *Alta Evidencia · Psiquiatría*):** ese dominio caza RCTs y meta-análisis primarios; ESTE trae REVIEWS + GUÍAS + NMA y la cobertura de neuropsiquiatría. Si un ítem es un RCT individual, va al otro dominio, no aquí.

**Exclusiones (ruido a descartar):** protocolos de review/guía sin resultados; editoriales/opinión sin método; reviews narrativas genéricas sin aporte; guías locales sin novedad; estudios primarios individuales (RCT/cohorte) salvo que sean la base de una síntesis reportada.

**Señales de calidad a reportar:** certeza GRADE, conformidad PRISMA/AGREE II, registro PROSPERO, heterogeneidad (I²) y consistencia en NMA, fuerza de recomendación, body emisor de la guía.

**Anti-alucinación:** todo ítem debe existir en la fuente; DOI solo si verificado en metadata. Cita PubMed.

**Queries afinadas (PubMed, además de la base del dominio; aplica date_from = hoy − 3 días, date_to = hoy, datetype=pdat, sort=pub_date):**
- Síntesis/guías en psiquiatría:
    (psychiatry OR "mental disorders" OR depression OR bipolar OR schizophrenia OR anxiety OR ADHD OR autism OR OCD OR PTSD OR "substance use") AND (review[pt] OR "systematic review"[pt] OR "practice guideline"[pt] OR guideline[pt] OR consensus[tiab] OR "network meta-analysis"[tiab] OR "umbrella review"[tiab] OR "scoping review"[tiab])
- Neuropsiquiatría (foco secundario):
    ("neuropsychiatry" OR dementia OR "cognitive impairment" OR epilepsy OR "Parkinson disease" OR "traumatic brain injury" OR stroke OR "autoimmune encephalitis" OR "functional neurological" OR delirium) AND (review[pt] OR "systematic review"[pt] OR "practice guideline"[pt] OR "network meta-analysis"[tiab] OR consensus[tiab])`,
}
