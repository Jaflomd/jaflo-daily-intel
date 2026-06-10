// Guías de búsqueda profunda (estilo deep-search) por dominio.
// Destiladas de un grill + /deep-search. Se inyectan en los prompts de dominio
// (gen-prompts) y en los prompts de routine (gen-routines). Editar aquí afina la búsqueda.

export const DEEPSEARCH = {
  'rct-metas-psychiatry': `**Pregunta núcleo:** ¿Qué evidencia de alto nivel (NMA, SR con meta-análisis, RCT grande) publicada en los últimos 7-10 días cambia o refuerza la conducta clínica en psiquiatría — en todo el espectro — con foco extra en las líneas de Javier?

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

**Queries afinadas (PubMed, además de la base del dominio; aplica date_from = hoy − 10 días, date_to = hoy, datetype=pdat, sort=pub_date):**
- NMA/SR top:
    ("network meta-analysis"[tiab] OR "systematic review"[pt] OR "meta-analysis"[pt] OR "cochrane database syst rev"[ta]) AND (psychiatry OR depression OR bipolar OR schizophrenia OR anxiety OR ADHD OR autism OR OCD OR PTSD OR "personality disorder")
- Boost líneas de Javier:
    (ADHD OR autism OR "autism spectrum" OR neurodevelopment OR "transcranial magnetic stimulation" OR tDCS OR ECT OR "deep brain stimulation" OR "precision psychiatry" OR biomarker) AND ("randomized controlled trial"[pt] OR "meta-analysis"[pt] OR "systematic review"[pt])`,
}
