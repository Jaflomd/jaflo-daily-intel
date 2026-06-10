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
}
